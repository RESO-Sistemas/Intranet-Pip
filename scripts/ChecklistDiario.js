// ============================================================
// ChecklistDiario.js
// Lógica del checklist diario del empleado en index.php
// Dependencias: jQuery, Bootstrap 5, toastr
// ============================================================

const API_CHK = 'Backend/ChecklistEmpleados/App.php';
const API_INC = 'Backend/Incidencias/App.php';

// Ítem pendiente de incidencia (se llena cuando se abre el modal)
let _itemPendiente = null;

// ─── Cargar checklist al iniciar ─────────────────────────────────────────────
$(document).ready(function () {
    cargarChecklist();

    // Preview de imagen en el modal de incidencia
    $('#inc-evidencia').on('change', function () {
        const file = this.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $('#inc-preview-img').attr('src', e.target.result);
                $('#inc-preview-wrap').show();
            };
            reader.readAsDataURL(file);
        } else {
            $('#inc-preview-wrap').hide();
            $('#inc-preview-img').attr('src', '');
        }
    });

    // Guardar incidencia desde el modal
    $('#btnGuardarIncidencia').on('click', function () {
        guardarIncidenciaYRespuesta();
    });

    // Al cerrar el modal sin guardar, limpiar el ítem pendiente
    $('#modalIncidencia').on('hidden.bs.modal', function () {
        if (_itemPendiente) {
            // No se guardó nada, restablecer el ítem visualmente
            const $item = $('#chk-item-' + _itemPendiente.idChecklist);
            $item.find('.chk-btn-si, .chk-btn-no').prop('disabled', false).removeClass('active');
            _itemPendiente = null;
        }
        limpiarModalIncidencia();
    });
});

// ─── Cargar lista de checklists del empleado ─────────────────────────────────
function cargarChecklist() {
    const $lista = $('#listaChecklist');
    $lista.html('<p class="text-muted small text-center">Cargando checklist...</p>');

    $.ajax({
        url: API_CHK,
        type: 'POST',
        dataType: 'json',
        data: { op: 'getChecklistsByPuesto' },
        success: function (res) {
            if (!res.Resultado || !res.Data) {
                $lista.html('<p class="text-muted small text-center">Sin ítems de checklist para hoy.</p>');
                return;
            }
            renderChecklist(res.Data);
        },
        error: function () {
            $lista.html('<p class="text-danger small text-center">Error al cargar el checklist.</p>');
        }
    });
}

// ─── Renderizar ítems ─────────────────────────────────────────────────────────
function renderChecklist(items) {
    const $lista = $('#listaChecklist');
    const SVG_OK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 10 18 20 6"/></svg>';
    const SVG_NO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>';

    if (!items.length) {
        $lista.html('<p class="text-muted small text-center">No tienes ítems de checklist para hoy.</p>');
        return;
    }

    let html = '';
    items.forEach(function (item) {
        const yaContestado = parseInt(item.YaContestado) === 1;
        const respEsperada = parseInt(item.RespuestaEsperada);
        const respEmpleado = parseInt(item.RespuestaEmpleado); // -1 si no contestó
        const abreInc = parseInt(item.AbreIncidencia) === 1;

        let claseItem = 'checklist-item';
        if (yaContestado) {
            claseItem += respEmpleado === respEsperada ? ' ya-contestado chk-respondido-si' : ' ya-contestado chk-respondido-no';
        }

        const badgeInc = abreInc
            ? '<span class="chk-badge ms-1" style="background:#008837;color:#333;">⚠ Incidencia</span>'
            : '';
        const badgeTipo = item.Tipo === 'Critico'
            ? '<span class="chk-badge ms-1" style="background:#dc3545;color:#fff;">Crítico</span>'
            : '';
        const badgeTurno = item.NombresTurnos && item.NombresTurnos !== 'Sin turno'
            ? `<span class="chk-badge ms-1" style="background:#6c757d;color:#fff;"><i class="fas fa-clock" style="font-size:.6rem;"></i> ${escHtmlChk(item.NombresTurnos)}</span>`
            : '';

        html += `
      <div class="${claseItem}" id="chk-item-${item.IdChecklist}">
        <div class="flex-grow-1 min-w-0">
          <div class="chk-name">${escHtmlChk(item.Nombre)}${badgeTipo}${badgeInc}${badgeTurno}</div>
        </div>
        <div class="chk-btn-group">
          <button type="button"
            class="btn chk-btn-si${yaContestado && respEmpleado === 1 ? ' active' : ''}"
            title="Sí / Verdadero"
            ${yaContestado ? 'disabled' : ''}
            onclick="responderChecklist(${item.IdChecklist}, 1, ${item.RespuestaEsperada}, ${abreInc ? 1 : 0}, ${item.IdTipoIncidencia || 'null'}, this)">
            ${SVG_OK}
          </button>
          <button type="button"
            class="btn chk-btn-no${yaContestado && respEmpleado === 0 ? ' active' : ''}"
            title="No / Falso"
            ${yaContestado ? 'disabled' : ''}
            onclick="responderChecklist(${item.IdChecklist}, 0, ${item.RespuestaEsperada}, ${abreInc ? 1 : 0}, ${item.IdTipoIncidencia || 'null'}, this)">
            ${SVG_NO}
          </button>
        </div>
      </div>`;
    });

    $lista.html(html);
}

