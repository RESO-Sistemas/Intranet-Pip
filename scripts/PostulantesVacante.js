// Vista Postulantes por Vacante (sin modal)

let tablePostulantes;
let postulantesData = [];
let postulantesProcesosList = [];

function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

async function initPostulantesVacantePage() {
    const idVacante = getQueryParam('IdVacante');

    if (!idVacante) {
        console.error('Falta IdVacante en la URL');
        return;
    }

    $('#postulantesIdVacante').val(idVacante);

    // Obtener nombre de la vacante (sin depender de vacantesData)
    try {
        const response = await $.post('Backend/Vacantes/App.php', {
            op: 'getVacanteById',
            IdVacante: idVacante
        });

        const result = JSON.parse(response);
        if (result && result.Siguiente && result.Datos) {
            const v = result.Datos;
            $('#nombreVacantePostulantes').text(v.NombreVacante || v.Puesto || 'Vacante');
        }
    } catch (error) {
        console.error('Error al obtener vacante:', error);
    }

    await loadProcesosParaHistorial();

    if (!tablePostulantes) {
        initPostulantesTable();
    }

    await loadPostulantes(idVacante);
}

function initPostulantesTable() {
    tablePostulantes = $('#tablePostulantes').DataTable({
        data: [],
        columns: [
            { data: 'NombreCompleto' },
            { data: 'CorreoElectronico' },
            { data: 'Telefono' },
            { data: 'FechaPostulacion' },
            { data: 'UltimoProceso' },
            {
                data: 'EstatusPostulacion',
                render: function (data, type, row) {
                    return getPostulanteStatusBadge(data);
                }
            },
            {
                data: null,
                render: function (data, type, row) {
                    const idEncoded = btoa(row.IdPostulanteVacante);
                    return `
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-info btn-sm" onclick="showDetallePostulante('${idEncoded}')" title="Ver detalle">
                                <span class="material-symbols-outlined">visibility</span>
                            </button>
                        </div>
                    `;
                }
            }
        ],
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
        },
        responsive: true,
        order: [[3, 'desc']]
    });
}

function getPostulanteStatusBadge(estatus) {
    switch (parseInt(estatus)) {
        case 1:
            return '<span class="postulante-status en-proceso">En Proceso</span>';
        case 2:
            return '<span class="postulante-status aceptado">Aceptado</span>';
        case 3:
            return '<span class="postulante-status rechazado">Rechazado</span>';
        case 4:
            return '<span class="postulante-status finalizado">Finalizado</span>';
        default:
            return '<span class="postulante-status">Desconocido</span>';
    }
}

async function loadPostulantes(idVacante) {
    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'getPostulantesByVacante',
            IdVacante: idVacante
        });

        const result = JSON.parse(response);

        if (result.Siguiente && result.Data) {
            postulantesData = result.Data;
            tablePostulantes.clear().rows.add(postulantesData).draw();
            updatePostulantesStats(postulantesData);
        } else {
            postulantesData = [];
            tablePostulantes.clear().draw();
            updatePostulantesStats([]);
        }
    } catch (error) {
        console.error('Error al cargar postulantes:', error);
    }
}

function updatePostulantesStats(data) {
    const total = data.length;
    const enProceso = data.filter(p => parseInt(p.EstatusPostulacion) === 1).length;
    const aceptados = data.filter(p => parseInt(p.EstatusPostulacion) === 2).length;
    const rechazados = data.filter(p => parseInt(p.EstatusPostulacion) === 3).length;

    $('#statTotal').text(total);
    $('#statProceso').text(enProceso);
    $('#statAceptados').text(aceptados);
    $('#statRechazados').text(rechazados);
}

