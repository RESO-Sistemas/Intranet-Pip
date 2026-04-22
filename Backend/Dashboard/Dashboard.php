<?php

if (file_exists("../Conexiones/Conexiones.php")) {

    require_once("../Conexiones/Conexiones.php");

  }

else {

if (file_exists("./Conexiones/Conexiones.php")) {

    require_once("./Conexiones/Conexiones.php");

}

else if(file_exists("../Conexiones/Conexiones.php")){

    require_once("../Conexiones/Conexiones.php");

    }

else if(file_exists("../../Conexiones/Conexiones.php")){

    require_once("../../Conexiones/Conexiones.php");

    }

else if(file_exists("././Backend/Conexiones/Conexiones.php")){

    require_once("././Backend/Conexiones/Conexiones.php");

    }

}

// SessionManager
if (file_exists("../Session/SessionManager.php")) {
  require_once("../Session/SessionManager.php");
} else if (file_exists("../../Session/SessionManager.php")) {
  require_once("../../Session/SessionManager.php");
} else if (file_exists("././Backend/Session/SessionManager.php")) {
  require_once("././Backend/Session/SessionManager.php");
}



class Dashboard extends Conexiones{

  function getDashboardVisitSystem($dateIni, $dateEnd){

    try {

      $q = "SELECT

            	  E.Nombre AS Empleado,

                BVI.FechaRegistro,

                SD.Sucursal,

                P.Puesto,

                SD.IdSucursal

            FROM BitacoraVisitasIndex AS BVI

            INNER JOIN Empleados AS E ON E.NoEmpleado = BVI.NoEmpleado

            INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal

            INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto

            WHERE DATE(BVI.FechaRegistro) BETWEEN ? AND ?

            ORDER BY BVI.FechaRegistro DESC";

      $res = $this->ExecuteQueryWithParam($q, [$dateIni, $dateEnd]);

      $totalV = count($res);



      $uniqueBranch = [];

      $foundBranch = [];

      if ($totalV > 0) {

        for ($i=0; $i < $totalV ; $i++) {

          if (!in_array($res[$i]["IdSucursal"], $foundBranch)) {

            $uniqueBranch[$res[$i]["IdSucursal"]] = [

              "nameBranch" => $res[$i]["Sucursal"],

              "idBranch" => $res[$i]["IdSucursal"],

              "visits" => []

            ];

            $foundBranch[] = $res[$i]["IdSucursal"];

          }

          array_push($uniqueBranch[$res[$i]["IdSucursal"]]["visits"], $res[$i]);

        }

        $uniqueBranch = array_merge($uniqueBranch);

        $cantUnique = count($uniqueBranch);

        for ($i=0; $i < $cantUnique ; $i++) {

          $uniqueBranch[$i]["cantVisits"] = count($uniqueBranch[$i]["visits"]);

        }

      }

      return json_encode([

        "Resultado" => true,

        "Siguiente" => true,

        "Data" => [

          "totalVisits" => $totalV,

          "ListEmployees" => $res,

          "uniqueBranch" => $uniqueBranch

        ]

      ]);

    } catch (\Exception $e) {

      return $e;

    }

  }

  function getKpisDashboard() {
    $idPuesto = SessionManager::get("idSPuesto");
    $noEmpleado = SessionManager::get("NoEmpleado");
    $q = "CALL spGetKpisDashboard(?, ?)";
    $resultado = $this->ProcedureWithParam($q, array($idPuesto, $noEmpleado));

    if (!empty($resultado) && is_array($resultado)) {
      $needThresholds = false;
      foreach ($resultado as $row) {
        if (!isset($row['ValorBaja']) || !isset($row['ValorMedia']) || !isset($row['ValorAlta'])) {
          $needThresholds = true;
          break;
        }
      }

      if ($needThresholds) {
        $ids = [];
        foreach ($resultado as $row) {
          if (isset($row['IdKpi']) && is_numeric($row['IdKpi'])) {
            $ids[] = (int)$row['IdKpi'];
          }
        }

        $ids = array_values(array_unique($ids));
        if (!empty($ids)) {
          $placeholders = implode(',', array_fill(0, count($ids), '?'));
          $qThresholds = "SELECT IdKpi, ValorAlta, ValorMedia, ValorBaja FROM Kpis WHERE IdKpi IN ($placeholders)";
          $rowsThresholds = $this->ExecuteQueryWithParam($qThresholds, $ids);

          $mapThresholds = [];
          foreach ($rowsThresholds as $t) {
            $mapThresholds[(int)$t['IdKpi']] = $t;
          }

          foreach ($resultado as &$row) {
            $idKpi = isset($row['IdKpi']) ? (int)$row['IdKpi'] : 0;
            if ($idKpi > 0 && isset($mapThresholds[$idKpi])) {
              if (!isset($row['ValorAlta'])) {
                $row['ValorAlta'] = $mapThresholds[$idKpi]['ValorAlta'];
              }
              if (!isset($row['ValorMedia'])) {
                $row['ValorMedia'] = $mapThresholds[$idKpi]['ValorMedia'];
              }
              if (!isset($row['ValorBaja'])) {
                $row['ValorBaja'] = $mapThresholds[$idKpi]['ValorBaja'];
              }
            }
          }
          unset($row);
        }
      }
    }

    return json_encode($resultado);
  }

