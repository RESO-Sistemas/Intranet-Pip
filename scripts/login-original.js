function onlynumber(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) {
      return true;
    }
    patron = /[-0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
  }

  $("#btnLogin").click(async function(){
    let noEmpleado = await $("#NoEmpleado").val();
    let password =  await $("#password").val();
    if (noEmpleado == "" || password == "") {
      toastr.warning('Ingrese todos los campos');
      return false;
    }
    let datos = await {
      op: "loginEmpleado",
      noEmpleado: noEmpleado,
      password: password
    };
    let respuesta = "";
    try {
      respuesta = await $.ajax({
        type :"POST",
        url : "Backend/Empleados/App.php",
        data : datos
      });
    } catch (e) {
      console.log(e);
    } finally {
      if (respuesta == "1"){
        // document.cookie = "logeo=true";
        // await validaLogin();
        window.location.href="index.php"
      } else {
        toastr.warning(respuesta);
      }
    }
  });


  // async function validaLogin(){
  //   let datos = await {
  //     op: "validarLogin"
  //   };
  //   let respuesta;
  //   try {
  //     respuesta = await $.ajax({
  //       type: "post",
  //       url: "Backend/Empleados/App.php",
  //       data: datos,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     if (respuesta == "1") {
  //       setTimeout(function () {
  //         window.location.href=`index.php`;
  //       }, 1000);
  //     }else {
  //       toastr.warning(respuesta);
  //     }
  //   }
  // }

$("#password").keypress(function(event) {
    if (event.keyCode === 13) {
        $("#btnLogin").click();
    }
});
$("#NoEmpleado").keypress(function(event) {
     if (event.keyCode === 13) {
         $("#btnLogin").click();
     }
 });


 $("#to-recover").click(async function () {
   $("#txtEmailRecuperarPass").val("");
   alertify.genericDialog || alertify.dialog('genericDialog',function(){
       return {
           main:function(content){
               this.setContent(content);
           },
           setup:function(){
               return {
                   focus:{
                       element:function(){
                           return this.elements.body.querySelector(this.get('selector'));
                       },
                       select:true
                   },
                   options:{
                       title: "saludos",
                       basic:true,
                       maximizable:false,
                       resizable:false,
                       padding:false
                   }
               };
           },
 /*           build:function (){
                   this.header("hola");
           }, */
           settings:{
               selector:undefined
           }
       };

   });
   alertify.genericDialog ($('#recuperarPassword')[0]).setH;
 });

 $("#idEnviaEmail").click(async function (){
   $.blockUI({
       message: '<h1>¡Espere por favor!</h1>',
       css: {
       centerY: 0,
       border: 'none',
       padding: '15px',
       backgroundColor: '#000',
       '-webkit-border-radius': '10px',
       '-moz-border-radius': '10px',
       opacity: .5,
       color: '#fff'
   } });
   let email = await $("#txtEmailRecuperarPass").val();
   let datos = await {
       op: "recuperarPassword",
       Email: email
   };
   alertify.closeAll()
   let respuesta = "";
   try {
       respuesta = await $.ajax({
           type: "post",
           url: "Backend/Empleados/App.php",
           data: datos,
       });
   } catch (error) {
       setTimeout($.unblockUI, 1000);
       console.log(error);
   } finally {
       if (respuesta == "1") {
           setTimeout($.unblockUI, 1000);
           alertify.success("¡Solicitud Enviada!");
       } else {
           setTimeout($.unblockUI, 1000);
           alertify.warning(respuesta);
       }
   }
 });