async function loadProcesosParaHistorial() {
    try {
        const response = await $.post('Backend/Vacantes/App.php', {
            op: 'getProcesosVacantesActivos'
        });

        const result = JSON.parse(response);

        if (result && Array.isArray(result)) {
            postulantesProcesosList = result;

            let options = '<option value="">Seleccione proceso...</option>';
            result.forEach(p => {
                options += `<option value="${p.IdProceso}">${p.NombreProceso}</option>`;
            });
            $('#cmbNuevoProceso').html(options);
        }
    } catch (error) {
        console.error('Error al cargar procesos:', error);
    }
}

function showAddPostulanteModal() {
    const idVacante = $('#postulantesIdVacante').val();
    $('#addPostulanteIdVacante').val(idVacante);
    clearPostulanteForm();

    const modal = new bootstrap.Modal(document.getElementById('modalAddPostulante'));
    modal.show();
}

function clearPostulanteForm() {
    $('#txtBuscarPostulante').val('');
    $('#resultadosBusqueda').hide().html('');
    $('#txtPostulanteNombre').val('');
    $('#txtPostulanteApPaterno').val('');
    $('#txtPostulanteApMaterno').val('');
    $('#txtPostulanteCorreo').val('');
    $('#txtPostulanteTelefono').val('');
    $('#txtPostulanteCURP').val('');
    $('#txtPostulanteDireccion').val('');
    $('#txtPostulanteEstado').val('');
    $('#txtPostulanteCiudad').val('');
    $('#txtPostulanteObservaciones').val('');
}

async function buscarPostulanteExistente() {
    const termino = $('#txtBuscarPostulante').val().trim();

    if (termino.length < 3) {
        if (typeof showBootstrapAlert === 'function') {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Información!</span>
                    <span class="alert-text">Ingrese al menos 3 caracteres para buscar.</span>
                </div>`;
            showBootstrapAlert(messageContent, 'top-right', 3000);
        }
        return;
    }

    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'searchPostulante',
            Termino: termino
        });

        const result = JSON.parse(response);

        if (result.Siguiente && result.Data && result.Data.length > 0) {
            let html = '<div class="list-group">';
            result.Data.forEach(p => {
                html += `
                    <a href="#" class="list-group-item list-group-item-action" onclick="seleccionarPostulanteExistente(${p.IdPostulante}, '${p.NombreCompleto}', '${p.CorreoElectronico || ''}')">
                        <strong>${p.NombreCompleto}</strong><br>
                        <small class="text-muted">${p.CorreoElectronico || 'Sin correo'} | CURP: ${p.CURP || 'N/A'}</small>
                    </a>
                `;
            });
            html += '</div>';
            $('#resultadosBusqueda').html(html).show();
        } else {
            $('#resultadosBusqueda').html('<p class="text-muted small">No se encontraron resultados</p>').show();
        }
    } catch (error) {
        console.error('Error al buscar postulante:', error);
    }
}

async function seleccionarPostulanteExistente(idPostulante, nombre, correo) {
    const idVacante = $('#addPostulanteIdVacante').val();
    const observaciones = $('#txtPostulanteObservaciones').val();

    const confirmResult = await Swal.fire({
        title: '¿Agregar postulante?',
        html: `¿Desea agregar a <strong>${nombre}</strong> como postulante de esta vacante?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, agregar',
        cancelButtonText: 'Cancelar'
    });

    if (confirmResult.isConfirmed) {
        try {
            const response = await $.post('Backend/Postulantes/App.php', {
                op: 'addPostulacion',
                IdVacante: idVacante,
                IdPostulante: btoa(idPostulante),
                Observaciones: observaciones
            });

            const result = JSON.parse(response);

            if (result.Siguiente) {
                if (typeof showBootstrapAlertSuc === 'function') {
                    const messageContent = `
                        <div class="alert-content">
                            <span class="alert-title">¡Completado!</span>
                            <span class="alert-text">${result.Msg}</span>
                        </div>`;
                    showBootstrapAlertSuc(messageContent, 'top-right', 5000);
                }

                bootstrap.Modal.getInstance(document.getElementById('modalAddPostulante')).hide();
                loadPostulantes(idVacante);
            } else {
                if (typeof showBootstrapAlertWar === 'function') {
                    const messageContent = `
                        <div class="alert-content">
                            <span class="alert-title">Alerta!</span>
                            <span class="alert-text">${result.Msg}</span>
                        </div>`;
                    showBootstrapAlertWar(messageContent, 'top-right', 5000);
                }
            }
        } catch (error) {
            console.error('Error al agregar postulación:', error);
        }
    }
}

