<?php
class Conexiones{
	private $dbh;
	function __construct()
	{
		$dsn = "mysql:host=162.240.213.3;dbname=klynet_datos;charset=utf8mb4"; //Produccion
		//$dsn = "mysql:host=192.185.131.189;dbname=resosist_Klynsdb;charset=utf8mb4"; //Produccion
		$options = [
			PDO::ATTR_EMULATE_PREPARES   => false,
			PDO::ATTR_EMULATE_PREPARES => true,
			PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		];
		$this->dbh = new PDO($dsn, 'klynet_usrdatosdemo', 'Us3rK1yns2@22', $options);
		// $this->dbh = null;
	}

	/*
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

	*/

	function Select($q, $parametros)
	{
		try
		{
				/**
				* Before executing our SQL statement, we need to prepare it by 'binding' parameters.
				* We will bind our validated user input (in this case, it's the value of $id) to our
				* SQL statement before sending it to the database server.
				*
				* This fixes the SQL injection vulnerability.
				*/
				//$q = "SELECT * FROM productos WHERE idproducto = :id";
				// Prepare the SQL query
				$sth = $this->dbh->prepare($q);
				// Bind parameters to statement variables
				for($i = 0; $i < sizeof($parametros); $i++)
				{
					$sth->bindParam((string)":".$parametros[$i][0], $parametros[$i][1]);
				}

				// Execute statement
				$sth->execute();
				// Set fetch mode to FETCH_ASSOC to return an array indexed by column name
				$sth->setFetchMode(PDO::FETCH_ASSOC);
				// Fetch result
				$result = $sth->fetchAll();

				return $result;
				//Close the connection to the database
				$this->dbh = null;
		}
		catch(PDOException $e)
		{
			/**
				* You can log PDO exceptions to PHP's system logger, using the Operating System's
				* system logging mechanism
				*
				* For more logging options visit http://php.net/manual/en/function.error-log.php
				*/

				error_log('PDOException - ' . $e->getMessage(), 0);
				/**
				* Stop executing, return an 'Internal Server Error' HTTP status code (500),
				* and display an error
				*/
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
}
?>
