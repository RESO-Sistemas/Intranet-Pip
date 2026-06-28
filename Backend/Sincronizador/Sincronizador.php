<?php
/**
 * Sincronizador RH: consume la API local de PIP (PIPServerLocalAPI) y migra
 * sucursales, áreas, tipos de puesto y empleados hacia la BD local, remapeando
 * los IDs de origen (SyncMapeoOrigen) para evitar colisiones entre servidores
 * y con los datos existentes. Idempotente.
 *
 * Plan: docs/PLAN_SINCRONIZADOR_RH.md
 */
class Sincronizador
{
    /** @var PDO conexión principal (transaccional para la migración) */
    private $pdo;
    /** @var PDO conexión secundaria autocommit para SyncEstado (visible mientras la txn está abierta) */
    private $pdoEstado;
    /** @var int|null id de la corrida actual en SyncBitacora (null = sin bitácora, p.ej. preview) */
    private $idBitacora = null;

    public function __construct()
    {
        // Mismas credenciales que Backend/Conexiones/Conexiones.php: la app viva
        // (login, menús, Backend/Empleados, Backend/Checklists, etc.) corre contra
        // klynet_datosdemo, no contra klynet_datos.
        $dsn = "mysql:host=162.240.213.3;dbname=klynet_datosdemo;charset=utf8mb4";
        $opts = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        $this->pdo       = new PDO($dsn, 'klynet_usrdatosdemo', 'Us3rK1yns2@25', $opts);
        $this->pdoEstado = new PDO($dsn, 'klynet_usrdatosdemo', 'Us3rK1yns2@25', $opts);
    }

    // ------------------------------------------------------- Estado (segundo plano)

    public function getEstadoSync($servidor)
    {
        $st = $this->pdoEstado->prepare("SELECT * FROM SyncEstado WHERE servidor = ?");
        $st->execute([$servidor]);
        $row = $st->fetch();
        if (!$row) return ['estado' => 'ninguno'];
        // Detecta procesos muertos: 'corriendo' pero sin latido > 60s.
        if ($row['estado'] === 'corriendo' && strtotime($row['updated_at']) < time() - 60) {
            $row['estado'] = 'muerto';
        }
        return $row;
    }

    public function cancelarSync($servidor)
    {
        $this->pdoEstado->prepare(
            "UPDATE SyncEstado SET cancelar = 1, updated_at = NOW() WHERE servidor = ? AND estado = 'corriendo'"
        )->execute([$servidor]);
        return ['Resultado' => true, 'Msg' => 'Cancelación solicitada'];
    }

    private function iniciarEstado($servidor)
    {
        $this->pdoEstado->prepare(
            "INSERT INTO SyncEstado (servidor, estado, pct, msg, resumen, cancelar, started_at, updated_at)
             VALUES (?, 'corriendo', 0, 'Iniciando…', NULL, 0, NOW(), NOW())
             ON DUPLICATE KEY UPDATE
                estado='corriendo', pct=0, msg='Iniciando…', resumen=NULL, cancelar=0,
                started_at=NOW(), updated_at=NOW()"
        )->execute([$servidor]);
    }

    private function actualizarEstado($servidor, $pct, $msg)
    {
        $this->pdoEstado->prepare(
            "UPDATE SyncEstado SET pct = ?, msg = ?, updated_at = NOW() WHERE servidor = ?"
        )->execute([$pct, $msg, $servidor]);
    }

    private function finalizarEstado($servidor, $estado, $msg, $resumen = null)
    {
        $this->pdoEstado->prepare(
            "UPDATE SyncEstado SET estado = ?, msg = ?, resumen = ?, updated_at = NOW() WHERE servidor = ?"
        )->execute([$estado, $msg, $resumen !== null ? json_encode($resumen) : null, $servidor]);
    }

    private function hayCancelacion($servidor)
    {
        $st = $this->pdoEstado->prepare("SELECT cancelar FROM SyncEstado WHERE servidor = ?");
        $st->execute([$servidor]);
        $row = $st->fetch();
        return $row && (int) $row['cancelar'] === 1;
    }

    // ------------------------------------------------------------------ Bitácora

    /** Usuario logueado desde cookies legacy (login.php las setea). */
    private function usuarioActual()
    {
        return [
            'id'     => $_COOKIE['NoEmpleado'] ?? null,
            'nombre' => isset($_COOKIE['nombre']) ? rawurldecode($_COOKIE['nombre']) : null,
        ];
    }

    /** Abre la cabecera de bitácora (durable, autocommit). Fija $this->idBitacora. */
    private function iniciarBitacora($srv, $accion = 'sync')
    {
        $u = $this->usuarioActual();
        $this->pdoEstado->prepare(
            "INSERT INTO SyncBitacora (servidor, servidor_nombre, accion, usuario_id, usuario, estado, inicio)
             VALUES (?,?,?,?,?, 'corriendo', NOW())"
        )->execute([$srv['id_servidor'], $srv['nombre'], $accion, $u['id'], $u['nombre']]);
        $this->idBitacora = (int) $this->pdoEstado->lastInsertId();
    }