async function addPostulanteVacante() {
    const idVacante = $('#addPostulanteIdVacante').val();
    const nombre = $('#txtPostulanteNombre').val().trim();
    const apPaterno = $('#txtPostulanteApPaterno').val().trim();
    const apMaterno = $('#txtPostulanteApMaterno').val().trim();
    const correo = $('#txtPostulanteCorreo').val().trim();
    const telefono = $('#txtPostulanteTelefono').val().trim();
    const curp = $('#txtPostulanteCURP').val().trim().toUpperCase();
    const direccion = $('#txtPostulanteDireccion').val().trim();
    const estado = $('#txtPostulanteEstado').val().trim();
    const ciudad = $('#txtPostulanteCiudad').val().trim();
    const observaciones = $('#txtPostulanteObservaciones').val().trim();

    if (!nombre) {
        if (typeof showBootstrapAlert === 'function') {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Información!</span>
                    <span class="alert-text">Ingrese el nombre del postulante.</span>
                </div>`;
            showBootstrapAlert(messageContent, 'top-right', 3000);
        }
        $('#txtPostulanteNombre').focus();
        return;
    }

    if (!apPaterno) {
        if (typeof showBootstrapAlert === 'function') {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Información!</span>
                    <span class="alert-text">Ingrese el apellido paterno.</span>
                </div>`;
            showBootstrapAlert(messageContent, 'top-right', 3000);
        }
        $('#txtPostulanteApPaterno').focus();
        return;
    }

    if (!correo) {
        if (typeof showBootstrapAlert === 'function') {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Información!</span>
                    <span class="alert-text">Ingrese el correo electrónico.</span>
                </div>`;
            showBootstrapAlert(messageContent, 'top-right', 3000);
        }
        $('#txtPostulanteCorreo').focus();
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        if (typeof showBootstrapAlert === 'function') {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Información!</span>
                    <span class="alert-text">El correo electrónico no tiene un formato válido.</span>
                </div>`;
            showBootstrapAlert(messageContent, 'top-right', 3000);
        }
        $('#txtPostulanteCorreo').focus();
        return;
    }

    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'addPostulanteConPostulacion',
            IdVacante: idVacante,
            Nombre: nombre,
            ApellidoPaterno: apPaterno,
            ApellidoMaterno: apMaterno,
            CorreoElectronico: correo,
            Telefono: telefono,
            CURP: curp,
            Direccion: direccion,
            Estado: estado,
            Ciudad: ciudad,
            Observaciones: observaciones
        });

        const result = JSON.parse(response);

        if (result.Siguiente) {
            if (typeof showBootstrapAlertSuc === 'function') {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">¡Completado!</span>
                        <span class="alert-text">${result.Msg}</span>
                    </div>`;
                showBootstrapAlertSuc(messageContent, 'top-right', 5000);
            }

            bootstrap.Modal.getInstance(document.getElementById('modalAddPostulante')).hide();
            loadPostulantes(idVacante);
        } else {
            if (typeof showBootstrapAlertWar === 'function') {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">Alerta!</span>
                        <span class="alert-text">${result.Msg}</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, 'top-right', 5000);
            }
        }
    } catch (error) {
        console.error('Error al agregar postulante:', error);
        if (typeof showBootstrapAlertWar === 'function') {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Alerta!</span>
                    <span class="alert-text">Error al agregar el postulante.</span>
                </div>`;
            showBootstrapAlertWar(messageContent, 'top-right', 5000);
        }
    }
}

