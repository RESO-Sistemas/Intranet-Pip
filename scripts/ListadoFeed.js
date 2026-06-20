let tableFeeds;
let feedModalInstance = null;
let feedCrearModalInstance = null;
let currentFeedb64 = null;

getListFeeds();

async function getListFeeds() {
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: 'post',
      url: 'Backend/Feed/App.php',
      data: { op: 'getListFeeds' },
      dataType: 'json',
    });
  } catch (e) {
    console.error(e);
  } finally {
    const dataSource = (respuesta || []).map((feed) => ({
      ...feed,
      Feedb64: feed.Feedb64 || btoa(String(feed.idFeed || '')),
    }));

    if (tableFeeds) {
      tableFeeds.destroy();
    }

    ej.grids.Grid.Inject(ej.grids.Toolbar, ej.grids.Page);

    tableFeeds = new ej.grids.Grid({
      dataSource: dataSource,
      toolbar: ['Search'],
      allowPaging: true,
      allowSelection: false,
      pageSettings: { pageSize: 10 },

      emptyRecordTemplate: `<div class="d-flex flex-column align-items-center justify-content-center text-center p-5" style="min-height: 350px; background-color: #fafbfc; border-radius: 12px; border: 1px dashed #dee2e6;">
        <div class="mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; background-color: #f1f3f5; border-radius: 50%;">
          <span class="material-symbols-outlined" style="font-size: 40px; color: #adb5bd;">inbox</span>
        </div>
        <h5 class="text-dark mb-2" style="font-weight: 600;">No hay feeds registrados</h5>
        <p class="text-muted mb-0" style="max-width: 350px; font-size: 14px;">Aún no se ha encontrado ningún registro. Los feeds que agregues aparecerán en esta lista.</p>
      </div>`,

      columns: [
        {
          headerText: 'TIPO',
          width: 90,
          textAlign: 'Center',
          template: (row) => {
            if (row.Tipo === 'FIN') {
              const aprobado = parseInt(row.AutorizadoIndex) === 1;
              return aprobado
                ? `<span class="badge" style="background:#fd7e14;font-size:.72rem;">FIN</span>
                   <span class="badge bg-success ms-1" style="font-size:.65rem;">Aprobado</span>`
                : `<span class="badge" style="background:#fd7e14;font-size:.72rem;">FIN</span>
                   <span class="badge bg-secondary ms-1" style="font-size:.65rem;">Pendiente</span>`;
            }
            return `<span class="badge bg-primary" style="font-size:.72rem;">FED</span>`;
          },
        },
        {
          field: 'Titulo',
          headerText: 'TÍTULO',
          width: 200,
        },
        {
          field: 'NombreEmpleado',
          headerText: 'AUTOR',
          width: 160,
        },
        {
          headerText: 'FECHA',
          width: 130,
          template: (row) => {
            if (!row.Registro) return '—';
            const d = new Date(row.Registro.replace(' ', 'T'));
            const pad = (n) => String(n).padStart(2, '0');
            return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
          },
        },
        {
          headerText: 'ACTIVIDAD',
          width: 110,
          textAlign: 'Center',
          template: (row) =>
            `<span title="Administrar Comentarios" class="btn-ver-comentarios" style="font-size:.82rem;margin-right:8px; cursor:pointer;">
               <i class="far fa-comment-alt"></i> ${row.TotalComentarios || 0}
             </span>
             <span title="Reacciones" style="font-size:.82rem;">
               <i class="far fa-thumbs-up"></i> ${row.TotalReacciones || 0}
             </span>`,
        },
        {
          headerText: 'ACCIONES',
          width: 150,
          textAlign: 'Center',
          template: (row) => {
            const toggleBtn = row.Tipo === 'FIN'
              ? (parseInt(row.AutorizadoIndex) === 1
                  ? `<button type="button" class="btn btn-secondary btn-accion btn-toggle-activo" title="Desactivar publicación" data-activo="1">
                       <span class="material-symbols-outlined">visibility_off</span>
                     </button>`
                  : `<button type="button" class="btn btn-success btn-accion btn-toggle-activo" title="Activar publicación" data-activo="0">
                       <span class="material-symbols-outlined">check_circle</span>
                     </button>`)
              : '';
            return `<div class="d-flex justify-content-center gap-2">
              ${toggleBtn}
              <button type="button" class="btn btn-warning btn-accion btn-editar-feed" title="Editar Feed">
                <span class="material-symbols-outlined">edit</span>
              </button>
              <button type="button" class="btn btn-danger btn-accion btn-eliminar-feed" title="Eliminar Feed">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </div>`;
          },
        },
      ],

      dataBound: function () {
        const gridElement = this.element;
        const toolbar = gridElement.querySelector('.e-toolbar');
        const header = gridElement.querySelector('.e-gridheader');
        const pager = gridElement.querySelector('.e-gridpager');
        const gridContent = gridElement.querySelector('.e-gridcontent');

        if (this.currentViewData.length === 0) {
          if (toolbar) toolbar.style.display = 'none';
          if (header) header.style.display = 'none';
          if (pager) pager.style.display = 'none';
          gridElement.style.border = 'none';
          if (gridContent) gridContent.style.border = 'none';
        } else {
          if (toolbar) toolbar.style.display = '';
          if (header) header.style.display = '';
          if (pager) pager.style.display = '';
          gridElement.style.border = '';
          if (gridContent) gridContent.style.border = '';
        }
      },

      recordClick: (args) => {
        const rowData = args.rowData || {};
        const feedb64 = rowData.Feedb64 || '';
        const clickedElement = args.target;
        if (!clickedElement || typeof clickedElement.closest !== 'function') return;

        if (clickedElement.closest('.btn-ver-comentarios')) {
          abrirModalAdminComentarios(feedb64);
          return;
        }
        if (clickedElement.closest('.btn-toggle-activo')) {
          const btn = clickedElement.closest('.btn-toggle-activo');
          const actualActivo = parseInt(btn.dataset.activo);
          const nuevoValor = actualActivo === 1 ? 0 : 1;
          toggleAutorizadoFeed(feedb64, nuevoValor);
          return;
        }
        if (clickedElement.closest('.btn-editar-feed')) {
          abrirModalEditar(feedb64);
          return;
        }
        if (clickedElement.closest('.btn-eliminar-feed')) {
          eliminarFeed(feedb64);
        }
      },

      created: () => {
        const searchInput = document.getElementById(tableFeeds.element.id + '_searchbar');
        if (searchInput) {
          searchInput.addEventListener('keyup', (event) => {
            tableFeeds.search(event.target.value);
          });
        }
      },
    });

    tableFeeds.appendTo('#TableFeeds');
  }
}

