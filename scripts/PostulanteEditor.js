/**
 * PostulanteEditor.js
 * Funcionalidad para edición completa de datos del postulante
 * Incluye: búsqueda de CP con SEPOMEX, gestión de teléfonos, actualización de todos los campos
 */

let modoEdicion = false;
let datosOriginales = {};
let sepomexCache = {};

function getEl(selectors) {
    for (let i = 0; i < selectors.length; i++) {
        const $el = $(selectors[i]);
        if ($el.length) return $el;
    }
    return $();
}

function getVal(selectors) {
    const $el = getEl(selectors);
    return $el.length ? ($el.val() || '') : '';
}

function setVal(selectors, value) {
    const $el = getEl(selectors);
    if ($el.length) $el.val(value || '');
}

function fieldSelectors() {
    return {
        idPostulante: ['#detalleIdPostulante'],
        nombre: ['#edit_Nombre', '#detallePostulanteNombre'],
        apellidoPaterno: ['#edit_ApellidoPaterno', '#detallePostulanteApellidoPaterno'],
        apellidoMaterno: ['#edit_ApellidoMaterno', '#detallePostulanteApellidoMaterno'],
        curp: ['#edit_CURP', '#detallePostulanteCURP'],
        correo: ['#edit_CorreoElectronico', '#detallePostulanteCorreo'],
        telefono: ['#detallePostulanteTelefono'],
        cp: ['#edit_CodigoPostal', '#detallePostulanteCP'],
        direccion: ['#edit_Direccion', '#detallePostulanteDireccion'],
        calle: ['#edit_Calle', '#detallePostulanteCalle'],
        numeroExterior: ['#edit_NumeroExterior', '#detallePostulanteNumeroExterior'],
        numeroInterior: ['#edit_NumeroInterior', '#detallePostulanteNumeroInterior'],
        estado: ['#edit_Estado', '#detallePostulanteEstado'],
        ciudad: ['#edit_Ciudad', '#detallePostulanteCiudad'],
        colonia: ['#edit_Colonia', '#detallePostulanteColonia'],
        previewDireccion: ['#direccionPreview', '#detalleDireccionPreview']
    };
}

function parseDireccionCompleta(direccion) {
    const texto = String(direccion || '').trim();
    const parsed = {
        calle: '',
        numeroExterior: '',
        numeroInterior: '',
        colonia: '',
        cp: '',
        resto: ''
    };

    if (!texto) return parsed;

    const cpMatch = texto.match(/C\.?\s*P\.?\s*[:.-]?\s*(\d{5})/i) || texto.match(/\b(\d{5})\b/);
    if (cpMatch) parsed.cp = cpMatch[1];

    const colMatch = texto.match(/Col\.?\s*([^,]+)/i);
    if (colMatch) parsed.colonia = colMatch[1].trim();

    // Soportar formato estructurado: "BASE | CP:27000 | COL:Torreon Centro"
    const structuredBase = texto.match(/^(.*?)\s*(?:\||$)/);
    const structuredCp = texto.match(/\bCP\s*:\s*(\d{5})\b/i);
    const structuredCol = texto.match(/\bCOL\s*:\s*([^|]+)/i);
    if (structuredCp) parsed.cp = structuredCp[1].trim();
    if (structuredCol) parsed.colonia = structuredCol[1].trim();
    if (structuredBase && structuredBase[1] && texto.includes('|')) {
        const base = structuredBase[1].trim();
        const intMatch = base.match(/(?:int\.?|interior|depto\.?|departamento)\s*([A-Za-z0-9-]+)/i);
        if (intMatch) parsed.numeroInterior = intMatch[1];
        let sinInterior = base.replace(/(?:int\.?|interior|depto\.?|departamento)\s*[A-Za-z0-9-]+/ig, '').trim();
        const numExtMatch = sinInterior.match(/\b(\d+[A-Za-z0-9-]*)\b(?!.*\b\d+[A-Za-z0-9-]*\b)/);
        if (numExtMatch) {
            parsed.numeroExterior = numExtMatch[1];
            sinInterior = sinInterior.replace(numExtMatch[1], '').replace(/\s{2,}/g, ' ').trim();
        }
        parsed.calle = sinInterior || base;
        parsed.resto = texto;
        return parsed;
    }

    const primerBloque = texto.split(',')[0].trim();
    if (primerBloque) {
        const intMatch = primerBloque.match(/(?:int\.?|interior|depto\.?|departamento)\s*([A-Za-z0-9-]+)/i);
        if (intMatch) parsed.numeroInterior = intMatch[1];

        let sinInterior = primerBloque.replace(/(?:int\.?|interior|depto\.?|departamento)\s*[A-Za-z0-9-]+/ig, '').trim();
        const numExtMatch = sinInterior.match(/\b(\d+[A-Za-z0-9-]*)\b(?!.*\b\d+[A-Za-z0-9-]*\b)/);
        if (numExtMatch) {
            parsed.numeroExterior = numExtMatch[1];
            sinInterior = sinInterior.replace(numExtMatch[1], '').replace(/\s{2,}/g, ' ').trim();
        }
        parsed.calle = sinInterior || primerBloque;
    }

    // Fallback: si no detectó calle/num y hay dirección, intenta separar por primera coma
    if (!parsed.calle && texto.includes(',')) {
        parsed.calle = texto.split(',')[0].trim();
    }

    parsed.resto = texto;
    return parsed;
}

