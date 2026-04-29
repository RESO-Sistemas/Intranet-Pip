<?php
/**
 * Clase de conexión a base de datos para el módulo Ibero.
 * Utiliza la misma BD que el sistema PIP (klynet_datosdemo).
 */
class Conexiones {
    private $dbh;

    function __construct()
    {
        $dsn = "mysql:host=162.240.213.3;dbname=klynet_datosdemo;charset=utf8mb4";
        $options = [
            PDO::ATTR_PERSISTENT         => true,
            PDO::ATTR_EMULATE_PREPARES   => true,
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ];
        $this->dbh = new PDO($dsn, 'klynet_usrdatosdemo', 'Us3rK1yns2@25', $options);
    }

    /** Sanitizar valor para evitar inyección */
    protected function sanitize($value) {
        return htmlspecialchars(strip_tags(trim($value ?? '')), ENT_QUOTES, 'UTF-8');
    }

    /** Normalizar teléfono a solo dígitos */
    protected function normalizarTelefono($telefono) {
        return preg_replace('/[^0-9]/', '', $telefono ?? '');
    }

    /** Validar formato de teléfono (10 dígitos) */
    protected function validarFormatoTelefono($telefono) {
        return preg_match('/^\d{10}$/', $telefono);
    }

    /** Ejecutar query y retornar arreglo */
    function Select($q) {
        try {
            $sth = $this->dbh->prepare($q);
            $sth->execute();
            $sth->setFetchMode(PDO::FETCH_ASSOC);
            return $sth->fetchAll();
        } catch (PDOException $e) {
            error_log('PDOException Select - ' . $e->getMessage());
            return [];
        }
    }

    /** Igual que Select pero sin cerrar cursor */
    function SelectNotClose($q) {
        return $this->Select($q);
    }

    /** Ejecutar query con parámetros y retornar arreglo */
    function SelectWithParams($q, $params = []) {
        try {
            $sth = $this->dbh->prepare($q);
            $sth->execute($params);
            return $sth->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log('PDOException SelectWithParams - ' . $e->getMessage());
            return [];
        }
    }

    /** Ejecutar stored procedure sin parámetros */
    function Procedure($q) {
        try {
            $res = $this->dbh->prepare($q);
            $res->execute();
            $array = [];
            while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
                $array[] = $row;
            }
            return $array;
        } catch (\Exception $e) {
            error_log("ERROR en Procedure: " . $e->getMessage());
            throw $e;
        }
    }

    /** Ejecutar query de modificación (INSERT/UPDATE/DELETE) */
    function ProcedureExec($q, $parametros = []) {
        try {
            $stmt = $this->dbh->prepare($q);
            $stmt->execute($parametros);
            return true;
        } catch (\Exception $e) {
            error_log('PDOException ProcedureExec - ' . $e->getMessage());
            return false;
        }
    }

    /** Insertar y retornar el ID generado */
    function InsertAndGetId($q, $parametros = []) {
        try {
            $sth = $this->dbh->prepare($q);
            $sth->execute($parametros);
            return $this->dbh->lastInsertId();
        } catch (PDOException $e) {
            error_log('PDOException InsertAndGetId - ' . $e->getMessage());
            return false;
        }
    }

    /** Ejecutar transacción con array de queries */
    function Transact($queryArray) {
        try {
            $this->dbh->beginTransaction();
            foreach ($queryArray as $q) {
                $sth = $this->dbh->prepare($q);
                $sth->execute();
            }
            $this->dbh->commit();
        } catch (\Exception $e) {
            $this->dbh->rollBack();
            error_log('PDOException Transact - ' . $e->getMessage());
            throw $e;
        }
    }

    /** Insertar datos con LOB (blob binario) */
    function InsertWithLob($q, $params, $lobIndex) {
        try {
            $stmt = $this->dbh->prepare($q);
            foreach ($params as $i => $val) {
                if ($i === $lobIndex) {
                    $stmt->bindParam($i + 1, $params[$i], PDO::PARAM_LOB);
                } else {
                    $stmt->bindValue($i + 1, $val);
                }
            }
            $stmt->execute();
            return $this->dbh->lastInsertId();
        } catch (PDOException $e) {
            error_log('PDOException LOB - ' . $e->getMessage());
            return false;
        }
    }

    /** Obtener datos binarios (LOB) */
    function SelectWithLob($q, $params = []) {
        try {
            $stmt = $this->dbh->prepare($q);
            $stmt->execute($params);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log('PDOException LOB Select - ' . $e->getMessage());
            return null;
        }
    }

    function ConnClose() {
        $this->dbh = null;
    }
}
?>
