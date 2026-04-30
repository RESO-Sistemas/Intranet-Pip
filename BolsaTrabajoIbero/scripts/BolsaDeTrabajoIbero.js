/**
 * BolsaDeTrabajoIbero.js
 * Script para la bolsa de trabajo pública de la Universidad Iberoamericana.
 * Adaptado de BolsaDeTrabajo.js — colores rojos Ibero.
 */

let vacantesData = [];
let vacanteSeleccionada = null;
let sepomexCache = {};
let postulacionesUser = [];

// ==========================================
// CÓDIGO POSTAL (SEPOMEX)
// ==========================================
async function consultarCodigoPostal(cp) {
    if (!cp || !/^\d{5}$/.test(cp)) return null;
    if (sepomexCache[cp]) return sepomexCache[cp];
    try {
        const r = await $.ajax({ type:"POST", url:"Backend/Postulantes/App.php",
            data:{op:"consultarCodigoPostal",cp}, dataType:"json", timeout:10000 });
        if (r && r.Resultado && r.Data) {
            sepomexCache[cp] = r.Data;
            return r.Data;
        }
        return null;
    } catch(e) { console.error('Error CP:', e); return null; }
}

async function handleCodigoPostalChange() {
    const inputCP = document.getElementById('input-cp');
    const inputEstado = document.getElementById('input-estado');
    const inputMunicipio = document.getElementById('input-municipio');
    const selectColonia = document.getElementById('select-colonia');
    const cpLoading = document.getElementById('cp-loading');
    const cpSuccess = document.getElementById('cp-success');
    const cpError   = document.getElementById('cp-error');
    const cp = inputCP.value.trim();

    cpLoading.classList.add('hidden'); cpSuccess.classList.add('hidden'); cpError.classList.add('hidden');
    if (cp.length !== 5) {
        inputEstado.value = ''; inputMunicipio.value = '';
        selectColonia.innerHTML = '<option value="">Primero ingresa tu código postal...</option>';
        selectColonia.disabled = true; return;
    }
    cpLoading.classList.remove('hidden');
    const datos = await consultarCodigoPostal(cp);
    cpLoading.classList.add('hidden');
    if (datos) {
        inputEstado.value = datos.estado; inputMunicipio.value = datos.municipio;
        selectColonia.innerHTML = '<option value="">Selecciona tu colonia...</option>';
        datos.colonias.forEach(col => {
            const o = document.createElement('option'); o.value = col; o.textContent = col;
            selectColonia.appendChild(o);
        });
        selectColonia.disabled = false; cpSuccess.classList.remove('hidden');
        lucide.createIcons();
    } else {
        inputEstado.value = ''; inputMunicipio.value = '';
        selectColonia.innerHTML = '<option value="">Primero ingresa tu código postal...</option>';
        selectColonia.disabled = true;
        cpError.textContent = 'Código postal no encontrado.'; cpError.classList.remove('hidden');
    }
}

function attachCodigoPostalEvent() {
    const el = document.getElementById('input-cp');
    if (!el) return;
    const nuevo = el.cloneNode(true);
    el.parentNode.replaceChild(nuevo, el);
    nuevo.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g,'');
        if (this.value.length === 5) handleCodigoPostalChange();
    });
    nuevo.addEventListener('paste', function() {
        setTimeout(() => {
            this.value = this.value.replace(/[^0-9]/g,'').substring(0,5);
            if (this.value.length === 5) handleCodigoPostalChange();
        }, 10);
    });
}

function resetearCamposSepomex() {
    ['input-cp','input-estado','input-municipio'].forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
    const sel = document.getElementById('select-colonia');
    if (sel) { sel.innerHTML='<option value="">Primero ingresa tu código postal...</option>'; sel.disabled=true; }
    ['cp-loading','cp-success','cp-error'].forEach(id => { const el=document.getElementById(id); if(el) el.classList.add('hidden'); });
}

function construirDireccionCompleta() {
    const calle     = document.getElementById('input-calle')?.value?.trim() || '';
    const colonia   = document.getElementById('select-colonia')?.value || '';
    const cp        = document.getElementById('input-cp')?.value?.trim() || '';
    const municipio = document.getElementById('input-municipio')?.value || '';
    const estado    = document.getElementById('input-estado')?.value || '';
    const partes = [];
    if (calle)    partes.push(calle);
    if (colonia)  partes.push(`Col. ${colonia}`);
    if (cp)       partes.push(`C.P. ${cp}`);
    if (municipio)partes.push(municipio);
    if (estado)   partes.push(estado);
    return partes.join(', ');
}