  function getChecklistsEmpleado() {
    try {
      $idPuesto = SessionManager::get("idSPuesto");
      $noEmpleado = SessionManager::get("NoEmpleado");
      
      // Si no hay empleado en sesión, devolver array vacío
      if ($noEmpleado === null || $noEmpleado === '') {
        return json_encode([]);
      }
      
      // Permitir idPuesto = 0 (es válido), solo rechazar si es NULL
      if ($idPuesto === null) {
        return json_encode([]);
      }
      
      // Query optimizada: LEFT JOINs en lugar de 3 subconsultas correlacionadas
      // que se ejecutaban N veces por cada item de checklist.
      $q = 'SELECT
              C.IdChecklist,
              C.Nombre,
              C.Tipo,
              C.RespuestaEsperada,
              C.IdKpi,
              C.AbreIncidencia,
              GROUP_CONCAT(DISTINCT CT_all.IdTurno) AS Turnos,
              CASE WHEN CE.IdChecklistEmpleado IS NOT NULL THEN 1 ELSE 0 END AS YaContestado,
              CE.Respuesta AS RespuestaEmpleado
            FROM Checklists C
            LEFT JOIN ChecklistTurnos CT_all ON CT_all.IdChecklist = C.IdChecklist
            LEFT JOIN (
              SELECT IdChecklist, IdChecklistEmpleado, Respuesta
              FROM ChecklistEmpleados
              WHERE NoEmpleado = ? AND DATE(HoraRevision) = CURDATE()
              LIMIT 500
            ) CE ON CE.IdChecklist = C.IdChecklist
            LEFT JOIN ChecklistTurnos CT_active
              INNER JOIN Turnos T_active ON T_active.IdTurno = CT_active.IdTurno
                AND (
                  (T_active.HoraInicio <= T_active.HoraFin AND CURTIME() BETWEEN T_active.HoraInicio AND T_active.HoraFin)
                  OR (T_active.HoraInicio > T_active.HoraFin AND (CURTIME() >= T_active.HoraInicio OR CURTIME() <= T_active.HoraFin))
                )
              ON CT_active.IdChecklist = C.IdChecklist
            WHERE C.IdPuesto = ?
              AND (
                CT_all.IdChecklist IS NULL
                OR
                CT_active.IdChecklist IS NOT NULL
              )
            GROUP BY C.IdChecklist, C.Nombre, C.Tipo, C.RespuestaEsperada, C.IdKpi, C.AbreIncidencia,
                     CE.IdChecklistEmpleado, CE.Respuesta
            ORDER BY C.Nombre ASC';
      
      $resultado = $this->ExecuteQueryWithParam($q, array($noEmpleado, $idPuesto));
      
      // Si el resultado está vacío, devolver array vacío
      if (empty($resultado)) {
        return json_encode([]);
      }
      
      return json_encode($resultado);
    } catch (Exception $e) {
      error_log("Error en getChecklistsEmpleado: " . $e->getMessage());
      return json_encode([]);
    }
  }

  function responderChecklist($idChecklist, $respuesta) {
    $noEmpleado = SessionManager::get("NoEmpleado");
    $q = "CALL spInsertChecklistEmpleado(?, ?, ?)";
    $resultado = $this->ProcedureWithParam($q, array($idChecklist, $noEmpleado, $respuesta));
    return json_encode(["Resultado" => true, "Msg" => "Checklist registrado"]);
  }

  function getProximosEventos() {
    $q = "CALL spGetProximosEventos()";
    $resultado = $this->Procedure($q);
    return json_encode($resultado);
  }

  function getTurnos() {
    $q = "SELECT IdTurno, Nombre, HoraInicio, HoraFin FROM Turnos ORDER BY HoraInicio ASC";
    return json_encode($this->Select($q));
  }

}



?>
