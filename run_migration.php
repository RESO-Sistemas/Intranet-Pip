<?php
/**
 * SCRIPT DE MIGRACIÓN — Incidencias
 * -------------------------------------------------------
 * Uso: Abre este archivo en el navegador una sola vez.
 * ¡BORRA ESTE ARCHIVO DEL SERVIDOR DESPUÉS DE EJECUTARLO!
 * -------------------------------------------------------
 */

// ── Protección básica: token requerido en la URL ──────────────────────────────
define('TOKEN', 'pip_migrate_ok');
if (($_GET['token'] ?? '') !== TOKEN) {
    http_response_code(403);
    die('<h3 style="color:red">403 Acceso denegado. Agrega ?token=pip_migrate_ok a la URL.</h3>');
}

require_once "Backend/Conexiones/Conexiones.php";
$conn = new Conexiones();

// Ejecutar SQL a través del PDO expuesto por la clase (reflexión)
$ref = new ReflectionClass($conn);
$prop = $ref->getProperty('dbh');
$prop->setAccessible(true);
$pdo = $prop->getValue($conn);
$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);

// ──────────────────────────────────────────────────────────────────────────────
// SENTENCIAS SQL
// Nota: PDO no usa DELIMITER; los SPs se definen sin él.
// ──────────────────────────────────────────────────────────────────────────────
$statements = [

  // 1. Agregar AbreIncidencia si no existe
  "SET @col1 = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Checklists' AND COLUMN_NAME = 'AbreIncidencia')",
  "SET @sql1 = IF(@col1 = 0,
      'ALTER TABLE Checklists ADD COLUMN AbreIncidencia TINYINT(1) NOT NULL DEFAULT 0',
      'SELECT 1')",
  "PREPARE stmt1 FROM @sql1",
  "EXECUTE stmt1",
  "DEALLOCATE PREPARE stmt1",

  // 4. Agregar IdTipoIncidencia si no existe
  "SET @col2 = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Checklists' AND COLUMN_NAME = 'IdTipoIncidencia')",
  "SET @sql2 = IF(@col2 = 0,
      'ALTER TABLE Checklists ADD COLUMN IdTipoIncidencia INT NULL',
      'SELECT 1')",
  "PREPARE stmt2 FROM @sql2",
  "EXECUTE stmt2",
  "DEALLOCATE PREPARE stmt2",

  // 5. FK Checklists → Tipos_Incidencias si no existe
  "SET @fk1 = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Checklists' AND CONSTRAINT_NAME = 'fk_chk_tipo_inc')",
  "SET @sql3 = IF(@fk1 = 0,
      'ALTER TABLE Checklists ADD CONSTRAINT fk_chk_tipo_inc FOREIGN KEY (IdTipoIncidencia) REFERENCES Tipos_Incidencias(IdTipoIncidencia)',
      'SELECT 1')",
  "PREPARE stmt3 FROM @sql3",
  "EXECUTE stmt3",
  "DEALLOCATE PREPARE stmt3",

  // 4. Tabla Incidencias
  "CREATE TABLE IF NOT EXISTS Incidencias (
      IdIncidencia      INT AUTO_INCREMENT PRIMARY KEY,
      IdChecklist       INT          NOT NULL,
      IdTipoIncidencia  INT          NULL,
      NoEmpleado        VARCHAR(20)  NOT NULL,
      Descripcion       TEXT         NOT NULL,
      Evidencia         VARCHAR(500) NULL,
      FechaRegistro     DATETIME     DEFAULT NOW(),
      Estado            ENUM('Abierta','En proceso','Resuelta') DEFAULT 'Abierta',
      CONSTRAINT fk_inc_checklist FOREIGN KEY (IdChecklist)     REFERENCES Checklists(IdChecklist),
      CONSTRAINT fk_inc_tipo      FOREIGN KEY (IdTipoIncidencia) REFERENCES Tipos_Incidencias(IdTipoIncidencia)
  )",

  // 5. SP: spInsertIncidencia
  "DROP PROCEDURE IF EXISTS spInsertIncidencia",

  "CREATE PROCEDURE spInsertIncidencia(
      IN p_IdChecklist      INT,
      IN p_IdTipoIncidencia INT,
      IN p_NoEmpleado       VARCHAR(20),
      IN p_Descripcion      TEXT,
      IN p_Evidencia        VARCHAR(500)
  )
  BEGIN
      INSERT INTO Incidencias (IdChecklist, IdTipoIncidencia, NoEmpleado, Descripcion, Evidencia)
      VALUES (p_IdChecklist, p_IdTipoIncidencia, p_NoEmpleado, p_Descripcion, p_Evidencia);
      SELECT LAST_INSERT_ID() AS IdIncidencia;
  END",

  // 6. SP: spGetIncidencias
  "DROP PROCEDURE IF EXISTS spGetIncidencias",

  "CREATE PROCEDURE spGetIncidencias()
  BEGIN
      SELECT
          i.IdIncidencia,
          i.NoEmpleado,
          CONCAT(e.Nombre, ' ', e.ApellidoP, ' ', IFNULL(e.ApellidoM,'')) AS NombreEmpleado,
          c.Nombre  AS NombreChecklist,
          ti.Nombre AS NombreTipoIncidencia,
          ti.NivelSeveridad,
          i.Descripcion,
          i.Evidencia,
          i.FechaRegistro,
          i.Estado
      FROM Incidencias i
      LEFT JOIN Empleados          e  ON e.NoEmpleado         = i.NoEmpleado
      LEFT JOIN Checklists         c  ON c.IdChecklist         = i.IdChecklist
      LEFT JOIN Tipos_Incidencias  ti ON ti.IdTipoIncidencia   = i.IdTipoIncidencia
      ORDER BY i.FechaRegistro DESC;
  END",

  // 7. SP: spGetChecklistsByPuesto (actualizado con AbreIncidencia + IdTipoIncidencia)
  "DROP PROCEDURE IF EXISTS spGetChecklistsByPuesto",

  "CREATE PROCEDURE spGetChecklistsByPuesto(
      IN p_IdPuesto   INT,
      IN p_NoEmpleado VARCHAR(20)
  )
  BEGIN
      SELECT
          c.IdChecklist,
          c.Nombre,
          c.Tipo,
          c.RespuestaEsperada,
          c.AbreIncidencia,
          c.IdTipoIncidencia,
          IFNULL(ce.Respuesta, -1) AS RespuestaEmpleado,
          CASE WHEN ce.IdChecklistEmpleado IS NOT NULL THEN 1 ELSE 0 END AS YaContestado,
          kc.IdKpi
      FROM Checklists c
      LEFT JOIN ChecklistEmpleado ce
          ON ce.IdChecklist = c.IdChecklist
         AND ce.NoEmpleado  = p_NoEmpleado
         AND DATE(ce.FechaRespuesta) = CURDATE()
      LEFT JOIN KpiChecklists kc ON kc.IdChecklist = c.IdChecklist
      WHERE c.IdPuesto = p_IdPuesto
        AND c.Activo   = 1
      ORDER BY c.Nombre;
  END",
];

