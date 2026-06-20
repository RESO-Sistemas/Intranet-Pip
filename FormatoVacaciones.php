<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>Solicitud de Vacaciones — PIP</title>

  <?php include("neptune_styles.php"); ?>

  <style>
    /* ── Variables de diseño ──────────────────────── */
    :root {
      --pip-yellow: #008837;
      --pip-dark:   #1a1a2e;
      --border:     #E2E8F0;
      --text-muted: #64748B;
      --bg-light:   #F8FAFC;
    }

    /* ── Contenedor principal del formato ─────────── */
    #formatoVacaciones {
      max-width: 720px;
      margin: 32px auto;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0,0,0,.08);
      overflow: hidden;
    }

    /* ── Encabezado con franja amarilla ───────────── */
    .formato-header {
      background: var(--pip-dark);
      padding: 28px 36px 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .formato-header .logo-wrap img {
      height: 48px;
      object-fit: contain;
      filter: brightness(0) invert(1);
    }
    .formato-header .titulo-wrap h2 {
      color: #fff;
      font-size: 18px;
      font-weight: 700;
      margin: 0;
      letter-spacing: .3px;
    }
    .formato-header .titulo-wrap p {
      color: var(--pip-yellow);
      font-size: 12px;
      font-weight: 600;
      margin: 2px 0 0;
      text-transform: uppercase;
      letter-spacing: .8px;
    }

    /* ── Cuerpo del formato ───────────────────────── */
    .formato-body {
      padding: 28px 36px;
    }

    /* ── Secciones de datos ───────────────────────── */
    .formato-section {
      margin-bottom: 24px;
    }
    .formato-section-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .8px;
      color: var(--text-muted);
      margin-bottom: 12px;
      padding-bottom: 6px;
      border-bottom: 2px solid var(--pip-yellow);
      display: inline-block;
    }

    /* ── Grid de campos ───────────────────────────── */
    .campo-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px 24px;
    }
    .campo-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .campo-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: .5px;
    }
    .campo-valor {
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
    }

    /* ── Tarjeta de días ──────────────────────────── */
    .dias-cards {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-top: 4px;
    }
    .dias-card {
      background: var(--bg-light);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 14px 18px;
      text-align: center;
    }
    .dias-card .dias-num {
      font-size: 28px;
      font-weight: 800;
      line-height: 1;
      color: var(--pip-dark);
    }
    .dias-card .dias-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: .5px;
      margin-top: 4px;
    }
    .dias-card.highlight {
      background: #f0fdf4;
      border-color: var(--pip-yellow);
    }
    .dias-card.highlight .dias-num { color: #92400E; }

    /* ── Sección de firmas ────────────────────────── */
    .firmas-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-top: 8px;
    }
    .firma-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    .firma-box .firma-img-wrap {
      width: 100%;
      height: 80px;
      border-bottom: 2px solid var(--border);
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 6px;
    }
    .firma-box img {
      max-height: 72px;
      max-width: 100%;
      object-fit: contain;
    }
    .firma-box .firma-nombre {
      font-size: 12px;
      font-weight: 600;
      text-align: center;
      color: #1e293b;
    }
    .firma-box .firma-rol {
      font-size: 11px;
      color: var(--text-muted);
      text-align: center;
    }

    /* ── Barra de acciones (no imprimible) ─────────── */
    .acciones-barra {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      max-width: 720px;
      margin: 0 auto 40px;
      padding: 0 36px;
    }

    /* ── Reglas de impresión ─────────────────────── */
    @media print {
      .acciones-barra { display: none !important; }
      #formatoVacaciones {
        box-shadow: none;
        border-radius: 0;
        margin: 0;
      }
      body { background: #fff !important; }
    }

    /* ── Responsive ───────────────────────────────── */
    @media (max-width: 600px) {
      .formato-header { flex-direction: column; text-align: center; padding: 20px; }
      .formato-body { padding: 20px; }
      .campo-grid { grid-template-columns: 1fr; }
      .firmas-grid { grid-template-columns: 1fr; }
      .dias-cards { grid-template-columns: 1fr; }
    }
  </style>
</head>