    /** Cierra la cabecera con estado, conteos y duración. */
    private function finalizarBitacora($estado, $r, $mensaje = null)
    {
        if (!$this->idBitacora) return;
        $this->pdoEstado->prepare(
            "UPDATE SyncBitacora SET
                estado = ?, fin = NOW(), duracion_seg = TIMESTAMPDIFF(SECOND, inicio, NOW()),
                suc_ins = ?, suc_upd = ?, area_ins = ?, area_upd = ?,
                pue_ins = ?, pue_upd = ?, emp_ins = ?, emp_upd = ?,
                jer_ins = ?, jer_upd = ?, omitidos = ?, mensaje = ?
             WHERE idBitacora = ?"
        )->execute([
            $estado,
            $r['sucursales']['ins'], $r['sucursales']['upd'],
            $r['areas']['ins'], $r['areas']['upd'],
            $r['puestos']['ins'], $r['puestos']['upd'],
            $r['empleados']['ins'], $r['empleados']['upd'],
            $r['jerarquia']['ins'], $r['jerarquia']['upd'],
            $r['omitidos'], $mensaje !== null ? mb_substr($mensaje, 0, 255) : null,
            $this->idBitacora,
        ]);
    }

    /** Registra un renglón de detalle (transaccional: rollback junto con los datos). */
    private function logDetalle($entidad, $accion, $idOrigen, $idLocal, $desc)
    {
        if (!$this->idBitacora) return;
        $this->pdo->prepare(
            "INSERT INTO SyncBitacoraDetalle (idBitacora, entidad, accion, id_origen, id_local, descripcion)
             VALUES (?,?,?,?,?,?)"
        )->execute([$this->idBitacora, $entidad, $accion, $idOrigen, $idLocal, mb_substr((string) $desc, 0, 200)]);
    }

    public function getBitacora($limit = 50, $servidor = null)
    {
        $limit = max(1, min(500, (int) $limit));
        if ($servidor) {
            $st = $this->pdoEstado->prepare(
                "SELECT * FROM SyncBitacora WHERE servidor = ? ORDER BY idBitacora DESC LIMIT $limit"
            );
            $st->execute([$servidor]);
        } else {
            $st = $this->pdoEstado->query(
                "SELECT * FROM SyncBitacora ORDER BY idBitacora DESC LIMIT $limit"
            );
        }
        return $st->fetchAll();
    }

    public function getBitacoraDetalle($idBitacora, $entidad = null, $accion = null)
    {
        $sql = "SELECT entidad, accion, id_origen, id_local, descripcion
                FROM SyncBitacoraDetalle WHERE idBitacora = ?";
        $params = [(int) $idBitacora];
        if ($entidad) { $sql .= " AND entidad = ?"; $params[] = $entidad; }
        if ($accion)  { $sql .= " AND accion = ?";  $params[] = $accion; }
        $sql .= " ORDER BY idDetalle ASC LIMIT 5000";
        $st = $this->pdoEstado->prepare($sql);
        $st->execute($params);
        return $st->fetchAll();
    }

    // ---------------------------------------------------------------- API HTTP

    /** POST a la API PIP. $body=null => cuerpo vacío (Content-Length: 0). */
    private function apiPost($baseUrl, $path, $body = null, $timeout = 60)
    {
        $ch = curl_init();
        $payload = $body === null ? '' : json_encode($body);
        curl_setopt_array($ch, [
            CURLOPT_URL            => $baseUrl . $path,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => $payload,
            CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_CONNECTTIMEOUT => 8,
            CURLOPT_TIMEOUT        => $timeout,
        ]);
        $resp = curl_exec($ch);
        if ($resp === false) {
            throw new Exception("Error de conexión: " . curl_error($ch));
        }
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        // La API devuelve 400 + texto "no contiene registros" cuando no hay datos
        // (p.ej. un área sin tipos de puesto). Se trata como lista vacía.
        if (stripos($resp, 'no contiene registros') !== false) {
            return [];
        }
        if ($code < 200 || $code >= 300) {
            throw new Exception("HTTP $code en $path: " . substr($resp, 0, 200));
        }
        $data = json_decode($resp, true);
        return is_array($data) ? $data : [];
    }

    // ----------------------------------------------------------- Remapeo IDs

    /** @return array|null ['id_local'=>int,'area_origen'=>int|null] */
    private function mapGet($servidor, $entidad, $idOrigen)
    {
        $st = $this->pdo->prepare(
            "SELECT id_local, area_origen FROM SyncMapeoOrigen
             WHERE servidor = ? AND entidad = ? AND id_origen = ?"
        );
        $st->execute([$servidor, $entidad, $idOrigen]);
        $row = $st->fetch();
        return $row ?: null;
    }

    private function mapSet($servidor, $entidad, $idOrigen, $idLocal, $areaOrigen, $fechaMod)
    {
        $now = date('Y-m-d H:i:s');
        $st = $this->pdo->prepare(
            "INSERT INTO SyncMapeoOrigen
                (servidor, entidad, id_origen, id_local, area_origen, fecha_mod_origen, registro, actualizado)
             VALUES (?,?,?,?,?,?,?,?)
             ON DUPLICATE KEY UPDATE
                id_local = VALUES(id_local),
                area_origen = VALUES(area_origen),
                fecha_mod_origen = VALUES(fecha_mod_origen),
                actualizado = VALUES(actualizado)"
        );
        $st->execute([$servidor, $entidad, $idOrigen, $idLocal, $areaOrigen, $fechaMod, $now, $now]);
    }

