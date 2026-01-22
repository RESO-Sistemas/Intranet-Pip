<?php
require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class SenderHelper {
  function SendMessageMailInd($NombreEmpleado, $Mensaje, $EmailDest, $Asunto){
      $mail = new PHPMailer(true);
    try {
      //error_log($NombreEmpleado." ".$Mensaje." ".$EmailDest." ".$Asunto);
      $mail->isSendmail();
      $mail->Host       = '162.240.213.3';
      $mail->SMTPAuth   = true;
      $mail->Username   = 'interno@klynet.mx';
      $mail->Password   = 'K1yn@22022';
      $mail->SMTPSecure = 'tls';
      $mail->Port       = 587;
      $mail->IsHTML(true);
      // Configuración del mensaje
      $mail->setFrom("interno@klynet.mx", "VKlyns");
      $mail->addAddress($EmailDest, $NombreEmpleado);
      $mensajeSubject = $Asunto;
      $mensajeSubject = utf8_decode($mensajeSubject);
      $mail->Subject  = $mensajeSubject;
      $mensajeBody    = "
        <!DOCTYPE html>
          <html lang='en'>
          <head>
            <meta charset='UTF-8'>
            <meta http-equiv='X-UA-Compatible' content='IE=edge'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Document</title>
            <style>
                /* Agregamos estilos globales */
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #ecf0f1;
                    font-family: sans-serif;
                }

                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ecf0f1;
                }

                .header {
                    text-align: center;
                    padding: 5vh 0;
                }

                .content {
                    padding: 2vh 4vh;
                    text-align: center; /* Cambiamos a centrar el texto */
                    background-color: #fff;
                }

                .button-container {
                    text-align: center;
                    padding: 2vh;
                }

                .button {
                    display: inline-block;
                    background-image: linear-gradient(#42A1EC, #0070C9);
                    border: 1px solid #0077CC;
                    border-radius: 4px;
                    color: #FFFFFF;
                    text-decoration: none;
                    padding: 10px 20px;
                    font-size: 17px;
                }

                .button:hover {
                    background-image: linear-gradient(#51A9EE, #147BCD);
                    border-color: #1482D0;
                }
            </style>
          </head>
          <body>
            <div class='container'>
                <div class='header'>
                    <a href=''>
                        <img style='width: 20%; border-radius: 15px' src='https://klyns.resosistemas.mx/assets/logoK.png' alt=''>
                    </a>
                </div>
                <div class='content'>
                    <h2 style='color: #B00000;margin: 0 0 2vh 0; '>!Hola $NombreEmpleado!</h2>
                    <p>$Mensaje</p>
                </div>
                <div class='button-container'>
                    <a class='button' href='https://klynet.mx/index.php'>Ir a Klynet</a>
                </div>
                <div style='text-align: center; padding:2vh'>

                </div>
            </div>
          </body>
          </html>
      ";
      $mensajeBody = utf8_decode($mensajeBody);
      $mail->Body  = $mensajeBody;
      error_log("Se va a enviar");
      $exito       = $mail->Send();
      error_log("Se envio");
      // Adjuntar archivos (opcional)
      //$mail->addAttachment('/ruta/al/archivo.pdf');
      while ((!$exito) && ($intentos < 5)) {
        $mail->ErrorInfo;
        sleep(5);
        $exito    = $mail->Send();
        $intentos = $intentos + 1;
      }
      error_log($mail->ErrorInfo);
    } catch (\Exception $e) {
      error_log($e);
    }
  }

  function RecursiveSender($ArrayEmpleados, $Mensaje, $Asunto){
    $mail = new PHPMailer();
    $mailsTotales = 0;
    $errores = 0;
    $correctos = 0;
    try
    {
      $mailsTotales = Count($ArrayEmpleados);
      $mail->isSendmail();
      $mail->Host       = '162.240.213.3';
      $mail->SMTPAuth   = true;
      $mail->Username   = 'interno@klynet.mx';
      $mail->Password   = 'K1yn@22022';
      $mail->SMTPSecure = 'tls';
      $mail->Port       = 587;
      $mail->IsHTML(true);
      $mail->setFrom("interno@klynet.mx", "VKlyns");
      $mensajeSubject = $Asunto;
      $mensajeSubject = utf8_decode($mensajeSubject);
      $mail->Subject  = $mensajeSubject;
      foreach ($ArrayEmpleados as $key) {
        $EmailDest = $key["Email"];
        // $NombreEmpleado = $key["Nombre"];
        // $mail->clearAddresses(); // Limpia los destinatarios anteriores
        $mail->addBCC($EmailDest, "Klynet");
      }
      $mensajeBody    = "
        <!DOCTYPE html>
          <html lang='en'>
          <head>
            <meta charset='UTF-8'>
            <meta http-equiv='X-UA-Compatible' content='IE=edge'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Document</title>
            <style>
                /* Agregamos estilos globales */
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #ecf0f1;
                    font-family: sans-serif;
                }

                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ecf0f1;
                }

                .header {
                    text-align: center;
                    padding: 5vh 0;
                }

                .content {
                    padding: 2vh 4vh;
                    text-align: center; /* Cambiamos a centrar el texto */
                    background-color: #fff;
                }

                .button-container {
                    text-align: center;
                    padding: 2vh;
                }

                .button {
                    display: inline-block;
                    background-image: linear-gradient(#42A1EC, #0070C9);
                    border: 1px solid #0077CC;
                    border-radius: 4px;
                    color: #FFFFFF;
                    text-decoration: none;
                    padding: 10px 20px;
                    font-size: 17px;
                }

                .button:hover {
                    background-image: linear-gradient(#51A9EE, #147BCD);
                    border-color: #1482D0;
                }
            </style>
          </head>
          <body>
            <div class='container'>
                <div class='header'>
                    <a href=''>
                        <img style='width: 20%; border-radius: 15px' src='https://klyns.resosistemas.mx/assets/logoK.png' alt=''>
                    </a>
                </div>
                <div class='content'>
                    <h2 style='color: #B00000;margin: 0 0 2vh 0; '>!Hola !</h2>
                    <p>$Mensaje</p>
                </div>
                <div class='button-container'>
                    <a class='button' href='https://klynet.mx/index.php'>Ir a Klynet</a>
                </div>
                <div style='text-align: center; padding:2vh'>

                </div>
            </div>
          </body>
          </html>
      ";
      $mensajeBody = utf8_decode($mensajeBody);
      $mail->Body = $mensajeBody;
      if ($mail->send()) {
      $correctos++;
      } else {
        $errores++;
        $errorMessage =  "Error al enviar el correo a : $EmailDest " . $mail->ErrorInfo . "<br>";
        error_log($errorMessage);
      }
    }
    catch (\Exception $e)
    {
      error_log($e);
      return 0;
    }
   error_log("Envio de correos. Total: ".$mailsTotales." Correctos: ".$correctos." Errores: ".$errores);
  }
}
?>