// ─── Manejar respuesta del empleado ──────────────────────────────────────────
function responderChecklist(idChecklist, respuesta, respuestaEsperada, abreIncidencia, idTipoIncidencia, btnClicado) {
    const esCorrecta = (respuesta === parseInt(respuestaEsperada));

    // Deshabilitar botones mientras se procesa
    const $item = $('#chk-item-' + idChecklist);
    $item.find('.chk-btn-si, .chk-btn-no').prop('disabled', true);

    // Caso 1: respuesta correcta OR el ítem no abre incidencia → guardar directo
    if (esCorrecta || !abreIncidencia) {
        $.ajax({
            url: API_CHK,
            type: 'POST',
            dataType: 'json',
            data: { op: 'guardarRespuesta', idChecklist: idChecklist, respuesta: respuesta },
            success: function (res) {
                if (res.Resultado) {
                    marcarItemContestado($item, respuesta, parseInt(respuestaEsperada));
                } else {
                    toastr.error(res.Msg || 'Error al guardar la respuesta.');
                    $item.find('.chk-btn-si, .chk-btn-no').prop('disabled', false);
                }
            },
            error: function () {
                toastr.error('Error de conexión al guardar la respuesta.');
                $item.find('.chk-btn-si, .chk-btn-no').prop('disabled', false);
            }
        });
        return;
    }

    // Caso 2: respuesta INCORRECTA y el ítem abre incidencia → abrir modal
    _itemPendiente = {
        idChecklist: idChecklist,
        respuesta: respuesta,
        idTipoIncidencia: idTipoIncidencia
    };

    // Poblar campos ocultos del modal
    $('#inc-id-checklist').val(idChecklist);
    $('#inc-id-tipo-incidencia').val(idTipoIncidencia || '');
    $('#inc-respuesta').val(respuesta);

    // Mostrar aviso del ítem en el modal
    $('#incidencia-alerta-texto').text(
        'La respuesta registrada genera una incidencia. Describe qué ocurrió y sube evidencia si aplica.'
    );

    // Abrir el modal
    const modalEl = document.getElementById('modalIncidencia');
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

// ─── Guardar incidencia + respuesta desde el modal ───────────────────────────
function guardarIncidenciaYRespuesta() {
    if (!_itemPendiente) return;

    const descripcion = $('#inc-descripcion').val().trim();
    if (!descripcion) {
        toastr.warning('Escribe una descripción de la incidencia.');
        return;
    }

    const $btn = $('#btnGuardarIncidencia').prop('disabled', true).text('Guardando...');

    const fd = new FormData($('#formIncidencia')[0]);
    fd.set('op', 'registrarIncidenciaYRespuesta');

    $.ajax({
        url: API_INC,
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        dataType: 'json',
        success: function (res) {
            $btn.prop('disabled', false).html('<i class="icon-check"></i> Registrar Incidencia');
            if (res.Resultado && res.Siguiente) {
                toastr.success(res.Msg || '¡Incidencia registrada!');
                // Marcar ítem como contestado en la UI
                const $item = $('#chk-item-' + _itemPendiente.idChecklist);
                marcarItemContestado($item, _itemPendiente.respuesta, null /* incorrecto */);
                _itemPendiente = null;
                limpiarModalIncidencia();
                bootstrap.Modal.getInstance(document.getElementById('modalIncidencia')).hide();
            } else {
                toastr.error(res.Msg || 'Error al registrar la incidencia.');
                // Rehabilitar botones del ítem para que pueda reintentar
                if (_itemPendiente) {
                    $('#chk-item-' + _itemPendiente.idChecklist)
                        .find('.chk-btn-si, .chk-btn-no').prop('disabled', false);
                    _itemPendiente = null;
                }
                bootstrap.Modal.getInstance(document.getElementById('modalIncidencia')).hide();
            }
        },
        error: function () {
            $btn.prop('disabled', false).html('<i class="icon-check"></i> Registrar Incidencia');
            toastr.error('Error de conexión al enviar la incidencia.');
        }
    });
}

// ─── Marcar ítem como respondido visualmente ─────────────────────────────────
function marcarItemContestado($item, respuesta, respuestaEsperada) {
    $item.addClass('ya-contestado');
    if (respuestaEsperada !== null && respuesta === parseInt(respuestaEsperada)) {
        $item.addClass('chk-respondido-si').removeClass('chk-respondido-no');
    } else {
        $item.addClass('chk-respondido-no').removeClass('chk-respondido-si');
    }
    $item.find('.chk-btn-si, .chk-btn-no').prop('disabled', true).removeClass('active');
    const btnActivo = respuesta === 1 ? $item.find('.chk-btn-si') : $item.find('.chk-btn-no');
    btnActivo.addClass('active');
}

// ─── Limpiar modal de incidencia ─────────────────────────────────────────────
function limpiarModalIncidencia() {
    $('#formIncidencia')[0].reset();
    $('#inc-preview-wrap').hide();
    $('#inc-preview-img').attr('src', '');
}

// ─── Utilidad escape HTML ────────────────────────────────────────────────────
function escHtmlChk(str) {
    if (!str && str !== 0) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