    /** Siguiente PK local libre (las tablas asignan PK por aplicación). */
    /**
     * $table/$pk son constantes internas, no input de usuario.
     * Excluye PKs >= 900000: hay registros sentinela/basura preexistentes
     * (p.ej. Empleados.NoEmpleado=999999999 "RESO") que de tomarse como base
     * dispararían los nuevos IDs a mil millones.
     */
    private function nextLocalId($table, $pk)
    {
        $st = $this->pdo->query("SELECT COALESCE(MAX($pk), 0) + 1 AS n FROM $table WHERE $pk < 900000");
        return (int) $st->fetch()['n'];
    }

    // ------------------------------------------------------------ Reglas RH

    /** Deriva el nivel a partir de la descripción del tipo de puesto (API trae nivel=0). */
    private function nivelFromTipo($desc)
    {
        $d = mb_strtoupper((string) $desc, 'UTF-8');
        if (strpos($d, 'SUBGERENTE') !== false) return 3;
        if (strpos($d, 'GERENTE') !== false)    return 2;
        foreach (['ENCARGAD', 'JEFE', 'SUPERVISOR'] as $p) {
            if (strpos($d, $p) !== false) return 4;
        }
        foreach (['VITRINERO', 'CARNICER', 'SALCHICHON', 'TABLAJERO'] as $p) {
            if (strpos($d, $p) !== false) return 7;
        }
        return 8; // Operativo (cajero, frutero, pasillero, almacenista, default)
    }

    /** Copia la plantilla de menús del nivel a MenusPermisos para un puesto nuevo. */
    private function seedMenusPuesto($idPuesto, $nivel)
    {
        $st = $this->pdo->prepare(
            "INSERT INTO MenusPermisos (id_menu, IdPuesto)
             SELECT id_menu, ? FROM PlantillaMenusNivel WHERE IdNivel = ?"
        );
        $st->execute([$idPuesto, $nivel]);
    }

    private static function fecha($v, $fallback = null)
    {
        if (empty($v)) return $fallback;
        return substr($v, 0, 10); // "1976-01-15T00:00:00" -> "1976-01-15"
    }

    // ------------------------------------------------------- Sincronización

