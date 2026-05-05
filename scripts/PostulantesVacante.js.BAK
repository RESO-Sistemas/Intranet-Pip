// Vista Postulantes por Vacante (sin modal)

let tablePostulantes;
let postulantesData = [];
let postulantesProcesosList = [];

// Paleta personalizada (Tints of #ffc407)
const yellowPalette = ['#ffc407', '#484747ff', '#ffd551', '#696969ff', '#ffe79b', '#fff9e6'];

function showListLoading(message = 'Cargando postulantes...') {
    const $target = $('#postulantesDataArea');
    if ($target.length && typeof $target.block === 'function') {
        $target.block({
            message: `<div style="padding: 10px 16px; font-weight: 600;">${message}</div>`,
            css: {
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#1f2937',
                color: '#fff',
                opacity: 0.9
            },
            overlayCSS: {
                backgroundColor: '#fff',
                opacity: 0.65,
                cursor: 'wait'
            }
        });
        return;
    }

    if (typeof $.blockUI === 'function') {
        $.blockUI({ message: `<div style="padding: 10px 16px; font-weight: 600;">${message}</div>` });
    }
}

function hideListLoading() {
    const $target = $('#postulantesDataArea');
    if ($target.length && typeof $target.unblock === 'function') {
        $target.unblock();
        return;
    }
    if (typeof $.unblockUI === 'function') {
        $.unblockUI();
    }
}

function showPageLoading(message = 'Cargando...') {
    if (typeof $.blockUI === 'function') {
        $.blockUI({ message: `<div style="padding: 10px 18px; font-weight: 600;">${message}</div>` });
    }
}

function hidePageLoading() {
    if (typeof $.unblockUI === 'function') $.unblockUI();
}

function initDetalleSectionToggles() {
    const $sections = $('#modalDetallePostulante .detail-section');
    if (!$sections.length) return;

    $sections.each(function (idx) {
        const $section = $(this);
        if ($section.data('collapsible-ready')) return;

        const $title = $section.children('h6').first();
        if (!$title.length) return;

        if (!$title.data('header-built')) {
            const $main = $('<div class="pv-title-main"></div>');

            const $buttons = $title.find('button').detach();

            $title.contents().each(function () {
                if (this.nodeType === 1 && this.tagName && this.tagName.toLowerCase() === 'button') {
                    return;
                }
                $main.append(this);
            });

            $title.empty().append($main);
            $title.data('header-built', true);

            if ($buttons.length) {
                const $tools = $('<div class="pv-section-tools mb-3"></div>');
                $tools.append($buttons);
                $section.prepend($tools);
            }
        }

        const $content = $('<div class="pv-section-content"></div>');
        $section.children().not($title).appendTo($content);
        $section.append($content);

        $title.addClass('pv-section-toggle');
        if (!$title.find('.pv-section-icon').length) {
            $title.append('<span class="material-symbols-outlined pv-section-icon">expand_less</span>');
        }

        $title.find('button').on('click', function (e) {
            e.stopPropagation();
        });

        const shouldCollapse = idx >= 2;
        if (shouldCollapse) {
            $content.hide();
            $section.addClass('is-collapsed');
            $title.find('.pv-section-icon').text('expand_more');
        }

        $title.on('click', function () {
            const collapsed = $section.hasClass('is-collapsed');
            if (collapsed) {
                $content.stop(true, true).slideDown(140);
                $section.removeClass('is-collapsed');
                $title.find('.pv-section-icon').text('expand_less');
            } else {
                $content.stop(true, true).slideUp(140);
                $section.addClass('is-collapsed');
                $title.find('.pv-section-icon').text('expand_more');
            }
        });

        $section.data('collapsible-ready', true);
    });
}

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

    await loadPostulantes(idVacante, true);
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
                    const idNumerico = row.IdPostulanteVacante;
                    const nombrePostulante = row.NombreCompleto || 'Postulante';
                    return `
                        <div class="d-flex flex-nowrap gap-1 justify-content-center align-items-center">
                            <button class="btn btn-warning btn-accion" onclick='openDocumentosPostulante(${idNumerico}, ${JSON.stringify(nombrePostulante)})' title="Ver Documentos">
                                <span class="material-symbols-outlined">folder_shared</span>
                            </button>
                            <button class="btn btn-primary btn-accion" onclick="verResultadosPostulante('${idEncoded}', '${nombrePostulante}')" title="Ver Resultados">
                                <span class="material-symbols-outlined">analytics</span>
                            </button>
                            <button class="btn btn-info btn-accion" onclick="showDetallePostulante('${idEncoded}')" title="Ver detalle">
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

async function loadPostulantes(idVacante, withLoader = true) {
    if (withLoader) showListLoading('Actualizando tabla y estadisticas...');
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
    } finally {
        if (withLoader) hideListLoading();
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

    let modalEl = document.getElementById('modalAddPostulante');
    let modal = bootstrap.Modal.getInstance(modalEl);
    if (!modal) {
        modal = new bootstrap.Modal(modalEl, {
            backdrop: 'static',
            keyboard: false
        });
    }
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
    $('#txtPostulanteIdEmpleado').val('');
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

async function buscarEmpleadoInterno() {
    const termino = $('#txtBuscarEmpleado').val().trim().toLowerCase();

    if (termino.length < 3) {
        if (typeof showBootstrapAlertWar === 'function') {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">¡Información!</span>
                    <span class="alert-text">Ingrese al menos 3 caracteres para buscar un empleado.</span>
                </div>`;
            showBootstrapAlertWar(messageContent, 'top-right', 4000);
        }
        return;
    }

    $('#resultadosBusquedaEmpleado').html('<div class="spinner-border spinner-border-sm text-success" role="status"></div> Buscando...').show();

    try {
        const response = await $.post('Backend/Empleados/App.php', {
            op: 'getPersonal',
            puesto: '',
            sucursal: '',
            division: ''
        });

        // Backend/Empleados/App.php => getPersonal returns raw JSON array
        let empleados = [];
        try {
            empleados = JSON.parse(response);
        } catch (e) {
            console.error("Error parseando respuesta de getPersonal", e);
        }

        if (empleados && Array.isArray(empleados)) {
            const empleadosFiltrados = empleados.filter(e => {
                const nombreCompleto = `${e.Nombre || ''} ${e.ApellidoPaterno || ''} ${e.ApellidoMaterno || ''}`.toLowerCase();
                const numEmpleado = (e.NoEmpleado || e.IdEmpleado || '').toString();
                return nombreCompleto.includes(termino) || numEmpleado.includes(termino);
            });

            if (empleadosFiltrados.length > 0) {
                let html = '<div class="list-group list-group-flush border rounded-3 mt-1 shadow-sm" style="max-height: 200px; overflow-y: auto;">';
                empleadosFiltrados.forEach(e => {
                    const encodedEmpl = btoa(encodeURIComponent(JSON.stringify(e)));
                    html += `
                        <button type="button" class="list-group-item list-group-item-action py-2" onclick="seleccionarEmpleadoInterno('${encodedEmpl}')">
                            <div class="d-flex w-100 justify-content-between align-items-center">
                                <div>
                                    <h6 class="mb-0 fw-bold text-success">${e.Nombre || ''} ${e.ApellidoPaterno || ''} ${e.ApellidoMaterno || ''}</h6>
                                    <small class="text-muted"><span class="material-symbols-outlined align-middle" style="font-size:14px;">badge</span> #${e.NoEmpleado || e.IdEmpleado || 'N/A'}</small>
                                </div>
                                <span class="material-symbols-outlined text-success">add_circle</span>
                            </div>
                        </button>
                    `;
                });
                html += '</div>';
                $('#resultadosBusquedaEmpleado').html(html).show();
            } else {
                $('#resultadosBusquedaEmpleado').html('<div class="alert alert-warning py-2 small mb-0"><span class="material-symbols-outlined align-middle me-1" style="font-size:16px;">sentiment_dissatisfied</span> No se encontró ningún empleado interno.</div>').show();
            }
        } else {
            $('#resultadosBusquedaEmpleado').html('<div class="alert alert-danger py-2 small mb-0">Error al buscar empleados.</div>').show();
        }
    } catch (error) {
        console.error('Error al buscar empleado interno:', error);
        $('#resultadosBusquedaEmpleado').html('<div class="alert alert-danger py-2 small mb-0">Error de conexión.</div>').show();
    }
}

