/**
 * BolsaDeTrabajo.js
 * Script para gestionar la bolsa de trabajo pública
 * - Consume API GET para obtener vacantes publicadas
 * - Gestiona formulario de postulación en modal
 * - Filtrado en tiempo real por área y puesto
 * - Envía postulaciones via POST
 */

// Estado global
let vacantesData = [];
let vacanteSeleccionada = null;
let sepomexCache = {}; // Cache para evitar consultas repetidas
let postulacionesUser = []; // IDs de vacantes donde el usuario ya aplicó

/**
 * Consulta la API local de códigos postales SEPOMEX
 * Usa la base de datos XML oficial del Servicio Postal Mexicano
 * @param {string} cp - Código postal de 5 dígitos
 * @returns {Promise<Object|null>} Datos de ubicación o null si hay error
 */
async function consultarCodigoPostal(cp) {
    // Validar formato
    if (!cp || !/^\d{5}$/.test(cp)) {
        return null;
    }
    
    // Verificar cache
    if (sepomexCache[cp]) {
        return sepomexCache[cp];
    }
    
    try {
        // Consultar endpoint local PHP
        const response = await $.ajax({
            type: "POST",
            url: "Backend/Postulantes/App.php",
            data: { 
                op: "consultarCodigoPostal",
                cp: cp
            },
            dataType: "json",
            timeout: 10000
        });
        
        // Verificar respuesta exitosa
        if (response && response.Resultado && response.Data) {
            const resultado = {
                estado: response.Data.estado,
                municipio: response.Data.municipio,
                colonias: response.Data.colonias
            };
            
            // Guardar en cache
            sepomexCache[cp] = resultado;
            return resultado;
        }
        
        return null;
    } catch (error) {
        console.error('Error consultando código postal:', error);
        return null;
    }
}

/**
 * Maneja el evento de cambio en el input de código postal
 */
async function handleCodigoPostalChange() {
    const inputCP = document.getElementById('input-cp');
    const inputEstado = document.getElementById('input-estado');
    const inputMunicipio = document.getElementById('input-municipio');
    const selectColonia = document.getElementById('select-colonia');
    const cpLoading = document.getElementById('cp-loading');
    const cpSuccess = document.getElementById('cp-success');
    const cpError = document.getElementById('cp-error');
    
    const cp = inputCP.value.trim();
    
    // Limpiar estados previos
    cpLoading.classList.add('hidden');
    cpSuccess.classList.add('hidden');
    cpError.classList.add('hidden');
    cpError.textContent = '';
    
    // Si no tiene 5 dígitos, limpiar campos y esperar
    if (cp.length !== 5) {
        inputEstado.value = '';
        inputMunicipio.value = '';
        selectColonia.innerHTML = '<option value="">Primero ingresa tu código postal...</option>';
        selectColonia.disabled = true;
        return;
    }
    
    // Mostrar loading
    cpLoading.classList.remove('hidden');
    
    // Consultar API
    const datos = await consultarCodigoPostal(cp);
    
    // Ocultar loading
    cpLoading.classList.add('hidden');
    
    if (datos) {
        // Éxito - llenar campos
        inputEstado.value = datos.estado;
        inputMunicipio.value = datos.municipio;
        
        // Poblar select de colonias
        selectColonia.innerHTML = '<option value="">Selecciona tu colonia...</option>';
        datos.colonias.forEach(colonia => {
            const option = document.createElement('option');
            option.value = colonia;
            option.textContent = colonia;
            selectColonia.appendChild(option);
        });
        selectColonia.disabled = false;
        
        // Mostrar indicador de éxito
        cpSuccess.classList.remove('hidden');
        lucide.createIcons();
    } else {
        // Error - mostrar mensaje
        inputEstado.value = '';
        inputMunicipio.value = '';
        selectColonia.innerHTML = '<option value="">Primero ingresa tu código postal...</option>';
        selectColonia.disabled = true;
        
        cpError.textContent = 'Código postal no encontrado. Verifica que sea correcto.';
        cpError.classList.remove('hidden');
    }
}

/**
 * Adjunta el evento al input de código postal
 */
function attachCodigoPostalEvent() {
    const inputCP = document.getElementById('input-cp');
    if (inputCP) {
        // Remover listeners previos clonando el elemento
        const newInputCP = inputCP.cloneNode(true);
        inputCP.parentNode.replaceChild(newInputCP, inputCP);
        
        // Solo permitir números
        newInputCP.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Si tiene 5 dígitos, consultar automáticamente
            if (this.value.length === 5) {
                handleCodigoPostalChange();
            }
        });
        
        // También manejar cuando se pega un valor
        newInputCP.addEventListener('paste', function(e) {
            setTimeout(() => {
                this.value = this.value.replace(/[^0-9]/g, '').substring(0, 5);
                if (this.value.length === 5) {
                    handleCodigoPostalChange();
                }
            }, 10);
        });
    }
}

/**
 * Resetea los campos de dirección SEPOMEX al estado inicial
 */