<body style="background:#F1F5F9;">

  <!-- ── Formato de solicitud ─────────────────────────────────── -->
  <div id="formatoVacaciones">

    <!-- Encabezado -->
    <div class="formato-header">
      <div class="logo-wrap">
        <img src="assets/images/logo-pip.png" alt="Logo PIP">
      </div>
      <div class="titulo-wrap text-end">
        <h2>Solicitud de Vacaciones</h2>
        <p>Recursos Humanos</p>
      </div>
    </div>

    <div class="formato-body">

      <!-- Datos del empleado -->
      <div class="formato-section">
        <div class="formato-section-title">Datos del Empleado</div>
        <div class="campo-grid">
          <div class="campo-item">
            <span class="campo-label">Nombre</span>
            <span class="campo-valor" id="NombreSolicitante">—</span>
          </div>
          <div class="campo-item">
            <span class="campo-label">No. Empleado</span>
            <span class="campo-valor" id="NoEmpleadoSolicitante">—</span>
          </div>
          <div class="campo-item">
            <span class="campo-label">Puesto</span>
            <span class="campo-valor" id="PuestoSolicitante">—</span>
          </div>
          <div class="campo-item">
            <span class="campo-label">Departamento</span>
            <span class="campo-valor" id="DepSolicitante">—</span>
          </div>
          <div class="campo-item">
            <span class="campo-label">Sucursal</span>
            <span class="campo-valor" id="SucursalSolicitante">—</span>
          </div>
          <div class="campo-item">
            <span class="campo-label">Fecha de Ingreso</span>
            <span class="campo-valor" id="FechaIngresoSolicitante">—</span>
          </div>
        </div>
      </div>

      <!-- Datos de la solicitud -->
      <div class="formato-section">
        <div class="formato-section-title">Datos de la Solicitud</div>
        <div class="campo-grid">
          <div class="campo-item">
            <span class="campo-label">Fecha de Solicitud</span>
            <span class="campo-valor" id="FechaSolicitudSolicitante">—</span>
          </div>
          <div class="campo-item">
            <span class="campo-label">Vacaciones del</span>
            <span class="campo-valor" id="VacacionesDel">—</span>
          </div>
          <div class="campo-item">
            <span class="campo-label">Regresando el</span>
            <span class="campo-valor" id="VacacionesHasta">—</span>
          </div>
        </div>
      </div>

      <!-- Días -->
      <div class="formato-section">
        <div class="formato-section-title">Días</div>
        <div class="dias-cards">
          <div class="dias-card">
            <div class="dias-num" id="DiasDisponibles">—</div>
            <div class="dias-label">Días disponibles</div>
          </div>
          <div class="dias-card highlight">
            <div class="dias-num" id="TotalDias">—</div>
            <div class="dias-label">Días a disfrutar</div>
          </div>
        </div>
      </div>

      <!-- Autorizaciones -->
      <div class="formato-section">
        <div class="formato-section-title">Autorizaciones</div>
        <div class="firmas-grid">

          <div class="firma-box">
            <div class="firma-img-wrap">
              <img src="" id="imgFirmaSolicitante" alt="Firma solicitante">
            </div>
            <span class="firma-nombre" id="NombreSolicitanteFirma">—</span>
            <span class="firma-rol">Solicitante</span>
          </div>

          <div class="firma-box">
            <div class="firma-img-wrap">
              <img src="" id="imgFirmaJefeInmediato" alt="Firma jefe inmediato">
            </div>
            <span class="firma-nombre" id="JefeInmediato">—</span>
            <span class="firma-rol">Jefe Inmediato</span>
          </div>

          <div class="firma-box">
            <div class="firma-img-wrap">
              <img src="" id="imgFirmaRecursosH" alt="Firma Recursos Humanos">
            </div>
            <span class="firma-nombre">—</span>
            <span class="firma-rol">Recursos Humanos</span>
          </div>

        </div>
      </div>

    </div><!-- /formato-body -->
  </div><!-- /formatoVacaciones -->

  <!-- ── Barra de acciones (solo pantalla, no imprimible) ─────── -->
  <div class="acciones-barra">
    <a href="SolicitudVacaciones.php" class="btn btn-outline-secondary d-inline-flex align-items-center gap-1">
      <span class="material-symbols-outlined" style="font-size:16px;">arrow_back</span>
      Regresar
    </a>
    <button onclick="printHTML()" class="btn btn-primary d-inline-flex align-items-center gap-1">
      <span class="material-symbols-outlined" style="font-size:16px;">print</span>
      Imprimir
    </button>
    <button id="btnPDF" onclick="descargaPDF()" class="btn btn-success d-inline-flex align-items-center gap-1">
      <span class="material-symbols-outlined" style="font-size:16px;">picture_as_pdf</span>
      Descargar PDF
    </button>
  </div>

  <!-- Scripts -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <script src="assets/libs/jquery/dist/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

  <?php include("neptune_js.php"); ?>

  <script type="text/javascript">
    const myKeysValues = window.location.search;
    const urlParams    = new URLSearchParams(myKeysValues);
    const idSolicitud  = urlParams.get('Solicitud');

    function resolveSignatureAsset(signatureValue, employeeNumber) {
      if (!signatureValue || signatureValue === "null") {
        return "";
      }

      const normalized = String(signatureValue).trim();
      if (!normalized) {
        return "";
      }

      const normalizeDataUri = function(value) {
        const parts = value.split(",");
        if (parts.length < 2) {
          return value.replace(/ /g, "+");
        }

        return parts[0] + "," + parts.slice(1).join(",").replace(/ /g, "+");
      };

      if (normalized.startsWith("data:")) {
        return normalizeDataUri(normalized);
      }

      if (/^(https?:\/\/|\/|Archivos\/)/i.test(normalized)) {
        return normalized;
      }

      if (/\.(png|jpe?g|gif|webp|svg)$/i.test(normalized)) {
        return "Archivos/ImgEmpleados/" + employeeNumber + "/Firma/" + normalized;
      }

      return "data:image/png;base64," + normalized.replace(/ /g, "+");
    }

    function setSignatureImage(elementId, signatureValue, employeeNumber) {
      const element = document.getElementById(elementId);
      const resolvedSrc = resolveSignatureAsset(signatureValue, employeeNumber);

      if (!element) {
        return;
      }

      if (resolvedSrc) {
        element.src = resolvedSrc;
      } else {
        element.removeAttribute("src");
      }
    }

    // Cargar datos al entrar a la página
    verDetalleSolicitud();

    /**
     * Obtiene los detalles de la solicitud y puebla todos los campos del formato
     */
    function verDetalleSolicitud() {
      $.ajax({
        type: "post",
        url: "Backend/Empleados/App.php",
        data: { op: "getDetalleSolicitud", idSolicitudesVacaciones: idSolicitud },
        success: function(response) {
          response = JSON.parse(response.trim());
          if (!response || response.length === 0) return;

          const d = response[0];

          // Datos del empleado
          document.getElementById("NombreSolicitante").textContent       = d["NombreSolicitante"]  || "—";
          document.getElementById("NoEmpleadoSolicitante").textContent   = d["NoEmpleado"]         || "—";
          document.getElementById("PuestoSolicitante").textContent       = d["PuestoSolicitante"]  || "—";
          document.getElementById("DepSolicitante").textContent          = d["Departamento"]       || "—";
          document.getElementById("SucursalSolicitante").textContent     = d["Sucursal"]           || "—";
          document.getElementById("FechaIngresoSolicitante").textContent = d["Antiguedad"]         || "—";

          // Datos de la solicitud
          document.getElementById("FechaSolicitudSolicitante").textContent = d["FechaRegistroSoli"] || "—";
          document.getElementById("VacacionesDel").textContent             = d["FechaInicio"]       || "—";
          document.getElementById("VacacionesHasta").textContent           = d["FechaRegreso"]      || "—";

          // Días
          document.getElementById("DiasDisponibles").textContent = d["DiasVacacionesRest"] || "—";
          document.getElementById("TotalDias").textContent        = d["TotalDias"]          || "—";

          // Firmas y nombres
          document.getElementById("NombreSolicitanteFirma").textContent = d["NombreSolicitante"] || "—";
          document.getElementById("JefeInmediato").textContent          = d["NombreJefe"]        || "—";
          setSignatureImage("imgFirmaSolicitante", d["FirmaSolicitante"], d["NoEmpleado"]);

          // Mostrar firma del jefe si está autorizada
          if (d["Status"] == "1" || d["Status"] == "3") {
            setSignatureImage("imgFirmaJefeInmediato", d["FirmaJefe"], d["NoJefe"]);
          }
          // Mostrar firma final (Nómina) si está completamente autorizada
          if (d["Status"] == "3") {
            setSignatureImage("imgFirmaRecursosH", d["FirmaFinal"], d["NoFinalAutoriza"]);
          }
        }
      });
    }

    function printHTML() {
      if (window.print) window.print();
    }

    const { jsPDF } = window.jspdf;

    /**
     * Genera y descarga un PDF del formato de vacaciones usando html2canvas + jsPDF
     */
    function descargaPDF() {
      const btnPDF    = document.getElementById("btnPDF");
      const original  = btnPDF.innerHTML;
      btnPDF.disabled = true;
      btnPDF.innerHTML = '<span class="material-symbols-outlined" style="font-size:16px;animation:spin 1s linear infinite;">autorenew</span> Generando…';

      const elemento = document.getElementById("formatoVacaciones");
      html2canvas(elemento, { scale: 2, useCORS: true, backgroundColor: "#ffffff" }).then(function(canvas) {
        const imgData  = canvas.toDataURL("image/png");
        const doc      = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
        const pageW    = doc.internal.pageSize.getWidth();
        const pageH    = doc.internal.pageSize.getHeight();
        const ratio    = canvas.width / canvas.height;
        const imgW     = pageW - 40;
        const imgH     = imgW / ratio;
        doc.addImage(imgData, "PNG", 20, 20, imgW, Math.min(imgH, pageH - 40));
        doc.save("Solicitud_Vacaciones.pdf");
        btnPDF.disabled = false;
        btnPDF.innerHTML = original;
      });
    }
  </script>

</body>

</html>