    /**
     * Corre el flujo completo para un servidor. Devuelve resumen de conteos.
     * $onStep(callable|null): se invoca con ['pct'=>int,'msg'=>string] en cada paso
     * para reportar avance (streaming). Puede lanzar excepción para cancelar.
     */
    public function sincronizarServidor($idServidor, $onStep = null)
    {
        $srv = $this->getServidor($idServidor);
        if (!$srv) {
            return ['Resultado' => false, 'Msg' => "Servidor '$idServidor' no encontrado o inactivo"];
        }
        $S   = $srv['id_servidor'];
        $url = rtrim($srv['base_url'], '/');

        // Guarda de concurrencia: una sola sincronización por servidor.
        $est = $this->getEstadoSync($S);
        if (($est['estado'] ?? '') === 'corriendo') {
            return ['Resultado' => false, 'Msg' => 'Ya hay una sincronización en curso para este servidor'];
        }

        // emit: persiste avance (conexión autocommit), revisa cancelación y reporta al stream.
        $emit = function ($evt) use ($S, $onStep) {
            if (isset($evt['pct'])) {
                $this->actualizarEstado($S, $evt['pct'], $evt['msg'] ?? '');
            }
            if ($this->hayCancelacion($S)) {
                throw new Exception('Sincronización cancelada');
            }
            if (is_callable($onStep)) $onStep($evt);
        };

        $r = [
            'sucursales' => ['ins' => 0, 'upd' => 0],
            'areas'      => ['ins' => 0, 'upd' => 0],
            'puestos'    => ['ins' => 0, 'upd' => 0],
            'empleados'  => ['ins' => 0, 'upd' => 0],
            'jerarquia'  => ['ins' => 0, 'upd' => 0],
            'omitidos'   => 0,
        ];

        $this->iniciarEstado($S);
        $this->iniciarBitacora($srv);
        $this->pdo->beginTransaction();
        try {
            // 0. Comprobar conexión (timeout corto: falla rápido si el servidor no responde).
            $emit(['pct' => 3, 'msg' => 'Comprobando conexión…']);
            $sucursales = $this->apiPost($url, '/PIPServerLocal/lugoGEN_Get_SUCURSALES_EN_SERVIDOR', null, 15);

            // 1-3. Sucursales -> Áreas -> Tipos de puesto
            $ns = count($sucursales);
            $emit(['pct' => 8, 'msg' => "Sincronizando estructura ($ns sucursal(es))…"]);
            $i = 0;
            foreach ($sucursales as $suc) {
                $idSucOrigen = (int) $suc['iD_SUCURSAL_CLOUD'];

                // Áreas de la sucursal (las divisiones locales) — antes de la sucursal
                // para poder fijar SucursalDepto.IdDivision (NOT NULL).
                $areas = $this->apiPost(
                    $url,
                    '/PIPServerLocal/lugoRH_Get_AREAS_DE_TRABAJO_DE_SUCURSAL',
                    $idSucOrigen
                );
                $primeraDivLocal = 0;
                foreach ($areas as $ar) {
                    $idAreaOrigen = (int) $ar['iD_AREA_DE_TRABAJO'];
                    $idDivLocal = $this->upsertDivision($S, $idAreaOrigen, $ar['areA_DE_TRABAJO'], $r);
                    if ($primeraDivLocal === 0) $primeraDivLocal = $idDivLocal;

                    // Tipos de puesto del área -> Puestos locales
                    $tipos = $this->apiPost(
                        $url,
                        '/PIPServerLocal/lugoRH_Get_TIPOS_DE_PUESTO_DE_AREA_DE_TRABAJO',
                        $idAreaOrigen
                    );
                    foreach ($tipos as $tp) {
                        $this->upsertPuesto($S, (int) $tp['iD_TIPO_PUESTO'], $tp['descripcioN_TIPO_PUESTO'],
                            $idDivLocal, $idAreaOrigen, $r);
                    }
                }

                $this->upsertSucursal($S, $idSucOrigen, $suc['sucursal'], $primeraDivLocal, $r);
                $i++;
                $emit(['pct' => 8 + (int) (32 * $i / max($ns, 1)),
                       'msg' => "Sucursal «{$suc['sucursal']}» procesada ($i/$ns)"]);
            }

            // 4. Empleados
            $emit(['pct' => 42, 'msg' => 'Descargando empleados…']);
            $empleados = $this->apiPost($url, '/PIPServerLocal/lugoRH_Get_EMPLEADOS_ALL');
            $ne = count($empleados);
            $j = 0;
            foreach ($empleados as $e) {
                $this->upsertEmpleado($S, $e, $r);
                $j++;
                if ($j % 10 === 0 || $j === $ne) {
                    $emit(['pct' => 42 + (int) (44 * $j / max($ne, 1)),
                           'msg' => "Sincronizando empleados ($j/$ne)…"]);
                }
            }

            // 5. Jerarquía (opcional): jefe inmediato != -1
            $emit(['pct' => 88, 'msg' => 'Resolviendo jerarquía…']);
            foreach ($empleados as $e) {
                $jefe = (int) ($e['iD_EMPLEADO_JEFE_INMEDIATO'] ?? -1);
                if ($jefe === -1) continue;
                $this->upsertJerarquia($S, $jefe, (int) $e['iD_EMPLEADO'], $r);
            }

            $emit(['pct' => 96, 'msg' => 'Guardando cambios…']);
            $this->pdo->prepare("UPDATE SyncServidores SET ultima_sync = NOW() WHERE id_servidor = ?")
                ->execute([$S]);

            $this->pdo->commit();
        } catch (Exception $ex) {
            $this->pdo->rollBack();
            $estado = $this->hayCancelacion($S) ? 'cancelado' : 'error';
            $this->finalizarEstado($S, $estado, $ex->getMessage());
            $this->finalizarBitacora($estado, $r, $ex->getMessage());
            return ['Resultado' => false, 'Estado' => $estado, 'Msg' => $ex->getMessage()];
        }

        $this->finalizarEstado($S, 'ok', 'Completado', $r);
        $this->finalizarBitacora('ok', $r);
        if (is_callable($onStep)) $onStep(['pct' => 100, 'msg' => 'Completado']);
        return ['Resultado' => true, 'Servidor' => $srv['nombre'], 'Resumen' => $r];
    }

    private function upsertDivision($S, $idOrigen, $nombre, &$r)
    {
        $m = $this->mapGet($S, 'AREA', $idOrigen);
        if ($m) {
            $this->pdo->prepare("UPDATE Divisiones SET Division = ? WHERE IdDivision = ?")
                ->execute([$nombre, $m['id_local']]);
            $r['areas']['upd']++;
            $this->logDetalle('AREA', 'update', $idOrigen, (int) $m['id_local'], $nombre);
            return (int) $m['id_local'];
        }
        $id = $this->nextLocalId('Divisiones', 'IdDivision');
        $this->pdo->prepare("INSERT INTO Divisiones (IdDivision, Division) VALUES (?, ?)")
            ->execute([$id, $nombre]);
        $this->mapSet($S, 'AREA', $idOrigen, $id, null, null);
        $r['areas']['ins']++;
        $this->logDetalle('AREA', 'insert', $idOrigen, $id, $nombre);
        return $id;
    }

    private function upsertSucursal($S, $idOrigen, $nombre, $idDivision, &$r)
    {
        $m = $this->mapGet($S, 'SUCURSAL', $idOrigen);
        if ($m) {
            $this->pdo->prepare("UPDATE SucursalDepto SET Sucursal = ?, IdDivision = ? WHERE IdSucursal = ?")
                ->execute([$nombre, $idDivision, $m['id_local']]);
            $r['sucursales']['upd']++;
            $this->logDetalle('SUCURSAL', 'update', $idOrigen, (int) $m['id_local'], $nombre);
            return (int) $m['id_local'];
        }
        $id = $this->nextLocalId('SucursalDepto', 'IdSucursal');
        $this->pdo->prepare("INSERT INTO SucursalDepto (IdSucursal, Sucursal, IdDivision) VALUES (?,?,?)")
            ->execute([$id, $nombre, $idDivision]);
        $this->mapSet($S, 'SUCURSAL', $idOrigen, $id, null, null);
        $r['sucursales']['ins']++;
        $this->logDetalle('SUCURSAL', 'insert', $idOrigen, $id, $nombre);
        return $id;
    }