function resetearCamposSepomex() {
    const inputCP = document.getElementById('input-cp');
    const inputEstado = document.getElementById('input-estado');
    const inputMunicipio = document.getElementById('input-municipio');
    const selectColonia = document.getElementById('select-colonia');
    const cpLoading = document.getElementById('cp-loading');
    const cpSuccess = document.getElementById('cp-success');
    const cpError = document.getElementById('cp-error');
    
    if (inputCP) inputCP.value = '';
    if (inputEstado) inputEstado.value = '';
    if (inputMunicipio) inputMunicipio.value = '';
    if (selectColonia) {
        selectColonia.innerHTML = '<option value="">Primero ingresa tu código postal...</option>';
        selectColonia.disabled = true;
    }
    if (cpLoading) cpLoading.classList.add('hidden');
    if (cpSuccess) cpSuccess.classList.add('hidden');
    if (cpError) {
        cpError.classList.add('hidden');
        cpError.textContent = '';
    }
}

/**
 * Construye la dirección completa concatenando los campos
 * @returns {string} Dirección completa formateada
 */
function construirDireccionCompleta() {
    const calle = document.getElementById('input-calle')?.value?.trim() || '';
    const colonia = document.getElementById('select-colonia')?.value || '';
    const cp = document.getElementById('input-cp')?.value?.trim() || '';
    const municipio = document.getElementById('input-municipio')?.value || '';
    const estado = document.getElementById('input-estado')?.value || '';
    
    // Formato: Calle #123, Col. Nombre Colonia, C.P. 12345, Municipio, Estado
    const partes = [];
    if (calle) partes.push(calle);
    if (colonia) partes.push(`Col. ${colonia}`);
    if (cp) partes.push(`C.P. ${cp}`);
    if (municipio) partes.push(municipio);
    if (estado) partes.push(estado);
    
    return partes.join(', ');
}

/**
 * Obtiene las vacantes publicadas desde el API
 * @returns {Promise<Array>} Lista de vacantes
 */
async function fetchVacantes() {
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/Vacantes/App.php",
            data: { op: "getRequisitosDocumentacionVacantes" },
            dataType: "json"
        });
        
        if (respuesta.Resultado && respuesta.Data) {
            vacantesData = respuesta.Data;
            return respuesta.Data;
        } else {
            console.warn('No se encontraron vacantes disponibles');
            return [];
        }
    } catch (error) {
        console.error('Error al obtener vacantes:', error);
        mostrarErrorCarga();
        return [];
    }
}

/**
 * Filtra las vacantes según el término de búsqueda
 * @param {string} termino - Término de búsqueda
 * @returns {Array} Vacantes filtradas
 */
function filtrarVacantes(termino) {
    if (!termino || termino.trim() === '') {
        return vacantesData;
    }
    
    const terminoLower = termino.toLowerCase().trim();
    
    return vacantesData.filter(vacante => {
        const nombreVacante = (vacante.NombreVacante || '').toLowerCase();
        const nombreArea = (vacante.NombreArea || '').toLowerCase();
        const puesto = (vacante.Puesto || '').toLowerCase();
        
        return nombreVacante.includes(terminoLower) || 
               nombreArea.includes(terminoLower) || 
               puesto.includes(terminoLower);
    });
}

/**
 * Manejador del input de búsqueda
 */
function handleBusqueda(e) {
    const termino = e.target.value;
    const vacantesFiltradas = filtrarVacantes(termino);
    renderJobs(vacantesFiltradas);
}

/**
 * Muestra mensaje de error cuando no se pueden cargar las vacantes
 */
function mostrarErrorCarga() {
    const grid = document.getElementById('jobs-grid');
    grid.innerHTML = `
        <div class="col-span-full text-center py-16">
            <i data-lucide="alert-circle" class="w-16 h-16 text-red-500/50 mx-auto mb-4"></i>
            <h3 class="text-xl font-bold text-white mb-2">Error al cargar vacantes</h3>
            <p class="text-gray-400 mb-6">No pudimos conectar con el servidor. Por favor intenta más tarde.</p>
            <button onclick="cargarVacantes()" class="px-6 py-3 bg-[#f2bb46] text-black font-bold rounded-xl hover:bg-[#e0a830] transition-colors">
                Reintentar
            </button>
        </div>
    `;
    lucide.createIcons();
}

/**
 * Muestra estado de carga mientras se obtienen las vacantes
 */
function mostrarCargando() {
    const grid = document.getElementById('jobs-grid');
    grid.innerHTML = `
        <div class="col-span-full text-center py-16">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#f2bb46] border-t-transparent mb-4"></div>
            <p class="text-gray-400">Cargando vacantes disponibles...</p>
        </div>
    `;
}

/**
 * Muestra mensaje cuando no hay vacantes disponibles
 */
function mostrarSinVacantes() {
    const grid = document.getElementById('jobs-grid');
    grid.innerHTML = `
        <div class="col-span-full text-center py-16">
            <i data-lucide="briefcase" class="w-16 h-16 text-gray-600 mx-auto mb-4"></i>
            <h3 class="text-xl font-bold text-white mb-2">No hay vacantes disponibles</h3>
            <p class="text-gray-400">Por el momento no tenemos posiciones abiertas. Vuelve a consultar pronto.</p>
        </div>
    `;
    lucide.createIcons();
}

/**
 * Muestra mensaje cuando no hay resultados de búsqueda
 */
function mostrarSinResultados(termino) {
    const grid = document.getElementById('jobs-grid');
    grid.innerHTML = `
        <div class="col-span-full text-center py-16">
            <i data-lucide="search-x" class="w-16 h-16 text-gray-600 mx-auto mb-4"></i>
            <h3 class="text-xl font-bold text-white mb-2">Sin resultados</h3>
            <p class="text-gray-400">No encontramos vacantes que coincidan con "<span class="text-[#f2bb46]">${termino}</span>"</p>
            <button onclick="limpiarBusqueda()" class="mt-4 px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm">
                Ver todas las vacantes
            </button>
        </div>
    `;
    lucide.createIcons();
}

