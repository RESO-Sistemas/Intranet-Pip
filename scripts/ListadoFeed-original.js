getListFeeds();
let tableFeeds = $("#tableFeeds").dataTable({
  language: {
    lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
    zeroRecords: "NO HAY REGISTROS POR MOSTRAR",
    info: "PÁGINA _PAGE_ DE _PAGES_",
    infoEmpty: "NO HAY DATOS PARA MOSTRAR",
    infoFiltered: "",
    search: "BUSCAR",
  },
  columnDefs: [
    {
      className: "dt-center",
      targets: "_all",
    },
  ],
  order: [],
  bSort: true,
  bPaginate: true,
  bFilter: true,
  bInfo: true,
});


async function getListFeeds() {
  let datos = await {
    op: "getListFeeds"
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Feed/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    tableFeeds.fnClearTable();
    let Feedb64 = "";
    for (var i = 0; i < respuesta.length; i++) {
      Feedb64 = btoa(respuesta[i]["idFeed"]);
      tableFeeds.fnAddData([
        respuesta[i]["Titulo"],
        `<a class="btnUpdate1" href="UpdateFeed.php?Feed=${Feedb64}"><i class="fal fa-edit"></i></a>`,
        `<a class="btnUpdate2" onclick="eliminarFeed('${Feedb64}')"><i class="fal fa-edit"></i></a>`
      ])
    }
  }
}

async function eliminarFeed (feed) {
  let ContenidoHTML = `
    <div class="row">
      <div class="col s12 l12" style="text-align:center;">
        <h5>Al eliminar el Feed sucederá lo siguiente:</h5><br>
      </div>
      <div class="col s12 l12" style="text-align:center;">
        <h6>1.- El Feed dejará de mostrarse en la pantalla principal.</h6>
      </div>
      <div class="col s12 l12" style="text-align:center;">
        <h6>2.- Se eliminarán los archivos integrados en el Feed.</h6>
      </div>
      <div class="col s12 l12" style="text-align:center;">
        <h6>3.- Se eliminarán las reacciones relacionadas con el Feed.</h6>
      </div>
      <div class="col s12 l12" style="text-align:center; margin-top: 5vh">
        <h5>¿Desea continuar?</h5>
      </div>
    </div>
  `;
  alertify.confirm('Confirmación de acción.',`${ContenidoHTML}`, async function(){
    let datos = await {
      op: "eliminarFeed",
      idFeed: feed
    };
    let respuesta = "";
    try {
      respuesta = await $.ajax({
        type: "post",
        url: "Backend/Feed/App.php",
        data: datos,
      });
    } catch (e) {
      console.log(e);
    } finally {
      if (respuesta == "1") {
        alertify.success('Feed eliminado con éxito.');
        getListFeeds();
      }
    }
  }, async function(){
    alertify.error('Cancelado')
  }).set('labels', {ok:'Aceptar', cancel:'Cancelar'});

}