    private function upsertPuesto($S, $idOrigen, $nombre, $idDivision, $areaOrigen, &$r)
    {
        $nivel = $this->nivelFromTipo($nombre);
        $m = $this->mapGet($S, 'TIPO_PUESTO', $idOrigen);
        if ($m) {
            // No se pisa Nivel ni MenusPermisos: pueden haberse editado a mano.
            $this->pdo->prepare("UPDATE Puestos SET Puesto = ?, IdDivision = ? WHERE IdPuesto = ?")
                ->execute([$nombre, $idDivision, $m['id_local']]);
            $this->mapSet($S, 'TIPO_PUESTO', $idOrigen, $m['id_local'], $areaOrigen, null);
            $r['puestos']['upd']++;
            $this->logDetalle('PUESTO', 'update', $idOrigen, (int) $m['id_local'], "$nombre (nivel $nivel)");
            return (int) $m['id_local'];
        }
        $id = $this->nextLocalId('Puestos', 'IdPuesto');
        $this->pdo->prepare("INSERT INTO Puestos (IdPuesto, Puesto, IdDivision, Nivel) VALUES (?,?,?,?)")
            ->execute([$id, $nombre, $idDivision, $nivel]);
        $this->mapSet($S, 'TIPO_PUESTO', $idOrigen, $id, $areaOrigen, null);
        $this->seedMenusPuesto($id, $nivel);
        $r['puestos']['ins']++;
        $this->logDetalle('PUESTO', 'insert', $idOrigen, $id, "$nombre (nivel $nivel)");
        return $id;
    }

    private function upsertEmpleado($S, $e, &$r)
    {
        $idOrigen = (int) $e['iD_EMPLEADO'];

        // Resolver FKs vía mapeo.
        $tp = $this->mapGet($S, 'TIPO_PUESTO', (int) $e['iD_TIPO_PUESTO']);
        if (!$tp) { // tipo de puesto no catalogado -> omitir
            $r['omitidos']++;
            $this->logDetalle('EMPLEADO', 'omit', $idOrigen, null,
                ($e['nombrE_COMPLETO'] ?? '') . ' — tipo de puesto no catalogado');
            return;
        }
        $idPuesto = (int) $tp['id_local'];

        $div = $this->mapGet($S, 'AREA', (int) $tp['area_origen']);
        $idDivision = $div ? (int) $div['id_local'] : 0;

        $suc = $this->mapGet($S, 'SUCURSAL', (int) $e['iD_SUCURSAL_CLOUD']);
        $idSucursal = $suc ? (int) $suc['id_local'] : 0;

        // Nivel desde el puesto (fuente única); API trae 0.
        $stN = $this->pdo->prepare("SELECT Nivel FROM Puestos WHERE IdPuesto = ?");
        $stN->execute([$idPuesto]);
        $nivel = (int) ($stN->fetch()['Nivel'] ?? 8);

        $nombre   = $e['nombrE_COMPLETO'];
        $fnac     = self::fecha($e['fechA_NACIMIENTO'] ?? null, '1900-01-01');
        $antig    = self::fecha($e['fechA_ALTA'] ?? null, date('Y-m-d'));
        $rfc      = $e['rfc'] ?? '';
        $curp     = $e['curp'] ?? '';
        $nss      = $e['numerO_SEGURO_SOCIAL'] ?? '';
        $status   = (int) ($e['estatus'] ?? 1);

        $m = $this->mapGet($S, 'EMPLEADO', $idOrigen);
        $fechaMod = self::fecha($e['fechA_MODIFICACION'] ?? null);

        if ($m) {
            // Preserva campos locales: Email, Movil, Password, Imagen, IdCentroCosto.
            $sql = "UPDATE Empleados SET Nombre=?, FNacimiento=?, Antiguedad=?, RFC=?, CURP=?,
                       NoSeguro=?, IdSucursal=?, IdDivision=?, IdPuesto=?, Nivel=?, Status=?
                    WHERE NoEmpleado=?";
            $this->pdo->prepare($sql)->execute(
                [$nombre, $fnac, $antig, $rfc, $curp, $nss, $idSucursal, $idDivision,
                 $idPuesto, $nivel, $status, $m['id_local']]
            );
            $this->mapSet($S, 'EMPLEADO', $idOrigen, $m['id_local'], null, $fechaMod);
            $r['empleados']['upd']++;
            $this->logDetalle('EMPLEADO', 'update', $idOrigen, (int) $m['id_local'],
                $nombre . ($status ? '' : ' (baja)'));
            return;
        }

        $id = $this->nextLocalId('Empleados', 'NoEmpleado');
        // Password default '12345' (bcrypt), misma convención que insertaEmpleadosExcel
        // (Backend/Empleados/Empleados.php) para altas masivas.
        $passDefault = password_hash('12345', PASSWORD_BCRYPT);
        // Columnas NOT NULL sin default deben llenarse todas.
        $sql = "INSERT INTO Empleados
                  (NoEmpleado, Nombre, FNacimiento, Antiguedad, RFC, CURP, NoSeguro,
                   Email, Movil, Nivel, IdCentroCosto, IdDivision, IdSucursal, IdPuesto,
                   Password, Status, tokenOS, Registro)
                VALUES (?,?,?,?,?,?,?,'','',?,0,?,?,?,?,?,'',NOW())";
        $this->pdo->prepare($sql)->execute(
            [$id, $nombre, $fnac, $antig, $rfc, $curp, $nss, $nivel,
             $idDivision, $idSucursal, $idPuesto, $passDefault, $status]
        );
        $this->mapSet($S, 'EMPLEADO', $idOrigen, $id, null, $fechaMod);
        $r['empleados']['ins']++;
        $this->logDetalle('EMPLEADO', 'insert', $idOrigen, $id, $nombre . ($status ? '' : ' (baja)'));
    }