// ==========================================
// CARGA DE VACANTES
// ==========================================
async function cargarVacantes() {
    mostrarCargando();
    try {
        const r = await $.ajax({ type:"POST", url:"Backend/Vacantes/App.php",
            data:{op:"getRequisitosDocumentacionVacantes"}, dataType:"json" });
        if (r.Resultado && r.Data) {
            vacantesData = r.Data;
            // Si hay sesión, cargar postulaciones del usuario
            if (typeof USER_SESSION !== 'undefined' && USER_SESSION.loggedIn) {
                await cargarPostulacionesUser();
            }
            renderJobs(vacantesData);
        } else { mostrarSinVacantes(); }
    } catch(e) { console.error(e); mostrarErrorCarga(); }
}

async function cargarPostulacionesUser() {
    try {
        const r = await $.ajax({ type:"POST", url:"Backend/Postulantes/App.php",
            data:{op:"postulacionesCandidato"}, dataType:"json" });
        if (r.Resultado && r.Data) {
            postulacionesUser = r.Data.map(p => parseInt(p.IdVacante));
        }
    } catch(e) { console.error('Error postulaciones:', e); }
}

function filtrarVacantes(termino) {
    if (!termino || !termino.trim()) return vacantesData;
    const t = termino.toLowerCase().trim();
    return vacantesData.filter(v =>
        (v.NombreVacante||'').toLowerCase().includes(t) ||
        (v.NombreArea||'').toLowerCase().includes(t) ||
        (v.Puesto||'').toLowerCase().includes(t)
    );
}

function handleBusqueda(e) { renderJobs(filtrarVacantes(e.target.value)); }

function limpiarBusqueda() {
    const el = document.getElementById('search-input');
    if (el) el.value = '';
    renderJobs(vacantesData);
}

// ==========================================
// UI HELPERS
// ==========================================
function mostrarCargando() {
    document.getElementById('jobs-grid').innerHTML = `
        <div class="col-span-full text-center py-20">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-ibero border-t-transparent mb-4"></div>
            <p class="text-gray-500">Cargando vacantes disponibles...</p>
        </div>`;
}
function mostrarErrorCarga() {
    document.getElementById('jobs-grid').innerHTML = `
        <div class="col-span-full text-center py-16">
            <i data-lucide="alert-circle" class="w-16 h-16 text-red-500/50 mx-auto mb-4"></i>
            <h3 class="text-xl font-bold text-white mb-2">Error al cargar vacantes</h3>
            <p class="text-gray-400 mb-6">No se pudo conectar con el servidor.</p>
            <button onclick="cargarVacantes()" class="px-6 py-3 bg-ibero text-white font-bold rounded-xl hover:bg-ibero-dark transition-colors">
                Reintentar
            </button>
        </div>`;
    lucide.createIcons();
}
function mostrarSinVacantes() {
    document.getElementById('jobs-grid').innerHTML = `
        <div class="col-span-full text-center py-16">
            <i data-lucide="briefcase" class="w-16 h-16 text-gray-600 mx-auto mb-4"></i>
            <h3 class="text-xl font-bold text-white mb-2">No hay vacantes disponibles</h3>
            <p class="text-gray-400">Por el momento no tenemos posiciones abiertas. Vuelve pronto.</p>
        </div>`;
    lucide.createIcons();
}
function mostrarSinResultados(termino) {
    document.getElementById('jobs-grid').innerHTML = `
        <div class="col-span-full text-center py-16">
            <i data-lucide="search-x" class="w-16 h-16 text-gray-600 mx-auto mb-4"></i>
            <h3 class="text-xl font-bold text-white mb-2">Sin resultados</h3>
            <p class="text-gray-400">No encontramos vacantes que coincidan con "<span class="text-ibero-light">${termino}</span>"</p>
            <button onclick="limpiarBusqueda()" class="mt-4 px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 text-sm">
                Ver todas las vacantes
            </button>
        </div>`;
    lucide.createIcons();
}