async function showDetallePostulante(idEncoded) {
    $('#detalleIdPostulanteVacante').val(idEncoded);

    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'getPostulanteDetalle',
            IdPostulanteVacante: idEncoded
        });

        const result = JSON.parse(response);

        if (result.Siguiente && result.Data) {
            const p = result.Data;

            $('#detallePostulanteNombre').text(`${p.Nombre} ${p.ApellidoPaterno} ${p.ApellidoMaterno || ''}`);
            $('#detallePostulanteCURP').text(p.CURP || 'N/A');
            $('#detallePostulanteCorreo').text(p.CorreoElectronico || 'N/A');
            $('#detallePostulanteTelefono').text(p.Telefono || 'N/A');
            $('#detallePostulanteDireccion').text(p.Direccion || 'N/A');
            $('#detallePostulanteEstado').text(p.Estado || 'N/A');
            $('#detallePostulanteCiudad').text(p.Ciudad || 'N/A');
            $('#detallePostulanteFecha').text(p.FechaPostulacion || 'N/A');

            $('#cmbEstatusPostulante').val(p.EstatusPostulacion);
            $('#txtObservacionesEstatus').val('');

            await loadHistorialPostulante(idEncoded);
            await loadRequisitosPostulante(idEncoded);

            const modal = new bootstrap.Modal(document.getElementById('modalDetallePostulante'));
            modal.show();
        } else {
            if (typeof showBootstrapAlertWar === 'function') {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">Error!</span>
                        <span class="alert-text">No se pudo cargar la información del postulante.</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, 'top-right', 5000);
            }
        }
    } catch (error) {
        console.error('Error al cargar detalle de postulante:', error);
    }
}

async function actualizarEstatusPostulante() {
    const idPostulanteVacante = $('#detalleIdPostulanteVacante').val();
    const estatus = $('#cmbEstatusPostulante').val();
    const observaciones = $('#txtObservacionesEstatus').val().trim();

    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'updateEstatusPostulacion',
            IdPostulanteVacante: idPostulanteVacante,
            EstatusPostulacion: estatus,
            Observaciones: observaciones
        });

        const result = JSON.parse(response);

        if (result.Siguiente) {
            if (typeof showBootstrapAlertSuc === 'function') {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">¡Completado!</span>
                        <span class="alert-text">${result.Msg}</span>
                    </div>`;
                showBootstrapAlertSuc(messageContent, 'top-right', 5000);
            }
            $('#txtObservacionesEstatus').val('');

            await loadHistorialPostulante(idPostulanteVacante);

            const idVacante = $('#postulantesIdVacante').val();
            if (idVacante) {
                loadPostulantes(idVacante);
            }
        } else {
            if (typeof showBootstrapAlertWar === 'function') {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">Alerta!</span>
                        <span class="alert-text">${result.Msg}</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, 'top-right', 5000);
            }
        }
    } catch (error) {
        console.error('Error al actualizar estatus:', error);
    }
}

async function loadHistorialPostulante(idPostulanteVacante) {
    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'getPostulanteHistorial',
            IdPostulanteVacante: idPostulanteVacante
        });

        const result = JSON.parse(response);

        if (result.Siguiente && result.Data && result.Data.length > 0) {
            let html = '<div class="timeline">';
            result.Data.forEach(h => {
                const isOk = h.Resultado == 1;
                const isNo = h.Resultado == 0;
                const markerColor = isOk ? '#28a745' : (isNo ? '#dc3545' : '#6c757d');
                const icon = isOk
                    ? '<span class="material-symbols-outlined text-success timeline-icon">check_circle</span>'
                    : (isNo ? '<span class="material-symbols-outlined text-danger timeline-icon">cancel</span>' : '');

                html += `
                    <div class="timeline-item">
                        <span class="timeline-marker" style="background:${markerColor}"></span>
                        <div class="d-flex justify-content-between align-items-start">
                            <div class="me-3">
                                <p class="timeline-title">${h.NombreProceso || 'Proceso'} ${icon}</p>
                                <p class="timeline-sub text-muted">${h.Observaciones || 'ninguna'}</p>
                                ${h.NombreUsuario ? `<small class="text-primary"><span class="material-icons-outlined" style="font-size: 14px; vertical-align: middle;">person</span> ${h.NombreUsuario}</small>` : ''}
                            </div>
                            <span class="timeline-time">${h.Fecha || ''}</span>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
            $('#listaHistorial').html(html);
        } else {
            $('#listaHistorial').html('<p class="text-muted text-center">No hay historial registrado</p>');
        }
    } catch (error) {
        console.error('Error al cargar historial:', error);
    }
}