    private function upsertJerarquia($S, $jefeOrigen, $hijoOrigen, &$r)
    {
        $padre = $this->mapGet($S, 'EMPLEADO', $jefeOrigen);
        $hijo  = $this->mapGet($S, 'EMPLEADO', $hijoOrigen);
        if (!$padre || !$hijo) return;
        $p = (int) $padre['id_local'];
        $h = (int) $hijo['id_local'];

        $st = $this->pdo->prepare(
            "SELECT idRelacionEmpleados FROM RelacionEmpleados WHERE EmpleadoHijo = ?"
        );
        $st->execute([$h]);
        $row = $st->fetch();
        if ($row) {
            $this->pdo->prepare("UPDATE RelacionEmpleados SET EmpleadoPadre = ? WHERE EmpleadoHijo = ?")
                ->execute([$p, $h]);
            $r['jerarquia']['upd']++;
            $this->logDetalle('JERARQUIA', 'update', $hijoOrigen, $h, "Jefe $p → empleado $h");
        } else {
            $this->pdo->prepare(
                "INSERT INTO RelacionEmpleados (EmpleadoPadre, EmpleadoHijo, Registro) VALUES (?,?,NOW())"
            )->execute([$p, $h]);
            $r['jerarquia']['ins']++;
            $this->logDetalle('JERARQUIA', 'insert', $hijoOrigen, $h, "Jefe $p → empleado $h");
        }
    }

    // ------------------------------------------------------- Vista previa