function getRequisitosTexto(v) {
    if (v.BanderaCV==1 && v.BanderaSE==1) return 'CV y Solicitud de Empleo requeridos';
    if (v.BanderaCV==1) return 'CV requerido';
    if (v.BanderaSE==1) return 'Solicitud de Empleo requerida';
    return '';
}

function generarCamposArchivo(v) {
    let html = '';
    if (v.BanderaCV == 1) {
        html += `<div class="flex flex-col">
            <label class="text-[10px] uppercase text-gray-500 mb-1 font-bold tracking-wider">Curriculum Vitae <span class="text-red-400">*</span></label>
            <div class="relative">
                <input type="file" name="cv" accept=".pdf,.jpg,.jpeg,.png" required
                    class="file-input-cv absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
                <div class="file-display-cv flex items-center gap-3 p-4 border border-dashed border-white/20 rounded-xl bg-white/5 hover:border-ibero/50 transition-colors">
                    <i data-lucide="file-text" class="w-6 h-6 text-gray-400"></i>
                    <span class="text-sm text-gray-400 file-name-cv">PDF, JPG o PNG (max 20MB)...</span>
                </div>
            </div>
        </div>`;
    }
    if (v.BanderaSE == 1) {
        html += `<div class="flex flex-col">
            <label class="text-[10px] uppercase text-gray-500 mb-1 font-bold tracking-wider">Solicitud de Empleo <span class="text-red-400">*</span></label>
            <div class="relative">
                <input type="file" name="solicitud_empleo" accept=".pdf,.jpg,.jpeg,.png" required
                    class="file-input-se absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
                <div class="file-display-se flex items-center gap-3 p-4 border border-dashed border-white/20 rounded-xl bg-white/5 hover:border-ibero/50 transition-colors">
                    <i data-lucide="file-text" class="w-6 h-6 text-gray-400"></i>
                    <span class="text-sm text-gray-400 file-name-se">PDF, JPG o PNG (max 20MB)...</span>
                </div>
            </div>
        </div>`;
    }
    return html;
}

// ==========================================
// RENDER DE TARJETAS
// ==========================================
function renderJobs(vacantes) {
    const grid = document.getElementById('jobs-grid');
    const termino = document.getElementById('search-input')?.value || '';
    if (!vacantes || vacantes.length === 0) {
        termino.trim() ? mostrarSinResultados(termino) : mostrarSinVacantes();
        return;
    }
    let html = '';
    vacantes.forEach(v => {
        const tieneDoc = v.BanderaCV==1 || v.BanderaSE==1;
        const yaAplico = postulacionesUser.includes(parseInt(v.IdVacante));
        html += `
        <div class="magic-card group" data-id="${v.IdVacante}">
            <div class="border-beam opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="relative z-10 p-6 flex flex-col h-full">
                <div class="flex flex-wrap gap-2 mb-4">
                    <span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2">
                        <i data-lucide="clock" class="w-3 h-3 text-ibero-light"></i>
                        ${v.TipoContratacion || 'Por definir'}
                    </span>
                    <span class="px-3 py-1.5 rounded-full bg-ibero/10 border border-ibero/20 text-[10px] uppercase tracking-widest font-bold text-ibero-light flex items-center gap-2">
                        <i data-lucide="building-2" class="w-3 h-3"></i>
                        ${v.Empresa || 'Empresa'}
                    </span>
                </div>
                <h3 class="text-xl font-bold mb-3 text-white group-hover:text-ibero-light transition-colors leading-tight">${v.NombreVacante}</h3>
                <p class="text-sm text-gray-500 mb-5 line-clamp-2 flex-grow">${v.DescripcionPuesto||'Vacante disponible.'}</p>
                <div class="space-y-2.5 mb-5">
                    <div class="flex items-center text-gray-400 text-sm gap-3">
                        <i data-lucide="layers" class="w-4 h-4 text-white/30"></i>
                        <span>${v.NombreArea||'Sin área'}</span>
                    </div>
                    <div class="flex items-center text-gray-400 text-sm gap-3">
                        <i data-lucide="briefcase" class="w-4 h-4 text-white/30"></i>
                        <span>${v.Puesto||'Ver detalle'}</span>
                    </div>
                </div>
                ${tieneDoc ? `
                <div class="flex items-center text-ibero-light text-xs gap-2 mb-5 p-3 bg-ibero/10 rounded-xl border border-ibero/20">
                    <i data-lucide="file-check" class="w-4 h-4"></i>
                    <span>${getRequisitosTexto(v)}</span>
                </div>` : ''}
                ${yaAplico ? `
                <button disabled class="w-full py-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                    <i data-lucide="check-circle-2" class="w-5 h-5"></i> Ya registrado
                </button>` : `
                <button type="button" onclick="abrirModalPostulacion(${v.IdVacante})"
                    class="ripple-btn w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold
                           hover:bg-ibero hover:border-ibero transition-all flex items-center justify-center gap-2 group/btn">
                    <span class="flex items-center gap-2">
                        Aplicar ahora
                        <i data-lucide="chevron-right" class="w-4 h-4 transition-transform group-hover/btn:translate-x-1"></i>
                    </span>
                </button>`}
            </div>
        </div>`;
    });
    grid.innerHTML = html;
    lucide.createIcons();
    attachRippleEvents();
}

