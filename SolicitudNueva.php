<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>PIP by Lugo</title>

  <?php include("neptune_styles.php"); ?>

  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

  <style>
    /* ── Canvas de firma ─────────────────────────────── */
    #draw-canvas {
      border: 2px solid #CCCCCC;
      border-radius: 12px;
      cursor: crosshair;
      display: block;
      width: 100%;
    }

    /* ── Toggles de días de descanso ─────────────────── */
    .day-toggle-btn {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      border: 2px solid #dee2e6;
      background: #fff;
      color: #6c757d;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: all .18s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      flex-shrink: 0;
    }
    .day-toggle-btn:hover {
      border-color: #ffc407;
      color: #856404;
      background: #FFFBEB;
    }
    .day-toggle-btn.active {
      background: #ffc407;
      border-color: #ffc407;
      color: #1a1a1a;
      box-shadow: 0 2px 8px rgba(255,196,7,.4);
    }

    /* ── Panel sticky de resumen ─────────────────────── */
    #panelResumen {
      position: sticky;
      top: 80px;
    }
    .resumen-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 6px 0;
      border-bottom: 1px solid #F1F5F9;
      font-size: 14px;
      gap: 8px;
    }
    .resumen-row:last-child { border-bottom: none; }
    .resumen-label { color: #64748B; white-space: nowrap; }
    .resumen-value { font-weight: 700; color: #1e293b; text-align: right; word-break: break-word; }

    /* ── Alerta inline de días insuficientes ─────────── */
    #alertaDiasInsuficientes {
      display: none;
      font-size: 13px;
    }

    /* ── Imagen de firma guardada ────────────────────── */
    .firma-container { display: none; }
    .firma-container img { max-height: 80px; }

    /* ── Botón Enviar deshabilitado ──────────────────── */
    #btnEnviarSolicitud:disabled {
      opacity: .55;
      cursor: not-allowed;
    }
  </style>

</head>