function buildDireccionCalleNumero() {
    const f = fieldSelectors();
    const calle = getVal(f.calle).trim();
    const numExt = getVal(f.numeroExterior).trim();
    const numInt = getVal(f.numeroInterior).trim();
    let base = calle;
    if (numExt) base = base ? `${base} ${numExt}` : numExt;
    if (numInt) base = base ? `${base} Int. ${numInt}` : `Int. ${numInt}`;
    return base.trim();
}

function buildDireccionPreview() {
    const f = fieldSelectors();
    const base = buildDireccionCalleNumero();
    const col = getVal(f.colonia).trim();
    const cp = getVal(f.cp).trim();
    const ciudad = getVal(f.ciudad).trim();
    const estado = getVal(f.estado).trim();

    const partes = [];
    if (base) partes.push(base);
    if (col) partes.push(`Col. ${col}`);
    if (cp) partes.push(`C.P. ${cp}`);
    if (ciudad) partes.push(ciudad);
    if (estado) partes.push(estado);
    return partes.join(', ');
}

function updateDireccionPreview() {
    const f = fieldSelectors();
    const direccionBase = buildDireccionCalleNumero();
    setVal(f.direccion, direccionBase);
    const preview = buildDireccionPreview() || '-';
    const $preview = getEl(f.previewDireccion);
    if ($preview.length) $preview.text(preview);
}

function getDireccionGuardado() {
    const f = fieldSelectors();
    const base = buildDireccionCalleNumero();
    const cp = getVal(f.cp).trim();
    const col = getVal(f.colonia).trim();
    let direccion = base;
    if (cp) direccion += ` | CP:${cp}`;
    if (col) direccion += ` | COL:${col}`;
    return direccion.trim();
}

async function buscarCodigoPostalConValor(cp, coloniaPreferida = '') {
    const f = fieldSelectors();
    if (!cp || cp.length !== 5) return;
    let found = false;

    if ($('#cpStatus').length) {
        $('#cpStatus').html('<span class="spinner-border spinner-border-sm me-1"></span>Buscando...');
    }
    $('#btnBuscarCP').prop('disabled', true);

    try {
        const response = await $.ajax({
            type: 'POST',
            url: 'Backend/Postulantes/App.php',
            data: {
                op: 'consultarCodigoPostal',
                cp: cp
            },
            dataType: 'json',
            timeout: 10000
        });

        if (response && response.Resultado && response.Data) {
            const datos = response.Data;
            found = true;
            setVal(f.estado, datos.estado || '');
            setVal(f.ciudad, datos.municipio || '');

            const $colonia = getEl(f.colonia);
            if ($colonia.length) {
                $colonia.html('<option value="">Selecciona una colonia...</option>');
                if (Array.isArray(datos.colonias)) {
                    datos.colonias.forEach(col => {
                        $colonia.append(`<option value="${col}">${col}</option>`);
                    });
                }
                if (coloniaPreferida) {
                    $colonia.val(coloniaPreferida);
                    if ($colonia.val() !== coloniaPreferida) {
                        $colonia.append(`<option value="${coloniaPreferida}">${coloniaPreferida}</option>`);
                        $colonia.val(coloniaPreferida);
                    }
                }
                $colonia.prop('disabled', !modoEdicion);
            }

            sepomexCache[cp] = datos;
            if ($('#cpStatus').length) {
                $('#cpStatus').html('<span class="text-success">Encontrado</span>');
            }
        }
    } catch (error) {
        console.error('Error al buscar CP:', error);
        if ($('#cpStatus').length) {
            $('#cpStatus').html('<span class="text-danger">Error</span>');
        }
    } finally {
        if ($('#btnBuscarCP').length) {
            if ($('#edit_CodigoPostal').length) {
                $('#btnBuscarCP').prop('disabled', !modoEdicion);
            } else {
                $('#btnBuscarCP').css('display', modoEdicion ? '' : 'none');
            }
        }
        updateDireccionPreview();
    }

    return found;
}