// ─── Modal Editar ────────────────────────────────────────────────────────────

async function abrirModalEditar(feedb64) {
  currentFeedb64 = feedb64;

  // Limpiar estado anterior
  document.getElementById('modalTxtTitulo').value = '';
  document.getElementById('modalTxtDescripcion').value = '';
  document.getElementById('modalTxtHV').value = '';
  document.getElementById('modalArchivosActuales').innerHTML = '<p class="text-muted small">Cargando archivos...</p>';
  document.getElementById('modalFileInput').value = '';
  document.getElementById('modalPreviewNuevos').innerHTML = '';

  if (!feedModalInstance) {
    feedModalInstance = new bootstrap.Modal(document.getElementById('modalEditarFeed'));
  }
  feedModalInstance.show();

  try {
    const detalle = await $.ajax({
      type: 'post',
      url: 'Backend/Feed/App.php',
      data: { op: 'getDetalleFeed', idFeed: feedb64 },
      dataType: 'json',
    });
    document.getElementById('modalTxtTitulo').value = detalle.Titulo || '';
    document.getElementById('modalTxtDescripcion').value = detalle.Descripcion || '';
    document.getElementById('modalTxtHV').value = detalle.Hipervinculo || '';
  } catch (e) {
    console.error('Error cargando detalle:', e);
  }

  try {
    const archivos = await $.ajax({
      type: 'post',
      url: 'Backend/Feed/App.php',
      data: { op: 'getArchivosActualesFeed', idFeed: feedb64 },
      dataType: 'json',
    });
    renderizarArchivosActuales(archivos, feedb64);
  } catch (e) {
    document.getElementById('modalArchivosActuales').innerHTML = '<p class="text-muted small">No se pudieron cargar los archivos.</p>';
  }
}