function seleccionarEmpleadoInterno(encodedEmpl) {
    try {
        const e = JSON.parse(decodeURIComponent(atob(encodedEmpl)));

        let nombreCompleto = e.Nombre || '';
        let nombre = '';
        let apPaterno = '';
        let apMaterno = '';

        if (nombreCompleto.includes(',')) {
            // Formato normal de PIP: "APELLIDO1 APELLIDO2, NOMBRES"
            const partes = nombreCompleto.split(',');
            nombre = partes[1].trim();

            const apellidos = partes[0].trim().split(' ');
            apPaterno = apellidos[0] || '';
            apMaterno = apellidos.slice(1).join(' ') || '';
        } else {
            // Si no tiene coma, intentar separarlo por espacios
            const partes = nombreCompleto.trim().split(' ');
            if (partes.length >= 3) {
                nombre = partes.slice(2).join(' ');
                apPaterno = partes[0];
                apMaterno = partes[1];
            } else if (partes.length === 2) {
                nombre = partes[1];
                apPaterno = partes[0];
            } else {
                nombre = nombreCompleto;
            }
        }

        $('#txtPostulanteNombre').val(nombre);
        $('#txtPostulanteApPaterno').val(apPaterno || e.ApellidoPaterno || '');
        $('#txtPostulanteApMaterno').val(apMaterno || e.ApellidoMaterno || '');
        $('#txtPostulanteCURP').val(e.CURP || e.Curp || '');

        const tel = e.TelefonoCelular || e.Telefono || e.Telefono_Celular || e.Movil || '';
        $('#txtPostulanteTelefono').val(tel);

        const email = e.CorreoElectronico || e.Correo_Electronico || e.Email || '';
        $('#txtPostulanteCorreo').val(email);

        $('#txtPostulanteDireccion').val(e.Calle || e.Direccion || '');
        $('#txtPostulanteEstado').val(e.Estado || e.EntidadFederativa || '');
        $('#txtPostulanteCiudad').val(e.Ciudad || e.Municipio || '');

        $('#txtPostulanteIdEmpleado').val(e.NoEmpleado || e.IdEmpleado || '');

        $('#resultadosBusquedaEmpleado').hide();
        $('#txtBuscarEmpleado').val('');

        if (typeof showBootstrapAlertSuc === 'function') {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">¡Empleado Cargado!</span>
                    <span class="alert-text">Por favor verifica y completa la información restante.</span>
                </div>`;
            showBootstrapAlertSuc(messageContent, 'top-right', 4000);
        }
    } catch (err) {
        console.error("Error al decodificar datos del empleado", err);
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
    const idEmpleado = $('#txtPostulanteIdEmpleado').val().trim();

    if (!nombre || !apPaterno || !correo) {
        if (typeof showBootstrapAlert === 'function') {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Información!</span>
                    <span class="alert-text">Ingrese el nombre, apellido paterno y correo del postulante.</span>
                </div>`;
            showBootstrapAlert(messageContent, 'top-right', 3000);
        }
        if (!nombre) $('#txtPostulanteNombre').focus();
        else if (!apPaterno) $('#txtPostulanteApPaterno').focus();
        else if (!correo) $('#txtPostulanteCorreo').focus();
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
        const formData = new FormData();
        formData.append('op', 'addPostulanteConPostulacion');
        formData.append('IdVacante', idVacante);
        formData.append('Nombre', nombre);
        formData.append('ApellidoPaterno', apPaterno);
        formData.append('ApellidoMaterno', apMaterno);
        formData.append('CorreoElectronico', correo);
        formData.append('Telefono', telefono);
        formData.append('CURP', curp);
        formData.append('Direccion', direccion);
        formData.append('Estado', estado);
        formData.append('Ciudad', ciudad);
        formData.append('Observaciones', observaciones);
        if (idEmpleado) {
            formData.append('IdEmpleado', idEmpleado);
        }

        const fileCVInput = $('#filePostulanteCV');
        if (fileCVInput.length > 0 && fileCVInput[0].files.length > 0) {
            formData.append('CV', fileCVInput[0].files[0]);
        }

        const response = await $.ajax({
            url: 'Backend/Postulantes/App.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false
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
    initDetalleSectionToggles();

    showPageLoading('Cargando detalle del postulante...');
    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'getPostulanteDetalle',
            IdPostulanteVacante: idEncoded
        });

        const result = JSON.parse(response);

        if (result.Siguiente && result.Data) {
            const p = result.Data;

            // Guardar IdPostulante para funciones de edición
            $('#detalleIdPostulante').val(p.IdPostulante);

            // Llenar campos de edición
            $('#edit_Nombre').val(p.Nombre || '');
            $('#edit_ApellidoPaterno').val(p.ApellidoPaterno || '');
            $('#edit_ApellidoMaterno').val(p.ApellidoMaterno || '');
            $('#edit_CURP').val(p.CURP || '');
            $('#edit_CorreoElectronico').val(p.CorreoElectronico || '');
            $('#edit_Estado').val(p.Estado || '');
            $('#edit_Ciudad').val(p.Ciudad || '');

            if (window.PostulanteEditor && typeof window.PostulanteEditor.aplicarDireccionCompleta === 'function') {
                await window.PostulanteEditor.aplicarDireccionCompleta(p.Direccion || '', '');
                if (window.PostulanteEditor.updateDireccionPreview) {
                    window.PostulanteEditor.updateDireccionPreview();
                }
            }

            // Deshabilitar campos (modo visualización por defecto)
            $('#edit_Nombre, #edit_ApellidoPaterno, #edit_ApellidoMaterno, #edit_CURP, #edit_CorreoElectronico, #edit_CodigoPostal, #edit_Direccion, #edit_Colonia').prop('disabled', true);
            $('#edit_Calle, #edit_NumeroExterior, #edit_NumeroInterior').prop('disabled', true);
            $('#btnBuscarCP').prop('disabled', true);

            // Ocultar botones de edición
            $('#editModeButtons').addClass('d-none');

            // Asegurar que el botón de edición esté en modo correcto
            $('#btnToggleEditMode').html('<span class="material-symbols-outlined align-middle me-1">edit</span>Editar Información');
            $('#btnToggleEditMode').removeClass('btn-outline-secondary').addClass('btn-outline-primary');
            modoEdicion = false;

            if ($('#cpStatus').length) {
                $('#cpStatus').text('');
            }

            // Mostrar fecha
            $('#detallePostulanteFecha').text(p.FechaPostulacion || 'N/A');

            // Cargar teléfonos
            if (typeof cargarTelefonosPostulante === 'function') {
                await cargarTelefonosPostulante(p.IdPostulante);
            }

            $('#cmbEstatusPostulante').val(p.EstatusPostulacion);
            $('#txtObservacionesEstatus').val('');

            await loadHistorialPostulante(idEncoded);
            await loadRequisitosPostulante(idEncoded);

            let modalEl = document.getElementById('modalDetallePostulante');
            let modal = bootstrap.Modal.getInstance(modalEl);
            if (!modal) {
                modal = new bootstrap.Modal(modalEl, {
                    backdrop: 'static',
                    keyboard: false
                });
            }
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
    } finally {
        hidePageLoading();
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

function buildDownloadUrl(viewUrl) {
    if (!viewUrl) return '';
    return viewUrl.replace('op=viewArchivo', 'op=downloadArchivo');
}

function renderBotonesDocumentos(rutaCV, rutaSE, nombrePostulante) {
    const hasCV = !!rutaCV;
    const hasSE = !!rutaSE;
    let html = '<div class="d-flex flex-column gap-3 align-items-center justify-content-center py-3">';

    if (hasCV) {
        html += `
            <div class="w-100">
                <a href="${rutaCV}" target="_blank" class="btn btn-primary btn-lg w-100 rounded-pill shadow-sm mb-2">
                    <span class="material-symbols-outlined align-middle me-2">description</span> Ver CV
                </a>
                <a href="${buildDownloadUrl(rutaCV)}" target="_blank" class="btn btn-outline-primary btn-sm w-100 rounded-pill">
                    <span class="material-symbols-outlined align-middle me-1">download</span> Descargar CV
                </a>
            </div>`;
    }

    if (hasSE) {
        html += `
            <div class="w-100">
                <a href="${rutaSE}" target="_blank" class="btn btn-info btn-lg w-100 rounded-pill shadow-sm text-white mb-2">
                    <span class="material-symbols-outlined align-middle me-2">assignment</span> Ver Solicitud
                </a>
                <a href="${buildDownloadUrl(rutaSE)}" target="_blank" class="btn btn-outline-info btn-sm w-100 rounded-pill">
                    <span class="material-symbols-outlined align-middle me-1">download</span> Descargar Solicitud
                </a>
            </div>`;
    }

    if (!hasCV && !hasSE) {
        html += `<div class="alert alert-warning w-100 text-center"><span class="material-symbols-outlined align-middle me-2 mb-1">folder_off</span><br><b>${nombrePostulante}</b> no ha adjuntado documentos.</div>`;
    }

    html += '</div>';
    return html;
}

function openDocumentosPostulante(idNumerico, nombrePostulante) {
    // Buscar el row en el array ya cargado usando el ID numérico
    const row = postulantesData.find(p => p.IdPostulanteVacante == idNumerico);

    const rutaCV = (row && row.RutaCV) ? row.RutaCV : '';
    const rutaSE = (row && row.RutaSolicitudEmpleo) ? row.RutaSolicitudEmpleo : '';

    // Pintar botones directamente con las rutas que vienen de BD
    const html = renderBotonesDocumentos(rutaCV, rutaSE, nombrePostulante);
    $('#contenedorBotonesDocumentos').html(html);

    let modalEl = document.getElementById('modalDocumentosPostulante');
    let modal = bootstrap.Modal.getInstance(modalEl);
    if (!modal) {
        modal = new bootstrap.Modal(modalEl, {
            backdrop: 'static',
            keyboard: false
        });
    }
    modal.show();
}

// =====================================
// FUNCIONES DE GRAFICAS DE EVALUACION 360
// =====================================

// Registrar licencia de Syncfusion para evitar el banner rojo de trial
ej.base.registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE=');

let rawResultadosPostulante = [];
let chartPostulanteGeneral = null;

async function verResultadosPostulante(idEncoded, nombre) {
    window.currentIdPostulanteEncodedResultados = idEncoded;
    showPageLoading('Cargando resultados de evaluación...');
    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'getPostulanteResultadosEvaluaciones',
            IdPostulanteVacante: idEncoded
        });

        const result = JSON.parse(response);

        if (result.Siguiente && result.Data && result.Data.length > 0) {
            rawResultadosPostulante = result.Data;

            // Agrupar por evaluaciones (únicas)
            let evaluaciones = [...new Set(rawResultadosPostulante.map(item => item.NombreEvaluacion))];
            let options = '';
            evaluaciones.forEach(ev => {
                options += `<option value="${ev}">${ev}</option>`;
            });
            $('#selResultadosPostulante').html(options);
            $('#modalResultadosPostulanteLabel').html(`<span class="material-symbols-outlined align-middle me-2">analytics</span> Resultados - ${nombre}`);

            let modalEl = document.getElementById('modalResultadosPostulante');
            let modal = bootstrap.Modal.getInstance(modalEl);
            if (!modal) {
                modal = new bootstrap.Modal(modalEl, {
                    backdrop: 'static',
                    keyboard: false
                });
            }
            modal.show();

            // Esperar a que el modal esté visible para renderizar el chart correctamente
            $('#modalResultadosPostulante').on('shown.bs.modal', function () {
                drawResultadosPostulante();
                // Destruir el listener para evitar renders duplicados si se abre el modal de nuevo
                $(this).off('shown.bs.modal');
            });

        } else {
            if (typeof showBootstrapAlertWar === 'function') {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">¡Aviso!</span>
                        <span class="alert-text">El postulante aún no tiene evaluaciones finalizadas registradas.</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, 'top-right', 4000);
            }
        }
    } catch (err) {
        console.error('Error obteniendo gráficas de evaluación', err);
    } finally {
        hidePageLoading();
    }
}