async function aplicarDireccionCompleta(direccionCompleta, coloniaPreferida = '') {
    const f = fieldSelectors();
    const parsed = parseDireccionCompleta(direccionCompleta);

    setVal(f.calle, parsed.calle);
    setVal(f.numeroExterior, parsed.numeroExterior);
    setVal(f.numeroInterior, parsed.numeroInterior);

    const cpFinal = parsed.cp || getVal(f.cp);
    const colFinal = coloniaPreferida || parsed.colonia || getVal(f.colonia);

    if (cpFinal) setVal(f.cp, cpFinal);
    if (colFinal && !cpFinal) setVal(f.colonia, colFinal);

    updateDireccionPreview();

    if (cpFinal && cpFinal.length === 5) {
        await buscarCodigoPostalConValor(cpFinal, colFinal);
    } else if (colFinal) {
        setVal(f.colonia, colFinal);
    }

    updateDireccionPreview();
}

function setEditButtons(isEditing) {
    const $btnToggle = getEl(['#btnToggleEditMode', '#btnEditarPostulante']);
    const $btnBuscarCP = $('#btnBuscarCP');

    if ($('#editModeButtons').length) {
        $('#editModeButtons').toggleClass('d-none', !isEditing);
    }
    if ($('#botonesAccionPostulante').length) {
        $('#botonesAccionPostulante').css('display', isEditing ? '' : 'none');
    }

    if ($btnBuscarCP.length) {
        if ($('#edit_CodigoPostal').length) {
            $btnBuscarCP.prop('disabled', !isEditing);
        } else {
            $btnBuscarCP.css('display', isEditing ? '' : 'none');
        }
    }

    if ($btnToggle.length) {
        if ($btnToggle.attr('id') === 'btnToggleEditMode') {
            if (isEditing) {
                $btnToggle.html('<span class="material-symbols-outlined align-middle me-1">visibility</span>Ver Información');
                $btnToggle.removeClass('btn-outline-primary').addClass('btn-outline-secondary');
            } else {
                $btnToggle.html('<span class="material-symbols-outlined align-middle me-1">edit</span>Editar Información');
                $btnToggle.removeClass('btn-outline-secondary').addClass('btn-outline-primary');
            }
        } else {
            if (isEditing) {
                $btnToggle.html('<i class="material-icons-outlined align-middle" style="font-size: 18px;">visibility</i> Ver Información');
                $btnToggle.removeClass('btn-primary').addClass('btn-secondary');
            } else {
                $btnToggle.html('<i class="material-icons-outlined align-middle" style="font-size: 18px;">edit</i> Editar Información');
                $btnToggle.removeClass('btn-secondary').addClass('btn-primary');
            }
        }
    }
}

function setFieldsDisabled(disabled) {
    const f = fieldSelectors();
    [
        f.nombre,
        f.apellidoPaterno,
        f.apellidoMaterno,
        f.curp,
        f.correo,
        f.cp,
        f.direccion,
        f.calle,
        f.numeroExterior,
        f.numeroInterior,
        f.colonia
    ].forEach(sel => {
        const $el = getEl(sel);
        if ($el.length) $el.prop('disabled', disabled);
    });
}

/**
 * Alternar entre modo visualización y modo edición
 */
