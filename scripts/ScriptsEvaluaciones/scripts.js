const url_m_Evaluaciones = "../../Backend/Evaluaciones/App.php";

async function pAjaxAsync(url,datos,pcarga){
  let respuesta = "";
  if (pcarga == 1) {
    Cargando();
  }
  try {
    respuesta = await $.ajax({
      type: "post",
      url: url,
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    if (pcarga == 1) {
      QuitarCargando();
    }
    if (respuesta.Resultado) {
      if (respuesta.Siguiente) {
          if (respuesta.ConMsg) {toastr.success(respuesta.Msg);}
          return respuesta;
      } else {
        if (respuesta.ConMsg) {toastr.warning(respuesta.Msg);}
      }
    } else if (!respuesta.Resultado) {
      toastr.warning("¡Ha ocurrido un error inesperado, inténtelo de nuevo por favor!");
    }
  }
}

function Cargando() {
  $.blockUI({
    message: `
    <img src="../../assets/logoK.png" alt="" srcset="" width="150px">
    <h4> REALIZANDO PETICIÓN, POR FAVOR ESPERE...</h4><br><div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
            <div class="circle"></div>
            </div><div class="gap-patch">
            <div class="circle"></div>
            </div><div class="circle-clipper right">
            <div class="circle"></div>
        </div>
    </div>
    </div>`,
    css: {
      backgroundColor: null,
      color: '#fff',
      border: null
    }
  });
}

function QuitarCargando() {
  $.unblockUI();
}

async function dialogConfirmSAlert(title,text = "",icon = "warning"){
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: `${title}`,
      text: `${text}`,
      icon: `${icon}`,
      showCancelButton: true,
      confirmButtonColor: '#F7DC6F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      console.log(result);
      if (result.value) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  })
}

async function validateDiv(contenedor){
  return new Promise((resolve, reject) => {
    const all = document.getElementById(`${contenedor}`);
    const cInp = all.querySelectorAll('input');
    let inpVacios = [];
    let contador = 0;
    cInp.forEach( i => {
      if (i.required) {
        if (i.value === "" || i.value === null) {
          contador ++;
        }
      }
    });
    if (contador > 0) {
      toastr.info("Faltan campos obligatorios por ingresar.");
      resolve(false);
    } else {
      resolve(true);
    }
  });
}

function activeLbl(contenedor){
  const all = document.getElementById(`${contenedor}`);
  const allLbl = all.querySelectorAll('label');
  if (allLbl.length > 0 ) {
    allLbl.forEach(i => {
      i.classList.add('active');
    })
  }
}

function cleanContenedorInp(contenedor){
  const all = document.getElementById(`${contenedor}`);
  const cInp = all.querySelectorAll('input');
  const allSelct = all.querySelectorAll('select');
  const alltxa = all.querySelectorAll('textarea');
  let inpVacios = [];
  let contador = 0;
  if (alltxa.length > 0 ) {
    alltxa.forEach( txa => {
       txa.value = "";
       let lInp = document.querySelector(`label[for="${txa.id}"]`);
       if (lInp !== null) {
         lInp.classList.remove('active');
         lInp.style.color = "initial";
       }
    });
  }
  cInp.forEach( i => {
    i.value = "";
    let lInp = document.querySelector(`label[for="${i.id}"]`);
    if (lInp !== null) {
      lInp.classList.remove('active');
      lInp.style.color = "initial";
    }
  });
  if (allSelct.length > 0 ) {
    allSelct.forEach( i => {
      let lInp = document.querySelector(`label[for="${i.id}"]`);
      if (lInp !== null) {
        // lInp.classList.remove('active');
        lInp.style.color = "initial";
      }
    });
  }
}

function activeDescriptionInp(contenedor){
  const all = document.getElementById(`${contenedor}`);
  const allLbl = all.querySelectorAll('label');
  if (allLbl.length > 0 ) {
    allLbl.forEach(i => {
      i.classList.add('active');
    })
  }
}