<body>
  <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
    <div class="preloader">
      <div class="loader">
        <div class="loader__figure"></div>
        <p class="loader__label">PIP</p>
      </div>
    </div>

    <div id="Menu">
      <?php include("menus.php"); ?>
    </div>

    <div class="app-container">
      <?php include("includes/_Header.php"); ?>
      <div class="app-content">
        <div class="content-wrapper">
          <div class="container">

            <!-- Mensajes flotantes (Bootstrap 5) -->
            <div class="col-10 offset-1 col-lg-5 offset-lg-7" style="position:fixed;z-index:99;">
              <div class="row">
                <div class="col-12" style="position:relative;">
                  <div id="contenidoMensajes" style="margin-right:2vh"></div>
                </div>
              </div>
            </div>

            <!-- Título de página -->
            <div class="row mb-3">
              <div class="col">
                <div class="page-description">
                  <h1>Nueva Solicitud de Vacaciones</h1>
                </div>
              </div>
            </div>

            <!-- Layout de dos columnas: formulario + panel de resumen -->
            <div class="row g-4 align-items-start">

              <!-- ══ Columna izquierda: formulario ══════════════════ -->
              <div class="col-12 col-lg-8">
                <div class="card border-0 shadow-sm" style="border-radius:16px;">
                  <div class="card-body p-4">

                    <!-- Nombre del empleado -->
                    <div class="d-flex align-items-center gap-3 mb-4 pb-3" style="border-bottom:1px solid #F1F5F9;">
                      <div class="d-flex align-items-center justify-content-center rounded-3"
                        style="width:48px;height:48px;background:#EFF6FF;flex-shrink:0;">
                        <span class="material-symbols-outlined" style="color:#2563EB;font-size:24px;">person</span>
                      </div>
                      <div>
                        <div class="text-muted" style="font-size:11px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;">Solicitante</div>
                        <div id="NombreEmpleado" class="fw-bold" style="font-size:16px;">Cargando…</div>
                      </div>
                    </div>

                    <!-- Fechas de inicio y fin -->
                    <div class="row g-3 mb-4">
                      <div class="col-12 col-sm-6">
                        <label class="form-label fw-semibold">
                          <span class="material-symbols-outlined align-middle me-1" style="font-size:16px;">calendar_today</span>
                          Fecha de Inicio
                        </label>
                        <input class="form-control form-control-solid-bordered"
                          id="FechaInicio" type="date"
                          onchange="validarFechas(); getDiasSeleccionados(); actualizarPanelResumen()"
                          required>
                        <p class="error-message" data-msg="Es necesario ingresar una fecha." for="FechaInicio"></p>
                        <input type="hidden" id="CantidadDiasDisp" value="">
                      </div>
                      <div class="col-12 col-sm-6">
                        <label class="form-label fw-semibold">
                          <span class="material-symbols-outlined align-middle me-1" style="font-size:16px;">event</span>
                          Fecha de Fin
                        </label>
                        <input class="form-control form-control-solid-bordered"
                          id="FechaFin" type="date"
                          onchange="validarFechas(); getDiasSeleccionados(); actualizarPanelResumen()"
                          required>
                        <p for="FechaFin" data-msg="Es necesario ingresar una fecha."></p>
                      </div>
                    </div>

                    <!-- Badges ocultos requeridos por SolicitudNueva.js para actualizar estado interno -->
                    <!-- No son visibles: el panel de resumen los lee y los muestra de forma mejorada -->
                    <span id="DiasDisponibles"  style="display:none;"></span>
                    <span id="DiasSeleccionados" style="display:none;"></span>
                    <span id="DiaRegreso"        style="display:none;"></span>

                    <!-- Alerta de días insuficientes -->
                    <div id="alertaDiasInsuficientes" class="alert alert-danger d-flex align-items-center gap-2 mb-4 py-2 px-3" role="alert">
                      <span class="material-symbols-outlined" style="font-size:18px;">warning</span>
                      <span>Los días seleccionados superan tus días disponibles. Ajusta las fechas para continuar.</span>
                    </div>

                    <!-- Días de descanso — toggle pills visuales -->
                    <div class="mb-4">
                      <label class="form-label fw-semibold d-block mb-1">
                        <span class="material-symbols-outlined align-middle me-1" style="font-size:16px;">weekend</span>
                        Días de descanso
                      </label>
                      <small class="text-muted d-block mb-3" style="font-size:12px;">
                        Selecciona los días que <strong>no</strong> cuentan como días laborales en tu jornada.
                      </small>
                      <div class="d-flex flex-wrap gap-2">
                        <button type="button" class="day-toggle-btn" data-value="Monday"    title="Lunes">Lu</button>
                        <button type="button" class="day-toggle-btn" data-value="Tuesday"   title="Martes">Ma</button>
                        <button type="button" class="day-toggle-btn" data-value="Wednesday" title="Miércoles">Mi</button>
                        <button type="button" class="day-toggle-btn" data-value="Thursday"  title="Jueves">Ju</button>
                        <button type="button" class="day-toggle-btn" data-value="Friday"    title="Viernes">Vi</button>
                        <button type="button" class="day-toggle-btn" data-value="Saturday"  title="Sábado">Sa</button>
                        <button type="button" class="day-toggle-btn" data-value="Sunday"    title="Domingo">Do</button>
                      </div>
                    </div>

                    <!-- Motivo de solicitud -->
                    <div class="mb-4">
                      <label class="form-label fw-semibold">
                        <span class="material-symbols-outlined align-middle me-1" style="font-size:16px;">edit_note</span>
                        Motivo de Solicitud
                      </label>
                      <textarea id="MotivoSolicitud" class="form-control"
                        placeholder="Describe brevemente el motivo de tu solicitud de vacaciones…"
                        style="height:120px; resize:vertical;"></textarea>
                    </div>

                    <!-- Firma actual -->
                    <div class="mb-4">
                      <label class="form-label fw-semibold d-block">
                        <span class="material-symbols-outlined align-middle me-1" style="font-size:16px;">draw</span>
                        Tu firma
                      </label>
                      <div class="firma-container mb-2">
                        <div class="p-2 border rounded-2 d-inline-block" style="background:#fafbfc;">
                          <img src="" class="imgFirmaClass d-block" id="imgFirma"
                            style="height:72px; max-width:260px; object-fit:contain;"
                            onerror="this.parentElement.parentElement.style.display='none';">
                        </div>
                        <div class="text-muted mt-1" style="font-size:11px;">Firma registrada</div>
                      </div>
                      <div>
                        <button type="button" class="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-1"
                          data-bs-toggle="modal" data-bs-target="#modalActualizarFirma">
                          <span class="material-symbols-outlined" style="font-size:16px;">edit</span>
                          Actualizar firma
                        </button>
                      </div>
                    </div>

                    <!-- Botones de acción -->
                    <div class="d-flex justify-content-between gap-2 mt-2 pt-3" style="border-top:1px solid #F1F5F9;">
                      <a href="SolicitudVacaciones.php" class="btn btn-outline-secondary d-inline-flex align-items-center gap-1">
                        <span class="material-symbols-outlined" style="font-size:16px;">arrow_back</span>
                        Regresar
                      </a>
                      <button id="btnEnviarSolicitud" class="btn btn-success d-inline-flex align-items-center gap-2"
                        onclick="enviarSolicitudVacaciones()">
                        <span class="material-symbols-outlined" style="font-size:18px;">send</span>
                        Enviar Solicitud
                      </button>
                    </div>

                  </div>
                </div>
              </div><!-- /col formulario -->

              <!-- ══ Columna derecha: panel de resumen sticky ═══════ -->
              <div class="col-12 col-lg-4">
                <div id="panelResumen" class="card border-0 shadow-sm" style="border-radius:16px;">
                  <div class="card-body p-4">

                    <div class="d-flex align-items-center gap-2 mb-3">
                      <span class="material-symbols-outlined" style="color:#ffc407;font-size:22px;">summarize</span>
                      <span class="fw-bold" style="font-size:15px;">Resumen de tu solicitud</span>
                    </div>

                    <!-- Días disponibles (siempre visible) -->
                    <div class="p-3 rounded-2 mb-3" style="background:#ECFDF5;">
                      <div class="text-muted" style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;">Días disponibles</div>
                      <div class="d-flex align-items-end gap-1 mt-1">
                        <span id="resumenDiasDisponibles" class="fw-bold" style="font-size:28px;line-height:1;color:#059669;">—</span>
                        <span class="text-muted mb-1" style="font-size:13px;">días</span>
                      </div>
                    </div>

                    <!-- Filas de resumen dinámico -->
                    <div id="resumenDetalle">
                      <div class="resumen-row">
                        <span class="resumen-label">Fecha inicio</span>
                        <span class="resumen-value" id="resumenFechaInicio">—</span>
                      </div>
                      <div class="resumen-row">
                        <span class="resumen-label">Fecha fin</span>
                        <span class="resumen-value" id="resumenFechaFin">—</span>
                      </div>
                      <div class="resumen-row">
                        <span class="resumen-label">Días de descanso</span>
                        <span class="resumen-value" id="resumenDiasDescanso">—</span>
                      </div>
                      <div class="resumen-row">
                        <span class="resumen-label">Días solicitados</span>
                        <span class="resumen-value" id="resumenDiasSolicitados">—</span>
                      </div>
                      <div class="resumen-row">
                        <span class="resumen-label">Día de regreso</span>
                        <span class="resumen-value" id="resumenDiaRegreso">—</span>
                      </div>
                    </div>

                    <!-- Saldo resultante -->
                    <div class="mt-3 p-3 rounded-2" style="background:#F8FAFC;border:1px solid #E2E8F0;">
                      <div class="text-muted" style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;">Días restantes después</div>
                      <div class="d-flex align-items-end gap-1 mt-1">
                        <span id="resumenSaldo" class="fw-bold" style="font-size:24px;line-height:1;color:#2563EB;">—</span>
                        <span class="text-muted mb-1" style="font-size:13px;">días</span>
                      </div>
                    </div>

                    <!-- Info del flujo -->
                    <div class="mt-3 p-2 rounded-2 d-flex align-items-start gap-2" style="background:#FFFBEB;">
                      <span class="material-symbols-outlined mt-1" style="color:#D97706;font-size:16px;flex-shrink:0;">info</span>
                      <p class="mb-0 text-muted" style="font-size:11px;line-height:1.5;">
                        Tu solicitud será revisada primero por tu <strong>jefe inmediato</strong>
                        y luego por <strong>Nómina</strong> antes de ser aprobada definitivamente.
                      </p>
                    </div>

                  </div>
                </div>
              </div><!-- /col panel resumen -->

            </div><!-- /row principal -->

            <!-- ── Modal: asignar jefe (oculto, activado por JS) ── -->
            <button type="button" id="openModalJefes" class="btn btn-primary"
              data-bs-toggle="modal" data-bs-target="#ModalAsignarHijo" style="display:none;"></button>

            <div class="modal fade" id="ModalAsignarHijo" tabindex="-1" aria-hidden="true" style="display:none;">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Asignar jefe inmediato</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                  </div>
                  <div class="modal-body">
                    <select id="listadoJefesPosibles" class="form-select" onchange="asignarJefeEmpleado(this.value)"></select>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- ── Modal: firma ─────────────────────────────────── -->
            <div class="modal fade" id="modalActualizarFirma" data-bs-backdrop="static"
              data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">
                      <span class="material-symbols-outlined align-middle me-1" style="font-size:18px;">draw</span>
                      Traza tu firma aquí
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                  </div>
                  <div class="modal-body">
                    <div class="row mx-1">
                      <div id="contentCanvas" class="col form-control form-control-solid-bordered"
                        style="text-align:center; height:200px; width:100%; padding:0; overflow:hidden;">
                        <canvas id="draw-canvas">No tienes un buen navegador.</canvas>
                      </div>
                      <input type="color" id="color" value="#1a1a1a" style="display:none;">
                      <input type="range" id="puntero" min="1" value="2" max="5" style="display:none;">
                    </div>
                    <p class="text-muted mt-2 mb-0" style="font-size:12px;">
                      Dibuja tu firma con el mouse o el dedo en pantallas táctiles.
                    </p>
                  </div>
                  <div class="modal-footer d-flex justify-content-between">
                    <button type="button" class="btn btn-outline-danger d-inline-flex align-items-center gap-1" id="draw-clearBtn">
                      <span class="material-symbols-outlined" style="font-size:16px;">restart_alt</span>
                      Repetir trazo
                    </button>
                    <button type="button" id="draw-submitBtn" class="btn btn-success d-inline-flex align-items-center gap-1">
                      <span class="material-symbols-outlined" style="font-size:16px;">save</span>
                      Guardar Firma
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div><!-- /container -->
        </div>
      </div>
    </div>
  </div>

  <!-- neptune Javascripts -->
  <?php include("neptune_js.php"); ?>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
    integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  <script src="scripts/SolicitudNueva.js" charset="utf-8"></script>

  <script type="text/javascript">

    // ── Inicialización ────────────────────────────────────────────────────────
    getFirmaEmp();

    /**
     * Obtiene la firma actual del empleado y la muestra en el formulario
     */
    function getFirmaEmp() {
      $.ajax({
        type: "post",
        url: "Backend/Empleados/App.php",
        data: "op=getFirmaEmp",
        success: function(response) {
          response = JSON.parse(response.trim());
          if (!response || response.length === 0) {
            $(".firma-container").hide();
          } else {
            for (var i = 0; i < response.length; i++) {
              if (response[i]["Firma"] && response[i]["Firma"] !== "" && response[i]["Firma"] !== "null") {
                let urlImg = "Archivos/ImgEmpleados/" + response[i]["NoEmpleado"] + "/Firma/" + response[i]["Firma"];
                $(".imgFirmaClass").attr("src", urlImg);
                $(".firma-container").show();
              } else {
                $(".firma-container").hide();
              }
            }
          }
        },
        error: function(e) { alert(e.responseText); }
      });
    }

    // ── Lógica de toggles de días de descanso ─────────────────────────────────
    document.querySelectorAll(".day-toggle-btn").forEach(function(btn) {
      btn.addEventListener("click", function() {
        this.classList.toggle("active");
        // Recalcular días al cambiar el toggle
        getDiasSeleccionados();
        establecerFechaMinima();
      });
    });

    // ── Panel de resumen en tiempo real ───────────────────────────────────────

    /**
     * Actualiza el panel sticky lateral con los valores actuales del formulario.
     * Lee glbDiasDisponibles (variable de SolicitudNueva.js) y los badges ocultos.
     */
    function actualizarPanelResumen() {
      const fechaIni = document.getElementById("FechaInicio").value;
      const fechaFin = document.getElementById("FechaFin").value;

      // Días disponibles: viene de la variable global de SolicitudNueva.js
      const diasDisp = typeof glbDiasDisponibles !== "undefined" ? parseInt(glbDiasDisponibles) || 0 : 0;
      const elResumenDiasDisp = document.getElementById("resumenDiasDisponibles");
      if (elResumenDiasDisp) elResumenDiasDisp.textContent = diasDisp > 0 ? diasDisp : "—";

      // Fechas
      const elRI = document.getElementById("resumenFechaInicio");
      const elRF = document.getElementById("resumenFechaFin");
      if (elRI) elRI.textContent = fechaIni ? formatearFecha(fechaIni) : "—";
      if (elRF) elRF.textContent = fechaFin ? formatearFecha(fechaFin) : "—";

      // Días solicitados: viene de la variable global cantidadDias de SolicitudNueva.js
      const diasSolicitados = typeof cantidadDias !== "undefined" ? parseInt(cantidadDias) || 0 : 0;
      const elRS = document.getElementById("resumenDiasSolicitados");
      if (elRS) elRS.textContent = diasSolicitados > 0 ? diasSolicitados + " días" : "—";

      // Día de regreso: viene del span oculto #DiaRegreso que escribe SolicitudNueva.js
      const elDiaReg = document.getElementById("DiaRegreso");
      const elRR = document.getElementById("resumenDiaRegreso");
      if (elRR && elDiaReg) {
        const texto = elDiaReg.textContent.replace("Regresando el día:", "").trim();
        elRR.textContent = texto && texto !== "Sin definir." ? texto : "—";
      }

      // Días de descanso seleccionados: leer pills activos
      const btnsActivos = document.querySelectorAll(".day-toggle-btn.active");
      const etiquetas   = Array.from(btnsActivos).map(b => b.title);
      const elRD = document.getElementById("resumenDiasDescanso");
      if (elRD) elRD.textContent = etiquetas.length > 0 ? etiquetas.join(", ") : "Ninguno";

      // Saldo restante + validación inline
      const saldo      = diasDisp - diasSolicitados;
      const elSaldo    = document.getElementById("resumenSaldo");
      const alertaDias = document.getElementById("alertaDiasInsuficientes");
      const btnEnviar  = document.getElementById("btnEnviarSolicitud");

      if (diasSolicitados > 0) {
        if (elSaldo) {
          elSaldo.textContent  = saldo;
          elSaldo.style.color  = saldo < 0 ? "#DC2626" : "#2563EB";
        }
        if (saldo < 0) {
          if (alertaDias) alertaDias.style.display = "flex";
          if (btnEnviar)  btnEnviar.disabled = true;
        } else {
          if (alertaDias) alertaDias.style.display = "none";
          if (btnEnviar)  btnEnviar.disabled = false;
        }
      } else {
        if (elSaldo) { elSaldo.textContent = "—"; elSaldo.style.color = "#2563EB"; }
        if (alertaDias) alertaDias.style.display = "none";
        if (btnEnviar)  btnEnviar.disabled = false;
      }
    }

    /**
     * Formatea una fecha ISO (YYYY-MM-DD) a formato legible (DD/MM/YYYY)
     */
    function formatearFecha(isoDate) {
      if (!isoDate) return "—";
      const [y, m, d] = isoDate.split("-");
      return d + "/" + m + "/" + y;
    }

    // Actualizar panel cuando SolicitudNueva.js modifica los spans ocultos
    const observerConfig  = { childList: true, characterData: true, subtree: true };
    const observerTargets = ["DiasSeleccionados", "DiaRegreso", "DiasDisponibles"];
    const observer = new MutationObserver(actualizarPanelResumen);
    observerTargets.forEach(function(id) {
      const el = document.getElementById(id);
      if (el) observer.observe(el, observerConfig);
    });

    // ── Lógica del canvas de firma (fix para móvil) ───────────────────────────
    window.requestAnimFrame = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame || function(cb) { window.setTimeout(cb, 1000 / 60); };
    })();

    let canvasListenersAttached = false;
    let drawing = false;
    let mousePos = { x: 0, y: 0 };
    let lastPos  = { x: 0, y: 0 };

    /**
     * Redimensiona y (si es la primera vez) adjunta listeners al canvas.
     * Se llama en cada apertura del modal para corregir el bug de ancho en móvil.
     */
    $('#modalActualizarFirma').on('shown.bs.modal', function() {
      const canvas       = document.getElementById("draw-canvas");
      const contentCanvas = document.getElementById("contentCanvas");

      // Medir el contenedor DESPUÉS de que el modal terminó de animar
      canvas.width  = contentCanvas.offsetWidth;
      canvas.height = contentCanvas.offsetHeight;

      if (!canvasListenersAttached) {
        const ctx      = canvas.getContext("2d");
        const clearBtn = document.getElementById("draw-clearBtn");
        const submitBtn = document.getElementById("draw-submitBtn");

        clearBtn.addEventListener("click", function() {
          // Limpiar el canvas preservando dimensiones
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        });

        submitBtn.addEventListener("click", function() {
          SubirFirma(canvas.toDataURL());
        });

        function getMousePos(canvasDom, e) {
          const rect = canvasDom.getBoundingClientRect();
          return { x: e.clientX - rect.left, y: e.clientY - rect.top };
        }
        function getTouchPos(canvasDom, e) {
          const rect = canvasDom.getBoundingClientRect();
          return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
        }

        canvas.addEventListener("mousedown",  function(e) { drawing = true;  lastPos = getMousePos(canvas, e); });
        canvas.addEventListener("mouseup",    function()  { drawing = false; });
        canvas.addEventListener("mousemove",  function(e) { mousePos = getMousePos(canvas, e); });
        canvas.addEventListener("touchstart", function(e) {
          e.preventDefault();
          mousePos = getTouchPos(canvas, e);
          const me = new MouseEvent("mousedown", { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
          canvas.dispatchEvent(me);
        }, { passive: false });
        canvas.addEventListener("touchend",   function(e) { e.preventDefault(); canvas.dispatchEvent(new MouseEvent("mouseup")); }, { passive: false });
        canvas.addEventListener("touchleave", function(e) { e.preventDefault(); canvas.dispatchEvent(new MouseEvent("mouseup")); }, { passive: false });
        canvas.addEventListener("touchmove",  function(e) {
          e.preventDefault();
          const me = new MouseEvent("mousemove", { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
          canvas.dispatchEvent(me);
        }, { passive: false });

        function renderCanvas() {
          if (drawing) {
            const tint  = document.getElementById("color");
            const punta = document.getElementById("puntero");
            ctx.strokeStyle = tint.value;
            ctx.beginPath();
            ctx.moveTo(lastPos.x, lastPos.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.lineWidth = punta.value;
            ctx.lineCap  = "round";
            ctx.stroke();
            ctx.closePath();
            lastPos = mousePos;
          }
        }
        (function drawLoop() { requestAnimFrame(drawLoop); renderCanvas(); })();
        canvasListenersAttached = true;
      }
    });

    /**
     * Envía la firma en base64 al servidor y actualiza la imagen mostrada
     */
    function SubirFirma(imagen64) {
      $.ajax({
        type: "POST",
        url: "Backend/Empleados/App.php",
        data: "op=SubirFirma&imagen64=" + imagen64,
        success: function() {
          $('#modalActualizarFirma').modal('hide');
          getFirmaEmp();
        },
        error: function(e) { alert(e.responseText); }
      });
    }

    function onlynumber(e) {
      tecla = (document.all) ? e.keyCode : e.which;
      if (tecla == 8) { return true; }
      patron = /[-0-9]/;
      return patron.test(String.fromCharCode(tecla));
    }

  </script>

</body>

</html>
