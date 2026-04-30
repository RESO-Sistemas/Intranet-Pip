/**
 * EmpresasIbero.js — CRUD de empresas Ibero.
 */

const API_EMPRESAS = 'Backend/Empresas/App.php';
let tableEmpresas;

$(function() {
    initTable();
    loadEmpresas();
});

function initTable() {
    tableEmpresas = $('#tableEmpresas').DataTable({
        language: { url: 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/es-MX.json' },
        columns: [
            { data: 'IdEmpresa', width: '50px' },
            { data: 'Empresa' },
            { data: 'Descripcion', defaultContent: '—', render: d => d ? (d.length > 60 ? d.substring(0, 60) + '…' : d) : '—' },
            { data: 'Estatus', render: d => d == 1
                ? '<span class="badge bg-success">Activa</span>'
                : '<span class="badge bg-secondary">Inactiva</span>' },
            { data: null, render: renderAcciones, orderable: false, width: '120px' }
        ],
        order: [[1, 'asc']]
    });
}

function renderAcciones(row) {
    const idEnc = btoa(row.IdEmpresa);
    return `
    <div class="d-flex gap-1">
        <button class="btn btn-sm btn-outline-primary" onclick="editarEmpresa('${idEnc}')">✏️</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteEmpresa('${idEnc}')">🗑️</button>
    </div>`;
}

function loadEmpresas() {
    $.post(API_EMPRESAS, {op:'getEmpresas'}, function(r) {
        const data = Array.isArray(r) ? r : [];
        tableEmpresas.clear().rows.add(data).draw();
        $('#totalEmpresas').text(data.length);
        $('#empresasActivas').text(data.filter(e => e.Estatus == 1).length);
    }, 'json').fail(() => toastr.error('Error al cargar empresas.'));
}

function prepareAddModal() {
    $('#txtNombreEmpresa,#txtDescripcionEmpresa').val('');
}

$('#btnAddEmpresa').click(function() {
    const n = $('#txtNombreEmpresa').val().trim();
    const d = $('#txtDescripcionEmpresa').val().trim();
    if (!n) { toastr.warning('Nombre de empresa requerido.'); return; }
    $(this).prop('disabled', true).text('Guardando...');
    $.post(API_EMPRESAS, {op:'addEmpresa', NombreEmpresa:n, Descripcion:d}, function(r) {
        if (r.Resultado && r.Siguiente) {
            toastr.success(r.Msg);
            bootstrap.Modal.getInstance(document.getElementById('modalAddEmpresa')).hide();
            loadEmpresas();
        } else { toastr.error(r.Msg || 'Error.'); }
        $('#btnAddEmpresa').prop('disabled', false).text('Registrar Empresa');
    }, 'json').fail(() => { toastr.error('Error de conexión.'); $('#btnAddEmpresa').prop('disabled', false).text('Registrar Empresa'); });
});

function editarEmpresa(idEnc) {
    $.post(API_EMPRESAS, {op:'getEmpresaById', IdEmpresa:idEnc}, function(r) {
        if (!r.Resultado || !r.Siguiente) { toastr.error('No se pudo cargar la empresa.'); return; }
        const e = r.Datos;
        $('#editIdEmpresa').val(idEnc);
        $('#editNombreEmpresa').val(e.NombreEmpresa);
        $('#editDescripcionEmpresa').val(e.Descripcion || '');
        $('#editEstatusEmpresa').val(e.Estatus);
        new bootstrap.Modal(document.getElementById('modalEditEmpresa')).show();
    }, 'json').fail(() => toastr.error('Error.'));
}

$('#btnSaveEdit').click(function() {
    const idEnc = $('#editIdEmpresa').val();
    const n = $('#editNombreEmpresa').val().trim();
    const d = $('#editDescripcionEmpresa').val().trim();
    const e = $('#editEstatusEmpresa').val();
    if (!n) { toastr.warning('Nombre requerido.'); return; }
    $(this).prop('disabled', true).text('Guardando...');
    $.post(API_EMPRESAS, {op:'updateEmpresa', IdEmpresa:idEnc, NombreEmpresa:n, Descripcion:d, Estatus:e}, function(r) {
        if (r.Resultado && r.Siguiente) {
            toastr.success(r.Msg);
            bootstrap.Modal.getInstance(document.getElementById('modalEditEmpresa')).hide();
            loadEmpresas();
        } else { toastr.error(r.Msg || 'Error.'); }
        $('#btnSaveEdit').prop('disabled', false).text('Guardar Cambios');
    }, 'json').fail(() => { toastr.error('Error.'); $('#btnSaveEdit').prop('disabled', false).text('Guardar Cambios'); });
});

function deleteEmpresa(idEnc) {
    if (!confirm('¿Eliminar esta empresa?')) return;
    $.post(API_EMPRESAS, {op:'deleteEmpresa', IdEmpresa:idEnc}, function(r) {
        if (r.Resultado && r.Siguiente) { toastr.success(r.Msg); loadEmpresas(); }
        else toastr.error(r.Msg || 'Error.');
    }, 'json');
}