function showAddHistorialForm() {
    $('#cmbNuevoProceso').val('');
    $('#cmbResultadoProceso').val('');
    $('#txtObservacionesProceso').val('');
    $('#formAddHistorial').slideDown();
}

function hideAddHistorialForm() {
    $('#formAddHistorial').slideUp();
}

async function addHistorialProceso() {
    const idPostulanteVacante = $('#detalleIdPostulanteVacante').val();
    const idProceso = $('#cmbNuevoProceso').val();
    const resultado = $('#cmbResultadoProceso').val();
    const observaciones = $('#txtObservacionesProceso').val().trim();

    if (!idProceso) {
        if (typeof showBootstrapAlert === 'function') {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Información!</span>
                    <span class="alert-text">Seleccione un proceso.</span>
                </div>`;
            showBootstrapAlert(messageContent, 'top-right', 3000);
        }
        return;
    }

    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'addPostulanteHistorial',
            IdPostulanteVacante: idPostulanteVacante,
            IdProceso: idProceso,
            Resultado: resultado,
            Observaciones: observaciones
        });

        const result = JSON.parse(response);

        if (result.Siguiente) {
            if (typeof showBootstrapAlertSuc === 'function') {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">¡Completado!</span>
                        <span class="alert-text">${result.Msg}</span>
                    </div>`;
                showBootstrapAlertSuc(messageContent, 'top-right', 5000);
            }
            hideAddHistorialForm();
            loadHistorialPostulante(idPostulanteVacante);
        } else {
            if (typeof showBootstrapAlertWar === 'function') {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">Alerta!</span>
                        <span class="alert-text">${result.Msg}</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, 'top-right', 5000);
            }
        }
    } catch (error) {
        console.error('Error al agregar historial:', error);
    }
}

async function loadRequisitosPostulante(idPostulanteVacante) {
    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'getPostulanteRequisitos',
            IdPostulanteVacante: idPostulanteVacante
        });

        const result = JSON.parse(response);

        if (result.Siguiente && result.Data && result.Data.length > 0) {
            let html = '<div class="table-responsive"><table class="table table-sm table-bordered">';
            html += '<thead><tr><th>Requisito</th><th>Respuesta</th><th>Cumple</th><th>Acciones</th></tr></thead><tbody>';

            result.Data.forEach(r => {
                const idReqVacante = r.IdVacanteRequisito;
                const idReqPostulante = r.IdPostulanteRequisito || 0;

                html += `
                    <tr>
                        <td>${r.Requisito || 'Requisito'}</td>
                        <td><input type="text" class="form-control form-control-sm" id="respRequisito_${idReqVacante}" value="${r.Respuesta || ''}" placeholder="Respuesta..."></td>
                        <td>
                            <select class="form-select form-select-sm" id="cumpleRequisito_${idReqVacante}">
                                <option value="" ${!r.Cumple && r.Cumple !== 0 ? 'selected' : ''}>Pendiente</option>
                                <option value="1" ${r.Cumple == 1 ? 'selected' : ''}>Sí</option>
                                <option value="0" ${r.Cumple == 0 ? 'selected' : ''}>No</option>
                            </select>
                        </td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="updateRequisitoPostulante(${idReqPostulante}, ${idReqVacante})">
                                <span class="material-symbols-outlined">save</span>
                            </button>
                        </td>
                    </tr>
                `;
            });

            html += '</tbody></table></div>';
            $('#listaRequisitosPostulante').html(html);
        } else {
            $('#listaRequisitosPostulante').html('<p class="text-muted text-center">No hay requisitos configurados para esta vacante</p>');
        }
    } catch (error) {
        console.error('Error al cargar requisitos:', error);
    }
}