function toggleEditMode() {
    modoEdicion = !modoEdicion;
    const f = fieldSelectors();

    if (modoEdicion) {
        datosOriginales = {
            Nombre: getVal(f.nombre),
            ApellidoPaterno: getVal(f.apellidoPaterno),
            ApellidoMaterno: getVal(f.apellidoMaterno),
            CURP: getVal(f.curp),
            CorreoElectronico: getVal(f.correo),
            CodigoPostal: getVal(f.cp),
            Direccion: getVal(f.direccion),
            Estado: getVal(f.estado),
            Ciudad: getVal(f.ciudad),
            Colonia: getVal(f.colonia),
            Calle: getVal(f.calle),
            NumeroExterior: getVal(f.numeroExterior),
            NumeroInterior: getVal(f.numeroInterior)
        };

        setFieldsDisabled(false);
        setEditButtons(true);
    } else {
        setFieldsDisabled(true);
        setEditButtons(false);
    }
}

/**
 * Cancelar edición y restaurar valores originales
 */
function cancelarEdicion() {
    if (confirm('¿Deseas cancelar los cambios? Se perderán las modificaciones.')) {
        const f = fieldSelectors();
        setVal(f.nombre, datosOriginales.Nombre);
        setVal(f.apellidoPaterno, datosOriginales.ApellidoPaterno);
        setVal(f.apellidoMaterno, datosOriginales.ApellidoMaterno);
        setVal(f.curp, datosOriginales.CURP);
        setVal(f.correo, datosOriginales.CorreoElectronico);
        setVal(f.cp, datosOriginales.CodigoPostal);
        setVal(f.direccion, datosOriginales.Direccion);
        setVal(f.estado, datosOriginales.Estado);
        setVal(f.ciudad, datosOriginales.Ciudad);
        setVal(f.colonia, datosOriginales.Colonia);
        setVal(f.calle, datosOriginales.Calle);
        setVal(f.numeroExterior, datosOriginales.NumeroExterior);
        setVal(f.numeroInterior, datosOriginales.NumeroInterior);
        updateDireccionPreview();

        toggleEditMode();
    }
}

/**
 * Guardar cambios del postulante
 */
async function guardarCambiosPostulante() {
    const f = fieldSelectors();
    const nombre = getVal(f.nombre).trim();
    const apellidoPaterno = getVal(f.apellidoPaterno).trim();
    const correo = getVal(f.correo).trim();

    if (!nombre || !apellidoPaterno || !correo) {
        toastr.error('Nombre, Apellido Paterno y Correo son obligatorios');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        toastr.error('El correo electrónico no es válido');
        return;
    }

    const idPostulante = getVal(f.idPostulante);

    const datos = {
        op: 'actualizarPostulanteCompleto',
        IdPostulante: idPostulante,
        Nombre: nombre,
        ApellidoPaterno: apellidoPaterno,
        ApellidoMaterno: getVal(f.apellidoMaterno).trim(),
        CURP: getVal(f.curp).trim().toUpperCase(),
        Telefono: '', // Los teléfonos se gestionan por separado
        CorreoElectronico: correo,
        Direccion: getDireccionGuardado(),
        CodigoPostal: getVal(f.cp).trim(),
        Estado: getVal(f.estado).trim(),
        Ciudad: getVal(f.ciudad).trim(),
        Colonia: getVal(f.colonia)
    };
    
    try {
        const response = await $.ajax({
            type: 'POST',
            url: 'Backend/Postulantes/App.php',
            data: datos,
            dataType: 'json'
        });
        
        if (response.Resultado) {
            toastr.success(response.Msg || 'Postulante actualizado correctamente');

            // Mantener consistencia visual después de guardar
            datosOriginales.CodigoPostal = getVal(f.cp);
            datosOriginales.Colonia = getVal(f.colonia);
            datosOriginales.Calle = getVal(f.calle);
            datosOriginales.NumeroExterior = getVal(f.numeroExterior);
            datosOriginales.NumeroInterior = getVal(f.numeroInterior);
            updateDireccionPreview();
            
            // Salir del modo edición
            modoEdicion = true; // Para que toggleEditMode lo ponga en false
            toggleEditMode();
            
            // Recargar la tabla si existe
            if (typeof loadPostulantes === 'function') {
                const idVacante = $('#postulantesIdVacante').val();
                if (idVacante) {
                    await loadPostulantes(idVacante);
                }
            }
        } else {
            toastr.error(response.Msg || 'Error al actualizar el postulante');
        }
    } catch (error) {
        console.error('Error al guardar cambios:', error);
        toastr.error('Error de conexión al guardar los cambios');
    }
}

