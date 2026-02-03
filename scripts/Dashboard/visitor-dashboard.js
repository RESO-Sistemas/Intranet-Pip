ej.base.registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE=');

// Ocultar preloader cuando todo esté listo
$(window).on('load', function() {
  $(".preloader").fadeOut();
});

const principal_v = {
  dateIni: document.getElementById('date_Ini'),
  dateEnd: document.getElementById('date_End'),
  tableEmployees: undefined,
  totalVisit: document.getElementById('tx_totalVisit'),
  graphPerBranch: undefined,
  tab: undefined
};

loadInitialF();

async function loadInitialF(){
  var primerDia = moment().startOf('month').format('YYYY-MM-DD');
  var ultimoDia = moment().endOf('month').format('YYYY-MM-DD');
  principal_v.dateIni.value = primerDia;
  principal_v.dateEnd.value = ultimoDia;
  // No se inicializa Tab de Syncfusion porque se usan tabs nativos de Bootstrap
  // principal_v.tab = new ej.navigations.Tab();
  // principal_v.tab.appendTo('#c_tabs');
  getDashboardVisitSystem();
}

principal_v.dateIni.addEventListener('input', function(){
  getDashboardVisitSystem();
});

principal_v.dateEnd.addEventListener('input', function(){
  getDashboardVisitSystem();
});

async function getDashboardVisitSystem(){
  let dataS = {
    op: "getDashboardVisitSystem",
    dateIni: principal_v.dateIni.value,
    dateEnd: principal_v.dateEnd.value
  }
  let ajaxR = await pAjaxAsync(url_m_Dashboard, dataS, 1);
    if (ajaxR !== undefined) {
      console.log(ajaxR.Data);
      printEmployeesVisit(ajaxR.Data.ListEmployees);
      printGraphPerBranch(ajaxR.Data.uniqueBranch);
      principal_v.totalVisit.textContent = ajaxR.Data.totalVisits;
    }
}

const printEmployeesVisit = (data) => {
  if (principal_v.tableEmployees) {
    principal_v.tableEmployees.dataSource = data;
    principal_v.tableEmployees.refresh();
  } else {
    principal_v.tableEmployees = new ej.grids.Grid({
      dataSource: data,
      allowFiltering: true,
      filterSettings: { type:'Menu' },
      allowPaging: true,
      allowTextWrap: true,
      allowGrouping: true,
      toolbar: ['Print', 'PdfExport', 'ExcelExport', 'Search'],
      height: "auto",
      allowPdfExport: true,
      allowExcelExport: true,
      columns: [
        { field: "Empleado", headerText: "Empleado", width: 100, textAlign: "Center"},
        { field: "Sucursal", headerText: "Sucursal", width: 100, textAlign: "Center"},
        { field: "Puesto", headerText: "Puesto", width: 100, textAlign: "Center"},
        { field: "FechaRegistro", headerText: "Fecha", width: 100, textAlign: "Center"},
      ],
    });
    principal_v.tableEmployees.appendTo("#t_usersVisit");
    principal_v.tableEmployees.toolbarClick = function(args){
      if (args['item'].id === "t_usersVisit_pdfexport") {
        let exportProperties = {
           fileName:"ReporteVisitasKlynet.pdf"
        };
        principal_v.tableEmployees.pdfExport(exportProperties);
      } else if (args['item'].id === "t_usersVisit_excelexport") {
        let exportProperties = {
           fileName:"ReporteVisitasKlynet.xlsx"
        };
        principal_v.tableEmployees.excelExport(exportProperties);
      }
    }
  }
}

const printGraphPerBranch = (data) => {
  if (principal_v.graphPerBranch) {
    principal_v.graphPerBranch.destroy();
  }
  principal_v.graphPerBranch = new ej.charts.AccumulationChart({
    series: [
        {
            dataSource: data,
            xName: 'nameBranch',
            yName: 'cantVisits',
            dataLabel: { visible: true, name: 'text', position: 'Outside'  },
        }
    ],
    tooltip:{enable: true}
  }, '#graph_PerBranch');
}

// Evento para refrescar el gráfico al cambiar de tab
// Se usa el tab2-tab que es el ID real del segundo tab de Bootstrap
$(document).on('shown.bs.tab', 'button[data-bs-target="#tab2"]', function(){
  if (principal_v.graphPerBranch) {
    principal_v.graphPerBranch.refresh();
  }
});