    /**
     * Dry-run: recorre la API y devuelve el detalle de lo que se migraría,
     * marcando cada registro como 'nuevo' o 'actualizar'. NO escribe nada.
     * $onStep(callable|null): reporta avance ['pct','msg'] para la barra de progreso.
     */
    public function previsualizarServidor($idServidor, $onStep = null)
    {
        $emit = is_callable($onStep) ? $onStep : function () {};
        $srv = $this->getServidor($idServidor);
        if (!$srv) {
            return ['Resultado' => false, 'Msg' => "Servidor '$idServidor' no encontrado o inactivo"];
        }
        $S   = $srv['id_servidor'];
        $url = rtrim($srv['base_url'], '/');

        // Bitácora también para la vista previa (registro proyectado, sin escribir datos).
        $this->iniciarBitacora($srv, 'preview');

        // Descripciones de nivel para mostrar.
        $niveles = [];
        foreach ($this->pdo->query("SELECT IdNivel, Descripcion FROM Niveles") as $n) {
            $niveles[(int) $n['IdNivel']] = $n['Descripcion'];
        }

        $det = ['sucursales' => [], 'areas' => [], 'puestos' => [], 'empleados' => []];
        $sucMap = [];   // idSucOrigen  => nombre
        $areaMap = [];  // idAreaOrigen => nombre
        $tipoMap = [];  // idTipoOrigen => ['desc','area','nivel']

        try {
            $emit(['pct' => 3, 'msg' => 'Comprobando conexión…']);
            $sucursales = $this->apiPost($url, '/PIPServerLocal/lugoGEN_Get_SUCURSALES_EN_SERVIDOR', null, 15);
            $ns = count($sucursales);
            $emit(['pct' => 8, 'msg' => "Leyendo estructura ($ns sucursal(es))…"]);
            $i = 0;
            foreach ($sucursales as $suc) {
                $idSuc = (int) $suc['iD_SUCURSAL_CLOUD'];
                $sucMap[$idSuc] = $suc['sucursal'];
                $det['sucursales'][] = [
                    'id_origen' => $idSuc,
                    'nombre'    => $suc['sucursal'],
                    'estado'    => $this->mapGet($S, 'SUCURSAL', $idSuc) ? 'actualizar' : 'nuevo',
                ];

                $areas = $this->apiPost($url, '/PIPServerLocal/lugoRH_Get_AREAS_DE_TRABAJO_DE_SUCURSAL', $idSuc);
                foreach ($areas as $ar) {
                    $idArea = (int) $ar['iD_AREA_DE_TRABAJO'];
                    if (!isset($areaMap[$idArea])) {
                        $areaMap[$idArea] = $ar['areA_DE_TRABAJO'];
                        $det['areas'][] = [
                            'id_origen' => $idArea,
                            'nombre'    => $ar['areA_DE_TRABAJO'],
                            'sucursal'  => $suc['sucursal'],
                            'estado'    => $this->mapGet($S, 'AREA', $idArea) ? 'actualizar' : 'nuevo',
                        ];
                    }

                    $tipos = $this->apiPost($url, '/PIPServerLocal/lugoRH_Get_TIPOS_DE_PUESTO_DE_AREA_DE_TRABAJO', $idArea);
                    foreach ($tipos as $tp) {
                        $idTipo = (int) $tp['iD_TIPO_PUESTO'];
                        if (isset($tipoMap[$idTipo])) continue;
                        $nivel = $this->nivelFromTipo($tp['descripcioN_TIPO_PUESTO']);
                        $tipoMap[$idTipo] = ['desc' => $tp['descripcioN_TIPO_PUESTO'], 'area' => $idArea, 'nivel' => $nivel];
                        $det['puestos'][] = [
                            'id_origen'   => $idTipo,
                            'descripcion' => $tp['descripcioN_TIPO_PUESTO'],
                            'area'        => $areaMap[$idArea],
                            'nivel'       => $nivel,
                            'nivel_desc'  => $niveles[$nivel] ?? '',
                            'estado'      => $this->mapGet($S, 'TIPO_PUESTO', $idTipo) ? 'actualizar' : 'nuevo',
                        ];
                    }
                }

                $i++;
                $emit(['pct' => 8 + (int) (32 * $i / max($ns, 1)),
                       'msg' => "Sucursal «{$suc['sucursal']}» analizada ($i/$ns)"]);
            }

            $emit(['pct' => 42, 'msg' => 'Descargando empleados…']);
            $empleados = $this->apiPost($url, '/PIPServerLocal/lugoRH_Get_EMPLEADOS_ALL');
            $ne = count($empleados);
            $k = 0;
            foreach ($empleados as $e) {
                $idEmp  = (int) $e['iD_EMPLEADO'];
                $idTipo = (int) $e['iD_TIPO_PUESTO'];
                $idSuc  = (int) $e['iD_SUCURSAL_CLOUD'];
                $tipo   = $tipoMap[$idTipo] ?? null;

                if (!$tipo) {
                    $estado = 'omitir';
                    $nivel  = null;
                } else {
                    $estado = $this->mapGet($S, 'EMPLEADO', $idEmp) ? 'actualizar' : 'nuevo';
                    $nivel  = $tipo['nivel'];
                }

                $det['empleados'][] = [
                    'id_origen' => $idEmp,
                    'nombre'    => $e['nombrE_COMPLETO'],
                    'puesto'    => $tipo ? $tipo['desc'] : '(sin catálogo)',
                    'sucursal'  => $sucMap[$idSuc] ?? '—',
                    'area'      => $tipo ? ($areaMap[$tipo['area']] ?? '—') : '—',
                    'nivel'     => $nivel,
                    'nivel_desc' => $nivel !== null ? ($niveles[$nivel] ?? '') : '',
                    'status'    => (int) ($e['estatus'] ?? 1),
                    'estado'    => $estado,
                ];

                $k++;
                if ($k % 10 === 0 || $k === $ne) {
                    $emit(['pct' => 42 + (int) (54 * $k / max($ne, 1)),
                           'msg' => "Analizando empleados ($k/$ne)…"]);
                }
            }
            $emit(['pct' => 98, 'msg' => 'Generando vista previa…']);

            // Volcado a bitácora: cada registro proyectado (acción que se aplicaría).
            $acc = ['nuevo' => 'insert', 'actualizar' => 'update', 'omitir' => 'omit'];
            foreach (['sucursales' => 'SUCURSAL', 'areas' => 'AREA', 'puestos' => 'PUESTO', 'empleados' => 'EMPLEADO'] as $key => $ent) {
                foreach ($det[$key] as $row) {
                    $desc = $row['nombre'] ?? $row['descripcion'] ?? '';
                    if ($ent === 'EMPLEADO') $desc = $row['nombre'] . ' — ' . $row['puesto'];
                    if ($ent === 'PUESTO')   $desc = $row['descripcion'] . ' (nivel ' . $row['nivel'] . ')';
                    $this->logDetalle($ent, $acc[$row['estado']] ?? 'omit', $row['id_origen'], null, $desc);
                }
            }
        } catch (Exception $ex) {
            $this->finalizarBitacora('error', $this->resumenVacio(), $ex->getMessage());
            return ['Resultado' => false, 'Msg' => $ex->getMessage()];
        }

        $contar = function ($rows) {
            $c = ['nuevos' => 0, 'actualizar' => 0, 'omitir' => 0];
            foreach ($rows as $r) $c[$r['estado'] === 'nuevo' ? 'nuevos' : ($r['estado'] === 'actualizar' ? 'actualizar' : 'omitir')]++;
            return $c;
        };
        $resumen = [
            'sucursales' => $contar($det['sucursales']),
            'areas'      => $contar($det['areas']),
            'puestos'    => $contar($det['puestos']),
            'empleados'  => $contar($det['empleados']),
        ];

        // Cierra bitácora de preview (nuevos => ins, actualizar => upd).
        $rBit = $this->resumenVacio();
        foreach (['sucursales', 'areas', 'puestos', 'empleados'] as $k2) {
            $rBit[$k2] = ['ins' => $resumen[$k2]['nuevos'], 'upd' => $resumen[$k2]['actualizar']];
        }
        $rBit['omitidos'] = $resumen['empleados']['omitir'];
        $this->finalizarBitacora('ok', $rBit);

        return [
            'Resultado' => true,
            'Servidor'  => $srv['nombre'],
            'Resumen'   => $resumen,
            'Detalle'   => $det,
        ];
    }