function drawResultadosPostulante() {
    const seleccion = $('#selResultadosPostulante').val();
    if (!seleccion) return;

    let calificacionGeneral = 0;
    const datosFiltrados = rawResultadosPostulante.filter(i => i.NombreEvaluacion === seleccion);

    // Obtenemos su calificacion general
    if (datosFiltrados.length > 0 && datosFiltrados[0].Calificacion !== null) {
        calificacionGeneral = datosFiltrados[0].Calificacion;
    }

    $('#lblScoreGeneralPostulante').html(`Calificación Promedio General<br><b style="font-size:2rem;color:#0d6efd;">${calificacionGeneral}</b>`);

    let chartData = datosFiltrados.map(item => {
        return {
            competencia: item.Competencia || 'Sin Competencia',
            score: parseFloat(item.ScoreCompetencia)
        };
    });

    if (chartPostulanteGeneral) {
        chartPostulanteGeneral.destroy();
    }

    chartPostulanteGeneral = new ej.charts.Chart({
        isResponsive: true,
        palettes: yellowPalette,
        primaryXAxis: {
            valueType: 'Category',
            labelIntersectAction: 'MultipleRows'
        },
        primaryYAxis: {
            minimum: 0, maximum: 100, interval: 20,
            labelFormat: '{value}'
        },
        series: [{
            dataSource: chartData, width: 2,
            xName: 'competencia', yName: 'score',
            name: 'Resultados (Competencias)',
            type: 'Polar',
            drawType: 'Line',
            marker: { visible: true, width: 7, height: 7 }
        }],
        title: seleccion,
        tooltip: { enable: true }
    });
    chartPostulanteGeneral.appendTo('#chartPostulanteGeneral');
}