function renderizarArchivosActuales(archivos, feedb64) {
  const contenedor = document.getElementById('modalArchivosActuales');
  if (!archivos || archivos.length === 0) {
    contenedor.innerHTML = '<p class="text-muted small">Sin archivos adjuntos.</p>';
    return;
  }

  // Flatten: cada row puede tener múltiples nombres separados por coma o ser Data URI
  const items = [];
  archivos.forEach((row) => {
    const val = (row.Archivo || '').trim();
    if (!val) return;
    if (val.startsWith('data:')) {
      items.push({ tipo: 'datauri', src: val });
    } else {
      val.split(',').filter(Boolean).forEach((nombre) => {
        items.push({ tipo: 'nombre', nombre: nombre.trim() });
      });
    }
  });

  if (items.length === 0) {
    contenedor.innerHTML = '<p class="text-muted small">Sin archivos adjuntos.</p>';
    return;
  }

  const html = items.map((item, idx) => {
    if (item.tipo === 'datauri') {
      return `<div class="modal-archivo-item" id="mai-${idx}">
        <img src="${item.src}" alt="imagen" style="max-height:70px;border-radius:4px;object-fit:cover;">
        <span class="text-muted small ms-2">Imagen almacenada</span>
      </div>`;
    }
    const ext = item.nombre.split('.').pop().toLowerCase();
    const esImg = ['jpg','jpeg','png','gif','webp'].includes(ext);
    const preview = esImg
      ? `<img src="Archivos/Feed/${atob(feedb64)}/${item.nombre}" alt="${item.nombre}" style="max-height:70px;border-radius:4px;object-fit:cover;">`
      : `<span class="material-symbols-outlined" style="font-size:2rem;color:#888;">description</span>`;
    return `<div class="modal-archivo-item" id="mai-${idx}">
      ${preview}
      <span class="text-muted small ms-2" style="word-break:break-all;">${item.nombre}</span>
      <button type="button" class="btn btn-sm btn-outline-danger ms-auto btn-eliminar-archivo"
        data-archivo="${item.nombre}" data-feedb64="${feedb64}" title="Eliminar archivo">
        <span class="material-symbols-outlined" style="font-size:1rem;">close</span>
      </button>
    </div>`;
  }).join('');

  contenedor.innerHTML = html;

  contenedor.querySelectorAll('.btn-eliminar-archivo').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const archivo = btn.dataset.archivo;
      const fb64 = btn.dataset.feedb64;
      btn.disabled = true;
      try {
        const res = await $.ajax({
          type: 'post',
          url: 'Backend/Feed/App.php',
          data: { op: 'eliminarArchivoFeedSelected', idFeed: fb64, Archivo: archivo },
        });
        if (res.trim() === '1') {
          btn.closest('.modal-archivo-item').remove();
        }
      } catch (e) {
        console.error(e);
        btn.disabled = false;
      }
    });
  });
}