    private function resumenVacio()
    {
        return [
            'sucursales' => ['ins' => 0, 'upd' => 0],
            'areas'      => ['ins' => 0, 'upd' => 0],
            'puestos'    => ['ins' => 0, 'upd' => 0],
            'empleados'  => ['ins' => 0, 'upd' => 0],
            'jerarquia'  => ['ins' => 0, 'upd' => 0],
            'omitidos'   => 0,
        ];
    }

    // ------------------------------------------------------------- Consultas

    public function getServidores()
    {
        return $this->pdo->query(
            "SELECT id_servidor, nombre, base_url, activo, ultima_sync
             FROM SyncServidores ORDER BY nombre"
        )->fetchAll();
    }

    private function getServidor($idServidor)
    {
        $st = $this->pdo->prepare(
            "SELECT * FROM SyncServidores WHERE id_servidor = ? AND activo = 1"
        );
        $st->execute([$idServidor]);
        return $st->fetch();
    }

    /** Ping ligero: cuenta sucursales del servidor (timeout corto). */
    public function probarConexion($idServidor)
    {
        $srv = $this->getServidor($idServidor);
        if (!$srv) return ['Resultado' => false, 'Msg' => 'Servidor no encontrado'];
        try {
            $suc = $this->apiPost(rtrim($srv['base_url'], '/'),
                '/PIPServerLocal/lugoGEN_Get_SUCURSALES_EN_SERVIDOR', null, 15);
            return ['Resultado' => true, 'Sucursales' => count($suc)];
        } catch (Exception $ex) {
            return ['Resultado' => false, 'Msg' => $ex->getMessage()];
        }
    }

    // ----------------------------------------------------------- CRUD servidores

    public function crearServidor($id, $nombre, $baseUrl, $activo)
    {
        $v = $this->validarServidor($id, $nombre, $baseUrl);
        if ($v) return ['Resultado' => false, 'Msg' => $v];

        $exists = $this->pdo->prepare("SELECT 1 FROM SyncServidores WHERE id_servidor = ?");
        $exists->execute([$id]);
        if ($exists->fetch()) return ['Resultado' => false, 'Msg' => "Ya existe un servidor con id «{$id}»"];

        $this->pdo->prepare(
            "INSERT INTO SyncServidores (id_servidor, nombre, base_url, activo) VALUES (?,?,?,?)"
        )->execute([trim($id), trim($nombre), rtrim(trim($baseUrl), '/'), $activo ? 1 : 0]);
        return ['Resultado' => true, 'Msg' => 'Servidor creado'];
    }

    /** Actualiza nombre/url/activo. id_servidor es inmutable (discrimina el remapeo). */
    public function actualizarServidor($id, $nombre, $baseUrl, $activo)
    {
        $v = $this->validarServidor($id, $nombre, $baseUrl);
        if ($v) return ['Resultado' => false, 'Msg' => $v];

        $st = $this->pdo->prepare(
            "UPDATE SyncServidores SET nombre = ?, base_url = ?, activo = ? WHERE id_servidor = ?"
        );
        $st->execute([trim($nombre), rtrim(trim($baseUrl), '/'), $activo ? 1 : 0, trim($id)]);
        if ($st->rowCount() === 0) {
            // rowCount 0 también si no cambió nada; confirmar existencia.
            $chk = $this->pdo->prepare("SELECT 1 FROM SyncServidores WHERE id_servidor = ?");
            $chk->execute([$id]);
            if (!$chk->fetch()) return ['Resultado' => false, 'Msg' => "Servidor «{$id}» no encontrado"];
        }
        return ['Resultado' => true, 'Msg' => 'Servidor actualizado'];
    }

    public function eliminarServidor($id)
    {
        // Cuenta datos ya migrados de este servidor (no se borran; solo se avisa).
        $st = $this->pdo->prepare("SELECT COUNT(*) AS n FROM SyncMapeoOrigen WHERE servidor = ?");
        $st->execute([$id]);
        $mapeos = (int) $st->fetch()['n'];

        $this->pdo->prepare("DELETE FROM SyncServidores WHERE id_servidor = ?")->execute([$id]);
        $msg = $mapeos > 0
            ? "Servidor eliminado. Los $mapeos registros ya migrados permanecen en la base."
            : 'Servidor eliminado';
        return ['Resultado' => true, 'Msg' => $msg];
    }

    private function validarServidor($id, $nombre, $baseUrl)
    {
        if (trim($id) === '')      return 'El id de servidor es obligatorio';
        if (trim($nombre) === '')  return 'El nombre es obligatorio';
        $url = trim($baseUrl);
        if (!preg_match('#^https?://#i', $url)) return 'La URL debe iniciar con http:// o https://';
        return null;
    }
}
