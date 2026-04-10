<?php
@ini_set('display_errors', '0');
@ini_set('display_startup_errors', '0');
@ini_set('log_errors', '0');
error_reporting(0);
ini_set('default_charset', 'utf-8');


class Conexiones{
	private $dbh;
	function __construct()
	{
		$dsn = "mysql:host=162.240.213.3;dbname=klynet_datosdemo;charset=utf8mb4"; //Demo
		$options = [
			PDO::ATTR_EMULATE_PREPARES   => false,
			PDO::ATTR_EMULATE_PREPARES => true,
			PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		];
		$this->dbh = new PDO($dsn, 'klynet_usrdatosdemo', 'Us3rK1yns2@25', $options);
	}
	
	function ProcedureWithParam($q,$parametros){
		try {
			$res = $this->dbh->prepare($q);
			$res->execute($parametros);
			$array = array();
			while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
				$array[] = $row;
			}
			// Consumir todos los result sets del SP para evitar que PDO se bloquee
			// while ($res->nextRowset()) {
				// avanzar hasta que no haya más result sets
			// }
			$res->closeCursor();
			return $array;
		} catch (\Exception $e) {
			error_log($e);
		}
	}

	// Ejecutar un SP sin intentar leer result sets (para SPs que solo hacen INSERT/UPDATE)
	// Usa exec() en vez de prepare/execute para evitar que PDO se bloquee con los result sets
	function ProcedureExec($q,$parametros){
		try {
			$sql = $q;
			foreach ($parametros as $param) {
				$quoted = $this->dbh->quote($param);
				$sql = preg_replace('/\?/', $quoted, $sql, 1);
			}
			$this->dbh->exec($sql);
			return true;
		} catch (\Exception $e) {
			error_log($e);
			return false;
		}
	}

	function ExecuteQueryWithParam($q,$parametros){
		try {
			$res = $this->dbh->prepare($q);
			$res->execute($parametros);
			$array = array();
			while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
				$array[] = $row;
			}
			return $array;
		} catch (\Exception $e) {
			error_log($e);
		}
	}

	function Select($q){
		try{
		    $sth = $this->dbh->prepare($q);
		    $sth->execute();
		    $sth->setFetchMode(PDO::FETCH_ASSOC);
		    $result = $sth->fetchAll();
		    return $result;
		}
		catch(PDOException $e){
		    error_log('PDOException - ' . $e->getMessage(), 0);
		    http_response_code(500);
		    die($e->getMessage());
	    }
	}

	function SelectNotClose($q){
		try{
		    $sth = $this->dbh->prepare($q);
		    $sth->execute();
		    $sth->setFetchMode(PDO::FETCH_ASSOC);
		    $result = $sth->fetchAll();
		    return $result;
		}
		catch(PDOException $e){
		    error_log('PDOException - ' . $e->getMessage(), 0);
		    http_response_code(500);
		    die($e->getMessage());
	    }
	}

	function ExecuteQuery($q, $parametros){
		try	{
		    $sth = $this->dbh->prepare($q);
		    $sth->execute($parametros);
		}
		catch(PDOException $e){
		    error_log('PDOException - ' . $e->getMessage(), 0);
		    http_response_code(500);
		    die($e->getMessage());
		    return $e->getMessage();
	    }
	}

	function Procedure($q){
		try {
			$res = $this->dbh->prepare($q);
			$res->execute();
			$array = array();
			while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
				$array[] = $row;
			}
			return $array;
		} catch (\Exception $e) {
			error_log("ERROR en Procedure: " . $e->getMessage());
			error_log("Query: " . $q);
			throw $e;
		}
	}

	function Transact($queryArray){
		try {
			$this->dbh->beginTransaction();
			for ($i=0; $i <sizeof($queryArray) ; $i++) {
				$sth = $this->dbh->prepare($queryArray[$i]);
				$sth->execute();
			}
			$this->dbh->commit();

		} catch (\Exception $e) {
			$this->dbh->rollBack();
			error_log('PDOException - ' . $e->getMessage(), 0);
			http_response_code(500);
			die($e->getMessage());
			return $e->getMessage();
		}
	}

	// Método para insertar y obtener el ID generado
	function InsertAndGetId($q, $parametros = array()){
		try {
			$sth = $this->dbh->prepare($q);
			$sth->execute($parametros);
			$lastId = $this->dbh->lastInsertId();
			return $lastId;
		} catch(PDOException $e) {
			error_log('PDOException InsertAndGetId - ' . $e->getMessage(), 0);
			return false;
		}
	}

	function ConnClose(){
		$this->dbh = null;
	}

	// Método para insertar datos binarios (BLOB)
	function ExecuteWithLob($q, $params, $lobIndex){
		try {
			$stmt = $this->dbh->prepare($q);
			
			// Bind de parámetros normales y LOB
			$stmt->bindValue(1, $params[0]); // idFeed
			$stmt->bindValue(2, $params[1]); // Archivo (nombre)
			$stmt->bindValue(3, $params[2]); // ContentType
			$stmt->bindParam(4, $params[3], PDO::PARAM_LOB); // Content (BLOB)
			
			$stmt->execute();
			$lastId = $this->dbh->lastInsertId();
			return $lastId;
		} catch (PDOException $e) {
			error_log('PDOException LOB - ' . $e->getMessage(), 0);
			return false;
		}
	}

	// Método para obtener datos binarios (BLOB)
	function SelectWithLob($q, $params = []){
		try {
			$stmt = $this->dbh->prepare($q);
			$stmt->execute($params);
			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			return $result;
		} catch (PDOException $e) {
			error_log('PDOException LOB Select - ' . $e->getMessage(), 0);
			return null;
		}
	}

	//Respuestas
		 function responseSuccess($res, $r = false)
		 {
				 return array(
						 "Resultado" => true,
						 "Icono_alerta" => 'success',
						 "Titulo_alerta" => 'Success!',
						 "Texto_alerta" => 'Bien.',
						 "Data" => array(
								 "Response" => $res,
								 "Extra_response" => $r
						 )
				 );
		 }

		 function responseFailed()
		 {
				 return array(
						 "Resultado" => false,
						 "Icono_alerta" => 'error',
						 "Titulo_alerta" => 'bad error!',
						 "Texto_alerta" => 'mal.',
						 "Data" => array()
				 );
		 }
}
?>