// ==========================================
// MODAL
// ==========================================
function abrirModalPostulacion(idVacante) {
    const idBuscado = parseInt(idVacante);
    vacanteSeleccionada = vacantesData.find(v => parseInt(v.IdVacante) === idBuscado);
    if (!vacanteSeleccionada) { console.error('Vacante no encontrada:', idVacante, vacantesData); return; }

    document.getElementById('modal-title').textContent = vacanteSeleccionada.NombreVacante;
    document.getElementById('modal-subtitle').textContent =
        `${vacanteSeleccionada.NombreArea||''} • ${vacanteSeleccionada.Empresa||''}`;
    document.getElementById('campos-archivo').innerHTML = generarCamposArchivo(vacanteSeleccionada);
    const form = document.getElementById('form-postulacion');
    form.dataset.vacanteId = idVacante;
    form.dataset.banderaCv = vacanteSeleccionada.BanderaCV;
    form.dataset.banderaSe = vacanteSeleccionada.BanderaSE;
    form.reset();
    document.getElementById('modal-form-container').classList.remove('hidden');
    document.getElementById('modal-success').classList.add('hidden');
    document.getElementById('modal-error-inline').classList.add('hidden');

    const modal = document.getElementById('modal-postulacion');
    modal.classList.remove('hidden'); modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    // Auto-completar si hay sesión
    if (typeof USER_SESSION !== 'undefined' && USER_SESSION.loggedIn) {
        const mapeo = {
            'Nombre':USER_SESSION.nombre,'ApellidoPaterno':USER_SESSION.apellidoP,
            'ApellidoMaterno':USER_SESSION.apellidoM,'CURP':USER_SESSION.curp,
            'CorreoElectronico':USER_SESSION.correo,'Telefono':USER_SESSION.telefono
        };
        for (const [name,val] of Object.entries(mapeo)) {
            if (val) {
                const inp = form.querySelector(`[name="${name}"]`);
                if (inp) { inp.value=val; inp.readOnly=true; inp.classList.add('opacity-60','cursor-not-allowed'); }
            }
        }
    }
    lucide.createIcons();
    attachFileInputEvents();
    attachCodigoPostalEvent();
    resetearCamposSepomex();

    setTimeout(() => {
        modal.querySelector('.modal-content').classList.remove('scale-95','opacity-0');
        modal.querySelector('.modal-content').classList.add('scale-100','opacity-100');
    }, 10);
}

function cerrarModalPostulacion() {
    const modal = document.getElementById('modal-postulacion');
    const content = modal.querySelector('.modal-content');
    content.classList.remove('scale-100','opacity-100');
    content.classList.add('scale-95','opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden'); modal.classList.remove('flex');
        document.body.style.overflow = '';
        vacanteSeleccionada = null;
        document.getElementById('form-postulacion').reset();
    }, 200);
}

function mostrarErrorModal(msg) {
    const el = document.getElementById('modal-error-inline');
    el.textContent = msg; el.classList.remove('hidden');
}

function attachFileInputEvents() {
    const modal = document.getElementById('modal-postulacion');
    const setupFile = (inputClass, displayClass, nameClass) => {
        const inp = modal.querySelector(`.${inputClass}`);
        if (!inp) return;
        inp.addEventListener('change', e => {
            const name = e.target.files[0]?.name || 'PDF, JPG o PNG (max 20MB)...';
            modal.querySelector(`.${nameClass}`).textContent = name;
            if (e.target.files[0]) {
                modal.querySelector(`.${displayClass}`).classList.add('border-ibero','border-solid');
                modal.querySelector(`.${displayClass}`).classList.remove('border-white/20','border-dashed');
            }
        });
    };
    setupFile('file-input-cv','file-display-cv','file-name-cv');
    setupFile('file-input-se','file-display-se','file-name-se');
}