async function updateRequisitoPostulante(idPostulanteRequisito, idVacanteRequisito) {
    const idPostulanteVacante = $('#detalleIdPostulanteVacante').val();
    const respuesta = $(`#respRequisito_${idVacanteRequisito}`).val();
    const cumple = $(`#cumpleRequisito_${idVacanteRequisito}`).val();

    try {
        let response;

        if (idPostulanteRequisito > 0) {
            response = await $.post('Backend/Postulantes/App.php', {
                op: 'updatePostulanteRequisito',
                IdPostulanteRequisito: btoa(idPostulanteRequisito),
                Respuesta: respuesta,
                Cumple: cumple
            });
        } else {
            response = await $.post('Backend/Postulantes/App.php', {
                op: 'addPostulanteRequisito',
                IdPostulanteVacante: idPostulanteVacante,
                IdVacanteRequisito: btoa(idVacanteRequisito),
                Respuesta: respuesta,
                Cumple: cumple
            });
        }

        const result = JSON.parse(response);

        if (result.Siguiente) {
            if (typeof showBootstrapAlertSuc === 'function') {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">¡Completado!</span>
                        <span class="alert-text">${result.Msg}</span>
                    </div>`;
                showBootstrapAlertSuc(messageContent, 'top-right', 3000);
            }
            loadRequisitosPostulante(idPostulanteVacante);
        } else {
            if (typeof showBootstrapAlertWar === 'function') {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">Alerta!</span>
                        <span class="alert-text">${result.Msg}</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, 'top-right', 5000);
            }
        }
    } catch (error) {
        console.error('Error al actualizar requisito:', error);
    }
}

async function eliminarPostulacion() {
    const idPostulanteVacante = $('#detalleIdPostulanteVacante').val();

    const confirmResult = await Swal.fire({
        title: '¿Eliminar postulación?',
        text: 'Se eliminará esta postulación de la vacante. Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (confirmResult.isConfirmed) {
        try {
            const response = await $.post('Backend/Postulantes/App.php', {
                op: 'deletePostulacion',
                IdPostulanteVacante: idPostulanteVacante
            });

            const result = JSON.parse(response);

            if (result.Siguiente) {
                if (typeof showBootstrapAlertSuc === 'function') {
                    const messageContent = `
                        <div class="alert-content">
                            <span class="alert-title">¡Completado!</span>
                            <span class="alert-text">${result.Msg}</span>
                        </div>`;
                    showBootstrapAlertSuc(messageContent, 'top-right', 5000);
                }

                bootstrap.Modal.getInstance(document.getElementById('modalDetallePostulante')).hide();

                const idVacante = $('#postulantesIdVacante').val();
                if (idVacante) {
                    loadPostulantes(idVacante);
                }
            } else {
                if (typeof showBootstrapAlertWar === 'function') {
                    const messageContent = `
                        <div class="alert-content">
                            <span class="alert-title">Alerta!</span>
                            <span class="alert-text">${result.Msg}</span>
                        </div>`;
                    showBootstrapAlertWar(messageContent, 'top-right', 5000);
                }
            }
        } catch (error) {
            console.error('Error al eliminar postulación:', error);
        }
    }
}

$(document).ready(function () {
    initPostulantesVacantePage();
});
