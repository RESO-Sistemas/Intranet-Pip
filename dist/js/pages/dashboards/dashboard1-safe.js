// Envoltorio seguro para dashboard1.js
(function() {
  'use strict';

  // Verificar que Chartist existe
  if (typeof Chartist === 'undefined') {
    console.warn('Chartist no está cargado');
    return;
  }

  $(function() {
    
    // Solo ejecutar si el elemento existe
    if (!document.querySelector('#sales')) {
      return;
    }

    try {
      var chart = new Chartist.Line('#sales', {
          labels: ['0', '4', '8', '12', '16', '20', '24', '30'],
          series: [
              [0, 2, 5.5, 2, 14, 1, 8, 1],
              [0, 8, 2, 7, 3, 4, 0, 10]
          ]
      }, {
          high: 15,
          low: 0,
          showArea: true,
          fullWidth: true,
          plugins: [
              Chartist.plugins.tooltip()
          ],
          axisY: {
              onlyInteger: true,
              offset: 20,
              labelInterpolationFnc: function(value) {
                  return (value / 1) + 'k';
              }
          }
      });

      chart.on('draw', function(ctx) {
          if (ctx.type === 'area') {
              ctx.element.attr({
                  x1: ctx.x1 + 0.001
              });
          }
      });

      chart.on('created', function(ctx) {
          var defs = ctx.svg.elem('defs');
          defs.elem('linearGradient', {
              id: 'gradient',
              x1: 0,
              y1: 1,
              x2: 0,
              y2: 0
          }).elem('stop', {
              offset: 0,
              'stop-color': 'rgba(255, 255, 255, 1)'
          }).parent().elem('stop', {
              offset: 1,
              'stop-color': 'rgba(38, 198, 218, 1)'
          });
      });
    } catch (e) {
      console.error('Error al renderizar gráfico Chartist:', e);
    }

  });

})();