/**
 * Limpia el campo de búsqueda y muestra todas las vacantes
 */
function limpiarBusqueda() {
    const inputBusqueda = document.getElementById('search-input');
    if (inputBusqueda) {
        inputBusqueda.value = '';
    }
    renderJobs(vacantesData);
}

/**
 * Obtiene el texto de requisitos de documentación
 * @param {Object} vacante - Objeto de vacante
 * @returns {string} Texto descriptivo de los requisitos
 */
function getRequisitosTexto(vacante) {
    const cv = vacante.BanderaCV === 1;
    const se = vacante.BanderaSE === 1;
    
    if (cv && se) return 'CV y Solicitud de Empleo requeridos';
    if (cv) return 'CV requerido';
    if (se) return 'Solicitud de Empleo requerida';
    return 'Sin documentos requeridos';
}

/**
 * Genera el HTML para los campos de archivo según las banderas
 * @param {Object} vacante - Objeto de vacante
 * @returns {string} HTML de los campos de archivo
 */
function generarCamposArchivo(vacante) {
    let html = '';
    
    if (vacante.BanderaCV === 1) {
        html += `
            <div class="flex flex-col">
                <label class="text-[10px] uppercase text-gray-500 mb-1 font-bold tracking-wider">
                    Curriculum Vitae (CV) <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                    <input type="file" name="cv" accept=".pdf,.jpg,.jpeg,.png" required
                        class="file-input-cv absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
                    <div class="file-display-cv flex items-center gap-3 p-4 border border-dashed border-white/20 rounded-xl bg-white/5 hover:border-[#f2bb46]/50 transition-colors">
                        <i data-lucide="file-text" class="w-6 h-6 text-gray-400"></i>
                        <span class="text-sm text-gray-400 file-name-cv">PDF, JPG o PNG (max 20MB)...</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    if (vacante.BanderaSE === 1) {
        html += `
            <div class="flex flex-col">
                <label class="text-[10px] uppercase text-gray-500 mb-1 font-bold tracking-wider">
                    Solicitud de Empleo <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                    <input type="file" name="solicitud_empleo" accept=".pdf,.jpg,.jpeg,.png" required
                        class="file-input-se absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
                    <div class="file-display-se flex items-center gap-3 p-4 border border-dashed border-white/20 rounded-xl bg-white/5 hover:border-[#f2bb46]/50 transition-colors">
                        <i data-lucide="file-text" class="w-6 h-6 text-gray-400"></i>
                        <span class="text-sm text-gray-400 file-name-se">PDF, JPG o PNG (max 20MB)...</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    return html;
}

/**
 * Renderiza las tarjetas de vacantes
 * @param {Array} vacantes - Lista de vacantes
 */
function renderJobs(vacantes) {
    const grid = document.getElementById('jobs-grid');
    const inputBusqueda = document.getElementById('search-input');
    const termino = inputBusqueda ? inputBusqueda.value : '';
    
    if (!vacantes || vacantes.length === 0) {
        if (termino && termino.trim() !== '') {
            mostrarSinResultados(termino);
        } else {
            mostrarSinVacantes();
        }
        return;
    }
    
    let html = '';
    
    vacantes.forEach(vacante => {
        const tieneRequisitosDoc = vacante.BanderaCV === 1 || vacante.BanderaSE === 1;
        
        html += `
        <div class="magic-card group" data-id="${vacante.IdVacante}">
            <div class="border-beam opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div class="relative z-10 p-6 flex flex-col h-full">
                <!-- Header con tipo de contratación -->
                <div class="flex justify-between items-start mb-4">
                    <span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2">
                        <i data-lucide="clock" class="w-3 h-3 text-[#f2bb46]"></i>
                        ${vacante.TipoContratacion}
                    </span>
                </div>

                <!-- Título del puesto -->
                <h3 class="text-xl font-bold mb-3 text-white group-hover:text-[#f2bb46] transition-colors leading-tight">
                    ${vacante.NombreVacante}
                </h3>
                
                <!-- Descripción breve -->
                <p class="text-sm text-gray-500 mb-5 line-clamp-2 flex-grow">${vacante.DescripcionPuesto}</p>
                
                <!-- Información de la vacante -->
                <div class="space-y-2.5 mb-5">
                    <div class="flex items-center text-gray-400 text-sm gap-3">
                        <i data-lucide="building-2" class="w-4 h-4 text-white/30"></i>
                        <span>${vacante.NombreArea}</span>
                    </div>
                    <div class="flex items-center text-gray-400 text-sm gap-3">
                        <i data-lucide="map-pin" class="w-4 h-4 text-white/30"></i>
                        <span>${vacante.Sucursal}</span>
                    </div>
                    <div class="flex items-center text-gray-400 text-sm gap-3">
                        <i data-lucide="briefcase" class="w-4 h-4 text-white/30"></i>
                        <span>${vacante.Puesto}</span>
                    </div>
                </div>
                
                <!-- Requisitos de documentación -->
                ${tieneRequisitosDoc ? `
                <div class="flex items-center text-[#f2bb46] text-xs gap-2 mb-5 p-3 bg-[#f2bb46]/10 rounded-xl">
                    <i data-lucide="file-check" class="w-4 h-4"></i>
                    <span>${getRequisitosTexto(vacante)}</span>
                </div>
                ` : ''}

                <!-- Botón de aplicar -->
                ${postulacionesUser.includes(parseInt(vacante.IdVacante)) ? `
                <button type="button" disabled
                    class="w-full py-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                    <span class="relative z-10 flex items-center justify-center gap-2">
                        <i data-lucide="check-circle-2" class="w-5 h-5"></i>
                        Registrado
                    </span>
                </button>
                ` : `
                <button type="button" 
                    onclick="abrirModalPostulacion(${vacante.IdVacante})"
                    class="ripple-btn btn-apply w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-[#f2bb46] hover:text-black hover:border-[#f2bb46] transition-all group/btn flex items-center justify-center gap-2">
                    <span class="relative z-10 flex items-center justify-center gap-2">
                        Aplicar ahora
                        <i data-lucide="chevron-right" class="w-4 h-4 transition-transform group-hover/btn:translate-x-1"></i>
                    </span>
                </button>
                `}
            </div>
        </div>
        `;
    });
    
    grid.innerHTML = html;
    
    // Inicializar los íconos de Lucide
    lucide.createIcons();
    
    // Adjuntar eventos de ripple a los botones
    attachRippleEvents();
}

/**
 * Adjunta los eventos de ripple a los botones
 */
function attachRippleEvents() {
    document.querySelectorAll('.ripple-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            handleRipple(e, this);
        });
    });
}

