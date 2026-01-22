class PerfilEmpleadoLateral extends HTMLElement{
  constructor() {
    super();
  }
  connectedCallback(){
    this.innerHTML = `
    <div class="row">
      <div class="col s12 m4">
       <div class="e-card" >
         <div class="e-card-content" style="background-image: url('assets/images/Klyns1.png'); background-size: 100%;background-color:#212F3D ; padding:15px;">
            <div class="d-flex no-block align-items-center">
                <div class="col s12 l3">
                  <div class="align-self-center"><img class="circle" height="70" width="70" id="ImgEmpleadoPerfil"></div>
                </div>
                <div class="col s12 l2">
                  <div class="align-self-center"><i id="btnFotoEmp"class="fas fa-camera fa-2x" style="cursor:pointer;"></i></div>
                </div>
                <div class="col s12 l7">
                  <form id="FrmFotoEmp" action="Backend/Empleados/App.php" method="post">
                    <input type="text" name="op" value="updateFotoEmpleado" style="display:none;">
                    <input type="file" accept="image/*" name="fotoEmp" id="fotoEmp" value="" style="display:none;" onchange="updateFotoEmpleado()">
                  </form>
                  <h5 class="card-title white-text" id="NameEmpleado"></h5>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col s12 m8">
        <div class="e-card" >
          <div class="e-card-content" style="padding:15px;">
                <div class="row">
                    <div class="col s12 m5">
                      <h6><b id="mensajeBienvenida"></b></h6>
                      <div class="row">
                        <div class="col s12">
                          <h6 id="textoEmailEmp"></h6>
                        </diV>
                      </div>
                    </div>
                    <div class="col s12 l4" style="text-align:center">
                        <strong class="db m-t-3">¡Tambien descarga la versión móvil iOS - Android!</strong>
                        <a href="#" target="_blank" class="btn-floating  darken-2 m-t-10" style="background-color:#fff;">
                          <img src="assets/images/iconIos.png" style="width:100%" download  alt="Descargar App">
                        </a>
                        <a href="#" target="_blank" class="btn-floating  darken-2 m-t-10">
                          <img src="assets/images/IconAndroid.png" style="width:100%;margin:auto;important" download  alt="Descargar App">
                        </a>
                    </div>
                    <div class="col s12 m3">
                      <strong class="db m-t-3">Redes Sociales</strong>
                      <a href="https://www.facebook.com/FarmaciasKlyns" target="_blank" class="btn-floating indigo darken-2 m-t-10"><i class="fab fa-facebook"></i></a>
                      <a href="https://twitter.com/farmaciasklyns" target="_blank" class="btn-floating blue darken-1 m-t-10"><i class="fab fa-twitter"></i></a>
                      <a href="https://www.instagram.com/farmaciasklyns/?hl=es" target="_blank" class="btn-floating deep-orange m-t-10"><i class="fab fa-instagram"></i></a>
                      <a href="https://www.linkedin.com/company/farmacias-klyns/" target="_blank" class="btn-floating deep-red m-t-10"><i class="fab fa-linkedin-in"></i></a>
                      <a href="https://www.klyns.mx/" target="_blank" class="btn-floating deep-red m-t-10" style="padding:.5vh;background-color:#DF040A"><img src="assets/Klyns.png" style="width:100%"></img></i></a>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    `;
  }
}
window.customElements.define("perfil-lateral", PerfilEmpleadoLateral);