/**
 * Buscar código postal en API SEPOMEX
 */
async function buscarCodigoPostal() {
    const f = fieldSelectors();
    const cp = getVal(f.cp).trim();

    if (cp.length !== 5) {
        toastr.warning('El código postal debe tener 5 dígitos');
        return;
    }

    const found = await buscarCodigoPostalConValor(cp, getVal(f.colonia));
    if (found) {
        toastr.success('Código postal encontrado');
    } else {
        toastr.error('Código postal no encontrado');
    }
}

/**
 * Validar solo números en input de CP
 */
$(document).on('input', '#edit_CodigoPostal, #detallePostulanteCP', function() {
    this.value = this.value.replace(/[^0-9]/g, '');

    if (this.value.length === 5 && modoEdicion) {
        buscarCodigoPostal();
    }
});

$(document).on('input', '#edit_Calle, #edit_NumeroExterior, #edit_NumeroInterior, #detallePostulanteCalle, #detallePostulanteNumeroExterior, #detallePostulanteNumeroInterior', function() {
    updateDireccionPreview();
});

$(document).on('change', '#edit_Colonia, #detallePostulanteColonia', function() {
    updateDireccionPreview();
});

/**
 * Gestión de Teléfonos
 */

let telefonosPostulante = [];

/**
 * Cargar teléfonos del postulante
 */
async function cargarTelefonosPostulante(idPostulante) {
    try {
        const response = await $.ajax({
            type: 'POST',
            url: 'Backend/Postulantes/App.php',
            data: {
                op: 'getTelefonosHistorico',
                IdPostulante: idPostulante
            },
            dataType: 'json'
        });
        
        if (response.Resultado && response.Data) {
            telefonosPostulante = response.Data;
            renderizarTablaTelefonos();
            renderizarListaTelefonos();
        }
    } catch (error) {
        console.error('Error al cargar teléfonos:', error);
        $('#tablaTelefonos').html('<p class="text-danger">Error al cargar teléfonos</p>');
    }
}

/**
 * Renderizar tabla de teléfonos (sección de gestión)
 */
function renderizarTablaTelefonos() {
    const $tabla = $('#tablaTelefonos');
    const $seccion = $('#seccionTelefonos');

    if (telefonosPostulante.length === 0) {
        if ($tabla.length) {
            $tabla.html('<p class="text-muted text-center">No hay teléfonos registrados</p>');
        }
        if ($seccion.length) {
            $seccion.html('<p class="text-muted small mb-0">No hay teléfonos registrados</p>');
        }
        return;
    }
    
    let html = `
        <table class="table table-sm table-hover">
            <thead>
                <tr>
                    <th>Teléfono</th>
                    <th>Fecha Registro</th>
                    <th>Estado</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    telefonosPostulante.forEach(tel => {
        const telefonoFormatted = formatearTelefono(tel.Telefono);
        const activo = parseInt(tel.Activo) === 1;
        const principal = parseInt(tel.EsPrincipal) === 1;
        
        html += `
            <tr class="${!activo ? 'table-secondary' : ''}">
                <td><strong>${telefonoFormatted}</strong></td>
                <td>${tel.FechaRegistro}</td>
                <td>
                    ${activo ? '<span class="badge bg-success">Activo</span>' : '<span class="badge bg-secondary">Inactivo</span>'}
                </td>
                <td>
                    ${principal ? '<span class="badge bg-primary">Principal</span>' : '<span class="badge bg-light text-dark">Secundario</span>'}
                </td>
                <td>
                    ${!principal ? `
                        <button class="btn btn-xs btn-primary" onclick="establecerTelefonoPrincipal(${tel.IdTelefonoHistorico})" title="Hacer principal">
                            <span class="material-symbols-outlined" style="font-size:14px;">star</span>
                        </button>
                    ` : ''}
                    ${activo ? `
                        <button class="btn btn-xs btn-warning" onclick="desactivarTelefonoPostulante(${tel.IdTelefonoHistorico})" title="Desactivar">
                            <span class="material-symbols-outlined" style="font-size:14px;">block</span>
                        </button>
                    ` : `
                        <button class="btn btn-xs btn-success" onclick="reactivarTelefonoPostulante(${tel.IdTelefonoHistorico})" title="Reactivar">
                            <span class="material-symbols-outlined" style="font-size:14px;">check_circle</span>
                        </button>
                    `}
                    ${!principal ? `
                        <button class="btn btn-xs btn-danger" onclick="eliminarTelefonoPostulante(${tel.IdTelefonoHistorico})" title="Eliminar">
                            <span class="material-symbols-outlined" style="font-size:14px;">delete</span>
                        </button>
                    ` : ''}
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    if ($tabla.length) {
        $tabla.html(html);
    }
    if ($seccion.length) {
        $seccion.html(html);
    }
}