/**
 * Abre el modal de postulación con los datos de la vacante
 * @param {number} idVacante - ID de la vacante
 */
function abrirModalPostulacion(idVacante) {
    vacanteSeleccionada = vacantesData.find(v => v.IdVacante === idVacante);
    
    if (!vacanteSeleccionada) {
        console.error('Vacante no encontrada:', idVacante);
        return;
    }
    
    const modal = document.getElementById('modal-postulacion');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    
    modalTitle.textContent = vacanteSeleccionada.NombreVacante;
    modalSubtitle.textContent = `${vacanteSeleccionada.NombreArea} • ${vacanteSeleccionada.Sucursal}`;
    
    hideAllSections();
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    
    if (typeof USER_SESSION !== 'undefined' && USER_SESSION.loggedIn) {
        autoAplicarComoLogueado(idVacante);
    } else {
        mostrarPasoCURP(idVacante);
    }
    
    lucide.createIcons();
    
    setTimeout(() => {
        modal.querySelector('.modal-content').classList.remove('scale-95', 'opacity-0');
        modal.querySelector('.modal-content').classList.add('scale-100', 'opacity-100');
    }, 10);
}

/**
 * Cierra el modal de postulación
 */
function cerrarModalPostulacion() {
    const modal = document.getElementById('modal-postulacion');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
        vacanteSeleccionada = null;
        
        const form = document.getElementById('form-postulacion');
        if (form) form.reset();
        
        hideAllSections();
    }, 200);
}

/**
 * Adjunta eventos a los inputs de archivo del modal
 */
function attachFileInputEvents() {
    const modal = document.getElementById('modal-postulacion');
    const fileInputCV = modal.querySelector('.file-input-cv');
    const fileInputSE = modal.querySelector('.file-input-se');

    if (fileInputCV) {
        fileInputCV.addEventListener('change', (e) => {
            const fileName = e.target.files[0]?.name || 'PDF, JPG o PNG (max 20MB)...';
            modal.querySelector('.file-name-cv').textContent = fileName;
            if (e.target.files[0]) {
                modal.querySelector('.file-display-cv').classList.add('border-[#f2bb46]', 'border-solid');
                modal.querySelector('.file-display-cv').classList.remove('border-white/20', 'border-dashed');
            }
        });
    }
    
    if (fileInputSE) {
        fileInputSE.addEventListener('change', (e) => {
            const fileName = e.target.files[0]?.name || 'PDF, JPG o PNG (max 20MB)...';
            modal.querySelector('.file-name-se').textContent = fileName;
            if (e.target.files[0]) {
                modal.querySelector('.file-display-se').classList.add('border-[#f2bb46]', 'border-solid');
                modal.querySelector('.file-display-se').classList.remove('border-white/20', 'border-dashed');
            }
        });
    }
}

/**
 * Valida los archivos requeridos según las banderas
 * @param {HTMLFormElement} form - Formulario
 * @returns {Object} Resultado de validación
 */
function validarArchivosRequeridos(form) {
    const banderaCV = parseInt(form.dataset.banderaCv);
    const banderaSE = parseInt(form.dataset.banderaSe);
    const errores = [];
    
    if (banderaCV === 1) {
        const inputCV = form.querySelector('input[name="cv"]');
        if (!inputCV || !inputCV.files || inputCV.files.length === 0) {
            errores.push('El Curriculum Vitae (CV) es obligatorio para esta vacante');
        }
    }
    
    if (banderaSE === 1) {
        const inputSE = form.querySelector('input[name="solicitud_empleo"]');
        if (!inputSE || !inputSE.files || inputSE.files.length === 0) {
            errores.push('La Solicitud de Empleo es obligatoria para esta vacante');
        }
    }
    
    return {
        valido: errores.length === 0,
        errores: errores
    };
}

/**
 * Envía la postulación al servidor
 * @param {Event} e - Evento del formulario
 */
