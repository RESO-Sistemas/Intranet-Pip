// Inicializar fileUpload para el modal de incidencia
$(document).ready(function () {
  if ($('#fileUploadIncidencia').length && typeof $.fn.fileUpload === 'function') {
    $('#fileUploadIncidencia').fileUpload({
      id: 'filesIncidenciaForm',
      multiple: false,
    });
  }

  // Guardar incidencia
  const btnIncidenciaGuardar = document.getElementById('btnIncidenciaGuardar');
  if (btnIncidenciaGuardar) {
    btnIncidenciaGuardar.addEventListener('click', async function () {
      let desc = document.getElementById('incidencia_desc').value.trim();
      let files = $('#filesIncidenciaForm')[0].files;
      if (!desc) {
        toastr.error('La descripción es obligatoria.');
        return;
      }
      if (files.length === 0) {
        toastr.error('Debes subir una imagen como evidencia.');
        return;
      }
      // Construir FormData
      let formData = new FormData();
      formData.append('op', 'registrarIncidencia');
      formData.append('descripcion', desc);
      formData.append('evidencia', files[0]);
      // Enviar a backend (AJAX)
      try {
        let response = await $.ajax({
          url: 'Backend/Incidencias/App.php',
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
        });
        if (response.Resultado) {
          toastr.success('Incidencia registrada correctamente.');

          // Completar guardado del checklist si hay uno pendiente
          if (window.dashboardChecklist && typeof window.dashboardChecklist.finalize === 'function') {
            window.dashboardChecklist.finalize();
          }

          $('#modalIncidencia').modal('hide');
        } else {
          toastr.error(response.Msg || 'Error al registrar la incidencia.');
        }
      } catch (e) {
        toastr.error('Error al registrar la incidencia.');
      }
    });
  }
});
let modalComments = new tingle.modal({
  footer: false,
  stickyFooter: false,
  closeMethods: ["overlay", "button", "escape"],
  closeLabel: "Cerrar",
  cssClass: ["custom-modal-comments"],
  onOpen: function () {},
  onClose: function () {},
  beforeClose: function () {
    return true;
  },
});
// let modalNewFeed = new tingle.modal({
//   footer: true,
//   stickyFooter: true,
//   closeMethods: ["button", "escape"],
//   closeLabel: "Close",
//   cssClass: ["custom-class-1", "custom-class-2"],
//   onOpen: function () {
//     console.log("modal open");
//   },
//   onClose: function () {
//     console.log("modal closed");
//   },
//   beforeClose: function () {
//     return true;
//   },
// });
// modalNewFeed.setContent(`
// 	<form id="formFeed" type="post">
// 		<div class="row" >
// 			<div class="col">
// 				<h3>Proporcionar una solicitud de feed.</h3>
// 				<hr>
// 			</div>
// 			<div class="col s12">
// 				<h6>* Titulo</h6>
// 				<textarea id="mnf_title" name="mnf_title" class="materialize-textarea" required></textarea>
// 				<p for="mnf_title" data-msg="El título es obligatorio."></p>
// 			</div>
// 			<div class="col s12">
// 				<h6>* Descripción</h6>
// 				<textarea id="mnf_desc" name="mnf_desc" class="materialize-textarea" required></textarea>
// 				<p for="mnf_desc" data-msg="La descripción es obligatoria."></p>
// 			</div>
// 			<div class="col s12">
// 				<h6>Hipervínculo</h6>
// 				<textarea id="mnf_url" name="mnf_url" class="materialize-textarea"></textarea>
// 			</div>
// 			<hr>
// 			<div class="col s12">
// 				<h6>Imágenes</h6>
// 				<div id="fileUpload" class="file-container"></div>
// 			</div>
// 		</div>
// 	</form>
// `);

// modalNewFeed.addFooterBtn("Guardar", "btn-actionGreen", async function () {
//   let resultV = await verifyInputs("formFeed");
//   if (resultV) {
//     var files = $("#filesFeedForm")[0].files;
//     if (files.length > 0) {
//       saveInfoFeed();
//     } else {
//       toastr.info("Por favor, selecciona al menos un archivo.");
//       return false;
//     }
//   }
// });

function resetFeedUploader() {
  if ($("#fileUpload").length && typeof $.fn.fileUpload === 'function') {
    $("#fileUpload").fileUpload({
      id: "filesFeedForm",
      multiple: true,
    });
  }
}

// Inicializar fileUpload solo si el plugin y el elemento existen
resetFeedUploader();

//nuevo funcionamiento para el nuevo modal

// document
//   .getElementById("btn-actionGreen")
//   .addEventListener("click", async function () {
//     let resultV = await verifyInputs("formFeed");
//     if (resultV) {
//       var files = $("#filesFeedForm")[0].files;
//       if (files.length > 0) {
//         saveInfoFeed();
//         modal.hide();
//       } else {
//         toastr.info("Por favor, selecciona al menos un archivo.");
//         return false;
//       }
//     }
//   });

// Validar que el elemento exista antes de agregar listener
const btnActionGreen = document.getElementById("btn-actionGreen");
if (btnActionGreen) {
  btnActionGreen.addEventListener("click", async function () {
    let resultV = await verifyInputs("formFeed");
    if (resultV) {
      setComposePublishingState(true);
      let saved = false;
      try {
        saved = await saveInfoFeed();
      } finally {
        setComposePublishingState(false);
      }

      if (saved) {
        if (typeof closeComposeForm === 'function') {
          closeComposeForm();
        }
        suppressNextSseFeedReload = true;
        loadFeeds(1);
        Swal.fire({
          icon: 'success',
          title: '¡Publicación enviada!',
          html: 'Tu publicación fue recibida y está <strong>pendiente de revisión</strong>.<br>Un administrador la aprobará pronto.',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#FF4500',
          timer: 8000,
          timerProgressBar: true,
        });
      } else {
        toastr.error("No se pudo publicar. Intenta de nuevo.");
      }

      // Ocultar modal Bootstrap si estuviera abierto (compatibilidad)
      if (typeof modal !== 'undefined') {
        modal.hide();
      }
    }
  });
}

//cuando se cierre el modal que se limpie
//nuevo funcionamiento para el nuevo modal

$(document).ready(function () {
  // Inicializar solo EvoCalendar (calendario morado)
  if ($("#calendar").length && typeof $("#calendar").evoCalendar === 'function') {
    $("#calendar").evoCalendar({
      theme: "Orange Coral",
      language: "es",
      format: "mm/dd/yyyy",
      titleFormat: "MM yyyy",
      eventHeaderFormat: "MM d, yyyy",
      todayHighlight: true,
      sidebarDisplayDefault: false,
      sidebarToggler: true,
      eventDisplayDefault: false,
      eventListToggler: false,
      calendarEvents: null,
    });
    getAgenda();
  }

  $(".zoom").hover(
    function () {
      $(this).addClass("transition");
    },
    function () {
      $(this).removeClass("transition");
    }
  );
});

var currentFeedPage = 1;
var feedAutoRefreshHandle = null;
var isFeedLoading = false;
var feedRealtimeSource = null;
var feedRealtimeReconnectTimer = null;
var realtimeFeedVersion = 0;
var realtimeDashboardVersion = 0;
var deferredProfileDataScheduled = false;
var divisionsLoaded = false;
var collaboratorsLoaded = false;
var publishRefreshFallbackTimer = null;
var isFeedLoadingMore = false;
var feedHasMorePages = true;
var feedInfiniteObserver = null;
var feedPageSize = 8;
var hasFeedRenderedOnce = false;
var feedPrefetchCache = {};
var feedPrefetchInFlight = {};
var fullscreenFeedSwiper = null;
var suppressNextSseFeedReload = false;

function setComposePublishingState(isPublishing) {
  const composeStatus = document.getElementById("composePublishStatus");

  if (btnActionGreen) {
    if (!btnActionGreen.dataset.defaultLabel) {
      btnActionGreen.dataset.defaultLabel = btnActionGreen.innerHTML;
    }

    if (isPublishing) {
      btnActionGreen.disabled = true;
      btnActionGreen.innerHTML = '<i class="fa fa-spinner fa-spin me-1"></i> Publicando...';
    } else {
      btnActionGreen.disabled = false;
      btnActionGreen.innerHTML = btnActionGreen.dataset.defaultLabel;
    }
  }

  if (composeStatus) {
    composeStatus.classList.toggle("d-none", !isPublishing);
  }
}

async function requestFeedPage(page) {
  if (feedPrefetchCache[page]) {
    return { valid: true, data: feedPrefetchCache[page] };
  }

  if (feedPrefetchInFlight[page]) {
    const inflightData = await feedPrefetchInFlight[page];
    return { valid: Array.isArray(inflightData), data: inflightData || [] };
  }

  const datos = { op: "loadFeeds", page: page, lightweight: 1, limit: feedPageSize };
  const requestPromise = $.ajax({
    type: "post",
    url: "Backend/Feed/App.php",
    data: datos,
    dataType: "json",
  })
    .then(function (ajaxResponse) {
      if (Array.isArray(ajaxResponse)) {
        feedPrefetchCache[page] = ajaxResponse;
        return ajaxResponse;
      }
      return null;
    })
    .catch(function (e) {
      console.log("Error en requestFeedPage ajax:", e);
      return null;
    });

  feedPrefetchInFlight[page] = requestPromise;
  let resultData = null;
  try {
    resultData = await requestPromise;
  } finally {
    delete feedPrefetchInFlight[page];
  }

  return {
    valid: Array.isArray(resultData),
    data: Array.isArray(resultData) ? resultData : [],
  };
}

function prefetchFeedPage(page) {
  if (!feedHasMorePages) return;
  if (page <= currentFeedPage) return;
  if (feedPrefetchCache[page] || feedPrefetchInFlight[page]) return;
  requestFeedPage(page);
}

function buildFeedSlideImageMarkup(sourceImage) {
  const imageClone = sourceImage.cloneNode(true);
  imageClone.classList.add("feed-swiper-image");
  imageClone.removeAttribute("data-image");
  imageClone.removeAttribute("data-description");
  return imageClone.outerHTML;
}

function initFeedSwiperOnElement(galleryElement) {
  if (!galleryElement || galleryElement.dataset.swiperInitialized === "1") {
    return;
  }

  const rawImages = Array.from(galleryElement.querySelectorAll("img")).filter(
    function (img) {
      const imgSrc = (img.getAttribute("src") || "").trim();
      return imgSrc !== "";
    }
  );

  if (rawImages.length === 0) {
    return;
  }

  const slideImages = rawImages.map(buildFeedSlideImageMarkup);
  const hasMultipleSlides = slideImages.length > 1;

  galleryElement._swiperSlideImages = slideImages;
  galleryElement.dataset.swiperInitialized = "1";
  galleryElement.classList.remove("d-none");
  galleryElement.style.display = "block";

  galleryElement.innerHTML = `
    <div class="swiper feed-swiper-instance">
      <div class="swiper-wrapper">
        ${slideImages
          .map(function (slideImage) {
            return `<div class="swiper-slide">${slideImage}</div>`;
          })
          .join("")}
      </div>
      ${
        hasMultipleSlides
          ? `<div class="swiper-button-prev"></div>
             <div class="swiper-button-next"></div>
             <div class="swiper-pagination"></div>`
          : ""
      }
    </div>
  `;

  const swiperElement = galleryElement.querySelector(".feed-swiper-instance");
  if (!swiperElement) {
    return;
  }

  const swiperOptions = {
    slidesPerView: 1,
    spaceBetween: 6,
    autoHeight: true,
    watchOverflow: true,
  };

  if (hasMultipleSlides) {
    swiperOptions.loop = true;
    swiperOptions.pagination = {
      el: galleryElement.querySelector(".swiper-pagination"),
      clickable: true,
    };
    swiperOptions.navigation = {
      nextEl: galleryElement.querySelector(".swiper-button-next"),
      prevEl: galleryElement.querySelector(".swiper-button-prev"),
    };
  }

  new Swiper(swiperElement, swiperOptions);
}

