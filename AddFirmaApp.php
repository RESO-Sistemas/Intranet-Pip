<!DOCTYPE html>
<html>

<head>
    <?php
      $NoEmpleado = $_GET["NoEmpleado"];
      //include("estilos.php");
      error_log($NoEmpleado);
     ?>
     <meta charset="utf-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta name="apple-mobile-web-app-capable" content="yes">
     <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
     <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover" />
     <link rel="icon" type="image/png" sizes="16x16" href="assets/images/lg1.png">
     <title>Klyns Intranet</title>
     <link href="dist/css/style.css" rel="stylesheet">
     <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
     <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
     <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
     <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<style media="screen">
  #draw-canvas {
  border: 2px solid #CCCCCC;
  border-radius: 15px;
  cursor: crosshair;
  }

  #draw-dataUrl {
  width: 100%;
  }
</style>
</head>

<body data-theme="">
   <div class="main-wrapper" id="main-wrapper">
      <div class="page-wrapper">
        <input type="hidden" id="EmpSelected" value="<?php echo $NoEmpleado ?>">
          <div class="row">
            <div class="col s8 offset-s2" style="margin-top: 5vh">
              <div class="row">
                <div id="contentCanvas" class="col s12" style="text-align:center;height:100%;width:100%;">
                  <canvas id="draw-canvas">
                    No tienes un buen navegador.
                  </canvas>
                  <input type="button" class="button" id="draw-clearBtn" value="Limpiar"></input>
                </div>
                <input type="color" id="color" style="display:none;">
                <input type="range" id="puntero" min="1" default="1" max="5" width="10%" style="display:none;">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col s4 offset-s4" style="text-align:center;">
              <br>
                  <button id="draw-submitBtn" onclick="" class="waves-effect waves-light btn btn-round purple">
                      AGREGAR
                  </button>
          </div>
        </div>
      </div>
    </div>
    <script src="assets/libs/jquery/dist/jquery.min.js"></script>
    <script src="assets/extra-libs/taskboard/js/jquery.ui.touch-punch-improved.js"></script>
    <script src="assets/extra-libs/taskboard/js/jquery-ui.min.js"></script>
    <script src="dist/js/materialize.min.js"></script>
    <script src="assets/libs/perfect-scrollbar/dist/js/perfect-scrollbar.jquery.min.js"></script>
    <!-- ============================================================== -->
    <!-- Apps -->
    <!-- ============================================================== -->
    <script src="dist/js/app.js"></script>
    <script src="dist/js/app-style-switcher.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>
    <script src="assets/libs/toastr/build/toastr.min.js"></script>
    <script src="assets/extra-libs/toastr/toastr-init.js"></script>

    <!-- ============================================================== -->
    <!-- Custom js -->
    <!-- ============================================================== -->
    <script src="dist/js/custom.min.js"></script>
    <!-- ============================================================== -->
    <!-- This page plugin js -->
    <!-- ============================================================== -->
    <script src="assets/libs/moment/min/moment.min.js"></script>
    <script src="assets/libs/fullcalendar/dist/fullcalendar.min.js"></script>
    <script src="dist/js/pages/calendar/cal-init.js"></script>
    <script src="scripts/index.js"></script>
    <script type="text/javascript">

    $(document).ready(function(){


       (function() {
       window.requestAnimFrame = (function (callback) {
         return window.requestAnimationFrame ||
               window.webkitRequestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               window.oRequestAnimationFrame ||
               window.msRequestAnimaitonFrame ||
               function (callback) {
                 window.setTimeout(callback, 1000/60);
               };
       })();

       var canvas = document.getElementById("draw-canvas");
       var ctx = canvas.getContext("2d");
       // var contentCanvas = $("#contentCanvas");
       var contentCanvas = document.getElementById("contentCanvas");
       canvas.width = contentCanvas.offsetWidth;
       canvas.height = contentCanvas.offsetHeight;




       var clearBtn = document.getElementById("draw-clearBtn");
       var submitBtn = document.getElementById("draw-submitBtn");

       clearBtn.addEventListener("click", function (e) {
         clearCanvas();
       }, false);

       submitBtn.addEventListener("click", function (e) {
       var dataUrl = canvas.toDataURL();
       SubirFirma(dataUrl);
        }, false);

       var drawing = false;
       var mousePos = { x:0, y:0 };
       var lastPos = mousePos;
       canvas.addEventListener("mousedown", function (e)
       {
         var tint = document.getElementById("color");
         var punta = document.getElementById("puntero");
         console.log(e);
         drawing = true;
         lastPos = getMousePos(canvas, e);
       }, false);
       canvas.addEventListener("mouseup", function (e)
       {
         drawing = false;
       }, false);
       canvas.addEventListener("mousemove", function (e)
       {
         mousePos = getMousePos(canvas, e);
       }, false);


       canvas.addEventListener("touchstart", function (e) {
         mousePos = getTouchPos(canvas, e);
         console.log(mousePos);
         e.preventDefault();
         var touch = e.touches[0];
         var mouseEvent = new MouseEvent("mousedown", {
           clientX: touch.clientX,
           clientY: touch.clientY
         });
         canvas.dispatchEvent(mouseEvent);
       }, false);

       canvas.addEventListener("touchend", function (e) {
         e.preventDefault();
         var mouseEvent = new MouseEvent("mouseup", {});
         canvas.dispatchEvent(mouseEvent);
       }, false);

       canvas.addEventListener("touchleave", function (e) {
         e.preventDefault();
         var mouseEvent = new MouseEvent("mouseup", {});
         canvas.dispatchEvent(mouseEvent);
       }, false);

       canvas.addEventListener("touchmove", function (e) {
         e.preventDefault();
         var touch = e.touches[0];
         var mouseEvent = new MouseEvent("mousemove", {
           clientX: touch.clientX,
           clientY: touch.clientY
         });
         canvas.dispatchEvent(mouseEvent);
       }, false);

       function getMousePos(canvasDom, mouseEvent) {
         var rect = canvasDom.getBoundingClientRect();
         return {
           x: mouseEvent.clientX - rect.left,
           y: mouseEvent.clientY - rect.top
         };
       }

       function getTouchPos(canvasDom, touchEvent) {
         var rect = canvasDom.getBoundingClientRect();
         console.log(touchEvent);
         return {
           x: touchEvent.touches[0].clientX - rect.left, // Popiedad de todo evento Touch
           y: touchEvent.touches[0].clientY - rect.top
         };
       }


       function renderCanvas() {
         if (drawing) {
           var tint = document.getElementById("color");
           var punta = document.getElementById("puntero");
           ctx.strokeStyle = tint.value;
           ctx.beginPath();
           ctx.moveTo(lastPos.x, lastPos.y);
           ctx.lineTo(mousePos.x, mousePos.y);
           console.log(punta.value);
           ctx.lineWidth = punta.value;
           ctx.stroke();
           ctx.closePath();
           lastPos = mousePos;
         }
       }

       function clearCanvas() {
         canvas.width = canvas.width;
       }

       (function drawLoop () {
         requestAnimFrame(drawLoop);
         renderCanvas();
       })();

       })();
     });


    function SubirFirma(imagen64){
      let emp = $("#EmpSelected").val();
      $.ajax({
        type: "POST",
      url: "App/Empleados/App.php",
      type: "POST",
      data: "op=SubirFirmaApp&imagen64="+imagen64+"&NoEmpleado="+emp,
      success:function(text){
        setTimeout(function(){
          $("#Regresar").click();
        },1500);
      },
      error:function(e){
        alert(e.responseText);
      }
      });
    }
    $("#Regresar").click(function() {
      window.history.go(-1);
    });

    </script>
</body>

</html>