// ──────────────────────────────────────────────────────────────────────────────
// EJECUTAR Y MOSTRAR RESULTADO
// ──────────────────────────────────────────────────────────────────────────────
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Migración Incidencias</title>
<style>
  body { font-family: monospace; background:#111; color:#eee; padding:30px; }
  h2   { color:#ffc107; }
  .ok  { color:#28a745; }
  .err { color:#dc3545; }
  .sql { color:#aaa; font-size:.85em; margin-bottom:4px; white-space:pre-wrap; }
  .row { background:#1e1e2d; border-left:4px solid #444; padding:10px 14px; margin:8px 0; border-radius:4px; }
  .row.ok  { border-left-color:#28a745; }
  .row.err { border-left-color:#dc3545; }
  .done { color:#ffc107; font-size:1.2em; margin-top:24px; }
</style>
</head>
<body>
<h2>🛠 Migración — Incidencias</h2>
<?php
foreach ($statements as $i => $sql) {
    $preview = mb_substr(trim(preg_replace('/\s+/', ' ', $sql)), 0, 90);
    try {
        $pdo->exec($sql);
        echo '<div class="row ok"><span class="ok">✔ OK</span> &nbsp;<span class="sql">' . htmlspecialchars($preview) . '…</span></div>';
    } catch (PDOException $e) {
        $msg = $e->getMessage();
        // "Duplicate key name" o "already exists" no son errores críticos
        $isSoft = stripos($msg, 'already exists') !== false
               || stripos($msg, 'Duplicate key') !== false
               || stripos($msg, 'Duplicate entry') !== false;
        $cls = $isSoft ? 'ok' : 'err';
        $sym = $isSoft ? '⚠ YA EXISTÍA' : '✘ ERROR';
        echo '<div class="row ' . $cls . '"><span class="' . $cls . '">' . $sym . '</span> &nbsp;'
           . '<span class="sql">' . htmlspecialchars($preview) . '…</span><br>'
           . '<small>' . htmlspecialchars($msg) . '</small>'
           . '</div>';
    }
}
?>
<p class="done">✅ Migración finalizada. <strong>¡Borra este archivo del servidor!</strong></p>
</body>
</html>