function initPendingFeedGalleries(scopeSelector) {
  const scopeRoot = scopeSelector
    ? document.querySelector(scopeSelector)
    : document;

  if (!scopeRoot) return;

  const pendingFeeds = [];

  if (
    scopeRoot.classList &&
    scopeRoot.classList.contains("galleryImgCl") &&
    scopeRoot.dataset.swiperInitialized !== "1"
  ) {
    pendingFeeds.push(scopeRoot);
  }

  pendingFeeds.push(
    ...Array.from(scopeRoot.querySelectorAll(".galleryImgCl")).filter(function (
      gallery
    ) {
      return gallery.dataset.swiperInitialized !== "1";
    })
  );

  if (pendingFeeds.length === 0) return;

  const batchSize = 2;

  const runBatch = function (startIndex) {
    const endIndex = Math.min(startIndex + batchSize, pendingFeeds.length);

    for (let i = startIndex; i < endIndex; i++) {
      initFeedSwiperOnElement(pendingFeeds[i]);
    }

    if (endIndex < pendingFeeds.length) {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(function () {
          runBatch(endIndex);
        });
      } else {
        setTimeout(function () {
          runBatch(endIndex);
        }, 0);
      }
    }
  };

  runBatch(0);
}
function buildFeedSkeletonMarkup(count = 3) {
  let skeletonItems = "";
  for (let i = 0; i < count; i++) {
    skeletonItems += `
      <div class="feed-skeleton-card">
        <div class="feed-skeleton-avatar feed-skeleton-shimmer"></div>
        <div class="feed-skeleton-body">
          <div class="feed-skeleton-line feed-skeleton-line-sm feed-skeleton-shimmer"></div>
          <div class="feed-skeleton-line feed-skeleton-line-lg feed-skeleton-shimmer"></div>
          <div class="feed-skeleton-line feed-skeleton-line-md feed-skeleton-shimmer"></div>
        </div>
      </div>`;
  }
  return `<div class="feed-skeleton-wrap">${skeletonItems}</div>`;
}

function showFeedInitialSkeleton() {
  $("#ContenidoFeed").html(buildFeedSkeletonMarkup(3));
  $("#btnLoadMoreContainer").hide();
}

function showFeedLoadMoreSkeleton() {
  if (document.getElementById("feedLoadMoreSkeleton")) return;
  $("#ContenidoFeed").append(
    `<div id="feedLoadMoreSkeleton" class="feed-skeleton-more">${buildFeedSkeletonMarkup(2)}</div>`
  );
}

function hideFeedLoadMoreSkeleton() {
  const skeletonMore = document.getElementById("feedLoadMoreSkeleton");
  if (skeletonMore) {
    skeletonMore.remove();
  }
}

function initFeedInfiniteScroll() {
  if (feedInfiniteObserver) return;

  const loadMoreContainer = document.getElementById("btnLoadMoreContainer");
  if (!loadMoreContainer || !window.IntersectionObserver) return;

  feedInfiniteObserver = new IntersectionObserver(
    function (entries) {
      const firstEntry = entries[0];
      if (!firstEntry || !firstEntry.isIntersecting) return;
      if (!feedHasMorePages || isFeedLoading || isFeedLoadingMore || document.hidden) return;

      currentFeedPage += 1;
      loadFeeds(currentFeedPage);
    },
    {
      root: null,
      rootMargin: "1200px 0px 1200px 0px",
      threshold: 0,
    }
  );

  feedInfiniteObserver.observe(loadMoreContainer);
}

function closeRealtimeFeedStream() {
  if (feedRealtimeSource) {
    feedRealtimeSource.close();
    feedRealtimeSource = null;
  }
}

function scheduleRealtimeFeedReconnect(delayMs = 1500) {
  if (feedRealtimeReconnectTimer) return;
  feedRealtimeReconnectTimer = setTimeout(function () {
    feedRealtimeReconnectTimer = null;
    startRealtimeFeedStream();
  }, delayMs);
}

function startRealtimeFeedStream() {
  if (document.hidden) return;
  if (!window.EventSource) return;

  closeRealtimeFeedStream();

  const params = new URLSearchParams({
    op: "streamUpdates",
    scope: "feed,dashboard",
    feedV: String(realtimeFeedVersion),
    dashV: String(realtimeDashboardVersion),
  });

  feedRealtimeSource = new EventSource(`Backend/Feed/App.php?${params.toString()}`);

  feedRealtimeSource.addEventListener("feed_update", function (event) {
    if (publishRefreshFallbackTimer) {
      clearTimeout(publishRefreshFallbackTimer);
      publishRefreshFallbackTimer = null;
    }

    try {
      const data = JSON.parse(event.data || "{}");
      realtimeFeedVersion = parseInt(data.version || realtimeFeedVersion, 10);
    } catch (e) {
      console.log("Error parseando feed_update SSE:", e);
    }

    if (suppressNextSseFeedReload) {
      suppressNextSseFeedReload = false;
    } else {
      if (currentFeedPage === 1) {
        loadFeeds(1);
      } else {
        $("#btnLoadMoreContainer").show();
      }
    }

    closeRealtimeFeedStream();
    scheduleRealtimeFeedReconnect(500);
  });

  feedRealtimeSource.addEventListener("dashboard_update", function (event) {
    try {
      const data = JSON.parse(event.data || "{}");
      realtimeDashboardVersion = parseInt(data.version || realtimeDashboardVersion, 10);
    } catch (e) {
      console.log("Error parseando dashboard_update SSE:", e);
    }

    window.dispatchEvent(new CustomEvent("dashboard:refresh", {
      detail: { source: "sse" }
    }));

    closeRealtimeFeedStream();
    scheduleRealtimeFeedReconnect(500);
  });

  feedRealtimeSource.addEventListener("done", function () {
    closeRealtimeFeedStream();
    scheduleRealtimeFeedReconnect(500);
  });

  feedRealtimeSource.onerror = function () {
    closeRealtimeFeedStream();
    scheduleRealtimeFeedReconnect(4000);
  };
}

startFeedAutoRefresh();
initFeedInfiniteScroll();
loadAll();

function getInitialsFromName(fullName) {
  if (!fullName) return "U";
  const parts = String(fullName)
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

  return (
    parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
  ).toUpperCase();
}

function buildAvatarDataUriFromName(fullName) {
  const palette = ["#e6b200"];
  const normalized = String(fullName || "Usuario");
  let hash = 0;
  for (let i = 0; i < normalized.length; i += 1) {
    hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
  }
  const bg = palette[Math.abs(hash) % palette.length];
  const initials = getInitialsFromName(normalized);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='${bg}'/><text x='50%' y='50%' text-anchor='middle' dominant-baseline='central' fill='#ffffff' font-family='Arial, sans-serif' font-size='36' font-weight='700'>${initials}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function getProfileAvatarUrl(imageName, employeeNumber, fullName) {
  return buildAvatarDataUriFromName(fullName);
}

// Función para generar un avatar con iniciales en tamaño pequeño (para comentarios)
function buildCommentAvatarFromName(fullName) {
    const palette = ["#e6b200"];
    const normalized = String(fullName || "Usuario");
  let hash = 0;
  for (let i = 0; i < normalized.length; i += 1) {
    hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
  }
  const bg = palette[Math.abs(hash) % palette.length];
  const initials = getInitialsFromName(normalized);
  // SVG optimizado para comentarios con tamaño 42x42px
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='42' height='42' viewBox='0 0 42 42'><circle cx='21' cy='21' r='21' fill='${bg}'/><text x='50%' y='50%' text-anchor='middle' dominant-baseline='central' fill='#ffffff' font-family='Arial, sans-serif' font-size='16' font-weight='700'>${initials}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

async function loadAll() {
  currentFeedPage = 1;
  // Carga crítica inicial para acelerar el primer render.
  await Promise.all([
    getDatosEmpleado(),
    loadFeeds(1)
  ]);

  scheduleDeferredProfileDataLoad();
  startRealtimeFeedStream();
}

function scheduleDeferredProfileDataLoad() {
  if (deferredProfileDataScheduled) return;

  const hasDivisionSelect = !!document.getElementById("slctDivision");
  const hasCollaboratorsContainers = !!(
    document.getElementById("divColaboradoreslvl") ||
    document.getElementById("divColaboradoreslv2") ||
    document.getElementById("divColaboradoreslv3") ||
    document.getElementById("divColaboradoreslv4") ||
    document.getElementById("divColaboradoreslv5") ||
    document.getElementById("divColaboradoreslv6") ||
    document.getElementById("divColaboradoreslv7")
  );

  if (!hasDivisionSelect && !hasCollaboratorsContainers) {
    return;
  }

  deferredProfileDataScheduled = true;

  const loadDeferredData = function () {
    const jobs = [];
    if (hasDivisionSelect) jobs.push(llenadoSelectDivision());
    if (hasCollaboratorsContainers) jobs.push(getColaboradores());

    Promise.all(jobs).catch(function (e) {
      console.log("Error en carga diferida de datos de perfil:", e);
    });
  };

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(loadDeferredData, { timeout: 2500 });
  } else {
    setTimeout(loadDeferredData, 1200);
  }
}

function startFeedAutoRefresh() {
  if (feedAutoRefreshHandle) {
    clearInterval(feedAutoRefreshHandle);
  }

  feedAutoRefreshHandle = setInterval(function () {
    if (document.hidden) return;
    if (currentFeedPage !== 1) return;
    loadFeeds(1);
  }, 120000);
}

window.addEventListener("beforeunload", function () {
  if (feedAutoRefreshHandle) {
    clearInterval(feedAutoRefreshHandle);
  }
  closeRealtimeFeedStream();
  if (feedRealtimeReconnectTimer) {
    clearTimeout(feedRealtimeReconnectTimer);
    feedRealtimeReconnectTimer = null;
  }
  if (publishRefreshFallbackTimer) {
    clearTimeout(publishRefreshFallbackTimer);
    publishRefreshFallbackTimer = null;
  }
});

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    closeRealtimeFeedStream();
    return;
  }

  startRealtimeFeedStream();
  if (currentFeedPage === 1) {
    loadFeeds(1);
  }
});

// Botón Cargar más
$(document).on("click", "#btnLoadMoreFeeds", function() {
  if (!feedHasMorePages || isFeedLoading || isFeedLoadingMore) {
    return;
  }
  currentFeedPage++;
  loadFeeds(currentFeedPage);
});


// Event listener para el calendario
if ($("#calendar").length) {
  $("#calendar").on("selectDate", function (event, newDate, oldDate) {
    getEventosDetalle(newDate);
  });
}

function onlynumber(e) {
  tecla = document.all ? e.keyCode : e.which;
  if (tecla == 8) {
    return true;
  }
  patron = /[-0-9]/;
  tecla_final = String.fromCharCode(tecla);
  return patron.test(tecla_final);
}
// let elem = document.querySelector('.materialboxed');
// let instance = M.Materialbox.init(elem, options);

$("#btnFotoEmp").click(function () {
  $("#fotoEmp").click();
});