async function enviarPostulacion(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const loadingSpinner = submitBtn.querySelector('.loading-spinner');
    const formContainer = document.getElementById('modal-form-container');
    const successMsg = document.getElementById('modal-success');
    const errorMsg = document.getElementById('modal-error');
    
    // Validar campos de dirección SEPOMEX
    const inputEstado = document.getElementById('input-estado');
    const inputMunicipio = document.getElementById('input-municipio');
    const selectColonia = document.getElementById('select-colonia');
    const inputCalle = document.getElementById('input-calle');
    
    if (!inputEstado.value || !inputMunicipio.value) {
        mostrarErrorModal('Ingresa un código postal válido para continuar.');
        return;
    }
    
    if (!selectColonia.value) {
        mostrarErrorModal('Selecciona una colonia.');
        return;
    }
    
    if (!inputCalle.value.trim()) {
        mostrarErrorModal('Ingresa tu calle y número.');
        return;
    }
    
    // Validar archivos requeridos
    const validacionArchivos = validarArchivosRequeridos(form);
    if (!validacionArchivos.valido) {
        mostrarErrorModal(validacionArchivos.errores.join('. '));
        return;
    }
    
    // Mostrar estado de carga
    submitBtn.disabled = true;
    btnText.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');
    
    try {
        // Construir FormData para enviar archivos
        const formData = new FormData();
        formData.append('op', 'publicApplyToVacante');
        formData.append('IdVacante', form.dataset.vacanteId);
        
        // Agregar campos básicos del formulario
        const camposBasicos = ['Nombre', 'ApellidoPaterno', 'ApellidoMaterno', 'CURP', 'Telefono', 'CorreoElectronico', 'Observaciones'];
        
        camposBasicos.forEach(campo => {
            const input = form.querySelector(`[name="${campo}"]`);
            if (input && input.value) {
                formData.append(campo, input.value.trim());
            }
        });
        
        // Construir dirección completa desde campos SEPOMEX
        const direccionCompleta = construirDireccionCompleta();
        formData.append('Direccion', direccionCompleta);
        
        // Agregar Estado y Ciudad (Municipio) por separado también
        formData.append('Estado', inputEstado.value);
        formData.append('Ciudad', inputMunicipio.value);
        
        // Agregar archivos si existen
        const inputCV = form.querySelector('input[name="cv"]');
        const inputSE = form.querySelector('input[name="solicitud_empleo"]');
        
        if (inputCV && inputCV.files && inputCV.files.length > 0) {
            formData.append('cv', inputCV.files[0]);
        }
        
        if (inputSE && inputSE.files && inputSE.files.length > 0) {
            formData.append('solicitud_empleo', inputSE.files[0]);
        }
        
        // Enviar usando $.ajax con FormData
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/Postulantes/App.php",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json"
        });
        
        if (respuesta.Resultado) {
            // Éxito
            formContainer.classList.add('hidden');
            successMsg.classList.remove('hidden');
            successMsg.classList.add('flex');
            
            // Recargar la página después de 3 segundos para reflejar la sesión y marcar la tarjeta como "Registrado"
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } else {
            // Error del servidor
            mostrarErrorModal(respuesta.Mensaje || respuesta.Msg || 'Error al procesar la solicitud');
        }
    } catch (error) {
        console.error('Error al enviar postulación:', error);
        mostrarErrorModal('Error de conexión. Por favor intenta nuevamente.');
    } finally {
        // Restaurar botón
        submitBtn.disabled = false;
        btnText.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
    }
}

/**
 * Muestra mensaje de error en el modal
 */
function mostrarErrorModal(mensaje) {
    hideAllSections();

    const errorMsg = document.getElementById('modal-error');
    const errorDetail = errorMsg.querySelector('.error-detail');
    
    errorMsg.classList.remove('hidden');
    errorMsg.classList.add('flex');
    if (errorDetail) {
        errorDetail.textContent = mensaje;
    }
}

/**
 * Vuelve al formulario desde el estado de error
 */
function reintentarPostulacion() {
    const formContainer = document.getElementById('modal-form-container');
    const errorMsg = document.getElementById('modal-error');
    
    errorMsg.classList.add('hidden');
    formContainer.classList.remove('hidden');
}

/**
 * Oculta todas las secciones del modal
 */
function hideAllSections() {
    const sections = [
        'modal-form-container', 'modal-success', 'modal-error',
        'modal-curp-input', 'modal-curp-existe', 'modal-auto-submitting',
        'modal-subir-archivos'
    ];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.add('hidden');
            el.classList.remove('flex');
        }
    });
}

/**
 * Muestra el paso de verificación CURP para usuarios no logueados
 */
function mostrarPasoCURP(idVacante) {
    const curpSection = document.getElementById('modal-curp-input');
    curpSection.classList.remove('hidden');
    curpSection.classList.add('flex');

    const inputCurp = curpSection.querySelector('input[name="curp-verificacion"]');
    if (inputCurp) {
        inputCurp.value = '';
        setTimeout(() => inputCurp.focus(), 100);
        inputCurp.onkeydown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                verificarCurpStep(idVacante);
            }
        };
    }

    const btnVerificar = document.getElementById('btn-verificar-curp');
    if (btnVerificar) {
        const newBtn = btnVerificar.cloneNode(true);
        btnVerificar.parentNode.replaceChild(newBtn, btnVerificar);
        newBtn.onclick = (e) => {
            handleRipple(e, newBtn);
            verificarCurpStep(idVacante);
        };
    }
}

/**
 * Verifica la CURP contra el backend
 */