// -------------------------------------
// COMPARATIVO GENERAL DE VACANTE
// -------------------------------------

let rawComparativoVacante = [];
let chartComparativoVacante = null;

async function showComparativoResultadosModal() {
    const idVacante = $('#postulantesIdVacante').val();
    if (!idVacante) return;

    showPageLoading('Cargando comparativos...');
    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'getComparativoResultadosVacante',
            IdVacante: idVacante
        });

        const result = JSON.parse(response);

        if (result.Siguiente && result.Data && result.Data.length > 0) {
            rawComparativoVacante = result.Data;

            let evaluaciones = [...new Set(rawComparativoVacante.map(item => item.NombreEvaluacion))];
            let options = '';
            evaluaciones.forEach(ev => {
                options += `<option value="${ev}">${ev}</option>`;
            });
            $('#selComparativoEvaluaciones').html(options);

            let modalEl = document.getElementById('modalComparativoResultados');
            let modal = bootstrap.Modal.getInstance(modalEl);
            if (!modal) {
                modal = new bootstrap.Modal(modalEl, {
                    backdrop: 'static',
                    keyboard: false
                });
            }
            modal.show();

            $('#modalComparativoResultados').on('shown.bs.modal', function () {
                loadComparativoCandidatos();
                $(this).off('shown.bs.modal');
            });

        } else {
            if (typeof showBootstrapAlertWar === 'function') {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">¡Aviso!</span>
                        <span class="alert-text">Aún no hay evaluaciones finalizadas por los postulantes de esta vacante.</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, 'top-right', 4000);
            }
        }
    } catch (err) {
        console.error('Error en gráficas comparativas', err);
    } finally {
        hidePageLoading();
    }
}

