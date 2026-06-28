<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once("Sincronizador.php");
$obj = new Sincronizador();

$op = isset($_POST["op"]) ? $_POST["op"] : "";

switch ($op) {
  case "getServidores":
    echo json_encode($obj->getServidores());
    break;

  case "probarConexion":
    $idServidor = isset($_POST["idServidor"]) ? $_POST["idServidor"] : "";
    echo json_encode($obj->probarConexion($idServidor));
    break;

  case "previsualizarServidor":
    $idServidor = isset($_POST["idServidor"]) ? $_POST["idServidor"] : "";
    echo json_encode($obj->previsualizarServidor($idServidor));
    break;

  case "sincronizarServidor":
    $idServidor = isset($_POST["idServidor"]) ? $_POST["idServidor"] : "";
    echo json_encode($obj->sincronizarServidor($idServidor));
    break;

  case "crearServidor":
    echo json_encode($obj->crearServidor(
      $_POST["id"] ?? "", $_POST["nombre"] ?? "", $_POST["baseUrl"] ?? "", $_POST["activo"] ?? 1
    ));
    break;

  case "actualizarServidor":
    echo json_encode($obj->actualizarServidor(
      $_POST["id"] ?? "", $_POST["nombre"] ?? "", $_POST["baseUrl"] ?? "", $_POST["activo"] ?? 1
    ));
    break;

  case "eliminarServidor":
    echo json_encode($obj->eliminarServidor($_POST["id"] ?? ""));
    break;

  case "getEstadoSync":
    echo json_encode($obj->getEstadoSync($_POST["idServidor"] ?? ""));
    break;

  case "cancelarSync":
    echo json_encode($obj->cancelarSync($_POST["idServidor"] ?? ""));
    break;

  case "getBitacora":
    echo json_encode($obj->getBitacora($_POST["limit"] ?? 50, $_POST["servidor"] ?? null));
    break;

  case "getBitacoraDetalle":
    echo json_encode($obj->getBitacoraDetalle(
      $_POST["idBitacora"] ?? 0, $_POST["entidad"] ?? null, $_POST["accion"] ?? null
    ));
    break;

  default:
    echo json_encode(["Resultado" => false, "Msg" => "Operación no reconocida"]);
    break;
}
?>