/**
 * Renderizar lista simple de teléfonos (sección de información personal)
 */
function renderizarListaTelefonos() {
    if (telefonosPostulante.length === 0) {
        $('#listaTelefonos').html('<small class="text-muted">Sin teléfonos registrados</small>');
        return;
    }
    
    let html = '<div class="d-flex flex-wrap gap-2">';
    
    telefonosPostulante.forEach(tel => {
        const activo = parseInt(tel.Activo) === 1;
        const principal = parseInt(tel.EsPrincipal) === 1;
        const telefonoFormatted = formatearTelefono(tel.Telefono);
        
        html += `
            <span class="badge ${activo ? (principal ? 'bg-primary' : 'bg-success') : 'bg-secondary'}" style="font-size:0.9rem;">
                ${principal ? '⭐ ' : ''}${telefonoFormatted}
                ${!activo ? ' (Inactivo)' : ''}
            </span>
        `;
    });
    
    html += '</div>';
    $('#listaTelefonos').html(html);
}

/**
 * Formatear teléfono a (XXX) XXX-XXXX
 */
function formatearTelefono(telefono) {
    if (!telefono || telefono.length !== 10) return telefono;
    return `(${telefono.substring(0, 3)}) ${telefono.substring(3, 6)}-${telefono.substring(6)}`;
}

/**
 * Mostrar formulario para agregar teléfono
 */
function mostrarFormAgregarTelefono() {
    $('#formAgregarTelefono').removeClass('d-none');
    $('#nuevoTelefono').focus();
}

/**
 * Ocultar formulario para agregar teléfono
 */
function ocultarFormAgregarTelefono() {
    $('#formAgregarTelefono').addClass('d-none');
    $('#nuevoTelefono').val('');
    $('#observacionesTelefono').val('');
}

/**
 * Agregar nuevo teléfono
 */
async function agregarTelefonoNuevo() {
    const telefono = $('#nuevoTelefono').val().trim();
    const observaciones = $('#observacionesTelefono').val().trim();
    const idPostulante = $('#detalleIdPostulante').val();
    
    if (!telefono) {
        toastr.warning('Ingresa un número de teléfono');
        return;
    }
    
    if (telefono.length !== 10) {
        toastr.error('El teléfono debe tener 10 dígitos');
        return;
    }
    
    try {
        const response = await $.ajax({
            type: 'POST',
            url: 'Backend/Postulantes/App.php',
            data: {
                op: 'agregarTelefonoSecundario',
                IdPostulante: idPostulante,
                Telefono: telefono,
                Observaciones: observaciones || 'Agregado desde panel de gestión'
            },
            dataType: 'json'
        });
        
        if (response.Resultado) {
            toastr.success(response.Msg || 'Teléfono agregado correctamente');
            ocultarFormAgregarTelefono();
            await cargarTelefonosPostulante(idPostulante);
        } else {
            toastr.error(response.Msg || 'Error al agregar teléfono');
        }
    } catch (error) {
        console.error('Error:', error);
        toastr.error('Error de conexión');
    }
}

/**
 * Establecer teléfono como principal
 */