async function getDatosEmpleado() {
  let datos = await {
    op: "getDatosEmpleado",
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    for (var i = 0; i < respuesta.length; i++) {
      const employeeName = respuesta[i]["Nombre"] || "Usuario";

      const resolveSignatureAsset = function (signatureValue, employeeNumber) {
        if (!signatureValue || signatureValue === "null") {
          return "";
        }

        const normalized = String(signatureValue).trim();
        if (!normalized) {
          return "";
        }

        const normalizeDataUri = function (value) {
          const parts = value.split(",");
          if (parts.length < 2) {
            return value.replace(/ /g, "+");
          }

          return `${parts[0]},${parts.slice(1).join(",").replace(/ /g, "+")}`;
        };

        if (normalized.startsWith("data:")) {
          return normalizeDataUri(normalized);
        }

        if (/^(https?:\/\/|\/|Archivos\/)/i.test(normalized)) {
          return normalized;
        }

        if (/\.(png|jpe?g|gif|webp|svg)$/i.test(normalized)) {
          return `Archivos/ImgEmpleados/${employeeNumber}/Firma/${normalized}`;
        }

        return `data:image/png;base64,${normalized.replace(/ /g, "+")}`;
      };

      const urlImg = getProfileAvatarUrl(
        respuesta[i]["Imagen"],
        respuesta[i]["NoEmpleado"],
        employeeName
      );
      let urlImgFirma = resolveSignatureAsset(
        respuesta[i]["Firma"],
        respuesta[i]["NoEmpleado"]
      );
      let textEmail = `Email address: ${respuesta[i]["Email"]}`;
      $("#NameEmpleado").html(respuesta[i]["Nombre"]);
      $("#textoEmailEmp").text(textEmail);
      $("#textoMovil").text(respuesta[i]["Movil"]);
      $("#PerfilNombre").val(respuesta[i]["Nombre"]);
      $("#PerfilNoEmp").val(respuesta[i]["NoEmpleado"]);
      $("#PerfilRFC").val(respuesta[i]["RFC"]);
      $("#imgFirma").attr("src", urlImgFirma);

      $("#PerfilCURP").val(respuesta[i]["CURP"]);
      $("#PerfilNOSEGURO").val(respuesta[i]["NoSeguro"]);
      $("#PerfilRFC").val(respuesta[i]["RFC"]);
      $("#Perfilpassword").val(respuesta[i]["Password"]);
      $("#PerfilFecNac").val(respuesta[i]["FNacimiento"]);
      $("#Perfilemail").val(respuesta[i]["Email"]);
      $("#Perfilnumber").val(respuesta[i]["Movil"]);

      $("#PerfilPuesto").val(respuesta[i]["Puesto"]);
      $("#PerfilSucursal").val(respuesta[i]["Sucursal"]);
      $("#PerfilAntiguedad").val(respuesta[i]["Antiguedad"]);
      $("#PerfilCCosto").val(respuesta[i]["CentrodeCosto"]);
      $("#slctDivision").val(respuesta[i]["IdDivision"]);
      $("#ImgEmpleadoPerfil").attr("src", urlImg);
      $("#mensajeBienvenida").html(respuesta[i]["MensajeBienvenida"]);
      // Actualizar avatar de la barra "Crear publicación" estilo Reddit
      $("#avatarCreatePost").attr("src", urlImg).attr("alt", `Avatar de ${employeeName}`);
    }
  }
}

async function llenadoSelectDivision() {
  if (divisionsLoaded) {
    return;
  }

  let loadSuccess = false;
  let datos = await {
    op: "getDivisiones",
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
      dataType: "json",
    });
    loadSuccess = true;
  } catch (e) {
    console.log(e);
  } finally {
    for (var i = 0; i < respuesta.length; i++) {
      let idDivision = respuesta[i]["IdDivision"];
      let division = respuesta[i]["Division"];
      $("#slctDivision").append(`
        <option value="${idDivision}">${division}</option>
        `);
    }
    if (loadSuccess) {
      divisionsLoaded = true;
    }
  }
}

function updateDatosEmpleado() {
  Swal.fire({
    title: "¿Desea cambiar los datos de este empleado?",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Actualizar Datos",
  }).then((result) => {
    if (result.isConfirmed) {
      let pass = $("#Perfilpassword").val();
      let email = $("#Perfilemail").val();
      let movil = $("#Perfilnumber").val();
      $.ajax({
        type: "POST",
        url: "Backend/Empleados/App.php",
        data:
          "op=updateDatosEmpleado" +
          "&pass=" +
          pass +
          "&email=" +
          email +
          "&movil=" +
          movil,
        success: function (response) {
          if (response == "1") {
            Swal.fire(
              "Actualizado",
              "Los datos de este empleado fueron actualizados",
              "success"
            );
            setTimeout(function () {
              getDatosEmpleado();
              llenadoSelectDivision();
            }, 1000);
          } else {
            // toastr.warning("Algo salio mal, Intente de nuevo");
            const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">Algo salio mal, Intente de nuevo</span>
            </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
          }
        },
        error: function (e) {
          alert(e.responseText);
        },
      });
    }
  });
}

