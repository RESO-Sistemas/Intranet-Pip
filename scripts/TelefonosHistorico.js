/**
 * Gestión de Teléfonos Históricos
 * Módulo JavaScript para administrar teléfonos de postulantes
 */

// ==========================================
// MODAL DE TELÉFONOS HISTÓRICOS
// ==========================================

/**
 * Abrir modal de gestión de teléfonos
 * @param {number} idPostulante - ID del postulante
 * @param {string} nombrePostulante - Nombre completo del postulante
 */
async function abrirModalTelefonos(idPostulante, nombrePostulante) {
    // Crear modal dinámicamente si no existe
    if (!document.getElementById('modalTelefonosHistorico')) {
        crearModalTelefonos();
    }
    
    // Configurar modal
    document.getElementById('telefonosPostulanteNombre').textContent = nombrePostulante;
    document.getElementById('telefonosIdPostulante').value = idPostulante;
    
    // Cargar histórico
    await cargarTelefonosHistorico(idPostulante);
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('modalTelefonosHistorico'));
    modal.show();
}

/**
 * Crear estructura HTML del modal
 */
function crearModalTelefonos() {
    const modalHTML = `
    <div class="modal fade" id="modalTelefonosHistorico" tabindex="-1" aria-labelledby="modalTelefonosLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="modalTelefonosLabel">
                        <span class="material-symbols-outlined align-middle me-2">phone</span>
                        Gestión de Teléfonos
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="telefonosIdPostulante">
                    
                    <div class="alert alert-info d-flex align-items-center mb-3">
                        <span class="material-symbols-outlined me-2">info</span>
                        <div>
                            <strong id="telefonosPostulanteNombre">Postulante</strong> puede usar cualquiera de estos teléfonos para iniciar sesión
                        </div>
                    </div>
                    
                    <!-- Formulario de nuevo teléfono -->
                    <div class="card mb-3">
                        <div class="card-header">
                            <h6 class="mb-0">
                                <span class="material-symbols-outlined align-middle me-2" style="font-size:18px;">add_call</span>
                                Agregar Nuevo Teléfono
                            </h6>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-5">
                                    <label class="form-label fw-bold">Teléfono: <span class="text-danger">*</span></label>
                                    <input type="tel" id="txtNuevoTelefono" class="form-control" placeholder="10 dígitos" maxlength="10" pattern="[0-9]{10}">
                                </div>
                                <div class="col-md-5">
                                    <label class="form-label fw-bold">Observaciones:</label>
                                    <input type="text" id="txtObservacionesTelefono" class="form-control" placeholder="Ej: Teléfono casa, oficina...">
                                </div>
                                <div class="col-md-2 d-grid align-items-end">
                                    <button type="button" class="btn btn-success" onclick="agregarNuevoTelefono()">
                                        <span class="material-symbols-outlined">add</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Lista de teléfonos -->
                    <div class="card">
                        <div class="card-header">
                            <h6 class="mb-0">
                                <span class="material-symbols-outlined align-middle me-2" style="font-size:18px;">history</span>
                                Histórico de Teléfonos
                            </h6>
                        </div>
                        <div class="card-body">
                            <div id="listaTelefonosHistorico">
                                <div class="text-center text-muted py-3">
                                    <div class="spinner-border spinner-border-sm" role="status"></div>
                                    <p class="mt-2 mb-0">Cargando...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <span class="material-symbols-outlined align-middle me-1">close</span>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Agregar normalización de input
    document.getElementById('txtNuevoTelefono').addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '').substring(0, 10);
    });
}

/**
 * Cargar histórico de teléfonos del postulante
 */
async function cargarTelefonosHistorico(idPostulante) {
    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'getTelefonosHistorico',
            IdPostulante: btoa(idPostulante)
        });
        
        const result = JSON.parse(response);
        
        if (result.Resultado && result.Data && result.Data.length > 0) {
            renderTelefonosHistorico(result.Data);
        } else {
            document.getElementById('listaTelefonosHistorico').innerHTML = `
                <div class="text-center text-muted py-3">
                    <span class="material-symbols-outlined" style="font-size:48px;opacity:0.3;">phone_disabled</span>
                    <p class="mb-0">No hay teléfonos registrados</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error al cargar teléfonos:', error);
        document.getElementById('listaTelefonosHistorico').innerHTML = `
            <div class="alert alert-danger">Error al cargar histórico de teléfonos</div>
        `;
    }
}

/**
 * Renderizar lista de teléfonos
 */