function loadComparativoCandidatos() {
    const seleccion = $('#selComparativoEvaluaciones').val();
    if (!seleccion) return;

    const datosFiltrados = rawComparativoVacante.filter(i => i.NombreEvaluacion === seleccion);

    // Agrupar y obtener la calificación global por candidato
    let candidatosUnicosInfo = [];
    datosFiltrados.forEach(i => {
        if (!candidatosUnicosInfo.find(c => c.Nombre === i.NombreCandidato)) {
            candidatosUnicosInfo.push({
                Nombre: i.NombreCandidato,
                Calificacion: parseFloat(i.Calificacion || 0)
            });
        }
    });

    // Ordenar de mayor a menor calificación (Top Candidates)
    candidatosUnicosInfo.sort((a, b) => b.Calificacion - a.Calificacion);

    // Inyectar opciones en el select de Select2
    const $sel = $('#selCandidatosComparar');

    // Destruir instancia previa de Select2 si existe
    if ($sel.hasClass('select2-hidden-accessible')) {
        $sel.select2('destroy');
    }

    $sel.empty();
    candidatosUnicosInfo.forEach((candidatoObj) => {
        const option = new Option(candidatoObj.Nombre, candidatoObj.Nombre, true, true);
        $sel.append(option);
    });

    // Solo pre-seleccionar los primeros 5
    const primerosCinco = candidatosUnicosInfo.slice(0, 5).map(c => c.Nombre);
    $sel.val(primerosCinco);

    // Inicializar Select2
    $sel.select2({
        placeholder: 'Seleccionar candidatos...',
        allowClear: true,
        width: '100%'
    }).on('change', function () {
        drawComparativoResultados();
    });

    $('#listCheckCandidatosComparar').html('');
    drawComparativoResultados();
}

let chartComparativoVacanteColumn = null;
let chartComparativoVacanteRadar = null;

