<?php
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
			return $array;
		} catch (\Exception $e) {
			error_log($e);
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
				$this->dbh = null;
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
		    $this->dbh = null;
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
			error_log($e);
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
			$this->dbh = null;

		} catch (\Exception $e) {
			$this->dbh->rollBack();
			error_log('PDOException - ' . $e->getMessage(), 0);
			http_response_code(500);
			die($e->getMessage());
			return $e->getMessage();
		}
	}

	function ConnClose(){
		$this->dbh = null;
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