async function establecerTelefonoPrincipal(idTelefonoHistorico) {
    if (!confirm('¿Establecer este teléfono como principal?')) return;

    const idPostulante = $('#detalleIdPostulante').val();
    const telefonoObj = telefonosPostulante.find(t => String(t.IdTelefonoHistorico) === String(idTelefonoHistorico));

    if (!telefonoObj || !telefonoObj.Telefono) {
        toastr.error('No se pudo identificar el teléfono seleccionado');
        return;
    }
    
    try {
        const response = await $.ajax({
            type: 'POST',
            url: 'Backend/Postulantes/App.php',
            data: {
                op: 'actualizarTelefonoPostulante',
                IdPostulante: idPostulante,
                Telefono: telefonoObj.Telefono,
                Observaciones: 'Actualizado como principal desde gestión de teléfonos'
            },
            dataType: 'json'
        });
        
        if (response.Resultado) {
            toastr.success(response.Msg || 'Teléfono principal actualizado');
            await cargarTelefonosPostulante(idPostulante);
        } else {
            toastr.error(response.Msg || 'Error al actualizar');
        }
    } catch (error) {
        console.error('Error:', error);
        toastr.error('Error de conexión');
    }
}

/**
 * Desactivar teléfono
 */
async function desactivarTelefonoPostulante(idTelefonoHistorico) {
    if (!confirm('¿Desactivar este teléfono?')) return;
    
    const idPostulante = $('#detalleIdPostulante').val();
    
    try {
        const response = await $.ajax({
            type: 'POST',
            url: 'Backend/Postulantes/App.php',
            data: {
                op: 'desactivarTelefono',
                IdTelefonoHistorico: idTelefonoHistorico
            },
            dataType: 'json'
        });
        
        if (response.Resultado) {
            toastr.success(response.Msg || 'Teléfono desactivado');
            await cargarTelefonosPostulante(idPostulante);
        } else {
            toastr.error(response.Msg || 'Error al desactivar');
        }
    } catch (error) {
        console.error('Error:', error);
        toastr.error('Error de conexión');
    }
}

/**
 * Reactivar teléfono
 */
async function reactivarTelefonoPostulante(idTelefonoHistorico) {
    if (!confirm('¿Reactivar este teléfono?')) return;
    
    const idPostulante = $('#detalleIdPostulante').val();
    
    try {
        const response = await $.ajax({
            type: 'POST',
            url: 'Backend/Postulantes/App.php',
            data: {
                op: 'reactivarTelefono',
                IdTelefonoHistorico: idTelefonoHistorico
            },
            dataType: 'json'
        });
        
        if (response.Resultado) {
            toastr.success(response.Msg || 'Teléfono reactivado');
            await cargarTelefonosPostulante(idPostulante);
        } else {
            toastr.error(response.Msg || 'Error al reactivar');
        }
    } catch (error) {
        console.error('Error:', error);
        toastr.error('Error de conexión');
    }
}

/**
 * Eliminar teléfono permanentemente
 */
async function eliminarTelefonoPostulante(idTelefonoHistorico) {
    if (!confirm('¿Eliminar este teléfono permanentemente del histórico? Esta acción no se puede deshacer.')) return;
    
    const idPostulante = $('#detalleIdPostulante').val();
    
    try {
        const response = await $.ajax({
            type: 'POST',
            url: 'Backend/Postulantes/App.php',
            data: {
                op: 'eliminarTelefono',
                IdTelefonoHistorico: idTelefonoHistorico
            },
            dataType: 'json'
        });
        
        if (response.Resultado) {
            toastr.success(response.Msg || 'Teléfono eliminado');
            await cargarTelefonosPostulante(idPostulante);
        } else {
            toastr.error(response.Msg || 'Error al eliminar');
        }
    } catch (error) {
        console.error('Error:', error);
        toastr.error('Error de conexión');
    }
}

/**
 * Solo números en input de teléfono
 */
$(document).on('input', '#nuevoTelefono', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
});

window.PostulanteEditor = {
    toggleEditMode,
    cancelarEdicion,
    guardarCambiosPostulante,
    buscarCodigoPostal,
    cargarTelefonosPostulante,
    renderizarTablaTelefonos,
    renderizarListaTelefonos,
    mostrarFormAgregarTelefono,
    ocultarFormAgregarTelefono,
    agregarTelefonoNuevo,
    establecerTelefonoPrincipal,
    desactivarTelefonoPostulante,
    reactivarTelefonoPostulante,
    eliminarTelefonoPostulante,
    aplicarDireccionCompleta,
    updateDireccionPreview,
    buscarCodigoPostalConValor,
    isModoEdicion: function() { return modoEdicion; }
};