function drawComparativoResultados() {
    const seleccion = $('#selComparativoEvaluaciones').val();
    if (!seleccion) return;

    // Obtener candidatos seleccionados desde el select de Select2
    const candidatosSeleccionados = $('#selCandidatosComparar').val() || [];

    const datosFiltrados = rawComparativoVacante.filter(i => i.NombreEvaluacion === seleccion && candidatosSeleccionados.includes(i.NombreCandidato));

    // ==========================================
    // 1. GRÁFICA DE BARRAS (POR COMPETENCIAS)
    // ==========================================
    let seriesDataColumn = [];
    candidatosSeleccionados.forEach(candidato => {
        let datosCandidato = datosFiltrados.filter(i => i.NombreCandidato === candidato);

        let serie = {
            dataSource: datosCandidato.map(d => { return { competencia: d.Competencia || 'Sin Competencia', score: parseFloat(d.ScoreCompetencia) } }),
            xName: 'competencia',
            yName: 'score',
            name: candidato,
            type: 'Column',
            columnSpacing: 0.1,
            cornerRadius: { topLeft: 4, topRight: 4 },
            marker: {
                dataLabel: {
                    visible: true,
                    position: 'Top',
                    font: { fontWeight: '600' }
                }
            }
        };
        seriesDataColumn.push(serie);
    });

    if (chartComparativoVacanteColumn) chartComparativoVacanteColumn.destroy();

    chartComparativoVacanteColumn = new ej.charts.Chart({
        isResponsive: true,
        palettes: yellowPalette,
        primaryXAxis: {
            valueType: 'Category',
            labelIntersectAction: 'MultipleRows',
            majorGridLines: { width: 0 }
        },
        primaryYAxis: {
            minimum: 0, maximum: 100, interval: 20,
            labelFormat: '{value}',
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 }
        },
        series: seriesDataColumn,
        title: `Comparativo de Competencias (Barras) - ${seleccion}`,
        tooltip: { enable: true },
        legendSettings: { visible: true, position: 'Bottom' }
    });
    chartComparativoVacanteColumn.appendTo('#chartComparativoVacanteColumn');


    // ==========================================
    // 2. GRÁFICA ARAÑA (RADAR AREA POR COMPETENCIA)
    // ==========================================
    let seriesDataRadar = [];
    candidatosSeleccionados.forEach(candidato => {
        let datosCandidato = datosFiltrados.filter(i => i.NombreCandidato === candidato);

        let serie = {
            dataSource: datosCandidato.map(d => { return { competencia: d.Competencia || 'Sin Competencia', score: parseFloat(d.ScoreCompetencia) } }),
            xName: 'competencia',
            yName: 'score',
            name: candidato,
            type: 'Polar',
            drawType: 'Area', // Forma rellena
            opacity: 0.4, // TRANSPARENCIA crucial para que no se tapen
            marker: { visible: true, width: 6, height: 6, shape: 'Circle' },
            border: { width: 2, color: 'transparent' }
        };
        seriesDataRadar.push(serie);
    });

    if (chartComparativoVacanteRadar) chartComparativoVacanteRadar.destroy();

    chartComparativoVacanteRadar = new ej.charts.Chart({
        isResponsive: true,
        palettes: yellowPalette,
        primaryXAxis: {
            valueType: 'Category',
            labelPlacement: 'OnTicks'
        },
        primaryYAxis: {
            minimum: 0, maximum: 100, interval: 20,
            labelFormat: '{value}'
        },
        series: seriesDataRadar,
        title: `Comparativo de Competencias (Radar) - ${seleccion}`,
        tooltip: { enable: true },
        legendSettings: { visible: true, position: 'Bottom' }
    });
    chartComparativoVacanteRadar.appendTo('#chartComparativoVacanteRadar');


    // MÁGIA PARA LAS TABLAS (Tabulator)
    let htmlContenedorTablas = '';
    candidatosSeleccionados.forEach((candidato, idx) => {
        htmlContenedorTablas += `
            <div class="col-md-4 col-sm-6 mb-4">
                <div class="card shadow-sm h-100">
                    <div class="card-header bg-light text-center fw-bold text-dark">
                        ${candidato}
                    </div>
                    <div class="card-body p-0">
                        <div id="tabla_comparativo_${idx}"></div>
                    </div>
                </div>
            </div>
        `;
    });
    $('#contenedorTablasComparativo').html(htmlContenedorTablas);

    // Inicializar tabulators para cada candidato
    candidatosSeleccionados.forEach((candidato, idx) => {
        let datosCandidato = datosFiltrados.filter(i => i.NombreCandidato === candidato);
        let tableData = datosCandidato.map(d => {
            return {
                Competencia: d.Competencia || 'Sin Competencia',
                Calificacion: parseFloat(d.ScoreCompetencia).toFixed(2)
            };
        });

        new Tabulator(`#tabla_comparativo_${idx}`, {
            data: tableData,
            layout: "fitColumns",
            columns: [
                { title: "COMPETENCIA", field: "Competencia", headerHozAlign: "center", widthGrow: 2 },
                { title: "SCORE", field: "Calificacion", hozAlign: "center", headerHozAlign: "center", widthGrow: 1 }
            ]
        });
    });
}

