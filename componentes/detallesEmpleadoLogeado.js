class DetalleEmpleadoLogeado extends HTMLElement {
    constructor () {
        super();
    }
    connectedCallback(){
        this.innerHTML = `
                <div class="row">
                    <div class="col s12 l5 ">
                      <div class="card ContenidoUsLogeado1 center-align">
                        <div class="card-content ">
                          <div class="d-flex flex-row">
                            <div class="align-self-center"><img class="circle" width="100" id="ImgEmpleadoDetalle"></img></div>
                            <div class="m-l-10 align-self-center truncate">
                              <h5 id="NombreEmpleadoDetalle" style="margin-top: 5%;color:white"></h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col s12 l7">
                      <div class="card ContenidoUsLogeado2">
                        <div class="card-content">
                          <div class="d-flex flex-row">
                            <div class="col s12 l4 m-l-10 align-self-center truncate">
                                <div>
                                    <span class="blue-text display-6"><i class="fas fa-envelope"></i></span>
                                </div>
                                <h6><b>E-mail</b></h6>
                                <h6 id="EmailEmpleadoDetalle"></h6>
                            </div>
                            <div class="col s12 l4 m-l-10 align-self-center truncate">
                                <div>
                                    <span class="blue-text display-6"><i class="fas fa-mobile-alt"></i></span>
                                </div>
                                <h6><b>Celular</b></h6>
                                <h6 id="CelularEmpleadoDetalle"></h6>
                            </div>
                            <div class="col s12 l4 m-l-10 align-self-center truncate">
                                <div>
                                    <span class="blue-text display-6"><i class="fas fa-briefcase"></i></span>
                                </div>
                                <h6><b>Puesto</b></h6>
                                <h6 id="PuestoEmpleadoDetalle"></h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
        `;
    }
}

window.customElements.define("detalle-empleado-logeado",DetalleEmpleadoLogeado);