async function verificarCurpStep(idVacante) {
    const inputCurp = document.querySelector('input[name="curp-verificacion"]');
    const curp = inputCurp.value.trim().toUpperCase();

    if (!curp || curp.length !== 18) {
        mostrarErrorModal('Ingresa una CURP válida de 18 caracteres.');
        return;
    }

    const btnVerificar = document.getElementById('btn-verificar-curp');
    const originalText = btnVerificar.textContent;
    btnVerificar.disabled = true;
    btnVerificar.textContent = 'Verificando...';

    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/Postulantes/App.php",
            data: { op: "verificarCurp", CURP: curp },
            dataType: "json"
        });

        if (respuesta.Resultado && respuesta.Existe) {
            mostrarCurpExiste();
        } else if (respuesta.Resultado && !respuesta.Existe) {
            transicionarAFormulario(idVacante, curp);
        } else {
            mostrarErrorModal(respuesta.Msg || 'Error al verificar la CURP. Intenta nuevamente.');
        }
    } catch (error) {
        console.error('Error al verificar CURP:', error);
        mostrarErrorModal('Error de conexión al verificar CURP. Intenta nuevamente.');
    } finally {
        btnVerificar.disabled = false;
        btnVerificar.textContent = originalText;
    }
}

/**
 * Muestra el mensaje de CURP ya registrada
 */
function mostrarCurpExiste() {
    document.getElementById('modal-curp-input').classList.add('hidden');
    document.getElementById('modal-curp-input').classList.remove('flex');

    const existeSection = document.getElementById('modal-curp-existe');
    existeSection.classList.remove('hidden');
    existeSection.classList.add('flex');

    lucide.createIcons();
}

/**
 * Transiciona del paso CURP al formulario completo
 */
function transicionarAFormulario(idVacante, curp) {
    document.getElementById('modal-curp-input').classList.add('hidden');
    document.getElementById('modal-curp-input').classList.remove('flex');

    const formContainer = document.getElementById('modal-form-container');
    formContainer.classList.remove('hidden');

    const camposArchivo = generarCamposArchivo(vacanteSeleccionada);
    document.getElementById('campos-archivo').innerHTML = camposArchivo;

    const form = document.getElementById('form-postulacion');
    form.dataset.vacanteId = idVacante;
    form.dataset.banderaCv = vacanteSeleccionada.BanderaCV;
    form.dataset.banderaSe = vacanteSeleccionada.BanderaSE;
    form.reset();

    if (curp) {
        const curpInput = form.querySelector('input[name="CURP"]');
        if (curpInput) {
            curpInput.value = curp;
            curpInput.readOnly = true;
            curpInput.classList.add('cursor-not-allowed', 'opacity-60', 'bg-white/5');
        }
    }

    attachFileInputEvents();
    attachCodigoPostalEvent();
    resetearCamposSepomex();
    lucide.createIcons();
}

/**
 * Aplica automáticamente a la vacante usando los datos del postulante logueado
 * Verifica requisitos de archivos antes de enviar
 */
async function autoAplicarComoLogueado(idVacante) {
    document.getElementById('modal-auto-submitting').classList.remove('hidden');
    document.getElementById('modal-auto-submitting').classList.add('flex');

    const requiereCV = vacanteSeleccionada.BanderaCV === 1;
    const requiereSE = vacanteSeleccionada.BanderaSE === 1;

    if (!requiereCV && !requiereSE) {
        await ejecutarAutoSubmit(idVacante, false);
        return;
    }

    try {
        const resumenResp = await $.ajax({
            type: "POST",
            url: "Backend/Postulantes/App.php",
            data: { op: "resumenArchivosCandidato" },
            dataType: "json"
        });

        if (!resumenResp.Resultado) {
            mostrarErrorModal('No se pudo verificar tus archivos. Intenta nuevamente.');
            return;
        }

        const faltaCV = requiereCV && !resumenResp.tieneCV;
        const faltaSE = requiereSE && !resumenResp.tieneSE;

        if (!faltaCV && !faltaSE) {
            await ejecutarAutoSubmit(idVacante, true);
        } else {
            mostrarSubidaArchivos();
        }
    } catch (error) {
        console.error('Error al verificar archivos:', error);
        mostrarErrorModal('Error de conexión al verificar archivos.');
    }
}

/**
 * Ejecuta el auto-submit contra el backend
 */
async function ejecutarAutoSubmit(idVacante, reusarArchivos) {
    document.getElementById('modal-auto-submitting').classList.remove('hidden');
    document.getElementById('modal-auto-submitting').classList.add('flex');

    try {
        const datosRespuesta = await $.ajax({
            type: "POST",
            url: "Backend/Postulantes/App.php",
            data: { op: "getDatosPostulante", CURP: USER_SESSION.curp },
            dataType: "json"
        });

        if (!datosRespuesta.Resultado || !datosRespuesta.Data) {
            mostrarErrorModal('No se pudieron obtener tus datos. Intenta nuevamente.');
            return;
        }

        const datos = datosRespuesta.Data;

        const formData = new FormData();
        formData.append('op', 'publicApplyToVacante');
        formData.append('IdVacante', idVacante);
        formData.append('Nombre', datos.Nombre || '');
        formData.append('ApellidoPaterno', datos.ApellidoPaterno || '');
        formData.append('ApellidoMaterno', datos.ApellidoMaterno || '');
        formData.append('CURP', datos.CURP || '');
        formData.append('Telefono', datos.Telefono || '');
        formData.append('CorreoElectronico', datos.CorreoElectronico || '');
        formData.append('Direccion', datos.Direccion || '');
        formData.append('Estado', datos.Estado || '');
        formData.append('Ciudad', datos.Ciudad || '');
        formData.append('Observaciones', 'Postulación automática');

        if (reusarArchivos) {
            formData.append('reusarArchivos', '1');
        }

        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/Postulantes/App.php",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json"
        });

        document.getElementById('modal-auto-submitting').classList.add('hidden');
        document.getElementById('modal-auto-submitting').classList.remove('flex');

        if (respuesta.Resultado) {
            const successMsg = document.getElementById('modal-success');
            successMsg.classList.remove('hidden');
            successMsg.classList.add('flex');

            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } else {
            mostrarErrorModal(respuesta.Msg || respuesta.Mensaje || 'Error al procesar la postulación automática.');
        }
    } catch (error) {
        console.error('Error en auto-postulación:', error);
        mostrarErrorModal('Error de conexión. Intenta nuevamente.');
    }
}