function switchComparativoChart(type) {
    // Resetear ambos a estado "desactivado"
    $('#cardChartColumn, #cardChartRadar').removeClass('border-primary shadow-sm bg-white').addClass('border-0 shadow-none bg-light');
    $('#textChartColumn, #textChartRadar').removeClass('text-primary').addClass('text-muted');

    // Ocultar contenedores
    $('#containerChartColumn, #containerChartRadar').addClass('d-none');

    if (type === 'column') {
        // Activar Barras
        $('#cardChartColumn').removeClass('border-0 shadow-none bg-light').addClass('border-primary shadow-sm bg-white');
        $('#textChartColumn').removeClass('text-muted').addClass('text-primary');
        $('#containerChartColumn').removeClass('d-none');
        if (chartComparativoVacanteColumn) chartComparativoVacanteColumn.refresh();
    } else {
        // Activar Araña
        $('#cardChartRadar').removeClass('border-0 shadow-none bg-light').addClass('border-primary shadow-sm bg-white');
        $('#textChartRadar').removeClass('text-muted').addClass('text-primary');
        $('#containerChartRadar').removeClass('d-none');
        if (chartComparativoVacanteRadar) chartComparativoVacanteRadar.refresh();
    }
}

$(document).ready(function () {
    initDetalleSectionToggles();
    initPostulantesVacantePage();
});

// =====================================
// FUNCIONES DE VER RESPUESTAS DE EVALUACION
// =====================================

function cerrarEvaluacionRespuestas() {
    let modalElResp = document.getElementById('modalEvaluacionRespuestas');
    let modalResp = bootstrap.Modal.getInstance(modalElResp);
    if (modalResp) modalResp.hide();

    let modalElResu = document.getElementById('modalResultadosPostulante');
    let modalResu = bootstrap.Modal.getInstance(modalElResu);
    if (modalResu) modalResu.show();
}