function validarArchivosRequeridos(form) {
    const cv = parseInt(form.dataset.banderaCv);
    const se = parseInt(form.dataset.banderaSe);
    const errs = [];
    if (cv===1) { const i=form.querySelector('[name="cv"]'); if(!i||!i.files||i.files.length===0) errs.push('El CV es obligatorio para esta vacante.'); }
    if (se===1) { const i=form.querySelector('[name="solicitud_empleo"]'); if(!i||!i.files||i.files.length===0) errs.push('La Solicitud de Empleo es obligatoria para esta vacante.'); }
    return { valido: errs.length===0, errores: errs };
}

// ==========================================
// ENVÍO DE POSTULACIÓN
// ==========================================
async function enviarPostulacion(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const btnText = btn.querySelector('.btn-text');
    const spinner = btn.querySelector('.loading-spinner');

    const estado    = document.getElementById('input-estado');
    const municipio = document.getElementById('input-municipio');
    const colonia   = document.getElementById('select-colonia');
    const calle     = document.getElementById('input-calle');

    if (!estado.value||!municipio.value) { mostrarErrorModal('Ingresa un código postal válido.'); return; }
    if (!colonia.value) { mostrarErrorModal('Selecciona una colonia.'); return; }
    if (!calle.value.trim()) { mostrarErrorModal('Ingresa tu calle y número.'); return; }

    const valArc = validarArchivosRequeridos(form);
    if (!valArc.valido) { mostrarErrorModal(valArc.errores.join(' ')); return; }

    btn.disabled=true; btnText.classList.add('hidden'); spinner.classList.remove('hidden');

    try {
        const fd = new FormData();
        fd.append('op','publicApplyToVacante');
        fd.append('IdVacante', form.dataset.vacanteId);
        ['Nombre','ApellidoPaterno','ApellidoMaterno','CURP','Telefono','CorreoElectronico','Observaciones'].forEach(f => {
            const inp = form.querySelector(`[name="${f}"]`);
            if (inp && inp.value) fd.append(f, inp.value.trim());
        });
        fd.append('Direccion', construirDireccionCompleta());
        fd.append('Estado', estado.value);
        fd.append('Ciudad', municipio.value);
        const cv = form.querySelector('[name="cv"]');
        const se = form.querySelector('[name="solicitud_empleo"]');
        if (cv && cv.files.length>0) fd.append('cv', cv.files[0]);
        if (se && se.files.length>0) fd.append('solicitud_empleo', se.files[0]);

        const r = await $.ajax({ type:"POST", url:"Backend/Postulantes/App.php",
            data: fd, processData:false, contentType:false, dataType:"json" });

        if (r.Resultado) {
            document.getElementById('modal-form-container').classList.add('hidden');
            const success = document.getElementById('modal-success');
            success.classList.remove('hidden'); success.classList.add('flex');
            setTimeout(() => window.location.reload(), 4000);
        } else {
            mostrarErrorModal(r.Msg || 'Error al procesar la solicitud.');
            btn.disabled=false; btnText.classList.remove('hidden'); spinner.classList.add('hidden');
        }
    } catch(err) {
        console.error(err);
        mostrarErrorModal('Error de conexión. Intenta de nuevo.');
        btn.disabled=false; btnText.classList.remove('hidden'); spinner.classList.add('hidden');
    }
}

// ==========================================
// RIPPLE
// ==========================================
function attachRippleEvents() {
    document.querySelectorAll('.ripple-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; const y = e.clientY - rect.top;
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            const size = Math.max(rect.width, rect.height);
            ripple.style.cssText = `width:${size}px;height:${size}px;left:${x-size/2}px;top:${y-size/2}px;`;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Cerrar modal con Escape
document.addEventListener('keydown', e => { if (e.key==='Escape') cerrarModalPostulacion(); });
// Cerrar al hacer click fuera
document.getElementById('modal-postulacion')?.addEventListener('click', function(e) {
    if (e.target === this) cerrarModalPostulacion();
});
