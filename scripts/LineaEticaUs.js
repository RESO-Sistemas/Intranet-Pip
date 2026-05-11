// LineaEticaUs.js - Wizard completo con Select2
$(document).ready(function() {
  
  // ── Inicializar Select2 ──
  $('#division').select2({ placeholder: "Selecciona una división", width: '100%' });
  $('#sl_branch').select2({ placeholder: "Selecciona una sucursal", width: '100%', disabled: true });
  $('#slctLineaEtica').select2({ placeholder: "Selecciona una opción", width: '100%' });

  // ── Cargar datos iniciales ──
  getDivisiones();
  getOpcionesLineaEtica();

  // ── Elementos del DOM ──
  var $division = $('#division');
  var $slBranch = $('#sl_branch');
  var $slctLineaEtica = $('#slctLineaEtica');
  var $textarea = $('#contenidoLineaEtica');
  var $charCount = $('#charCount');
  var $btnNext1 = $('#btnNext1');
  var $btnNext2 = $('#btnNext2');
  var $btnBack2 = $('#btnBack2');
  var $btnBack3 = $('#btnBack3');
  var $btnSubmit = $('#EnviarLineaE');

  // ── Eventos Select2 (select2:select se dispara al seleccionar) ──
  $division.on('select2:select', function() {
    getListBranches();
    $slBranch.prop('disabled', false);
    $slBranch.val(null).trigger('change.select2');
    validateStep1();
  });

  $slBranch.on('select2:select change', function() {
    validateStep1();
  });

  $slctLineaEtica.on('select2:select change', function() {
    validateStep2();
  });

  // ── Contador de caracteres ──
  $textarea.on('input', function() {
    $charCount.text(this.value.length);
    validateStep3();
  });

  // ── Validaciones ──
  function validateStep1() {
    var divVal = $division.val();
    var branchVal = $slBranch.val();
    var isValid = divVal && divVal !== '' && branchVal && branchVal !== '';
    $btnNext1.prop('disabled', !isValid);
  }

  function validateStep2() {
    var val = $slctLineaEtica.val();
    $btnNext2.prop('disabled', !val || val === '');
  }

  function validateStep3() {
    var val = $textarea.val();
    $btnSubmit.prop('disabled', !val || val.length < 10);
  }

  // ── Navegación del Wizard ──
  function goToStep(step) {
    $('.wizard-panel').removeClass('active');
    $('#panel' + step).addClass('active');
    updateProgress(step);
  }

  function updateProgress(step) {
    var $stepCircle1 = $('#stepCircle1');
    var $stepCircle2 = $('#stepCircle2');
    var $stepCircle3 = $('#stepCircle3');
    var $stepLabel1 = $('#stepLabel1');
    var $stepLabel2 = $('#stepLabel2');
    var $stepLabel3 = $('#stepLabel3');
    var $line1 = $('#line1');
    var $line2 = $('#line2');

    // Reset
    $stepCircle1.attr('class', 'wizard-step-circle inactive').text('1');
    $stepCircle2.attr('class', 'wizard-step-circle inactive').text('2');
    $stepCircle3.attr('class', 'wizard-step-circle inactive').text('3');
    $stepLabel1.attr('class', 'wizard-step-label inactive');
    $stepLabel2.attr('class', 'wizard-step-label inactive');
    $stepLabel3.attr('class', 'wizard-step-label inactive');
    $line1.attr('class', 'wizard-step-line-fill');
    $line2.attr('class', 'wizard-step-line-fill');

    if (step >= 1) {
      $stepCircle1.attr('class', 'wizard-step-circle active');
      $stepLabel1.attr('class', 'wizard-step-label active');
    }
    if (step >= 2) {
      $stepCircle1.attr('class', 'wizard-step-circle completed').html('<i class="material-icons" style="font-size:18px">check</i>');
      $stepCircle2.attr('class', 'wizard-step-circle active');
      $stepLabel2.attr('class', 'wizard-step-label active');
      $line1.attr('class', 'wizard-step-line-fill active');
    }
    if (step >= 3) {
      $stepCircle2.attr('class', 'wizard-step-circle completed').html('<i class="material-icons" style="font-size:18px">check</i>');
      $stepCircle3.attr('class', 'wizard-step-circle active');
      $stepLabel3.attr('class', 'wizard-step-label active');
      $line2.attr('class', 'wizard-step-line-fill active');
    }
  }

  // ── Botones de navegación ──
  $btnNext1.on('click', function() {
    if ($division.val() && $slBranch.val()) {
      goToStep(2);
    }
  });

  $btnNext2.on('click', function() {
    if ($slctLineaEtica.val()) {
      goToStep(3);
    }
  });

  $btnBack2.on('click', function() {
    goToStep(1);
  });

  $btnBack3.on('click', function() {
    goToStep(2);
  });

  // ── Envío del formulario ──
  $btnSubmit.on('click', function(e) {
    e.preventDefault();

    var form = document.getElementById("formLineaEtica");
    if (!form.checkValidity()) {
      showBootstrapAlert(
        '<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">Ingrese todos los datos.</span></div>',
        "top-right", 5000
      );
      return;
    }

    var formData = new FormData(form);
    formData.append("op", "addMensajeLineaEtica");

    $btnSubmit.prop("disabled", true).html('<i class="material-icons">hourglass_empty</i> Enviando...');

    $.ajax({
      type: "POST",
      url: "Backend/LineaEtica/App.php",
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function(response) {
        if (response == "1") {
          $("#panel3").removeClass("active");
          $("#panelSuccess").addClass("active");
          $("#wizardProgress").fadeOut(300);
        } else if (response == "0") {
          showBootstrapAlert(
            '<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">Mensaje no Enviado.</span></div>',
            "top-right", 5000
          );
          $btnSubmit.prop("disabled", false).html('<i class="material-icons">send</i> Enviar Reporte');
        }
      },
      error: function(e) {
        alert(e.responseText);
        $btnSubmit.prop("disabled", false).html('<i class="material-icons">send</i> Enviar Reporte');
      }
    });
  });

  // ── Funciones de carga de datos ──
  function getDivisiones() {
    $.ajax({
      type: "post",
      url: "Backend/Divisiones/App.php",
      data: { op: "getDivisiones" },
      success: function(ajaxResponse) {
        ajaxResponse = JSON.parse(ajaxResponse.trim());
        ajaxResponse.map(function(a) {
          $division.append('<option value="' + a.IdDivision + '">' + a.Division + '</option>');
        });
      },
      error: function(e) {
        console.error(e.responseText);
      }
    });
  }

  function getOpcionesLineaEtica() {
    $.ajax({
      type: "post",
      url: "Backend/LineaEtica/App.php",
      data: { op: "getOpcionesLineaEtica" },
      success: function(response) {
        $slctLineaEtica.html('<option value="" selected disabled>Selecciona una opción</option>');
        response = JSON.parse(response.trim());
        for (var i = 0; i < response.length; i++) {
          $slctLineaEtica.append(
            '<option value="' + response[i]["idCatalogoLineaEtica"] + '">' + response[i]["Descripcion"] + '</option>'
          );
        }
      },
      error: function(e) {
        console.error(e.responseText);
      }
    });
  }

  async function getListBranches() {
    var ajaxR = await pAjaxAsync(
      url_m_Sucursal,
      { op: "getAllBranchesPerDiv", div: $division.val() },
      1
    );
    if (!!ajaxR) {
      $slBranch.empty();
      printOptionsSelect(ajaxR.Data, {
        initialOption: "Selecciona una sucursal",
        idElement: "sl_branch"
      });
      $slBranch.trigger('change.select2');
    }
  }

  // ── Verificar estado inicial después de carga ──
  setTimeout(function() {
    validateStep1();
    validateStep2();
    validateStep3();
  }, 500);

});
