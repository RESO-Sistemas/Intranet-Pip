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
      
      // Consulta directa para obtener checklists del puesto del empleado
      // filtrados por turno actual según la hora del servidor
      $q = "SELECT 
              C.IdChecklist,
              C.Nombre,
              C.Tipo,
              C.RespuestaEsperada,
              C.IdKpi,
              C.AbreIncidencia,
              IFNULL(
                (SELECT GROUP_CONCAT(CT.IdTurno) 
                 FROM ChecklistTurnos CT 
                 WHERE CT.IdChecklist = C.IdChecklist), 
                ''
              ) AS Turnos,
              CASE 
                WHEN EXISTS (
                  SELECT 1 FROM ChecklistEmpleados CE 
                  WHERE CE.IdChecklist = C.IdChecklist 
                    AND CE.NoEmpleado = ? 
                    AND DATE(CE.HoraRevision) = CURDATE()
                ) THEN 1 
                ELSE 0 
              END AS YaContestado,
              (SELECT CE.Respuesta 
               FROM ChecklistEmpleados CE 
               WHERE CE.IdChecklist = C.IdChecklist 
                 AND CE.NoEmpleado = ? 
                 AND DATE(CE.HoraRevision) = CURDATE()
               LIMIT 1
              ) AS RespuestaEmpleado
            FROM Checklists C
            WHERE C.IdPuesto = ?
              AND (
                -- Checklists sin turno asignado: mostrar siempre
                NOT EXISTS (SELECT 1 FROM ChecklistTurnos CT WHERE CT.IdChecklist = C.IdChecklist)
                OR
                -- Checklists con turno activo según la hora actual
                EXISTS (
                  SELECT 1 
                  FROM ChecklistTurnos CT 
                  INNER JOIN Turnos T ON T.IdTurno = CT.IdTurno
                  WHERE CT.IdChecklist = C.IdChecklist
                    AND (
                      (T.HoraInicio <= T.HoraFin AND CURTIME() BETWEEN T.HoraInicio AND T.HoraFin)
                      OR
                      (T.HoraInicio > T.HoraFin AND (CURTIME() >= T.HoraInicio OR CURTIME() <= T.HoraFin))
                    )
                )
              )
            ORDER BY C.Nombre ASC";
      
      $resultado = $this->ExecuteQueryWithParam($q, array($noEmpleado, $noEmpleado, $idPuesto));
      
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