function renderTelefonosHistorico(telefonos) {
    let html = '<div class="list-group list-group-flush">';
    
    telefonos.forEach(tel => {
        const esActual = tel.Telefono === tel.TelefonoActual;
        const esActivo = parseInt(tel.Activo) === 1;
        const fecha = new Date(tel.FechaRegistro).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const badgeActual = esActual ? '<span class="badge bg-success ms-2">Principal</span>' : '';
        const badgeActivo = esActivo 
            ? '<span class="badge bg-primary">Activo</span>' 
            : '<span class="badge bg-secondary">Inactivo</span>';
        
        const iconoEstado = esActivo ? 'check_circle' : 'cancel';
        const colorEstado = esActivo ? 'text-success' : 'text-secondary';
        
        html += `
            <div class="list-group-item">
                <div class="d-flex w-100 justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">
                            <span class="material-symbols-outlined ${colorEstado} align-middle me-1" style="font-size:20px;">${iconoEstado}</span>
                            <strong>${formatearTelefono(tel.Telefono)}</strong>
                            ${badgeActual}
                            ${badgeActivo}
                        </h6>
                        <p class="mb-1 text-muted small">
                            <span class="material-symbols-outlined align-middle" style="font-size:14px;">schedule</span>
                            Registrado: ${fecha}
                        </p>
                        ${tel.Observaciones ? `<p class="mb-1 small"><em>${tel.Observaciones}</em></p>` : ''}
                        ${tel.NombreUsuario && tel.NombreUsuario !== 'Sistema' ? `
                            <p class="mb-0 small text-primary">
                                <span class="material-symbols-outlined align-middle" style="font-size:14px;">person</span>
                                Por: ${tel.NombreUsuario}
                            </p>
                        ` : ''}
                    </div>
                    <div class="d-flex flex-nowrap gap-1 justify-content-center align-items-center">
                        ${!esActual ? `
                            <button class="btn btn-primary btn-accion" 
                                    onclick="establecerComoPrincipal(${tel.IdTelefonoHistorico}, '${tel.Telefono}')" 
                                    title="Establecer como principal">
                                <span class="material-symbols-outlined">star</span>
                            </button>
                        ` : ''}
                        ${esActivo && !esActual ? `
                            <button class="btn btn-warning btn-accion" 
                                    onclick="desactivarTelefonoHistorico(${tel.IdTelefonoHistorico})" 
                                    title="Desactivar">
                                <span class="material-symbols-outlined">block</span>
                            </button>
                        ` : ''}
                        ${!esActivo ? `
                            <button class="btn btn-success btn-accion" 
                                    onclick="reactivarTelefonoHistorico(${tel.IdTelefonoHistorico})" 
                                    title="Reactivar">
                                <span class="material-symbols-outlined">check_circle</span>
                            </button>
                        ` : ''}
                        ${!esActual ? `
                            <button class="btn btn-danger btn-accion" 
                                    onclick="eliminarTelefonoHistorico(${tel.IdTelefonoHistorico})" 
                                    title="Eliminar">
                                <span class="material-symbols-outlined">delete</span>
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    document.getElementById('listaTelefonosHistorico').innerHTML = html;
}

/**
 * Formatear teléfono para visualización
 */
function formatearTelefono(telefono) {
    if (!telefono || telefono.length !== 10) return telefono;
    return `(${telefono.substring(0, 3)}) ${telefono.substring(3, 6)}-${telefono.substring(6)}`;
}

/**
 * Agregar nuevo teléfono al histórico
 */
async function agregarNuevoTelefono() {
    const telefono = document.getElementById('txtNuevoTelefono').value.trim();
    const observaciones = document.getElementById('txtObservacionesTelefono').value.trim();
    const idPostulante = document.getElementById('telefonosIdPostulante').value;
    
    if (!telefono || telefono.length !== 10) {
        if (typeof showBootstrapAlert === 'function') {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Información!</span>
                    <span class="alert-text">El teléfono debe tener exactamente 10 dígitos.</span>
                </div>`;
            showBootstrapAlert(messageContent, 'top-right', 3000);
        } else {
            alert('El teléfono debe tener exactamente 10 dígitos');
        }
        document.getElementById('txtNuevoTelefono').focus();
        return;
    }
    
    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'agregarTelefonoSecundario',
            IdPostulante: btoa(idPostulante),
            Telefono: telefono,
            Observaciones: observaciones
        });
        
        const result = JSON.parse(response);
        
        if (result.Resultado && result.Siguiente) {
            if (typeof showBootstrapAlertSuc === 'function') {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">¡Completado!</span>
                        <span class="alert-text">${result.Msg}</span>
                    </div>`;
                showBootstrapAlertSuc(messageContent, 'top-right', 3000);
            }
            
            // Limpiar campos
            document.getElementById('txtNuevoTelefono').value = '';
            document.getElementById('txtObservacionesTelefono').value = '';
            
            // Recargar lista
            await cargarTelefonosHistorico(idPostulante);
        } else {
            if (typeof showBootstrapAlertWar === 'function') {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">Alerta!</span>
                        <span class="alert-text">${result.Msg}</span>
                    </div>`;
                showBootstrapAlertWar(messageContent, 'top-right', 4000);
            } else {
                alert(result.Msg || 'Error al agregar teléfono');
            }
        }
    } catch (error) {
        console.error('Error:', error);
        if (typeof showBootstrapAlertWar === 'function') {
            const messageContent = `
                <div class="alert-content">
                    <span class="alert-title">Error!</span>
                    <span class="alert-text">Error al agregar teléfono.</span>
                </div>`;
            showBootstrapAlertWar(messageContent, 'top-right', 3000);
        }
    }
}

/**
 * Establecer teléfono como principal
 */
async function establecerComoPrincipal(idTelefonoHistorico, telefono) {
    const confirmResult = await Swal.fire({
        title: '¿Establecer como principal?',
        html: `¿Desea establecer <strong>${formatearTelefono(telefono)}</strong> como el teléfono principal de este postulante?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#0d6efd',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, establecer',
        cancelButtonText: 'Cancelar'
    });
    
    if (confirmResult.isConfirmed) {
        const idPostulante = document.getElementById('telefonosIdPostulante').value;
        
        try {
            const response = await $.post('Backend/Postulantes/App.php', {
                op: 'actualizarTelefonoPostulante',
                IdPostulante: btoa(idPostulante),
                Telefono: telefono,
                Observaciones: 'Cambiado desde gestión de teléfonos'
            });
            
            const result = JSON.parse(response);
            
            if (result.Resultado && result.Siguiente) {
                if (typeof showBootstrapAlertSuc === 'function') {
                    const messageContent = `
                        <div class="alert-content">
                            <span class="alert-title">¡Completado!</span>
                            <span class="alert-text">${result.Msg}</span>
                        </div>`;
                    showBootstrapAlertSuc(messageContent, 'top-right', 3000);
                }
                
                await cargarTelefonosHistorico(idPostulante);
            } else {
                if (typeof showBootstrapAlertWar === 'function') {
                    const messageContent = `
                        <div class="alert-content">
                            <span class="alert-title">Alerta!</span>
                            <span class="alert-text">${result.Msg}</span>
                        </div>`;
                    showBootstrapAlertWar(messageContent, 'top-right', 4000);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

/**
 * Desactivar teléfono del histórico
 */
async function desactivarTelefonoHistorico(idTelefonoHistorico) {
    const confirmResult = await Swal.fire({
        title: '¿Desactivar teléfono?',
        text: 'El postulante ya no podrá usar este teléfono para iniciar sesión.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ffc107',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, desactivar',
        cancelButtonText: 'Cancelar'
    });
    
    if (confirmResult.isConfirmed) {
        try {
            const response = await $.post('Backend/Postulantes/App.php', {
                op: 'desactivarTelefono',
                IdTelefonoHistorico: idTelefonoHistorico
            });
            
            const result = JSON.parse(response);
            
            if (result.Resultado && result.Siguiente) {
                if (typeof showBootstrapAlertSuc === 'function') {
                    const messageContent = `
                        <div class="alert-content">
                            <span class="alert-title">¡Completado!</span>
                            <span class="alert-text">${result.Msg}</span>
                        </div>`;
                    showBootstrapAlertSuc(messageContent, 'top-right', 3000);
                }
                
                const idPostulante = document.getElementById('telefonosIdPostulante').value;
                await cargarTelefonosHistorico(idPostulante);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

/**
 * Reactivar teléfono en el histórico
 */
async function reactivarTelefonoHistorico(idTelefonoHistorico) {
    try {
        const response = await $.post('Backend/Postulantes/App.php', {
            op: 'reactivarTelefono',
            IdTelefonoHistorico: idTelefonoHistorico
        });
        
        const result = JSON.parse(response);
        
        if (result.Resultado && result.Siguiente) {
            if (typeof showBootstrapAlertSuc === 'function') {
                const messageContent = `
                    <div class="alert-content">
                        <span class="alert-title">¡Completado!</span>
                        <span class="alert-text">${result.Msg}</span>
                    </div>`;
                showBootstrapAlertSuc(messageContent, 'top-right', 3000);
            }
            
            const idPostulante = document.getElementById('telefonosIdPostulante').value;
            await cargarTelefonosHistorico(idPostulante);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

/**
 * Eliminar permanentemente un teléfono
 */
async function eliminarTelefonoHistorico(idTelefonoHistorico) {
    const confirmResult = await Swal.fire({
        title: '¿Eliminar teléfono?',
        text: 'Esta acción es permanente y no se puede deshacer.',
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });
    
    if (confirmResult.isConfirmed) {
        try {
            const response = await $.post('Backend/Postulantes/App.php', {
                op: 'eliminarTelefono',
                IdTelefonoHistorico: idTelefonoHistorico
            });
            
            const result = JSON.parse(response);
            
            if (result.Resultado && result.Siguiente) {
                if (typeof showBootstrapAlertSuc === 'function') {
                    const messageContent = `
                        <div class="alert-content">
                            <span class="alert-title">¡Completado!</span>
                            <span class="alert-text">${result.Msg}</span>
                        </div>`;
                    showBootstrapAlertSuc(messageContent, 'top-right', 3000);
                }
                
                const idPostulante = document.getElementById('telefonosIdPostulante').value;
                await cargarTelefonosHistorico(idPostulante);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}