async function abrirEvaluacionRespuestas() {
    const seleccionEv = $('#selResultadosPostulante').val();
    if (!seleccionEv || !window.currentIdPostulanteEncodedResultados) {
        if (typeof showBootstrapAlertWar === 'function') {
            showBootstrapAlertWar(`
                <div class="alert-content">
                    <span class="alert-title">¡Atención!</span>
                    <span class="alert-text">Debes seleccionar una evaluación primero.</span>
                </div>`, 'top-right', 3000);
        }
        return;
    }

    let modalElResu = document.getElementById('modalResultadosPostulante');
    let modalResu = bootstrap.Modal.getInstance(modalElResu);
    if (modalResu) modalResu.hide();

    $('#contenedorEvaluacionRespuestas').html('<div class="text-center py-5"><div class="spinner-border text-primary" role="status"></div><p class="mt-2 text-muted">Cargando evaluación...</p></div>');

    let modalElResp = document.getElementById('modalEvaluacionRespuestas');
    let modalResp = bootstrap.Modal.getInstance(modalElResp);
    if (!modalResp) {
        modalResp = new bootstrap.Modal(modalElResp, {
            backdrop: 'static',
            keyboard: false
        });
    }
    modalResp.show();

    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'getPostulanteRespuestasDetalle',
            IdPostulanteVacante: window.currentIdPostulanteEncodedResultados,
            NombreEvaluacion: seleccionEv
        });

        const result = JSON.parse(response);

        if (result.Siguiente && result.Data && result.Data.length > 0) {
            let html = '';

            result.Data.forEach((item, index) => {
                html += `
                <div class="card mb-4 shadow-sm border-0">
                    <div class="card-body">
                        <h6 class="fw-bold mb-1 d-flex align-items-start">
                            <span class="badge bg-primary rounded-pill me-2 mt-1">${index + 1}</span> 
                            <span>${item.TituloPregunta || 'Pregunta ' + (index + 1)}</span>
                        </h6>
                        ${item.Pregunta && item.Pregunta.trim() !== '' ? `<p class="mb-3 text-muted" style="margin-left: 2.2rem;">${item.Pregunta}</p>` : '<div class="mb-3"></div>'}
                `;

                if (item.Opciones && item.Opciones.length > 0) {
                    html += '<div class="list-group ps-4">';
                    item.Opciones.forEach(opt => {
                        let rPost = item.RespuestaPostulante ? String(item.RespuestaPostulante).trim().toLowerCase() : "";
                        let oI = opt.IdOpcion ? String(opt.IdOpcion).trim().toLowerCase() : "";
                        let oT = opt.Texto ? String(opt.Texto).trim().toLowerCase() : "";

                        let isSelected = (rPost !== "" && (rPost === oI || rPost === oT));

                        let isCorrectaOM = false;
                        let corrO = item.RespuestaCorrectaOM ? String(item.RespuestaCorrectaOM).trim().toLowerCase() : "";
                        let corrT = item.TextoRespuestaCorrectaOM ? String(item.TextoRespuestaCorrectaOM).trim().toLowerCase() : "";

                        if ((corrO !== "" && oI === corrO) || (corrT !== "" && oT === corrT)) {
                            isCorrectaOM = true;
                        }

                        let bgColor = "background-color: transparent;";
                        let borderColor = "border-color: #dee2e6;";
                        let iconOption = "";

                        // Si el postulante la seleccionó
                        if (isSelected) {
                            if (isCorrectaOM) {
                                // Correcta seleccionada (Verde claro)
                                bgColor = "background-color: #d4edda;";
                                borderColor = "border-color: #c3e6cb;";
                                iconOption = '<span class="material-symbols-outlined text-success ms-auto align-middle">check_circle</span>';
                            } else {
                                // Incorrecta seleccionada (Rojo claro)
                                bgColor = "background-color: #f8d7da;";
                                borderColor = "border-color: #f5c6cb;";
                                iconOption = '<span class="material-symbols-outlined text-danger ms-auto align-middle">cancel</span>';
                            }
                        } else if (isCorrectaOM) {
                            // Era la correcta y no la seleccionó (la mostramos en verde igual para indicar cual era)
                            bgColor = "background-color: #d4edda;";
                            borderColor = "border-color: #c3e6cb;";
                            iconOption = '<span class="material-symbols-outlined text-success ms-auto align-middle">check_circle</span>';
                        }

                        html += `
                        <div class="list-group-item d-flex justify-content-between align-items-center mb-1 rounded-3" style="${bgColor} ${borderColor} border-width:1px; border-style:solid;">
                            <span>${opt.Texto}</span>
                            ${iconOption}
                        </div>
                        `;
                    });
                    html += '</div>';
                } else if (item.BoolCorreta !== null) {
                    // Verdadero/Falso (True/False o 1/0)
                    let rPostBool = item.RespuestaPostulante ? String(item.RespuestaPostulante).trim().toLowerCase() : "";

                    // Determinar qué respondió el postulante
                    let isTrueSelected  = (rPostBool == "1" || rPostBool == "true"  || rPostBool == "verdadero");
                    let isFalseSelected = (rPostBool == "0" || rPostBool == "false" || rPostBool == "falso");

                    // ¿Cuál opción es la correcta?
                    let trueIsCorrect = (item.BoolCorreta == "1");

                    // --------- Estilo de la opción VERDADERO ---------
                    let bgTrue = "", iconTrue = "";
                    if (isTrueSelected) {
                        // El postulante eligió Verdadero
                        if (trueIsCorrect) {
                            // Correctamente elegida → verde
                            bgTrue = "background-color: #d4edda; border-color: #c3e6cb;";
                            iconTrue = '<span class="material-symbols-outlined text-success ms-auto align-middle">check_circle</span>';
                        } else {
                            // Elegida pero incorrecta → rojo
                            bgTrue = "background-color: #f8d7da; border-color: #f5c6cb;";
                            iconTrue = '<span class="material-symbols-outlined text-danger ms-auto align-middle">cancel</span>';
                        }
                    } else if (trueIsCorrect) {
                        // No elegida pero es la correcta → verde tenue (indicamos cuál era)
                        bgTrue = "background-color: #d4edda; border-color: #c3e6cb;";
                        iconTrue = '<span class="material-symbols-outlined text-success ms-auto align-middle">check_circle</span>';
                    }
                    // Si no fue elegida y no es correcta → sin estilo

                    // --------- Estilo de la opción FALSO ---------
                    let bgFalse = "", iconFalse = "";
                    if (isFalseSelected) {
                        // El postulante eligió Falso
                        if (!trueIsCorrect) {
                            // Correctamente elegida → verde
                            bgFalse = "background-color: #d4edda; border-color: #c3e6cb;";
                            iconFalse = '<span class="material-symbols-outlined text-success ms-auto align-middle">check_circle</span>';
                        } else {
                            // Elegida pero incorrecta → rojo
                            bgFalse = "background-color: #f8d7da; border-color: #f5c6cb;";
                            iconFalse = '<span class="material-symbols-outlined text-danger ms-auto align-middle">cancel</span>';
                        }
                    } else if (!trueIsCorrect) {
                        // No elegida pero es la correcta → verde tenue
                        bgFalse = "background-color: #d4edda; border-color: #c3e6cb;";
                        iconFalse = '<span class="material-symbols-outlined text-success ms-auto align-middle">check_circle</span>';
                    }
                    // Si no fue elegida y no es correcta → sin estilo

                    html += `
                    <div class="list-group ps-4 w-50">
                        <div class="list-group-item d-flex justify-content-between align-items-center mb-1 rounded-3" style="${bgTrue} border-width:1px; border-style:solid;">
                            <span>Verdadero</span> ${iconTrue}
                        </div>
                        <div class="list-group-item d-flex justify-content-between align-items-center mb-1 rounded-3" style="${bgFalse} border-width:1px; border-style:solid;">
                            <span>Falso</span> ${iconFalse}
                        </div>
                    </div>`;

                } else {
                    // Respuesta abierta u otro formato
                    html += `
                    <div class="ps-4">
                        <div class="p-3 bg-light rounded-3 text-dark mb-2">
                           ${item.RespuestaPostulante || '<em class="text-muted">Sin respuesta</em>'}
                        </div>
                    </div>`;
                }

                html += `
                    </div>
                </div>
                `;
            });

            $('#contenedorEvaluacionRespuestas').html(html);
        } else {
            $('#contenedorEvaluacionRespuestas').html(`
                <div class="alert alert-warning m-4">
                    <span class="material-symbols-outlined align-middle me-2">sentiment_dissatisfied</span>
                    No se encontraron detalles para esta evaluación.
                </div>
            `);
        }
    } catch (err) {
        console.error('Error al abrir evaluación:', err);
        $('#contenedorEvaluacionRespuestas').html(`
            <div class="alert alert-danger m-4">
                <span class="material-symbols-outlined align-middle me-2">error</span>
                Ha ocurrido un error al cargar los datos.
            </div>
        `);
    }
}