/**
 * Muestra solo los campos de archivo requeridos cuando faltan en la cuenta del postulante
 */
function mostrarSubidaArchivos() {
    document.getElementById('modal-auto-submitting').classList.add('hidden');
    document.getElementById('modal-auto-submitting').classList.remove('flex');

    const requiereCV = vacanteSeleccionada.BanderaCV === 1;
    const requiereSE = vacanteSeleccionada.BanderaSE === 1;

    const section = document.getElementById('modal-subir-archivos');
    section.classList.remove('hidden');

    const mensaje = document.getElementById('subir-archivos-mensaje');
    const camposContainer = document.getElementById('subir-archivos-campos');

    let html = '';
    const piezas = [];

    if (requiereCV) {
        piezas.push('Curriculum Vitae (CV)');
        html += `
            <div class="flex flex-col">
                <label class="text-[10px] uppercase text-gray-500 mb-1 font-bold tracking-wider">
                    Curriculum Vitae (CV) <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                    <input type="file" name="cv" accept=".pdf,.jpg,.jpeg,.png" required
                        class="file-input-archivos absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
                    <div class="file-display-archivos-cv flex items-center gap-3 p-4 border border-dashed border-white/20 rounded-xl bg-white/5 hover:border-[#f2bb46]/50 transition-colors">
                        <i data-lucide="file-text" class="w-6 h-6 text-gray-400"></i>
                        <span class="text-sm text-gray-400 file-name-archivos-cv">PDF, JPG o PNG (max 20MB)...</span>
                    </div>
                </div>
            </div>
        `;
    }

    if (requiereSE) {
        piezas.push('Solicitud de Empleo');
        html += `
            <div class="flex flex-col">
                <label class="text-[10px] uppercase text-gray-500 mb-1 font-bold tracking-wider">
                    Solicitud de Empleo <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                    <input type="file" name="solicitud_empleo" accept=".pdf,.jpg,.jpeg,.png" required
                        class="file-input-archivos absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
                    <div class="file-display-archivos-se flex items-center gap-3 p-4 border border-dashed border-white/20 rounded-xl bg-white/5 hover:border-[#f2bb46]/50 transition-colors">
                        <i data-lucide="file-text" class="w-6 h-6 text-gray-400"></i>
                        <span class="text-sm text-gray-400 file-name-archivos-se">PDF, JPG o PNG (max 20MB)...</span>
                    </div>
                </div>
            </div>
        `;
    }

    mensaje.textContent = 'Para continuar necesitas subir: ' + piezas.join(' y ') + '.';
    camposContainer.innerHTML = html;

    lucide.createIcons();
    attachFileInputEventsArchivos();
    resetFormSubirArchivos();
}

function resetFormSubirArchivos() {
    const form = document.getElementById('form-subir-archivos');
    if (form) form.reset();
    const btn = form?.querySelector('button[type="submit"]');
    if (btn) {
        btn.disabled = false;
        const btnText = btn.querySelector('.btn-text-archivos');
        const spinner = btn.querySelector('.loading-spinner');
        if (btnText) btnText.classList.remove('hidden');
        if (spinner) spinner.classList.add('hidden');
    }
}

function attachFileInputEventsArchivos() {
    const section = document.getElementById('modal-subir-archivos');

    const inputCV = section.querySelector('input[name="cv"]');
    if (inputCV) {
        const newCV = inputCV.cloneNode(true);
        inputCV.parentNode.replaceChild(newCV, inputCV);
        newCV.addEventListener('change', (e) => {
            const name = e.target.files[0]?.name || 'PDF, JPG o PNG (max 20MB)...';
            section.querySelector('.file-name-archivos-cv').textContent = name;
            if (e.target.files[0]) {
                const display = section.querySelector('.file-display-archivos-cv');
                display.classList.add('border-[#f2bb46]', 'border-solid');
                display.classList.remove('border-white/20', 'border-dashed');
            }
        });
    }

    const inputSE = section.querySelector('input[name="solicitud_empleo"]');
    if (inputSE) {
        const newSE = inputSE.cloneNode(true);
        inputSE.parentNode.replaceChild(newSE, inputSE);
        newSE.addEventListener('change', (e) => {
            const name = e.target.files[0]?.name || 'PDF, JPG o PNG (max 20MB)...';
            section.querySelector('.file-name-archivos-se').textContent = name;
            if (e.target.files[0]) {
                const display = section.querySelector('.file-display-archivos-se');
                display.classList.add('border-[#f2bb46]', 'border-solid');
                display.classList.remove('border-white/20', 'border-dashed');
            }
        });
    }
}