// Preview de archivos seleccionados (genérico)
function bindFilePreview(inputId, previewId) {
  const fileInput = document.getElementById(inputId);
  if (!fileInput) return;
  fileInput.addEventListener('change', () => {
    const preview = document.getElementById(previewId);
    if (!preview) return;
    preview.innerHTML = '';
    Array.from(fileInput.files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.cssText = 'max-height:60px;border-radius:4px;object-fit:cover;margin:2px;';
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  bindFilePreview('modalFileInput', 'modalPreviewNuevos');
  bindFilePreview('crearFileInput', 'crearPreviewNuevos');
});

async function guardarFeedDesdeModal() {
  const titulo = document.getElementById('modalTxtTitulo').value.trim();
  const desc = document.getElementById('modalTxtDescripcion').value.trim();

  if (!titulo || !desc) {
    const msg = `<div class="alert-content"><span class="alert-title">Atención!</span><span class="alert-text">Título y descripción son obligatorios.</span></div>`;
    showBootstrapAlertWar(msg, 'top-right', 4000);
    return;
  }

  const btnGuardar = document.getElementById('btnGuardarModalFeed');
  btnGuardar.disabled = true;
  btnGuardar.innerHTML = '<i class="fa fa-spinner fa-spin me-1"></i> Guardando...';

  const formData = new FormData();
  formData.append('op', 'UpdateFeed');
  formData.append('idFeed', currentFeedb64);
  formData.append('txtTitulo', titulo);
  formData.append('txtDescripcion', desc);
  formData.append('txtHV', document.getElementById('modalTxtHV').value.trim());

  const fileInput = document.getElementById('modalFileInput');
  Array.from(fileInput.files).forEach((file) => {
    formData.append('files[]', file);
  });

  try {
    const res = await $.ajax({
      type: 'post',
      url: 'Backend/Feed/App.php',
      data: formData,
      processData: false,
      contentType: false,
    });

    if (res.trim() === '1') {
      feedModalInstance.hide();
      const msg = `<div class="alert-content"><span class="alert-title">Completado!</span><span class="alert-text">Feed actualizado con éxito.</span></div>`;
      showBootstrapAlertSuc(msg, 'top-right', 4000);
      getListFeeds();
    } else {
      const msg = `<div class="alert-content"><span class="alert-title">Error!</span><span class="alert-text">No se pudo actualizar: ${res}</span></div>`;
      showBootstrapAlertWar(msg, 'top-right', 5000);
    }
  } catch (e) {
    console.error(e);
    const msg = `<div class="alert-content"><span class="alert-title">Error!</span><span class="alert-text">Error al guardar. Ver consola.</span></div>`;
    showBootstrapAlertWar(msg, 'top-right', 5000);
  } finally {
    btnGuardar.disabled = false;
    btnGuardar.innerHTML = '<i class="fas fa-save me-1"></i> Guardar cambios';
  }
}

// ─── Activar / Desactivar Feed (Tipo FIN) ────────────────────────────────────

async function toggleAutorizadoFeed(feedb64, nuevoValor) {
  const accion = nuevoValor === 1 ? 'activar' : 'desactivar';
  const { isConfirmed } = await Swal.fire({
    title: `¿${nuevoValor === 1 ? 'Activar' : 'Desactivar'} publicación?`,
    html: nuevoValor === 1
      ? 'La publicación será <strong>visible</strong> en el feed para todos los empleados.'
      : 'La publicación quedará <strong>oculta</strong> del feed.',
    icon: nuevoValor === 1 ? 'question' : 'warning',
    showCancelButton: true,
    confirmButtonText: nuevoValor === 1 ? 'Sí, activar' : 'Sí, desactivar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: nuevoValor === 1 ? '#28a745' : '#6c757d',
  });
  if (!isConfirmed) return;

  try {
    const res = await $.ajax({
      type: 'post',
      url: 'Backend/Feed/App.php',
      data: { op: 'setAutorizadoFeed', idFeed: feedb64, value: nuevoValor },
      dataType: 'json',
    });
    if (res && res.Resultado) {
      Swal.fire({ icon: 'success', title: res.Msg, timer: 2000, showConfirmButton: false });
      getListFeeds();
    } else {
      Swal.fire({ icon: 'error', title: 'Error', text: res?.Msg || 'No se pudo cambiar el estado.' });
    }
  } catch (e) {
    Swal.fire({ icon: 'error', title: 'Error de conexión', text: 'Intenta de nuevo.' });
  }
}

// ─── Eliminar Feed ────────────────────────────────────────────────────────────

async function eliminarFeed(feed) {
  Swal.fire({
    title: 'Confirmación de acción',
    html: `<div style="text-align:center">
      <p>Al eliminar el Feed sucederá lo siguiente:</p>
      <p>1.- El Feed dejará de mostrarse en la pantalla principal.</p>
      <p>2.- Se eliminarán los archivos integrados en el Feed.</p>
      <p>3.- Se eliminarán las reacciones relacionadas con el Feed.</p>
      <p style="margin-top:15px;"><strong>¿Desea continuar?</strong></p>
    </div>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#008837',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const respuesta = await $.ajax({
          type: 'post',
          url: 'Backend/Feed/App.php',
          data: { op: 'eliminarFeed', idFeed: feed },
        });

        if (respuesta.trim() === '1') {
          const msg = `<div class="alert-content"><span class="alert-title">Completado!</span><span class="alert-text">Feed eliminado con éxito.</span></div>`;
          showBootstrapAlertSuc(msg, 'top-right', 5000);
          getListFeeds();
        } else {
          const msg = `<div class="alert-content"><span class="alert-title">Error!</span><span class="alert-text">No se pudo eliminar: ${respuesta}</span></div>`;
          showBootstrapAlertWar(msg, 'top-right', 5000);
        }
      } catch (e) {
        console.error(e);
        const msg = `<div class="alert-content"><span class="alert-title">Error!</span><span class="alert-text">Error al eliminar. Ver consola.</span></div>`;
        showBootstrapAlertWar(msg, 'top-right', 5000);
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      const msg = `<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">La acción fue cancelada.</span></div>`;
      showBootstrapAlert(msg, 'top-right', 5000);
    }
  });
}

// ─── Crear Feed ───────────────────────────────────────────────────────────────

function abrirModalCrear() {
  if (!feedCrearModalInstance) {
    feedCrearModalInstance = new bootstrap.Modal(document.getElementById('modalCrearFeed'));
  }
  document.getElementById('crearTxtTitulo').value = '';
  document.getElementById('crearTxtDescripcion').value = '';
  document.getElementById('crearTxtHV').value = '';
  document.getElementById('crearFileInput').value = '';
  document.getElementById('crearPreviewNuevos').innerHTML = '';
  feedCrearModalInstance.show();
}

async function publicarNuevoFeed() {
  const titulo = document.getElementById('crearTxtTitulo').value.trim();
  const desc = document.getElementById('crearTxtDescripcion').value.trim();

  if (!titulo || !desc) {
    const msg = `<div class="alert-content"><span class="alert-title">Atención!</span><span class="alert-text">Título y descripción son obligatorios.</span></div>`;
    showBootstrapAlertWar(msg, 'top-right', 4000);
    return;
  }

  const btn = document.getElementById('btnGuardarCrearFeed');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa fa-spinner fa-spin me-1"></i> Publicando...';

  const formData = new FormData();
  formData.append('op', 'addPublicationFromIndex');
  formData.append('mnf_title', titulo);
  formData.append('mnf_desc', desc);
  formData.append('mnf_url', document.getElementById('crearTxtHV').value.trim());

  const fileInput = document.getElementById('crearFileInput');
  Array.from(fileInput.files).forEach((file) => {
    formData.append('filesFeedForm[]', file);
  });

  try {
    const res = await $.ajax({
      type: 'post',
      url: 'Backend/Feed/App.php',
      data: formData,
      processData: false,
      contentType: false,
      dataType: 'json',
    });

    if (res && res.Resultado) {
      feedCrearModalInstance.hide();
      const msg = `<div class="alert-content"><span class="alert-title">Completado!</span><span class="alert-text">Publicación creada con éxito.</span></div>`;
      showBootstrapAlertSuc(msg, 'top-right', 4000);
      getListFeeds();
    } else {
      const msg = `<div class="alert-content"><span class="alert-title">Error!</span><span class="alert-text">${res?.Msg || 'No se pudo publicar.'}</span></div>`;
      showBootstrapAlertWar(msg, 'top-right', 5000);
    }
  } catch (e) {
    console.error(e);
    const msg = `<div class="alert-content"><span class="alert-title">Error!</span><span class="alert-text">Error al publicar. Ver consola.</span></div>`;
    showBootstrapAlertWar(msg, 'top-right', 5000);
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane me-1"></i> Publicar';
  }
}

// ─── Administrar Comentarios ──────────────────────────────────────────────────

let modalAdminComentariosInstance = null;
let currentFeedIdAdmin = null;

async function abrirModalAdminComentarios(feedb64) {
  currentFeedIdAdmin = feedb64;
  const body = document.getElementById('modalAdminComentariosBody');
  body.innerHTML = '<p class="text-center text-muted mt-3">Cargando comentarios...</p>';

  if (!modalAdminComentariosInstance) {
    modalAdminComentariosInstance = new bootstrap.Modal(document.getElementById('modalAdminComentarios'));
  }
  modalAdminComentariosInstance.show();

  cargarComentariosAdmin();
}

async function cargarComentariosAdmin() {
  const body = document.getElementById('modalAdminComentariosBody');
  try {
    const idFeedDecode = atob(currentFeedIdAdmin);
    const res = await $.ajax({
      type: 'post',
      url: 'Backend/Feed/App.php',
      data: { op: 'getCommentsForAdmin', iFeed: idFeedDecode },
      dataType: 'json'
    });

    if (res.Resultado && res.Data && res.Data.length > 0) {
      let html = '<div class="list-group">';
      res.Data.forEach(c => {
        const isActivo = parseInt(c.Autorizado) === 1;
        const badge = isActivo
          ? '<span class="badge bg-success">Activo</span>'
          : '<span class="badge bg-danger">Deshabilitado</span>';

        const toggleBtn = isActivo
          ? `<button class="btn btn-sm btn-outline-danger ms-auto" onclick="toggleStatusComentario(${c.idComentariosFeed}, 0)" title="Deshabilitar">Deshabilitar</button>`
          : `<button class="btn btn-sm btn-outline-success ms-auto" onclick="toggleStatusComentario(${c.idComentariosFeed}, 1)" title="Habilitar">Habilitar</button>`;

        html += `
          <div class="list-group-item d-flex align-items-start flex-column flex-md-row gap-3">
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <h6 class="mb-0 fw-bold">${c.NombreEmpleado}</h6>
                <small class="text-muted">${c.Registro}</small>
              </div>
              <p class="mb-1 text-break">${c.Comentario}</p>
              <div>${badge}</div>
            </div>
            <div class="mt-2 mt-md-0 d-flex align-items-center">
              ${toggleBtn}
            </div>
          </div>`;
      });
      html += '</div>';
      body.innerHTML = html;
    } else {
      body.innerHTML = '<p class="text-center text-muted mt-3">No hay comentarios en esta publicación.</p>';
    }
  } catch (e) {
    console.error("Error al cargar comentarios", e);
    body.innerHTML = '<p class="text-center text-danger mt-3">Error al cargar comentarios.</p>';
  }
}

async function toggleStatusComentario(idComentario, status) {
  try {
    const res = await $.ajax({
      type: 'post',
      url: 'Backend/Feed/App.php',
      data: { op: 'toggleCommentStatus', idComentario: idComentario, status: status },
      dataType: 'json'
    });

    if (res.Resultado) {
      cargarComentariosAdmin();
      getListFeeds();
    } else {
      Swal.fire({ icon: 'error', title: 'Error', text: res.Msg || 'No se pudo cambiar el estado.' });
    }
  } catch (e) {
    console.error(e);
    Swal.fire({ icon: 'error', title: 'Error', text: 'Error de conexión.' });
  }
}
