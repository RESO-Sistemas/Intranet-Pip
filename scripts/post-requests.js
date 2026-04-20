ej.base.registerLicense(
  "ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE="
);

loadInitialFunctions();

async function loadInitialFunctions() {
  getPostRequests();
}

function buildPostRequestSwiperImageMarkup(sourceImage) {
  const imageClone = sourceImage.cloneNode(true);
  imageClone.classList.add("post-request-swiper-image");
  imageClone.removeAttribute("data-image");
  imageClone.removeAttribute("data-description");
  return imageClone.outerHTML;
}

function initPostRequestSwipers() {
  const allFeeds = document.querySelectorAll(
    ".clPost:not([data-swiper-initialized='1'])"
  );

  if (allFeeds.length === 0) {
    return;
  }

  allFeeds.forEach((feedElement) => {
    const rawImages = Array.from(feedElement.querySelectorAll("img")).filter(
      (img) => {
        const imgSrc = (img.getAttribute("src") || "").trim();
        return imgSrc !== "";
      }
    );

    if (rawImages.length === 0) {
      return;
    }

    const slideImages = rawImages.map(buildPostRequestSwiperImageMarkup);
    const hasMultipleSlides = slideImages.length > 1;

    feedElement.dataset.swiperInitialized = "1";
    feedElement.innerHTML = `
      <div class="swiper post-request-swiper-instance">
        <div class="swiper-wrapper">
          ${slideImages
            .map((slideImage) => `<div class="swiper-slide">${slideImage}</div>`)
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

    const swiperOptions = {
      slidesPerView: 1,
      spaceBetween: 8,
      autoHeight: true,
      watchOverflow: true,
    };

    if (hasMultipleSlides) {
      swiperOptions.loop = true;
      swiperOptions.pagination = {
        el: feedElement.querySelector(".swiper-pagination"),
        clickable: true,
      };
      swiperOptions.navigation = {
        nextEl: feedElement.querySelector(".swiper-button-next"),
        prevEl: feedElement.querySelector(".swiper-button-prev"),
      };
    }

    new Swiper(
      feedElement.querySelector(".post-request-swiper-instance"),
      swiperOptions
    );
  });
}

async function getPostRequests() {
  let dataSend = {
    op: "getPostRequests",
  };

  let ajaxR = await pAjaxAsync(url_m_Feed, dataSend);

  if (ajaxR !== undefined) {
    printPostRequests(ajaxR.Data || []);
  }
}

function printPostRequests(data) {
  const posts = Array.isArray(data) ? data : [];
  const cantPost = posts.length;
  let contentFinalHtml = "";

  if (cantPost > 0) {
    for (let i = 0; i < cantPost; i++) {
      const encodedFeedId = posts[i]["idFeed"] || "";
      const decodedFeedId = atob(encodedFeedId);
      const files = (posts[i]["Archivo"] || "")
        .split(",")
        .map((fileName) => fileName.trim())
        .filter(Boolean);

      let contentHtmlFiles = "";

      for (let ii = 0; ii < files.length; ii++) {
        contentHtmlFiles += `
          <img alt="Imagen ${ii + 1}"
               src="Archivos/Feed/${decodedFeedId}/${files[ii]}"
               data-image="Archivos/Feed/${decodedFeedId}/${files[ii]}"
               data-description="No.${ii + 1}"
               class="img-fluid rounded mb-2">
        `;
      }

      contentFinalHtml += `
        <div class="accordion-item" id="feedLi${decodedFeedId}">
          <h2 class="accordion-header" id="heading${i}">
            <button class="accordion-button collapsed" type="button"
              data-bs-toggle="collapse" data-bs-target="#collapse${i}"
              aria-expanded="false" aria-controls="collapse${i}">
              <span class="material-symbols-outlined me-2">app_badging</span>
              <b>${posts[i]["Empleado"]}</b> - ${posts[i]["Registro"]}
            </button>
          </h2>
          <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="heading${i}" data-bs-parent="#contentPost">
            <div class="accordion-body">
              <div class="row">
                <div class="col-12 col-md-5">
                  <div class="clPost" id="post${i}">
                    ${
                      contentHtmlFiles ||
                      '<div class="text-muted small fst-italic">Sin imagenes adjuntas</div>'
                    }
                  </div>
                </div>
                <div class="col-12 col-md-7">
                  <div class="d-flex justify-content-end mb-2">
                    <button class="btn btn-success btn-sm me-1 d-flex align-items-center"
                            onclick="actionPost('${encodedFeedId}', 1)">
                      <span class="material-symbols-outlined me-1">check</span>
                    </button>
                    <button class="btn btn-danger btn-sm d-flex align-items-center"
                            onclick="actionPost('${encodedFeedId}', 2)">
                      <span class="material-symbols-outlined me-1">block</span>
                    </button>
                  </div>
                  <h4 class="mt-2">${posts[i]["Titulo"]}</h4>
                  <p class="mb-2">${posts[i]["Descripcion"]}</p>
                  ${
                    !!posts[i]["Hipervinculo"]
                      ? `<a href="${posts[i]["Hipervinculo"]}" target="_blank" rel="noopener noreferrer">${posts[i]["Hipervinculo"]}</a>`
                      : ""
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  $("#contentPost").empty().append(contentFinalHtml);
  initPostRequestSwipers();
}

async function actionPost(post, action) {
  let title = "";
  let com = "";

  if (action == 1) {
    title = "\u00bfDesea aceptar la peticion de la publicacion?\u00a0";
  } else {
    title = "\u00bfDesea cancelar la peticion de la publicacion?\u00a0";
  }

  let resultDial = await dialogConfirmSAlert(title, com);

  if (resultDial) {
    executeActionPostRequest(post, action);
  }
}

async function executeActionPostRequest(post, action) {
  let dataSend = {
    op: "executeActionPostRequest",
    post: post,
    action: action,
  };

  let ajaxR = await pAjaxAsync(url_m_Feed, dataSend, 1);

  if (ajaxR !== undefined) {
    let dv = document.getElementById(`feedLi${atob(dataSend.post)}`);
    if (dv) {
      dv.remove();
    }
  }
}
