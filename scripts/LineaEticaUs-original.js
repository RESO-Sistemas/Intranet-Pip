cargarDatos();
function cargarDatos(){
  // getListBranches();
  getDivisiones();
  getOpcionesLineaEtica();
}

$(document).on("change", "#division", () => {
  getListBranches();
  $("#sl_branch").prop("disabled", false);
});

async function getListBranches(){
  let ajaxR = await pAjaxAsync(url_m_Sucursal, {
    op: "getAllBranchesPerDiv",
    div: $("#division").val()
  }, 1);
  if (!!ajaxR) {
    $("#sl_branch").empty();
    printOptionsSelect(ajaxR.Data, {
      initialOption: "Seleccione una sucursal",
      idElement: "sl_branch"
    });
  }
}

function getOpcionesLineaEtica(){
  datos = {
    op: "getOpcionesLineaEtica"
  }
  $.ajax({
    type: "post",
    url: "Backend/LineaEtica/App.php",
    data: datos,
    success:function(response){
      $("#slctLineaEtica").html("");
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#slctLineaEtica").append(`
          <option value="${response[i]["idCatalogoLineaEtica"]}">${response[i]["Descripcion"]}</option>
          `);
      }
    },error:function(e){
      alert(e.responseText);
    }
  });
}

//Inicio - Visualizar divisiones (Departamentos), solo CAS y CEDI.
function getDivisiones(){
  datos = {
    op:"getDivisiones"
  }
  $.ajax({
    type:"post",
    url: "Backend/Divisiones/App.php",
    data: datos,
    success:(ajaxResponse)=>{
      // $("#division").html("");
      ajaxResponse = JSON.parse(ajaxResponse.trim());
      ajaxResponse.map((a)=>{
       //(a.IdDivision != 5) ? $("#division").append(`<option value="${a.IdDivision}">${a.Division}</option>`) : console.log("Ta bien");
       $("#division").append(`<option value="${a.IdDivision}">${a.Division}</option>`);
      })
    },error:(e)=>{
      alert(e.responseText);
    }
  });
}
//Fin - Visualizar divisiones (Departamentos), solo CAS y CEDI.

$("#EnviarLineaE").click(async function(){
  let v = await verifyInputsDv('formLineaEtica');
  if (v) {

    if (document.getElementById("formLineaEtica").checkValidity()) {
      event.preventDefault();
      let form = $("#formLineaEtica")[0];
      let data = new FormData(form);
      data.append("op","addMensajeLineaEtica");
      $.ajax({
        type:"POST",
        url:"Backend/LineaEtica/App.php",
        data:data,
        processData:false,
        contentType:false,
        cache: false,
        timeout:600000,
        success:function(response){
          if (response == "1") {
            toastr.success("Mensaje Enviado");
            setTimeout(function () {
              window.location.href=`index.php`;
            }, 1000);
          }else if (response == "0") {
            toastr.info("Mensaje no Enviado");
          }
        },error:function(e){
          alert(e.responseText);
        }
      });
    }else {
      toastr.info("Ingrese todos los datos");
    }
  }
});
