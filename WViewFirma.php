<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <?php
      $NoEmpleado = $_GET["NoEmpleado"];

      //include("estilos.php");
     ?>
    <meta charset="utf-8">
    <title></title>
    <style media="screen">
      body{
        background-size: cover; /* Para ajustar la imagen al tamaño del contenedor */
        background-repeat: no-repeat; /* Para que la imagen no se repita */
        background-position: center center; /* Para centrar la imagen */
      }
    </style>
  </head>
  <body>
    <input type="hidden" id="EmpSelected" value="<?php echo $NoEmpleado ?>">
    <div class="centrado">
      <img class="firma" id="imgFirma" alt="" style="width:100%;text-align:center;">
    </div>
    <script src="assets/libs/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript">
    $(document).ready(function(){
      getFirmaEmp();
    });
    async  function getFirmaEmp(){
      let emp = await $("#EmpSelected").val();
      let datos = await {
        op: "getFirmaEmp",
        NoEmpleado: emp
      };
      let respuesta = "";
      try {
        respuesta = await $.ajax({
          type: "post",
          url: "App/Empleados/App.php",
          data: datos,
          dataType: "json",
        });
      } catch (e) {
        console.log(e);
      } finally {
        console.log(respuesta);
        for (var i = 0; i < respuesta.length; i++) {
          let urlImg = "Archivos/ImgEmpleados/"+respuesta[i]["NoEmpleado"]+"/Firma/"+respuesta[i]["Firma"];
          $("#imgFirma").attr("src",urlImg);
        }
      }
    }
    </script>
  </body>
</html>
