<?php
$idVacanteEnc = $_GET['id'] ?? '';
$nombreVacante = htmlspecialchars($_GET['nombre'] ?? 'Vacante');
$sinId = empty($idVacanteEnc);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Postulantes — <?= $nombreVacante ?> | IBERO Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>tailwind.config={theme:{extend:{colors:{ibero:{DEFAULT:'#c0392b',dark:'#922b21',light:'#e74c3c'}},fontFamily:{sans:['Inter','sans-serif']}}}}</script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/dataTables.bootstrap5.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.7/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <style>
        body { font-family:'Inter',sans-serif; background:#f8f9fa; }
        .sidebar { width:240px; background:#1a0a0a; min-height:100vh; flex-shrink:0; }
        .sidebar a { display:flex; align-items:center; gap:10px; padding:10px 18px; color:#ccc; text-decoration:none; border-radius:8px; margin:2px 8px; font-size:0.875rem; transition:all .2s; }
        .sidebar a:hover, .sidebar a.active { background:rgba(192,57,43,0.15); color:#e74c3c; }
        .table-responsive { overflow:visible!important; }
        .dropdown-menu { z-index:1050; }
        .avatar { width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; color:white; font-size:0.9rem; }
        .status-badge { font-size:0.75rem; padding:0.25em 0.6em; border-radius:999px; font-weight:600; }
    </style>
</head>
<body>
<div style="display:flex;">
    <div class="sidebar py-4">
        <div class="px-5 pb-4 mb-2 border-b border-white/10">
            <div class="d-flex align-items-center gap-3">
                <div style="width:36px;height:36px;background:#c0392b;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:900;color:white;font-size:1.1rem;">I</div>
                <div><div style="color:white;font-weight:700;font-size:0.9rem;">Ibero Admin</div>
                     <div style="color:#777;font-size:0.7rem;">Bolsa de Trabajo</div></div>
            </div>
        </div>
        <a href="VacantesIbero.php"><i data-lucide="briefcase"></i> Vacantes</a>
        <a href="PostulantesVacanteIbero.php" class="active"><i data-lucide="users"></i> Postulantes</a>
        <a href="PostulantesGeneralIbero.php"><i data-lucide="database"></i> Base Candidatos</a>
        <a href="ProcesosVacantesIbero.php"><i data-lucide="git-branch"></i> Procesos</a>
        <a href="EvaluacionesIbero.php"><i data-lucide="clipboard-list"></i> Evaluaciones</a>
        <a href="ResultadosEvaluacionIbero.php"><i data-lucide="bar-chart-2"></i> Resultados</a>
        <div class="border-t border-white/10 mt-3 pt-3">
            <a href="BolsaDeTrabajoIbero.php" target="_blank"><i data-lucide="external-link"></i> Portal Público</a>
        </div>
    </div>

    <div style="flex:1; padding:24px;">
        <!-- Panel selector de vacante -->
        <div class="card shadow-sm mb-4">
            <div class="card-body">
                <div class="mb-3">
                    <label class="form-label fw-bold">Selecciona una vacante:</label>
                    <select id="selectorVacante" class="form-select">
                        <option value="">-- Elige una vacante --</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="d-flex align-items-center gap-3 mb-4">
            <a href="VacantesIbero.php" class="btn btn-sm btn-outline-secondary">← Vacantes</a>
            <div>
                <h1 class="h4 fw-bold mb-0" id="titulo-vacante"><?= $nombreVacante ?></h1>
                <p class="text-muted small mb-0">Postulantes registrados en esta vacante</p>
            </div>
        </div>

        <!-- Stats de postulantes -->
        <div class="row g-3 mb-4">
            <div class="col-md-3"><div class="card text-center"><div class="card-body py-2">
                <h4 class="text-primary mb-0" id="statTotal">-</h4><small class="text-muted">Total</small>
            </div></div></div>
            <div class="col-md-3"><div class="card text-center"><div class="card-body py-2">
                <h4 class="text-info mb-0" id="statProceso">-</h4><small class="text-muted">En Proceso</small>
            </div></div></div>
            <div class="col-md-3"><div class="card text-center"><div class="card-body py-2">
                <h4 class="text-success mb-0" id="statAceptados">-</h4><small class="text-muted">Aceptados</small>
            </div></div></div>
            <div class="col-md-3"><div class="card text-center"><div class="card-body py-2">
                <h4 class="text-danger mb-0" id="statRechazados">-</h4><small class="text-muted">Descartados</small>
            </div></div></div>
        </div>

        <div class="card shadow-sm">
            <div class="card-body">
                <div class="table-responsive">
                    <table id="tablePostulantes" class="table table-hover align-middle" style="width:100%">
                        <thead class="table-light">
                            <tr>
                                <th>Postulante</th>
                                <th>CURP</th>
                                <th>Teléfono</th>
                                <th>Correo</th>
                                <th>Fecha</th>
                                <th>Estatus</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyPostulantes"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Cambiar Estatus -->
<div class="modal fade" id="modalEstatus" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header"><h5 class="modal-title">Actualizar Estatus</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button></div>
            <div class="modal-body">
                <input type="hidden" id="estatusIdPV">
                <p class="text-muted mb-3">Candidato: <strong id="estatusNombreCandiato"></strong></p>
                <div class="mb-3"><label class="form-label fw-bold">Nuevo Estatus:</label>
                    <select id="cmbNuevoEstatus" class="form-select">
                        <option value="1">En Proceso</option>
                        <option value="2">Aceptado</option>
                        <option value="3">Descartado</option>
                        <option value="4">Finalizado</option>
                    </select></div>
                <div class="mb-3"><label class="form-label fw-bold">Observaciones:</label>
                    <textarea id="txtObservacionesEstatus" class="form-control" rows="3" placeholder="Comentarios..."></textarea></div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button class="btn btn-danger" id="btnGuardarEstatus">Guardar</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Agregar Proceso -->
<div class="modal fade" id="modalProceso" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header"><h5 class="modal-title">Registrar Proceso</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button></div>
            <div class="modal-body">
                <input type="hidden" id="procesoIdPV">
                <div class="mb-3"><label class="form-label fw-bold">Proceso:</label>
                    <select id="cmbProceso" class="form-select"><option value="">Seleccione...</option></select></div>
                <div class="mb-3"><label class="form-label fw-bold">Observaciones:</label>
                    <textarea id="txtObservacionesProceso" class="form-control" rows="3"></textarea></div>
                <div class="mb-3"><label class="form-label fw-bold">Resultado:</label>
                    <select id="cmbResultadoProceso" class="form-select">
                        <option value="">Pendiente</option>
                        <option value="1">Aprobado ✓</option>
                        <option value="0">No aprobado ✗</option>
                    </select></div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button class="btn btn-danger" id="btnGuardarProceso">Registrar</button>
            </div>
        </div>
    </div>
</div>

<script>
let ID_VACANTE = '<?= $idVacanteEnc ?>';
const API = 'Backend/Postulantes/App.php';
const API_VAC = 'Backend/Vacantes/App.php';
let tableP;

const COLORES = {1:'bg-primary text-white',2:'bg-success text-white',3:'bg-danger text-white',4:'bg-secondary text-white'};
const LABELS  = {1:'En Proceso',2:'Aceptado',3:'Descartado',4:'Finalizado'};

function enc(id) { return btoa(id); }

$(function() {
    // Cargar procesos disponibles
    $.post(API_VAC, {op:'getProcesosVacantesActivos'}, function(r) {
        if (Array.isArray(r)) r.forEach(p => $('#cmbProceso').append(`<option value="${p.IdProceso}">${p.NombreProceso}</option>`));
    }, 'json');

    // Cargar vacantes siempre para selector
    cargarVacantes();

    // Cargar postulantes si hay ID
    if (ID_VACANTE) {
        cargarPostulantes();
    }
    toastr.options = {positionClass:'toast-top-right',timeOut:4000,progressBar:true};
});

function cargarVacantes() {
    $.post(API_VAC, {op:'getVacantes'}, function(r) {
        if (Array.isArray(r) && r.length) {
            const sel = document.getElementById('selectorVacante');
            r.forEach(v => {
                const opt = document.createElement('option');
                opt.value = enc(v.IdVacante);
                opt.textContent = v.NombreVacante;
                sel.appendChild(opt);
            });
            if (ID_VACANTE) sel.value = ID_VACANTE;
        }
    }, 'json');
}

document.addEventListener('DOMContentLoaded', function() {
    const sel = document.getElementById('selectorVacante');
    if (sel) {
        sel.addEventListener('change', function() {
            if (this.value) {
                const nombre = this.options[this.selectedIndex].text;
                window.location.href = `PostulantesVacanteIbero.php?id=${this.value}&nombre=${encodeURIComponent(nombre)}`;
            }
        });
    }
});

function cargarPostulantes() {
    if (!ID_VACANTE) { $('#tbodyPostulantes').html('<tr><td colspan="7" class="text-center text-muted">No se especificó una vacante.</td></tr>'); return; }

    // Stats
    $.post(API, {op:'getEstadisticasPostulantes', IdVacante:ID_VACANTE}, function(r) {
        if (r.Resultado && r.Data) {
            const d = r.Data;
            $('#statTotal').text(d.TotalPostulantes||0);
            $('#statProceso').text(d.EnProceso||0);
            $('#statAceptados').text(d.Aceptados||0);
            $('#statRechazados').text(d.Rechazados||0);
        }
    }, 'json');

    // Lista
    $.post(API, {op:'getPostulantesByVacante', IdVacante:ID_VACANTE}, function(r) {
        const tbody = document.getElementById('tbodyPostulantes');
        if (!r.Resultado || !r.Data || r.Data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-5">No hay postulantes registrados.</td></tr>';
            return;
        }
        let html = '';
        r.Data.forEach(p => {
            const idEnc = enc(p.IdPostulanteVacante);
            const nombre = `${p.Nombre} ${p.ApellidoPaterno} ${p.ApellidoMaterno||''}`.trim();
            const iniciales = (p.Nombre.charAt(0)+p.ApellidoPaterno.charAt(0)).toUpperCase();
            const col = ['#c0392b','#2980b9','#27ae60','#8e44ad','#d35400'][p.IdPostulante%5];
            const fecha = new Date(p.FechaPostulacion).toLocaleDateString('es-MX',{day:'2-digit',month:'short',year:'numeric'});
            const labelEs = LABELS[p.EstatusPostulacion]||'En Proceso';
            const badgeC = p.EstatusPostulacion==1?'bg-info':p.EstatusPostulacion==2?'bg-success':p.EstatusPostulacion==3?'bg-danger':'bg-secondary';
            html += `
            <tr>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <div class="avatar" style="background:${col};min-width:40px;">${iniciales}</div>
                        <div><div class="fw-semibold">${nombre}</div><div class="text-muted small">${p.Ciudad||''} ${p.Estado?', '+p.Estado:''}</div></div>
                    </div>
                </td>
                <td><code class="small">${p.CURP||'—'}</code></td>
                <td>${p.Telefono||'—'}</td>
                <td><a href="mailto:${p.CorreoElectronico}" class="text-decoration-none small">${p.CorreoElectronico}</a></td>
                <td class="small">${fecha}</td>
                <td><span class="badge ${badgeC} status-badge">${labelEs}</span></td>
                <td>
                    <div class="d-flex gap-1">
                        <button class="btn btn-sm btn-outline-danger" onclick="abrirModalEstatus('${idEnc}','${nombre.replace(/'/g,"\\'")}',${p.EstatusPostulacion})" title="Cambiar estatus">📋</button>
                        <button class="btn btn-sm btn-outline-secondary" onclick="abrirModalProceso('${idEnc}')" title="Registrar proceso">➕</button>
                    </div>
                </td>
            </tr>`;
        });
        tbody.innerHTML = html;

        if ($.fn.DataTable.isDataTable('#tablePostulantes')) {
            $('#tablePostulantes').DataTable().destroy();
        }
        $('#tablePostulantes').DataTable({
            language: { url:'https://cdn.datatables.net/plug-ins/1.13.7/i18n/es-MX.json' },
            order: [[4,'desc']]
        });
    }, 'json');
}

// Estatus
function abrirModalEstatus(idEnc, nombre, estatusActual) {
    $('#estatusIdPV').val(idEnc);
    $('#estatusNombreCandiato').text(nombre);
    $('#cmbNuevoEstatus').val(estatusActual);
    $('#txtObservacionesEstatus').val('');
    new bootstrap.Modal(document.getElementById('modalEstatus')).show();
}
$('#btnGuardarEstatus').click(function() {
    const idEnc = $('#estatusIdPV').val();
    const est = $('#cmbNuevoEstatus').val();
    const obs = $('#txtObservacionesEstatus').val();
    $(this).prop('disabled',true).text('Guardando...');
    $.post(API, {op:'updateEstatusPostulacion',IdPostulanteVacante:idEnc,EstatusPostulacion:est,Observaciones:obs}, function(r) {
        if (r.Resultado) { toastr.success(r.Msg); bootstrap.Modal.getInstance(document.getElementById('modalEstatus')).hide(); cargarPostulantes(); }
        else toastr.error(r.Msg);
        $('#btnGuardarEstatus').prop('disabled',false).text('Guardar');
    }, 'json');
});

// Proceso
function abrirModalProceso(idEnc) {
    $('#procesoIdPV').val(idEnc);
    $('#cmbProceso,#cmbResultadoProceso').val('');
    $('#txtObservacionesProceso').val('');
    new bootstrap.Modal(document.getElementById('modalProceso')).show();
}
$('#btnGuardarProceso').click(function() {
    const idEnc = $('#procesoIdPV').val();
    const proc = $('#cmbProceso').val();
    if (!proc) { toastr.warning('Selecciona un proceso.'); return; }
    const obs = $('#txtObservacionesProceso').val();
    const res = $('#cmbResultadoProceso').val();
    $(this).prop('disabled',true).text('Guardando...');
    $.post(API, {op:'addPostulanteHistorial',IdPostulanteVacante:idEnc,IdProceso:proc,Observaciones:obs,Resultado:res||''}, function(r) {
        if (r.Resultado) { toastr.success(r.Msg||'Proceso registrado.'); bootstrap.Modal.getInstance(document.getElementById('modalProceso')).hide(); }
        else toastr.error(r.Msg);
        $('#btnGuardarProceso').prop('disabled',false).text('Registrar');
    }, 'json');
});
lucide.createIcons();
</script>
</body>
</html>