function updateFotoEmpleado() {
  if (document.getElementById("FrmFotoEmp").checkValidity()) {
    event.preventDefault();
    var form = $("#FrmFotoEmp")[0];
    var data = new FormData(form);
    $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function (response) {
        if (response == "1") {
          Swal.fire("Actualizado", "Foto Actualizada", "success");
          setTimeout(function () {
            getDatosEmpleado();
            loadFeeds(1);
          }, 1000);
        } else {
          // toastr.warning("Algo salio mal, Intente de nuevo");
          const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">Algo salio mal, Intente de nuevo.</span>
        </div>`;
          showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
      },
      error: function (e) {
        alert(e.responseText);
      },
    });
  } else {
    const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Ingrese todos los datos"</span>
        </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
  }
}

async function getColaboradores() {
  if (collaboratorsLoaded) {
    return;
  }

  let loadSuccess = false;
  let datos = await {
    op: "getColaboradores",
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
      dataType: "json",
    });
    loadSuccess = true;
  } catch (e) {
    console.log(e);
  } finally {
    let contenedorDiv = "";
    let tituloNivel = "";
    let urlPerfilImg = "";
    for (var i = 0; i < respuesta.length; i++) {
      if (respuesta[i]["Imagen"] === null || respuesta[i]["Imagen"] == "") {
        urlPerfilImg = "assets/Klyns.png";
      } else {
        urlPerfilImg = `Archivos/ImgEmpleados/${respuesta[i]["NoEmpleado"]}/${respuesta[i]["Imagen"]}`;
      }
      if (respuesta[i]["Nivel"] > 0) {
        if (respuesta[i]["Nivel"] == "1") {
          contenedorDiv = "divColaboradoreslvl";
          $("#titulolvl1").html("Dirección General");
        } else if (respuesta[i]["Nivel"] == "2") {
          contenedorDiv = "divColaboradoreslv2";
          $("#titulolvl2").html("Dirección");
        } else if (respuesta[i]["Nivel"] == "3") {
          contenedorDiv = "divColaboradoreslv3";
          $("#titulolvl3").html("Gerencias");
        } else if (respuesta[i]["Nivel"] == "4") {
          contenedorDiv = "divColaboradoreslv4";
          $("#titulolvl4").html("Lider, jefe, coordinador de departamento");
        } else if (respuesta[i]["Nivel"] == "5") {
          contenedorDiv = "divColaboradoreslv5";
          $("#titulolvl5").html("Analistas/funcionales");
        } else if (respuesta[i]["Nivel"] == "6") {
          contenedorDiv = "divColaboradoreslv6";
          $("#titulolvl6").html("Auxiliar/Asistente");
        } else if (respuesta[i]["Nivel"] == "7") {
          contenedorDiv = "divColaboradoreslv7";
          $("#titulolvl7").html("Operativos");
        }
        let nameEmp = respuesta[i]["Nombre"];
        let emailEmp = respuesta[i]["Email"];
        let puestoEmp = respuesta[i]["Puesto"];
        $("#" + contenedorDiv).append(`
<div class="col-md-4 mb-3">
  <div class="card h-100">
    <div class="card-body text-center">
      <a href="#"><img src="${urlPerfilImg}" alt="user" class="rounded-circle" style="width:75px; height:75px; object-fit:cover;"></a>
      <h5 class="mt-2 mb-1">${nameEmp}</h5>
      <p class="text-muted small mb-1">${puestoEmp}</p>
      <p class="text-muted small">${emailEmp}</p>
    </div>
  </div>
</div>
          `);
      }
    }
      if (loadSuccess) {
        collaboratorsLoaded = true;
      }
  }
}

//         response.sort((a, b) => new Date(b.Registro).getTime() - new Date(a.Registro).getTime());
//         let contentHtmlFinal = "";
//         let urlImgProfile = "";
//         console.log(response);

//         for (let i = 0; i < response.length; i++) {
//             const feed = response[i];
//             let colorMg = feed.MeGusta == 1 ? "color:#E91E63;" : "color:black;";
//             let colorCong = feed.Felicitacion == 1 ? "color:#8E24AA;" : "color:black;";
// 						let cantComm = feed.ArrayComentarios.length;

//             let contentBtnFel = "";
//             let contentHtmlImg = "";
//             let descriptionFinal = "";
//             let arrDescription = [];
//             let arrInd = [];
//             let contentHtmlMg = "";
//             let contentHtmlCongra = "";

//             const employesMg = feed.EmpleadosReaccion.filter(i => i.TipoReaccion == 1);
//             const employesF = feed.EmpleadosReaccion.filter(i => i.TipoReaccion == 2);
//             const cantMg = employesMg.length;
//             const cantCongratulations = employesF.length;

//             // Generar HTML para Me Gusta
//             if (cantMg > 0) {
//                 for (let j = 0; j < employesMg.length; j++) {
//                     const data = employesMg[j];
//                     contentHtmlMg += `<li style="font-size:.8em"> * ${data.EmpleadoReaccion}</li>`;
//                 }
//             } else {
//                 contentHtmlMg = `<li style="font-size:.8em"> SIN REGISTROS </li>`;
//             }

//             // Generar HTML para Felicitaciones
//             if (cantCongratulations > 0) {
//                 for (let j = 0; j < employesF.length; j++) {
//                     const data = employesF[j];
//                     contentHtmlCongra += `<li style="font-size:.8em"> * ${data.EmpleadoReaccion}</li>`;
//                 }
//             } else {
//                 contentHtmlCongra = `<li style="font-size:.8em"> SIN REGISTROS </li>`;
//             }

//             // Construir la descripción y el HTML de las imágenes
//             switch (feed.Tipo) {
//                 case "CMP":
//                 case "ANY":
//                     arrDescription = feed.Descripcion.split("<br>");
//                     arrInd = arrDescription.slice(1);
//                     if (arrInd.length == 0) {
//                         const arrSplit = feed.Descripcion.split('. ');
//                         descriptionFinal += `<h6><b style="font-size:18px;">${arrSplit[0] ?? ""}</b> ${arrSplit[1] ?? ""}</h6>`;
//                     } else {
//                         for (let k = 0; k < arrInd.length; k++) {
//                             const arrSplit = arrInd[k].split('. ');
//                             descriptionFinal += `<h6><b style="font-size:18px;">${arrSplit[0] ?? ""}</b> ${arrSplit[1] ?? ""}</h6>`;
//                         }
//                     }
//                     if (feed.Archivo) {
//                         const folder = feed.Tipo == "CMP" ? "ImagesBirthday" : "ImagesAnniversary";
//                         contentHtmlImg += `
//                             <img alt="${feed.Tipo === 'CMP' ? 'Image 1 Title' : 'Image Anniversary'}"
//                                 src="Archivos/${folder}/${feed.Archivo}"
//                                 data-image="Archivos/${folder}/${feed.Archivo}"
//                                 data-description="${feed.Tipo === 'CMP' ? 'Image 1 Description' : 'Image Anniversary'}">`;
//                     }
//                     break;
//                 default:
//                     descriptionFinal = feed.Descripcion;
//                     if (feed.Archivo) {
//                         const arrFiles = feed.Archivo.split(',');
//                         for (let k = 0; k < arrFiles.length; k++) {
//                             const f = arrFiles[k];
//                             contentHtmlImg += `
//                                 <img alt="Image 1 Title" src="Archivos/Feed/${feed.idFeed}/${f}"
//                                     data-image="Archivos/Feed/${feed.idFeed}/${f}"
//                                     data-description="No.${k + 1}">`;
//                         }
//                     }
//             }

//             urlImgProfile = feed.Imagen ? `Archivos/ImgEmpleados/${feed.NoEmpleado}/${feed.Imagen}` : "assets/logoK.png";

//             contentHtmlFinal += `
//             <div class="m-t-20 e-card">
//                 <div class="chat-box scrollable ps ps--theme_default ps--active-y" style="min-height:170px; padding:15px;">
//                     <ul class="chat-list">
//                         <li>
//                             <div class="chat-img"><img src="${urlImgProfile}" alt="user"></div>
//                             <div class="chat-content" style="border:1px solid #dfdfdf; padding:15px;">
//                                 <h6 class="font-medium">${feed.Nombre}</h6>
//                                 <span class="sl-date">Publicado hace ${feed.DiferenciaRegistro}</span>
//                                 <p style="font-size:15px;">${feed.Titulo}</p>
//                                 <div style="text-align:justify;">
//                                     <hr>
//                                     ${descriptionFinal}
//                                 </div>`;
//             if (feed.Hipervinculo) {
//                 contentHtmlFinal += `<a href="${feed.Hipervinculo}" target="_blank">${feed.Hipervinculo}</a>`;
//             }
//             if (feed.Archivo) {
//                 contentHtmlFinal += `<div id="galleryFeed${feed.idFeed}" class="galleryImgCl m-t-25" style="display:none;">${contentHtmlImg}</div>`;
//             }
//             contentHtmlFinal += `
//                                 <div style="position:relative;">
//                                     <div id="WindowMeGusta${feed.idFeed}" class="menuMeGusta row" style="display:none;position:absolute;z-index:9999; width:50%;background-color:#007B85;text-align:center;
//                                         bottom:30%;
//                                         left: 30%;
//                                         border-radius:15px; opacity:1;color:white;padding:1vh;opacity:.95;max-height:45vh;">
//                                         <div class="col s12 l12">
//                                             <h6 style="color:white"><b>Personas que reaccionaron</b></h6>
//                                         </div>
//                                         <div class="col s12">
//                                             <ul id="ulEmpleadosReaccionanMG${feed.idFeed}">
//                                                 ${contentHtmlMg}
//                                             </ul>
//                                         </div>
//                                     </div>`;
//             if (feed.Tipo == "CMP" || feed.Tipo == "ANY") {
//                 contentHtmlFinal += `
//                                     <div style="position:relative;">
//                                         <div id="WindowFelicitacion${feed.idFeed}" class="menuFelicitacion row" style="display:none;position:absolute;z-index:9999; width:50%;background-color:#7F00A7;text-align:center;
//                                             bottom:30%;
//                                             left: 30%;
//                                             border-radius:15px; opacity:1;color:white;padding:1vh;opacity:.95; max-height:45vh;">
//                                             <div class="col s12 l12">
//                                                 <h6 style="color:white"><b>Personas que reaccionaron</b></h6>
//                                             </div>
//                                             <div class="col s12 l12">
//                                                 <ul id="ulEmpleadosReaccionanFEL${feed.idFeed}">
//                                                     ${contentHtmlCongra}
//                                                 </ul>
//                                             </div>
//                                         </div>`;
//                 contentBtnFel = `<div class="col s4 dv-buttonGroup">
//                                         <a href="javascript:void(0)" id="btnEventoF${feed.idFeed}" class="TooltipHoverF" onclick="MeGusta(${feed.idFeed},2)" style="${colorCong}"><i class="fas fa-birthday-cake"></i> ${feed.CantidadFelicitaciones} Felicitaciones</a>
//                                     </div>`;
//             }

//             contentHtmlFinal += `
//                                 </div>
//                             </div>
//                             <div class="row dvContent-buttonGroup">
//                                 <div class="col s4 dv-buttonGroup">
//                                     <a href="javascript:void(0)" id="btnEventoMG${feed.idFeed}" class="TooltipHoverMg" onclick="MeGusta(${feed.idFeed},1)" style="${colorMg}"><i class="fa-solid fa-heart"></i> ${feed.CantidadMeGusta} Me gusta</a>
//                                 </div>
//                                 ${contentBtnFel}
//                                 <div class="col s4 dv-buttonGroup">
//                                     <a href="javascript:void(0)" id="btnComment${feed.idFeed}" style="color:#212121;" onclick="showCommentsMain('${feed.idFeed}')"><i class="far fa-comments"></i> ${cantComm} Comentarios</a>
//                                 </div>
//                             </div>
//                             <div class="row" id="dv_commentarios${feed.idFeed}" style="display: none;">
//                                 <div class="col s12" id="dv_contentCommentsFeed${feed.idFeed}"></div>
//                                 <div class="col s12 m11 offset-m1 m-t-10">
//                                     <div class="comment-container">
//                                         <textarea class="comment-textarea" placeholder="Escribe tu comentario aquí..." id="f_newComentary${feed.idFeed}"></textarea>
//                                         <button class="comment-button" onclick=checkComment('${feed.idFeed}')>Comentar</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </li>
//                     </ul>
//                 </div>
//             </div>`;
//         }
async function loadFeeds(page = 1) {
  if (page === 1 && isFeedLoading) {
    return;
  }
  if (page > 1 && isFeedLoadingMore) {
    return;
  }

  if (page === 1) {
    isFeedLoading = true;
    feedPrefetchCache = {};
    feedPrefetchInFlight = {};
    if (!hasFeedRenderedOnce) {
      showFeedInitialSkeleton();
    }
  } else {
    isFeedLoadingMore = true;
    showFeedLoadMoreSkeleton();
  }

  let response = [];
  let isArrayResponse = true;

  // Iniciar estado de carga en el botón
  const $btnLoadMore = $("#btnLoadMoreFeeds");
  const originalBtnHtml = '<i class="fas fa-chevron-down me-1"></i> Ver más publicaciones';
  if (page > 1) {
    $btnLoadMore.html('<i class="fa fa-spinner fa-spin"></i> Cargando...').prop('disabled', true);
  }

  try {
    const pageResult = await requestFeedPage(page);
    response = pageResult.data;
    isArrayResponse = pageResult.valid;
  } finally {
    if (page === 1) {
      isFeedLoading = false;
    } else {
      isFeedLoadingMore = false;
    }
    hideFeedLoadMoreSkeleton();

    // Restaurar estado del botón
    $btnLoadMore.html(originalBtnHtml).prop('disabled', false);

    // Validar que response sea un array
    if (!Array.isArray(response)) {
      console.log("Response no es un array:", response);
      isArrayResponse = false;
      response = [];
    }

    if (!isArrayResponse) {
      // Si no hubo respuesta válida, mantenemos skeleton en primera página.
      if (page === 1 && !hasFeedRenderedOnce) {
        showFeedInitialSkeleton();
      }
      return;
    }

    let contentHtmlFinal = "";
    let urlImgProfile = "";

    for (let i = 0; i < response.length; i++) {
      try {
      const feed = response[i];
      let colorMg = feed.MeGusta == 1 ? "color:#FFC107;" : "color:black;";
      let colorCong =
        feed.Felicitacion == 1 ? "color:#8E24AA;" : "color:black;";
      let cantComm = parseInt(
        feed.CantidadComentarios ?? (feed.ArrayComentarios ? feed.ArrayComentarios.length : 0),
        10
      ) || 0;

      let contentBtnFel = "";
      let contentHtmlImg = "";
      let descriptionFinal = "";
      let arrDescription = [];
      let arrInd = [];
      let contentHtmlMg = "";
      let contentHtmlCongra = "";

      // Validar que EmpleadosReaccion existe y es un array
      const empleadosReaccion = feed.EmpleadosReaccion || [];
      const employesMg = empleadosReaccion.filter(
        (i) => i.TipoReaccion == 1
      );
      const employesF = empleadosReaccion.filter(
        (i) => i.TipoReaccion == 2
      );
      const cantMg = employesMg.length;
      const cantCongratulations = employesF.length;

      // Generar HTML para Me Gusta
      if (cantMg > 0) {
        for (let j = 0; j < employesMg.length; j++) {
          const data = employesMg[j];
          contentHtmlMg += `<li style="font-size:.8em"> * ${data.EmpleadoReaccion}</li>`;
        }
      } else {
        contentHtmlMg = `<li style="font-size:.8em"> SIN REGISTROS </li>`;
      }

      // Generar HTML para Felicitaciones
      if (cantCongratulations > 0) {
        for (let j = 0; j < employesF.length; j++) {
          const data = employesF[j];
          contentHtmlCongra += `<li style="font-size:.8em"> * ${data.EmpleadoReaccion}</li>`;
        }
      } else {
        contentHtmlCongra = `<li style="font-size:.8em"> SIN REGISTROS </li>`;
      }

      // Construir la descripción y el HTML de las imágenes
      switch (feed.Tipo) {
        case "CMP":
        case "ANY":
          arrDescription = (feed.Descripcion || '').split("<br>");
          arrInd = arrDescription.slice(1);
          if (arrInd.length == 0) {
            const arrSplit = (feed.Descripcion || '').split(". ");
            descriptionFinal += `<label><b class="form-label">${
              arrSplit[0] ?? ""
            }</b> ${arrSplit[1] ?? ""}</label>`;
          } else {
            for (let k = 0; k < arrInd.length; k++) {
              const arrSplit = arrInd[k].split(". ");
              descriptionFinal += `<label><b class="form-label">${
                arrSplit[0] ?? ""
              }</b> ${arrSplit[1] ?? ""}</label>`;
            }
          }
          if (feed.Archivo) {
            const folder =
              feed.Tipo == "CMP" ? "ImagesBirthday" : "ImagesAnniversary";
            contentHtmlImg += `
                            <img alt="${
                              feed.Tipo === "CMP"
                                ? "Image 1 Title"
                                : "Image Anniversary"
                            }"
                                src="Archivos/${folder}/${feed.Archivo}"
                                data-image="Archivos/${folder}/${feed.Archivo}"
                                data-description="${
                                  feed.Tipo === "CMP"
                                    ? "Image 1 Description"
                                    : "Image Anniversary"
                                }"
                                style="max-width: 100%; max-height: 450px; height: auto; border-radius: 8px; object-fit: contain;">`;
          }
          break;
        default:
          descriptionFinal = feed.Descripcion || '';

          if (feed.ArrayArchivos && feed.ArrayArchivos.length > 0) {
            for (let k = 0; k < feed.ArrayArchivos.length; k++) {
              const archivoObj = feed.ArrayArchivos[k];

              if (parseInt(archivoObj.isDataUri) === 1) {
                // ── Nuevo patrón: imagen guardada como Data URI base64 (igual que Incidencias)
                // El campo Archivo contiene el string 'data:image/...;base64,...'
                contentHtmlImg += `
                  <img alt="Imagen adjunta" src="${archivoObj.Archivo}"
                       loading="lazy"
                       data-image="${archivoObj.Archivo}"
                       data-description="Imagen"
                       style="max-width: 100%; max-height: 400px; object-fit: contain;">`;
              } else if (parseInt(archivoObj.hasBlob) === 1) {
                // ── Patrón legacy BLOB: obtener imagen vía endpoint especial
                const fUrl = `Backend/Feed/App.php?op=getArchivoFeed&idArchivo=${archivoObj.idArchivosFeed}`;
                contentHtmlImg += `
                  <img alt="Imagen Adjunta" src="${fUrl}"
                       loading="lazy"
                       data-image="${fUrl}"
                       data-description="${(archivoObj.Archivo || '').trim()}"
                       style="max-width: 100%; max-height: 400px; object-fit: contain;">`;
              } else {
                // ── Patrón antiguo: archivo guardado en disco (nombre de archivo)
                const filenames = (archivoObj.Archivo || "").split(",");
                for (let fName of filenames) {
                  if (!fName.trim()) continue;
                  let fUrlID   = `Archivos/Feed/${feed.idFeed}/${fName.trim()}`;
                  let fUrlRoot = `Archivos/Feed/${fName.trim()}`;
                  contentHtmlImg += `
                    <img alt="Image Feed"
                         loading="lazy"
                         src="${fUrlID}"
                         onerror="if(this.src.indexOf('/${feed.idFeed}/') !== -1) { this.src='${fUrlRoot}'; } else { this.style.display='none'; }"
                         data-image="${fUrlID}"
                         data-description="Archivo: ${fName.trim()}"
                         style="max-width: 100%; max-height: 400px; object-fit: contain;">`;
                }
              }
            }
          } else if (feed.Archivo) {
            // Enfoque antiguo por carpeta (fallback)
            const arrFiles = feed.Archivo.split(",");
            for (let k = 0; k < arrFiles.length; k++) {
              const f = arrFiles[k].trim();
              if(!f) continue;
              let fUrlLegacyID   = `Archivos/Feed/${feed.idFeed}/${f}`;
              let fUrlLegacyRoot = `Archivos/Feed/${f}`;

              contentHtmlImg += `
                <img alt="Image Feed Legacy"
                     loading="lazy"
                     src="${fUrlLegacyID}"
                     onerror="if(this.src.indexOf('/${feed.idFeed}/') !== -1) { this.src='${fUrlLegacyRoot}'; } else { this.style.display='none'; }"
                     data-image="${fUrlLegacyID}"
                     data-description="Archivo: ${f}"
                     style="max-width: 100%; max-height: 400px; object-fit: contain;">`;
            }
          }

      }

      const authorName = feed.Nombre || feed.NombreEmpleado || 'Usuario';
      urlImgProfile = getProfileAvatarUrl(feed.Imagen, feed.NoEmpleado, authorName);

      // --- Determinar badge de tipo ---
      let typeBadge = '';
      if (feed.Tipo === 'CMP') {
        typeBadge = `<span class="rpc-type-badge cmp"><i class="fas fa-birthday-cake me-1"></i>Cumpleaños</span>`;
      } else if (feed.Tipo === 'ANY') {
        typeBadge = `<span class="rpc-type-badge any"><i class="fas fa-star me-1"></i>Aniversario</span>`;
      }

      // --- Clase liked para el botón de Me Gusta ---
      const likedClass = feed.MeGusta == 1 ? 'liked' : '';
      const congratClass = feed.Felicitacion == 1 ? 'congrat' : '';
      
      // --- Icono de corazón: relleno si tiene like, outline si no ---
      const heartIcon = feed.MeGusta == 1 ? 'fa-heart' : 'fa-heart';
      const heartClass = feed.MeGusta == 1 ? 'heart-filled' : 'heart-outline';

      contentHtmlFinal += `
      <div class="reddit-post-card">

        <!-- Cuerpo del post -->
        <div class="rpc-body">

          <!-- Meta: avatar + autor + tiempo + badge tipo -->
          <div class="rpc-meta">
            <img src="${urlImgProfile}" alt="avatar">
            <span class="rpc-author">${authorName}</span>
            <span class="rpc-time">· hace ${feed.DiferenciaRegistro || '—'}</span>
            ${typeBadge}
          </div>

          <!-- Título -->
          <p class="rpc-title">${feed.Titulo || ''}</p>

          <!-- Descripción -->
          <div class="rpc-desc">${descriptionFinal}</div>

          <!-- Hipervínculo -->
          ${feed.Hipervinculo ? `<a class="rpc-link" href="${feed.Hipervinculo}" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt me-1"></i>${feed.Hipervinculo}</a>` : ''}

          <!-- Galería de imágenes -->
          ${
            (feed.ArrayArchivos && feed.ArrayArchivos.length > 0) || feed.Archivo
              ? `<div class="rpc-gallery"><div id="galleryFeed${feed.idFeed}" class="galleryImgCl" style="max-width:100%;">${contentHtmlImg}</div></div>`
              : ''
          }

          <!-- Ventana Me Gusta (tooltip) -->
          <div class="position-relative">
            <div id="WindowMeGusta${feed.idFeed}" class="menuMeGusta row position-absolute d-none"
                 style="z-index:9999;width:50%;background:#007B85;bottom:30%;left:30%;border-radius:15px;color:#fff;padding:10px;max-height:45vh;">
              <div class="col-12"><h6 class="text-white fw-bold">Personas que reaccionaron</h6></div>
              <div class="col-12"><ul id="ulEmpleadosReaccionanMG${feed.idFeed}" class="list-unstyled">${contentHtmlMg}</ul></div>
            </div>
            ${feed.Tipo == 'CMP' || feed.Tipo == 'ANY' ? `
            <div class="position-relative">
              <div id="WindowFelicitacion${feed.idFeed}" class="menuFelicitacion row position-absolute d-none"
                   style="z-index:9999;width:50%;background:#7F00A7;bottom:30%;left:30%;border-radius:15px;color:#fff;padding:10px;max-height:45vh;">
                <div class="col-12"><h6 class="text-white fw-bold">Personas que reaccionaron</h6></div>
                <div class="col-12"><ul id="ulEmpleadosReaccionanFEL${feed.idFeed}" class="list-unstyled">${contentHtmlCongra}</ul></div>
              </div>
            </div>` : ''}
          </div>

          <!-- Barra de acciones estilo Reddit -->
          <div class="rpc-actions">
            <a href="javascript:void(0)" id="btnEventoMG${feed.idFeed}"
               class="rpc-action-btn TooltipHoverMg ${likedClass}"
               onclick="MeGusta(${feed.idFeed},1)"
               data-feed-id="${feed.idFeed}"
               data-liked="${feed.MeGusta}">
              <i class="fa-solid fa-heart heart-icon ${heartClass}"></i> <span class="me-gusta-count">${feed.CantidadMeGusta || 0}</span> Me gusta
            </a>

            <a href="javascript:void(0)" id="btnComment${feed.idFeed}"
               class="rpc-action-btn"
               onclick="showCommentsMain('${feed.idFeed}')">
              <i class="far fa-comments"></i> ${cantComm} Comentarios
            </a>

            ${feed.Tipo == 'CMP' || feed.Tipo == 'ANY' ? `
            <a href="javascript:void(0)" id="btnEventoF${feed.idFeed}"
               class="rpc-action-btn TooltipHoverF ${congratClass}"
               onclick="MeGusta(${feed.idFeed},2)">
              <i class="fas fa-birthday-cake"></i> ${feed.CantidadFelicitaciones || 0} Felicitaciones
            </a>` : ''}
          </div>

          <!-- Área de comentarios (se expande al hacer clic) -->
          <div id="dv_commentarios${feed.idFeed}" style="display:none;">
            <div class="rpc-comments-area">
              <div id="dv_contentCommentsFeed${feed.idFeed}"></div>
              <div class="rpc-comment-input-row">
                <textarea placeholder="Escribe tu comentario aquí..." id="f_newComentary${feed.idFeed}" rows="1"></textarea>
                <button class="btn-comment" onclick="checkComment('${feed.idFeed}')">Comentar</button>
              </div>
            </div>
          </div>

        </div><!-- /rpc-body -->
      </div><!-- /reddit-post-card -->`;
      } catch (errFeed) {
        console.log("Error procesando feed #" + i + ":", errFeed, response[i]);
      }
    }

    if (page == 1) {
      if (Array.isArray(response) && response.length === 0) {
        $("#ContenidoFeed").html(`
          <div class="feed-empty-state">
            <div class="feed-empty-icon"><i class="fas fa-check-circle"></i></div>
            <h5 class="feed-empty-title">¡Estás al día!</h5>
            <p class="feed-empty-text">No hay publicaciones pendientes por revisar en este momento.</p>
          </div>
        `);
        hasFeedRenderedOnce = true;
      } else {
        $("#ContenidoFeed").html(contentHtmlFinal);
        hasFeedRenderedOnce = true;
      }
    } else {
      $("#ContenidoFeed").append(contentHtmlFinal);
    }

    // Manejar visibilidad del botón "Cargar más"
    // Si recibimos menos que el tamaño de página, ya no hay más resultados.
    feedHasMorePages = response.length >= feedPageSize;
    if (!feedHasMorePages) {
      $("#btnLoadMoreContainer").hide();
    } else {
      $("#btnLoadMoreContainer").show();
      prefetchFeedPage(page + 1);
    }

    initPendingFeedGalleries();
  }
}

$(document).on("mouseenter", ".TooltipHoverMg", function () {
  let btnId = event.target.id;
  let arrid = btnId.split("MG");
  let id = arrid[1];
  $("#WindowMeGusta" + id).fadeIn();
});

$(document).on("mouseleave", ".TooltipHoverMg", function () {
  $(".menuMeGusta").fadeOut();
});

$(document).on("mouseenter", ".TooltipHoverF", function () {
  let btnId = event.target.id;
  let arrid = btnId.split("F");
  let id = arrid[1];
  $("#WindowFelicitacion" + id).fadeIn();
});

$(document).on("mouseleave", ".TooltipHoverF", function () {
  $(".menuFelicitacion").fadeOut();
});

$(document).on("click", ".feed-swiper-instance .swiper-slide", function () {
  const galleryContainer = this.closest(".galleryImgCl");
  if (!galleryContainer || !Array.isArray(galleryContainer._swiperSlideImages)) {
    return;
  }

  let initialSlide = parseInt(
    $(this).attr("data-swiper-slide-index"),
    10
  );

  if (Number.isNaN(initialSlide) || initialSlide < 0) {
    initialSlide = 0;
  }

  openFullscreenSwiper(galleryContainer._swiperSlideImages, initialSlide);
});

function openFullscreenSwiper(slideImages, initialSlideNumber) {
  if (!Array.isArray(slideImages) || slideImages.length === 0) {
    return;
  }

  if ($("#fullscreen-swiper").is(":visible")) {
    return;
  }

  const maxIndex = slideImages.length - 1;
  const safeInitialSlide = Math.max(
    0,
    Math.min(parseInt(initialSlideNumber, 10) || 0, maxIndex)
  );
  const hasMultipleSlides = slideImages.length > 1;

  const fullscreenMarkup = `
    <div class="swiper feed-fullscreen-swiper">
      <div class="swiper-wrapper">
        ${slideImages
          .map(function (slideImage) {
            return `<div class="swiper-slide">${slideImage}</div>`;
          })
          .join("")}
      </div>
      ${
        hasMultipleSlides
          ? `<div class="swiper-button-prev"></div>
             <div class="swiper-button-next"></div>
             <div class="swiper-pagination"></div>`
          : ""
      }
    </div>
    <button type="button" id="fullscreen-swiper-close" aria-label="Cerrar visor">
      <i class="fa fa-times"></i>
    </button>
  `;

  $("#fullscreen-swiper").html(fullscreenMarkup).fadeIn();

  const fullscreenOptions = {
    initialSlide: safeInitialSlide,
    zoom: true,
    direction: "horizontal",
    speed: 380,
    spaceBetween: 24,
    centeredSlides: true,
    roundLengths: true,
    grabCursor: false,
  };

  if (hasMultipleSlides) {
    fullscreenOptions.loop = true;
    fullscreenOptions.pagination = {
      el: "#fullscreen-swiper .swiper-pagination",
      clickable: true,
    };
    fullscreenOptions.navigation = {
      nextEl: "#fullscreen-swiper .swiper-button-next",
      prevEl: "#fullscreen-swiper .swiper-button-prev",
    };
  }

  if (fullscreenFeedSwiper && typeof fullscreenFeedSwiper.destroy === "function") {
    fullscreenFeedSwiper.destroy(true, true);
  }
  fullscreenFeedSwiper = new Swiper("#fullscreen-swiper .feed-fullscreen-swiper", fullscreenOptions);

  const closeFullscreenSwiper = function () {
    if (fullscreenFeedSwiper && typeof fullscreenFeedSwiper.destroy === "function") {
      fullscreenFeedSwiper.destroy(true, true);
      fullscreenFeedSwiper = null;
    }
    $("#fullscreen-swiper").hide().empty();
    $("#fullscreen-swiper-backdrop").fadeOut();
    $("body, html").removeClass("no-scroll");
    $(document).off("keydown.feedFullscreen");
  };

  $("#fullscreen-swiper-backdrop").fadeIn();
  $("body, html").addClass("no-scroll");
  $("#fullscreen-swiper-close")
    .off("click")
    .on("click", closeFullscreenSwiper);
  $("#fullscreen-swiper-backdrop")
    .off("click")
    .on("click", closeFullscreenSwiper);

  $("#fullscreen-swiper")
    .off("click", ".swiper-slide img")
    .on("click", ".swiper-slide img", closeFullscreenSwiper);

  $(document)
    .off("keydown.feedFullscreen")
    .on("keydown.feedFullscreen", function (e) {
      if (e.key === "Escape" || e.keyCode === 27) {
        closeFullscreenSwiper();
      }
    });
}

function insertaComentario(val) {
  let comentarioInput = $("#f_newComentary" + val);
  if (comentarioInput.length === 0) {
    comentarioInput = $("#txtComentario" + val);
  }

  let comentario = (comentarioInput.val() || "").trim();
  if (comentario == "") {
    // toastr.info("Agregue un comentario");
    const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Agregue un comentario.</span>
        </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
    return false;
  }
  makeComment(comentario, val);
}

function mostrarComentarios(val) {
  if ($("#ComentarioFeed" + val).is(":visible")) {
    $("#ComentarioFeed" + val).fadeOut(); // hide
  } else {
    $("#ComentarioFeed" + val).fadeIn(); // hide
  }
}

function AddComentario(valor) {
  if (event.keyCode === 13) {
    insertaComentario(valor);
  }
}

async function getAgenda() {
  $("#citasCont").html("");
  let active_date = $("#calendar").evoCalendar("getActiveDate");
  let datos = await {
    op: "getEventos",
    fecha: active_date,
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "POST",
      url: "Backend/Eventos/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    if (respuesta.length > 0) {
      $.each(respuesta, function (i, objeto) {
        let newDate = new Date(objeto.FechaInicio);
        newDate.setDate(newDate.getDate() + 1);
        $("#calendar").evoCalendar("addCalendarEvent", [
          {
            id: objeto,
            name: objeto.Titulo,
            date: newDate,
            description: objeto.Descripcion,
            type: objeto.TipoEvento,
            everyYear: false,
            color: objeto.Color,
          },
        ]);
      });
    }
    // Se removió el else con showBootstrapAlertWar("No hay eventos en tu agenda..")
    // porque el usuario indicó que ya no hay agenda y generaba falsos positivos.
  }
}

async function MeGusta(valor, tipo) {
  datos = await {
    op: "MeGustaFeed",
    FeedId: valor,
    idTipoReaccion: tipo,
  };
  let response = [];
  try {
    response = await $.ajax({
      type: "post",
      url: "Backend/Feed/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    if (!Array.isArray(response) || response.length === 0 || !response[0]) {
      return;
    }

    if (response[0]["TipoReaccion"] == "1") {
      $("#ulEmpleadosReaccionanMG" + response[0]["IdFeed"]).html("");
      
      // Actualizar el contador de Me Gusta
      const $btnMeGusta = $("#btnEventoMG" + response[0]["IdFeed"]);
      $btnMeGusta.find(".me-gusta-count").text(response[0]["CantidadMeGusta"]);
      
      // Actualizar estado del corazón
      const $heartIcon = $btnMeGusta.find(".heart-icon");
      const isMeGusta = response[0]["MeGusta"] == "1";
      
      if (isMeGusta) {
        // Corazón relleno: cambiar clase a filled
        $heartIcon.removeClass("heart-outline").addClass("heart-filled");
        $btnMeGusta.addClass("liked").css({
          color: "#FFC107",
        });
      } else {
        // Corazón vacío: cambiar clase a outline
        $heartIcon.removeClass("heart-filled").addClass("heart-outline");
        $btnMeGusta.removeClass("liked").css({
          color: "",
        });
      }
    } else {
      $("#ulEmpleadosReaccionanFEL" + response[0]["IdFeed"]).html("");
      $("#btnEventoF" + response[0]["IdFeed"]).html(
        `<i class="fas fa-birthday-cake"></i> ${response[0]["CantidadFelicitaciones"]} Felicitaciones`
      );
      if (response[0]["Felicitacion"] == "1") {
        $("#btnEventoF" + response[0]["IdFeed"]).css({
          color: "#8E24AA",
        });
      } else {
        $("#btnEventoF" + response[0]["IdFeed"]).css({
          color: "black",
        });
      }
    }
    response.forEach((arr) => {
      let siguiente = 0;
      if (
        (arr.TipoReaccion == "1" && arr.CantidadMeGusta > 0) ||
        (arr.TipoReaccion == "2" && arr.CantidadFelicitaciones > 0)
      ) {
        siguiente++;
      }
      if (siguiente == "1") {
        arr.EmpleadosReaccion.forEach((empReaccion) => {
          if (siguiente == "1") {
            if (empReaccion.idTipoReaccion == arr.TipoReaccion) {
              if (arr.TipoReaccion == "1") {
                $("#ulEmpleadosReaccionanMG" + arr.IdFeed).append(`
                  <li style="font-size:.8em"> * ${empReaccion.Nombre}</li>
                `);
              } else {
                $("#ulEmpleadosReaccionanFEL" + arr.IdFeed).append(`
                  <li style="font-size:.8em"> * ${empReaccion.Nombre}</li>
                `);
              }
            }
          }
        });
      } else {
        if (arr.TipoReaccion == "1") {
          $("#ulEmpleadosReaccionanMG" + arr.IdFeed).append(`
            <li style="font-size:.8em"> SIN REGISTROS </li>
          `);
        } else {
          $("#ulEmpleadosReaccionanFEL" + arr.IdFeed).append(`
            <li style="font-size:.8em"> SIN REGISTROS </li>
          `);
        }
      }
    });
    // if (response == "1") {
    //   loadFeeds();
    // }else {
    //   toastr.info("ERROR");
    // }
  }
}

/* const jsConfetti = new JSConfetti()
document.querySelector("#felicitacionesDiv").addEventListener("click", (e) => {
  jsConfetti.addConfetti();
}) */

async function getEventosDetalle(val) {
  let datos = await {
    op: "getEventosDetalle",
    fecha: val,
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Eventos/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (error) {
    console.log(error);
  } finally {
    $("#contenidoAgendaEventos").html("");
    let contenidoBirthday = [];
    respuesta.map((birthday) => {
      birthday.EventosBirthday.map((registros) => {
        contenidoBirthday.push(registros);
      });
    });
    let contenidoAnniversary = [];
    respuesta.map((anniversary) => {
      anniversary.EventosAnniversary.map((registros) => {
        contenidoAnniversary.push(registros);
      });
    });

    let contenidoEventos = [];
    respuesta.map((eventos) => {
      eventos.EventosEvento.map((registros) => {
        contenidoEventos.push(registros);
      });
    });

    let contenidoCapacitacion = [];
    respuesta.map((capacitacion) => {
      capacitacion.EventosCapacitacion.map((registros) => {
        contenidoCapacitacion.push(registros);
      });
    });

    contenidoBirthday.forEach((item, index) => {
      console.log("Birthday", index, item);
    });

    contenidoAnniversary.forEach((item, index) => {
      console.log("Anniversary", index, item);
    });

    contenidoEventos.forEach((item, index) => {
      console.log("Evento", index, item);
    });

    contenidoCapacitacion.forEach((item, index) => {
      console.log("Capacitacion", index, item);
    });

    let contenidoHTMLBirthday = "";
    /*         if (contenidoBirthday.length > 0) {
            contenidoBirthday.map(contenido => {
                contenidoHTMLBirthday += `
                    <div class="col s12 l12" style="margin-top:1vh;text-align:center;border-radius:10px; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
                    background: rgb(255,0,176);
                    background: linear-gradient(90deg, rgba(255,0,176,1) 0%, rgba(128,0,88,1) 35%);  padding:1vh">
                        <span style="color:white">El día <b>${contenido.FNacimiento}</b> es el cumpleaños del empleado <b>${contenido.Nombre}</b></span>
                    </div>
                `;
            });
            $("#contenidoAgendaEventos").append(contenidoHTMLBirthday);
        } */

    let contenidoHTMLAnniversary = "";
    /*     if (contenidoAnniversary.length > 0) {
            contenidoAnniversary.map(contenido =>{
                contenidoHTMLAnniversary += `
                    <div class="col s12 l12" style="margin-top:1vh;text-align:center;border-radius:10px; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
                    background: rgb(200,111,0);
                    background: linear-gradient(90deg, rgba(200,111,0,1) 0%, rgba(120,76,0,1) 35%);  padding:1vh">
                        <span style="color:white">El día <b>${contenido.Antiguedad}</b> es el aniversario  del empleado <b>${contenido.Nombre}</b></span>
                    </div>
                `;
            });
            $("#contenidoAgendaEventos").append(contenidoHTMLAnniversary);
        } */

    let contenidoHTMLEventos = "";

    if (contenidoEventos.length > 0) {
      let contenidoHTMLEventos = "";
      contenidoEventos.forEach((contenido) => {
        contenidoHTMLEventos += `
      <div class="col-12 mb-3">
        <div class="card border-2 border-success rounded-3">
          <div class="card-body p-3">
            <h6 class="text-success mb-1 fw-bold">Evento - ${contenido.Descripcion}</h6>
            <div class="d-flex justify-content-between text-muted small">
              <span><strong>Inicio:</strong> ${contenido.HoraInicio}</span>
              <span><strong>Fin:</strong> ${contenido.HoraFin}</span>
              <span><strong>Finaliza:</strong> ${contenido.FechaFin}</span>
            </div>
          </div>
        </div>
      </div>
    `;
      });
      $("#contenidoAgendaEventos").append(
        `<div class="row">${contenidoHTMLEventos}</div>`
      );
    }

    let contenidoHTMLCapacitacion = "";
    if (contenidoCapacitacion.length > 0) {
      contenidoCapacitacion.forEach((contenido) => {
        if (contenido.Tipo == "PROL") {
          contenidoHTMLCapacitacion += `
      <div class="col-12 mb-3">
        <div class="card border-2 border-danger rounded-3">
          <div class="card-body p-3">
            <h6 class="text-danger mb-2 fw-bold">Capacitación PROL: ${contenido.Descripcion}</h6>
            <div class="d-flex justify-content-end text-muted small">
              <span><strong>Finaliza:</strong> ${contenido.FechaFin}</span>
            </div>
          </div>
        </div>
      </div>
    `;
        } else {
          contenidoHTMLCapacitacion += `
      <div class="col-12 mb-3">
        <div class="card border-2 border-danger rounded-3">
          <div class="card-body p-3">
            <h6 class="text-danger mb-2 fw-bold">Capacitación: ${contenido.Descripcion}</h6>
            <div class="d-flex justify-content-between text-muted small">
              <span><strong>Inicio:</strong> ${contenido.HoraInicio}</span>
              <span><strong>Fin:</strong> ${contenido.HoraFin}</span>
              <span><strong>Finaliza:</strong> ${contenido.FechaFin}</span>
            </div>
          </div>
        </div>
      </div>
    `;
        }
      });

      $("#contenidoAgendaEventos").append(contenidoHTMLCapacitacion);
    }
  }
}

// $(document).on("click", "#btn-openNewFeed", function () {
//   modalNewFeed.open();
// });

async function saveInfoFeed() {
  let form = $("#formFeed")[0];
  let dataSend = new FormData(form);
  dataSend.append("op", "addPublicationFromIndex");

  return new Promise(function (resolve) {
    $.ajax({
      type: "POST",
      url: url_m_Feed,
      data: dataSend,
      processData: false,
      contentType: false,
      timeout: 120000,
      success: function (res) {
        try {
          if (typeof res === "string") res = JSON.parse(res);
        } catch (e) {}
        resolve(!!(res && res.Resultado));
      },
      error: function (xhr, status, err) {
        console.warn("saveInfoFeed error:", status, err, xhr.responseText);
        resolve(false);
      },
    });
  });
}

function AddComentario(valor) {
  if (event.keyCode === 13) {
    insertaComentario(valor);
  }
}

function insertaComentario(val) {
  let comentarioInput = $("#f_newComentary" + val);
  if (comentarioInput.length === 0) {
    comentarioInput = $("#txtComentario" + val);
  }

  let comentario = (comentarioInput.val() || "").trim();
  if (comentario == "") {
    // toastr.info("Agregue un comentario");
    const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Agregue un comentario.</span>
        </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
    return false;
  }
  makeComment(comentario, val);
}

function mostrarComentarios(val) {
  if ($("#ComentarioFeed" + val).is(":visible")) {
    $("#ComentarioFeed" + val).fadeOut(); // hide
  } else {
    $("#ComentarioFeed" + val).fadeIn(); // hide
  }
}

const showCommentsMain = (content) => {
  var dvContent = document.getElementById(`dv_commentarios${content}`);
  var dvContentFeed = document.getElementById(
    `dv_contentCommentsFeed${content}`
  );
  if (dvContent) {
    if (dvContent.style.display == "none") {
      dvContent.style.display = "";
      if (feedCommentsData[content]) {
        // DOM preservado — reapertura instantánea sin AJAX ni re-render
        return;
      }
      if (dvContentFeed) {
        dvContentFeed.innerHTML = `
          <div class="feed-comments-skeleton">
            <div class="fcs-item"><div class="fcs-lines"><div class="fcs-line" style="width:35%"></div><div class="fcs-line" style="width:70%"></div></div></div>
            <div class="fcs-item"><div class="fcs-lines"><div class="fcs-line" style="width:42%"></div><div class="fcs-line" style="width:58%"></div></div></div>
          </div>`;
      }
      if (!feedCommentsLoading[content]) {
        getCommentsFeedSelected(content);
      }
    } else {
      dvContent.style.display = "none";
      // DOM intacto — próxima apertura es display="" puro
    }
  }
};

let feedCommentsState = {};
let feedCommentsData = {};
let feedCommentsLoading = {}; // Previene peticiones duplicadas al abrir comentarios

const getCommentsFeedSelected = async (content, forceReload = false) => {
  if (feedCommentsLoading[content]) return;
  if (feedCommentsData[content] && !forceReload) {
    renderCommentsFeedInline(content);
    return;
  }

  // Skeleton mientras carga
  const dvSkel = document.getElementById(`dv_contentCommentsFeed${content}`);
  if (dvSkel) dvSkel.innerHTML = `
    <div class="feed-comments-skeleton">
      <div class="fcs-item"><div class="fcs-avatar"></div><div class="fcs-lines"><div class="fcs-line" style="width:38%"></div><div class="fcs-line" style="width:72%"></div></div></div>
      <div class="fcs-item"><div class="fcs-avatar"></div><div class="fcs-lines"><div class="fcs-line" style="width:45%"></div><div class="fcs-line" style="width:60%"></div></div></div>
    </div>`;

  feedCommentsLoading[content] = true;
  let dataSend = {
    op: "getCommentsFeedSelected",
    iFeed: content,
  };
  let ajaxR = await pAjaxAsync(url_m_Feed, dataSend, 0);
  feedCommentsLoading[content] = false;
  if (ajaxR !== undefined) {
    let cant = ajaxR.Data.length;
    feedCommentsData[content] = ajaxR.Data;

    if (!feedCommentsState[content] || !forceReload) {
        if (!feedCommentsState[content]) feedCommentsState[content] = 5;
    } else {
        feedCommentsState[content] = cant; // Expande para revelar el nuevo comentario
    }

    let btnComm = document.getElementById(`btnComment${content}`);
    if (btnComm) {
      btnComm.innerHTML = `<i class="far fa-comments"></i> ${cant} Comentarios`;
    }

    renderCommentsFeedInline(content);
  }
};

const loadMoreCommentsFeed = (content) => {
    feedCommentsState[content] += 5;
    renderCommentsFeedInline(content);
};

const renderCommentsFeedInline = (content) => {
  const comments = feedCommentsData[content] || [];
  const limit    = feedCommentsState[content] || 5;
  const showing  = comments.slice(0, limit);
  const cant     = comments.length;

  let contentHtml = '';
  if (cant > 0) {
    showing.forEach((c) => {
      const reacted       = !!c.inReaction;
      const cantReactions = c.reactionsC ? c.reactionsC.length : 0;

      let employeesRLike = cantReactions > 0
        ? c.reactionsC.map(r => `<li>${r.Nombre}</li>`).join('')
        : '<li>Sin registros...</li>';

      contentHtml += `
      <div class="feed-comment-item">
        <div class="feed-comment-body">
          <div class="feed-comment-header">
            <span class="feed-comment-author">${c.Nombre}</span>
            <span class="feed-comment-time">${c.Registro}</span>
          </div>
          <p class="feed-comment-text">${c.Comentario}</p>
          <div style="position:relative; display:inline-block;">
            <button class="feed-comment-reaction${reacted ? ' reacted' : ''}"
                    onclick="reactsToComment('1','${c.idComentariosFeed}')"
                    id="icon-1-CommentP-${c.idComentariosFeed}"
                    data-comment="${c.idComentariosFeed}">
              👍 <span id="span-1-CommentP-${c.idComentariosFeed}">${cantReactions}</span>
            </button>
            <div class="reactionComm" style="display:none; position:absolute; z-index:9999; bottom:calc(100% + 4px); left:0; min-width:180px;" id="WindowReactionComm${c.idComentariosFeed}">
              <div class="p-2 border rounded-3 bg-white shadow-sm">
                <p class="fw-semibold mb-1" style="font-size:11px;">Reacciones</p>
                <ul id="employeesReactionComm-1-${c.idComentariosFeed}" class="list-unstyled mb-0" style="font-size:11px;">${employeesRLike}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    });
  } else {
    contentHtml = '<p class="feed-comment-empty">Sin comentarios aún.</p>';
  }

  const verMasBtn = cant > limit ? `
    <div class="text-center mt-1 mb-1">
      <button class="feed-comment-load-more" onclick="loadMoreCommentsFeed('${content}')">
        Ver más comentarios <i class="fa-solid fa-chevron-down ms-1"></i>
      </button>
    </div>` : '';

  const dvContent = document.getElementById(`dv_contentCommentsFeed${content}`);
  if (dvContent) dvContent.innerHTML = `<div class="feed-comments-list">${contentHtml}</div>${verMasBtn}`;
};

const checkComment = (i_Feed) => {
  let inpText = document.getElementById(`f_newComentary${i_Feed}`);
  if (inpText) {
    if ($(inpText).val() != "") {
      makeComment($(inpText).val(), i_Feed);
    } else {
      // toastr.info("Es necesario ingresar un comentario para continuar.");
      const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Es necesario ingresar un comentario para continuar.</span>
        </div>`;
      showBootstrapAlert(messageContent, "top-right", 5000);
    }
  }
};
$(document).on("click", "#btn_m_generateComment", function () {
  checkCommentM();
});
const checkCommentM = () => {
  let inp_comm = document.getElementById("comment_m_feed");
  if (inp_comm) {
    if ($(inp_comm).val() != "") {
      let inp_f = document.getElementById("feed_m_selComm");
      if (inp_f) {
        makeCommentM($(inp_comm).val(), inp_f.value);
      }
    } else {
      // toastr.info("Se requiere registrar un comentario para continuar.");
      const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Se requiere registrar un comentario para continuar.</span>
        </div>`;
      showBootstrapAlert(messageContent, "top-right", 5000);
    }
  }
};
const makeCommentM = async (content, i_Feed) => {
  let dataSend = {
    op: "makeComment",
    commentary: content,
    i_Feed: i_Feed,
  };
  console.log(dataSend);
  let ajaxR = await pAjaxAsync(url_m_Feed, dataSend, 1);
  if (ajaxR != undefined) {
    let inpText = document.getElementById(`comment_m_feed`);
    console.log(inpText);
    if (inpText) {
      inpText.value = "";
    }
  }
};

const makeComment = async (content, i_Feed) => {
  // Prevenir doble-clic: deshabilitar controles durante el envío
  let inpText = document.getElementById(`f_newComentary${i_Feed}`);
  let btnComment = inpText ? inpText.closest('.rpc-comments-area')?.querySelector('.btn-comment') : null;

  if (btnComment) {
    btnComment.disabled = true;
    btnComment.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
  }
  if (inpText) inpText.disabled = true;

  let dataSend = {
    op: "makeComment",
    commentary: content,
    i_Feed: i_Feed,
  };
  try {
    let ajaxR = await pAjaxAsync(url_m_Feed, dataSend, 1);
    if (ajaxR !== undefined && ajaxR.Resultado) {
      if (inpText) $(inpText).val("");

      // Actualizar contador del botón
      let btnComm = document.getElementById(`btnComment${i_Feed}`);
      if (btnComm) {
        let currentCount = parseInt((btnComm.textContent.match(/\d+/) || ['0'])[0], 10);
        btnComm.innerHTML = `<i class="far fa-comments"></i> ${currentCount + 1} Comentarios`;
      }

      // Insertar comentario en cache local (Optimistic UI):
      // evitamos un segundo round-trip completo al servidor.
      if (feedCommentsData[i_Feed]) {
        // El nombre del usuario ya está en el DOM
        let nombreEl = document.getElementById('NameEmpleado');
        let nombre = nombreEl ? nombreEl.textContent.trim() : 'Tú';
        let ahora = new Date().toLocaleString('es-MX');
        let nuevoComentario = {
          idFeed: i_Feed,
          Comentario: content,
          Registro: ahora,
          Nombre: nombre,
          ImagenEmpleado: '0/0.png',
          TypeCommentUs: 1,
          idComentariosFeed: 'tmp_' + Date.now(),
          inReaction: false,
          reactionsC: []
        };
        // Agregar al inicio para que sea visible inmediatamente
        feedCommentsData[i_Feed].unshift(nuevoComentario);
        renderCommentsFeedInline(i_Feed);
      } else {
        // Primera vez: traer todos los comentarios del servidor
        delete feedCommentsData[i_Feed];
        feedCommentsState[i_Feed] = null;
        getCommentsFeedSelected(i_Feed, true);
      }
    }
  } finally {
    // Rehabilitar controles siempre, incluso si hay error
    if (btnComment) {
      btnComment.disabled = false;
      btnComment.innerHTML = 'Comentar';
    }
    if (inpText) inpText.disabled = false;
  }
};

const getDataFeedSelected = async (feed) => {
  let dataSend = {
    op: "getDataFeedSelected",
    feed: feed,
  };
  let ajaxR = await pAjaxAsync(url_m_Feed, dataSend, 1);
  if (ajaxR !== undefined) {
    return ajaxR.Data;
  }
};

const viewAllCommentsFeed = async (feed) => {
  let dataFeed = await getDataFeedSelected(feed);
  let contentImg = "";
  let contentComments = "";
  let cantComments = dataFeed.commentsData.length;
  if (cantComments > 0) {
    setTimeout(function () {
      let inp_f = document.getElementById("feed_m_selComm");
      if (inp_f) {
        inp_f.value = feed;
      }
    }, 2000);
    for (var i = 0; i < cantComments; i++) {
      let colorReaction = "black";
      let cantReactions = dataFeed.commentsData[i].reactionsC.length;
      let employeesRLike = "";
      if (cantReactions > 0) {
        for (var ii = 0; ii < cantReactions; ii++) {
          employeesRLike += `<li>
						${dataFeed.commentsData[i].reactionsC[ii]["Nombre"]}
					</li>`;
        }
      } else {
        employeesRLike = "<li>Sin registros...</li>";
      }
      console.log(dataFeed.commentsData[i].inReaction);
      if (dataFeed.commentsData[i].inReaction) {
        colorReaction = "#ffc407";
      }
      if (dataFeed.commentsData[i].TypeCommentUs == 1) {
        contentComments += `
<li class="d-flex justify-content-end mb-3">
  <div class="chat-content text-end">
    <!-- Burbuja del mensaje -->
    <div class="p-3 bg-primary text-white rounded-3 shadow-sm d-inline-block">
      <h6 class="fw-semibold mb-1">${dataFeed.commentsData[i].Nombre}</h6>
      <p class="mb-2 small mb-0">${dataFeed.commentsData[i].Comentario}</p>

      <!-- Reacciones -->
      <div class="d-inline-flex align-items-center px-2 py-1 mt-2 bg-white text-dark rounded-pill shadow-sm hover-actionCmmM"
           style="cursor: pointer;"
           data-comment="${dataFeed.commentsData[i].idComentariosFeed}">
        <i id="iconM-1-CommentM-${dataFeed.commentsData[i].idComentariosFeed}"
           class="fa fa-thumbs-up me-1"
           style="color: ${colorReaction}; font-size: 16px;"></i>
        <span id="spanM-1-CommentM-${dataFeed.commentsData[i].idComentariosFeed}" class="small">
          ${cantReactions}
        </span>
      </div>
    </div>

    <!-- Ventana de reacciones -->
    <div class="mt-2">
      <div id="WindowReactionCommM${dataFeed.commentsData[i].idComentariosFeed}"
           class="p-2 bg-light rounded-3 border shadow-sm d-inline-block text-start">
        <h6 class="fw-semibold small mb-2">Personas que reaccionaron</h6>
        <ul id="employeesReactionCommM-1-${dataFeed.commentsData[i].idComentariosFeed}"
            class="list-unstyled small mb-0">
          ${employeesRLike}
        </ul>
      </div>
    </div>

    <!-- Hora -->
    <small class="text-muted d-block mt-2">${dataFeed.commentsData[i].Registro}</small>
  </div>
</li>
`;
       } else {
         // Generar avatar con iniciales para comentarios de otros usuarios
         const avatarUrl = buildCommentAvatarFromName(dataFeed.commentsData[i].Nombre);
         contentComments += `
<li class="d-flex mb-3">
  <!-- Avatar con iniciales -->
  <div class="me-3">
    <img src="${avatarUrl}"
         alt="avatar de ${dataFeed.commentsData[i].Nombre}"
         class="rounded-circle shadow-sm"
         width="42" height="42"
         style="border: 2px solid transparent; object-fit: cover;">
  </div>

  <!-- Contenido -->
  <div class="chat-content flex-grow-1">
    <!-- Burbuja -->
    <div class="p-3 bg-light rounded-3 shadow-sm d-inline-block">
      <h6 class="fw-semibold mb-1">${dataFeed.commentsData[i].Nombre}</h6>
      <p class="mb-2 small text-dark">${dataFeed.commentsData[i].Comentario}</p>

      <!-- Reacciones -->
      <div class="d-inline-flex align-items-center px-2 py-1 bg-white border rounded-pill shadow-sm hover-actionCmmM"
           style="cursor: pointer;"
           onclick="reactsToCommentM('1', '${dataFeed.commentsData[i].idComentariosFeed}')"
           data-comment="${dataFeed.commentsData[i].idComentariosFeed}">
        <i id="iconM-1-CommentM-${dataFeed.commentsData[i].idComentariosFeed}"
           class="fa fa-thumbs-up me-1"
           style="color: ${colorReaction}; font-size: 16px;"></i>
        <span id="spanM-1-CommentM-${dataFeed.commentsData[i].idComentariosFeed}" class="small">
          ${cantReactions}
        </span>
      </div>
    </div>

    <!-- Ventana de reacciones -->
    <div class="mt-2">
      <div id="WindowReactionCommM${dataFeed.commentsData[i].idComentariosFeed}"
           class="p-2 bg-light rounded-3 border shadow-sm d-inline-block">
        <h6 class="fw-semibold small mb-2">Personas que reaccionaron</h6>
        <ul id="employeesReactionCommM-1-${dataFeed.commentsData[i].idComentariosFeed}"
            class="list-unstyled small mb-0">
          ${employeesRLike}
        </ul>
      </div>
    </div>

    <!-- Hora -->
    <small class="text-muted d-block mt-2">${dataFeed.commentsData[i].Registro}</small>
  </div>
</li>
`;
      }
    }
  } else {
  }
  if (
    dataFeed.generalData.Tipo == "FIN" ||
    dataFeed.generalData.Tipo == "FED"
  ) {
    if (!!dataFeed.filesData) {
      let arrFiles = dataFeed.filesData.Archivo.split(",");
      arrFiles.forEach((i) => {
        contentImg += `
				<img alt="Image 1 Title" src="/Archivos/Feed/${feed}/${i}"
					data-image="Archivos/Feed/${feed}/${i}"
					data-description="Image 1 Description">
				`;
      });
    }
  } else if (dataFeed.generalData.Tipo == "ANY") {
    contentImg += `
			<img alt="Image 1 Title" src="/Archivos/ImagesAnniversary/ImgAnniversary.jpg"
				data-image="/Archivos/ImagesAnniversary/ImgAnniversary.jpg"
				data-description="Image 1 Description">`;
  } else {
    contentImg += `
			<img alt="Image 1 Title" src="/Archivos/ImagesBirthday/ImgBirthday.png"
				data-image="/Archivos/ImagesBirthday/ImgBirthday.png"
				data-description="Image 1 Description">`;
  }
  modalComments.setContent(`
	<input type="hidden" id="feed_m_selComm"/>

<div class="row">
  <!-- Título -->
  <div class="col-12 mb-3">
    <h4 class="fw-bold">${dataFeed.generalData.Titulo}</h4>
    <hr>
  </div>

  <!-- Descripción -->
  <div class="col-12 mb-3">
    <p class="text-secondary">${dataFeed.generalData.Descripcion}</p>
  </div>

  <!-- Galería -->
  <div class="col-12 mb-3">
    <div id="gallery" class="galleryImgCl">
      ${contentImg}
    </div>
    <hr>
  </div>

  <!-- Caja de comentarios -->
  <div class="col-12 mb-4">
    <div class="d-flex align-items-start gap-2">
      <textarea class="form-control rounded-3 shadow-sm"
                placeholder="Escribe tu comentario aquí..."
                id="comment_m_feed"
                rows="2"></textarea>
      <button class="btn btn-primary rounded-3 shadow-sm px-3" id="btn_m_generateComment">
        Comentar
      </button>
    </div>
  </div>

  <!-- Lista de comentarios -->
  <div class="col-12">
    <div class="border rounded-3 bg-light shadow-sm p-3" style="min-height:170px;">
      <ul class="chat-list list-unstyled mb-0">
        ${contentComments}
      </ul>
    </div>
  </div>
</div>

	`);
  modalComments.open();
  setTimeout(function () {
    initPendingFeedGalleries("#gallery");
  }, 100);
};

$(document).on("mouseenter", ".hover-actionCmm", function () {
  let dataComm = event.target.dataset.comment;
  $("#WindowReactionComm" + dataComm).fadeIn();
});

$(document).on("mouseleave", ".hover-actionCmm", function () {
  $(".reactionComm").fadeOut();
});

$(document).on("mouseenter", ".hover-actionCmmM", function () {
  let dataComm = event.target.dataset.comment;
  $("#WindowReactionCommM" + dataComm).fadeIn();
});

$(document).on("mouseleave", ".hover-actionCmmM", function () {
  $(".reactionCommM").fadeOut();
});

const reactsToComment = async (type, comment) => {
  let dataS = {
    op: "reactsToComment",
    type: type,
    comment: comment,
  };
  let ajaxR = await pAjaxAsync(url_m_Feed, dataS, 1);
  if (ajaxR !== undefined) {
    let element = document.getElementById(
      `employeesReactionComm-1-${dataS.comment}`
    );
    if (element) {
      let cantData = ajaxR.Data.content.length;
      let icon = document.getElementById(
        `icon-${dataS.type}-CommentP-${dataS.comment}`
      );
      let spanCant = document.getElementById(
        `span-${dataS.type}-CommentP-${dataS.comment}`
      );
      if (cantData > 0) {
        if (cantData) {
          if (ajaxR.Data.inReaction) {
            icon.style.color = "#ffc407";
          } else {
            icon.style.color = "black";
          }
        }
        let contentHTML = "";
        for (var i = 0; i < cantData; i++) {
          contentHTML += `
						<li>${ajaxR.Data.content[i].Nombre}</li>
					`;
        }
        element.innerHTML = contentHTML;
      } else {
        icon.style.color = "black";
        element.innerHTML = "<li>Sin registros.</li>";
      }
      spanCant.innerHTML = cantData;
    }
  }
};

const reactsToCommentM = async (type, comment) => {
  let dataS = {
    op: "reactsToComment",
    type: type,
    comment: comment,
  };
  let ajaxR = await pAjaxAsync(url_m_Feed, dataS, 1);
  if (ajaxR !== undefined) {
    let element = document.getElementById(
      `employeesReactionCommM-1-${dataS.comment}`
    );
    if (element) {
      let cantData = ajaxR.Data.content.length;
      let icon = document.getElementById(
        `iconM-${dataS.type}-CommentM-${dataS.comment}`
      );
      let spanCant = document.getElementById(
        `spanM-${dataS.type}-CommentM-${dataS.comment}`
      );
      // console.log(icon);
      // console.log(spanCant);
      if (cantData > 0) {
        if (cantData) {
          if (ajaxR.Data.inReaction) {
            icon.style.color = "#ffc407";
          } else {
            icon.style.color = "black";
          }
        }
        let contentHTML = "";
        for (var i = 0; i < cantData; i++) {
          contentHTML += `
						<li>${ajaxR.Data.content[i].Nombre}</li>
					`;
        }
        element.innerHTML = contentHTML;
      } else {
        icon.style.color = "black";
        element.innerHTML = "<li>Sin registros.</li>";
      }
      spanCant.innerHTML = cantData;
    }
  }
};
