<?php
// ProcesosVacantesIbero.php — Gestión de catálogo de procesos Ibero
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Procesos de Vacantes — IBERO Admin</title>
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
        <a href="PostulantesVacanteIbero.php"><i data-lucide="users"></i> Postulantes</a>
        <a href="PostulantesGeneralIbero.php"><i data-lucide="database"></i> Base Candidatos</a>
        <a href="ProcesosVacantesIbero.php" class="active"><i data-lucide="git-branch"></i> Procesos</a>
        <a href="EvaluacionesIbero.php"><i data-lucide="clipboard-list"></i> Evaluaciones</a>
        <a href="ResultadosEvaluacionIbero.php"><i data-lucide="bar-chart-2"></i> Resultados</a>
        <div class="border-t border-white/10 mt-3 pt-3">
            <a href="BolsaDeTrabajoIbero.php" target="_blank"><i data-lucide="external-link"></i> Portal Público</a>
        </div>
    </div>

    <div style="flex:1; padding:24px;">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h1 class="h3 fw-bold mb-0">Procesos de Vacantes <span style="color:#c0392b;">Ibero</span></h1>
                <p class="text-muted small">Catálogo de etapas del proceso de selección</p>
            </div>
            <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalAddProceso">
                + Nuevo Proceso
            </button>
        </div>

        <div class="card shadow-sm">
            <div class="card-body">
                <table id="tableProcesos" class="table table-hover align-middle" style="width:100%">
                    <thead class="table-light">
                        <tr><th>#</th><th>Nombre del Proceso</th><th>Descripción</th><th>Estatus</th></tr>
                    </thead>
                    <tbody id="tbodyProcesos"></tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<!-- Modal Agregar Proceso -->
<div class="modal fade" id="modalAddProceso" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title">Nuevo Proceso</h5>
                <button class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3"><label class="form-label fw-bold">Nombre <span class="text-danger">*</span></label>
                    <input id="txtNombreProceso" class="form-control" placeholder="Ej. Entrevista con Área"></div>
                <div class="mb-3"><label class="form-label fw-bold">Descripción</label>
                    <textarea id="txtDescripcionProceso" class="form-control" rows="3" placeholder="Descripción del proceso..."></textarea></div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button class="btn btn-danger" id="btnAddProceso">Registrar</button>
            </div>
        </div>
    </div>
</div>

<script>
const API_PROC = 'Backend/ProcesosVacantes/App.php';

$(function() {
    cargarProcesos();
    toastr.options = {positionClass:'toast-top-right',timeOut:4000};
});

function cargarProcesos() {
    $.post(API_PROC, {op:'getProcesosActivos'}, function(r) {
        const tbody = document.getElementById('tbodyProcesos');
        if (!r.Resultado || !r.Data || r.Data.length===0) {
            tbody.innerHTML='<tr><td colspan="4" class="text-center text-muted py-5">No hay procesos registrados.</td></tr>'; return;
        }
        tbody.innerHTML = r.Data.map(p=>`
        <tr>
            <td>${p.IdProceso}</td>
            <td class="fw-semibold">${p.NombreProceso}</td>
            <td class="text-muted small">${p.Descripcion||'—'}</td>
            <td><span class="badge ${p.Estatus==1?'bg-success':'bg-secondary'}">${p.Estatus==1?'Activo':'Inactivo'}</span></td>
        </tr>`).join('');
        if ($.fn.DataTable.isDataTable('#tableProcesos')) $('#tableProcesos').DataTable().destroy();
        $('#tableProcesos').DataTable({ language:{url:'https://cdn.datatables.net/plug-ins/1.13.7/i18n/es-MX.json'}, order:[[0,'asc']] });
    }, 'json').fail(()=>toastr.error('Error al cargar procesos.'));
}

$('#btnAddProceso').click(function() {
    const n = $('#txtNombreProceso').val().trim();
    const d = $('#txtDescripcionProceso').val().trim();
    if (!n) { toastr.warning('El nombre es obligatorio.'); return; }
    $(this).prop('disabled',true).text('Guardando...');
    $.post(API_PROC, {op:'addProceso',NombreProceso:n,Descripcion:d}, function(r) {
        if (r.Resultado) { toastr.success(r.Msg||'Proceso registrado.'); bootstrap.Modal.getInstance(document.getElementById('modalAddProceso')).hide(); cargarProcesos(); }
        else toastr.error(r.Msg||'Error.');
        $('#btnAddProceso').prop('disabled',false).text('Registrar');
    }, 'json');
});
lucide.createIcons();
</script>
</body>
</html>
