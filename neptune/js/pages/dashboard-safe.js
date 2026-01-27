// Envoltorio seguro para evitar errores de elementos no encontrados
(function() {
  'use strict';
  
  // Verificar que ApexCharts existe antes de usarlo
  if (typeof ApexCharts === 'undefined') {
    console.warn('ApexCharts no está cargado');
    return;
  }

  $(document).ready(function () {
    
    // Solo ejecutar si el elemento existe
    if (!document.querySelector("#neptune-bar-chart")) {
      return;
    }

    var options1 = {
      chart: {
          height: 350,
          type: 'bar',
          toolbar: {
            show: false
          }
      },
      plotOptions: {
          bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded',
              borderRadius: 10
          },
      },
      dataLabels: {
          enabled: false
      },
      stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
      },
      series: [{
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      }, {
          name: 'Revenue',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
      }, {
          name: 'Free Cash Flow',
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
      }],
      xaxis: {
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
          labels: {
              style: {
                  colors: 'rgba(94, 96, 110, .5)'
              }
          }
      },
      yaxis: {
          title: {
              text: '$ (thousands)'
          }
      },
      fill: {
          opacity: 1
      },
      tooltip: {
          y: {
              formatter: function (val) {
                  return "$ " + val + " thousands"
              }
          }
      },
      legend: {
        labels: {
          colors: 'rgba(94, 96, 110, .5)',
        }
      },
      grid: {
        borderColor: 'rgba(94, 96, 110, .5)'
      }
    };

    try {
      var chart1 = new ApexCharts(
        document.querySelector("#neptune-bar-chart"),
        options1
      );
      chart1.render();
    } catch (e) {
      console.error('Error al renderizar gráfico de barras:', e);
    }

    // Resto de gráficos con validaciones similares...
  });

})();