async function enviarPostulacionConArchivos(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text-archivos');
    const loadingSpinner = submitBtn.querySelector('.loading-spinner');

    submitBtn.disabled = true;
    btnText.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');

    try {
        const datosRespuesta = await $.ajax({
            type: "POST",
            url: "Backend/Postulantes/App.php",
            data: { op: "getDatosPostulante", CURP: USER_SESSION.curp },
            dataType: "json"
        });

        if (!datosRespuesta.Resultado || !datosRespuesta.Data) {
            mostrarErrorModal('No se pudieron obtener tus datos. Intenta nuevamente.');
            return;
        }

        const datos = datosRespuesta.Data;
        const idVacante = vacanteSeleccionada.IdVacante;

        const formData = new FormData();
        formData.append('op', 'publicApplyToVacante');
        formData.append('IdVacante', idVacante);
        formData.append('Nombre', datos.Nombre || '');
        formData.append('ApellidoPaterno', datos.ApellidoPaterno || '');
        formData.append('ApellidoMaterno', datos.ApellidoMaterno || '');
        formData.append('CURP', datos.CURP || '');
        formData.append('Telefono', datos.Telefono || '');
        formData.append('CorreoElectronico', datos.CorreoElectronico || '');
        formData.append('Direccion', datos.Direccion || '');
        formData.append('Estado', datos.Estado || '');
        formData.append('Ciudad', datos.Ciudad || '');
        formData.append('Observaciones', 'Postulación con archivos requeridos');

        const inputCV = form.querySelector('input[name="cv"]');
        const inputSE = form.querySelector('input[name="solicitud_empleo"]');

        if (inputCV && inputCV.files && inputCV.files.length > 0) {
            formData.append('cv', inputCV.files[0]);
        }
        if (inputSE && inputSE.files && inputSE.files.length > 0) {
            formData.append('solicitud_empleo', inputSE.files[0]);
        }

        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/Postulantes/App.php",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json"
        });

        document.getElementById('modal-subir-archivos').classList.add('hidden');

        if (respuesta.Resultado) {
            const successMsg = document.getElementById('modal-success');
            successMsg.classList.remove('hidden');
            successMsg.classList.add('flex');

            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } else {
            mostrarErrorModal(respuesta.Msg || respuesta.Mensaje || 'Error al procesar la postulación.');
        }
    } catch (error) {
        console.error('Error al enviar postulación con archivos:', error);
        mostrarErrorModal('Error de conexión. Intenta nuevamente.');
    } finally {
        submitBtn.disabled = false;
        btnText.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
    }
}

/**
 * Función global para el efecto Ripple
 */
function handleRipple(e, button) {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const span = document.createElement('span');
    span.classList.add('ripple-span');
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;

    button.appendChild(span);

    setTimeout(() => {
        span.remove();
    }, 600);
}

/**
 * Función principal para cargar y mostrar vacantes
 */
async function cargarVacantes() {
    mostrarCargando();
    
    // Cargar en paralelo vacantes y postulaciones del usuario logueado
    const vacantesPromise = fetchVacantes();
    let postulacionesPromise = Promise.resolve([]);
    
    if (typeof USER_SESSION !== 'undefined' && USER_SESSION.loggedIn) {
        postulacionesPromise = fetchPostulacionesUser();
    }
    
    const [vacantes, postulaciones] = await Promise.all([vacantesPromise, postulacionesPromise]);
    
    vacantesData = vacantes;
    postulacionesUser = postulaciones;
    
    renderJobs(vacantesData);
}

/**
 * Obtiene los IDs de las vacantes a las que el usuario ya aplicó
 */
async function fetchPostulacionesUser() {
    try {
        const respuesta = await $.ajax({
            type: "POST",
            url: "Backend/Postulantes/App.php",
            data: { op: "postulacionesCandidato" },
            dataType: "json"
        });
        
        if (respuesta.Resultado && respuesta.Data) {
            return respuesta.Data.map(p => parseInt(p.IdVacante));
        }
    } catch (error) {
        console.error('Error al obtener postulaciones del usuario:', error);
    }
    return [];
}

// Ejecutar al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
    // Establecer el año actual en el footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Configurar el buscador
    const inputBusqueda = document.getElementById('search-input');
    if (inputBusqueda) {
        inputBusqueda.addEventListener('input', handleBusqueda);
    }
    
    // Configurar el formulario del modal
    const formPostulacion = document.getElementById('form-postulacion');
    if (formPostulacion) {
        formPostulacion.addEventListener('submit', enviarPostulacion);
    }
    
    // Configurar el formulario de subida de archivos faltantes
    const formSubirArchivos = document.getElementById('form-subir-archivos');
    if (formSubirArchivos) {
        formSubirArchivos.addEventListener('submit', enviarPostulacionConArchivos);
    }
    
    // Cerrar modal al hacer click fuera (solo si no hay formulario visible)
    const modal = document.getElementById('modal-postulacion');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                const formContainer = document.getElementById('modal-form-container');
                const subirArchivos = document.getElementById('modal-subir-archivos');
                if ((formContainer && !formContainer.classList.contains('hidden')) ||
                    (subirArchivos && !subirArchivos.classList.contains('hidden'))) {
                    return;
                }
                cerrarModalPostulacion();
            }
        });
    }
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('modal-postulacion');
            if (modal && !modal.classList.contains('hidden')) {
                cerrarModalPostulacion();
            }
        }
    });
    
    // Cargar vacantes desde el API
    cargarVacantes();
});
