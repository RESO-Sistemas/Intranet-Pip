import re
import glob

files = [
    'ListadoEvaluaciones.php',
    'SolicitudVacaciones.php',
    'Directorio.php',
    'Capacitacion.php',
    'SolicitudesVacacionesFinales.php',
    'Eventos.php',
    'ControlOrganigrama.php',
    'CatalogoKpis.php',
    'CatalogoChecklists.php'
]

for file_name in files:
    try:
        with open(file_name, 'r') as f:
            content = f.read()

        # Remove CDN syncfusion script
        content = re.sub(r'<script\s+src="https://cdn\.syncfusion\.com/ej2/[^"]+"/?>\s*</script>\n?', '', content)
        
        # Remove syncfusion-config script
        content = re.sub(r'<script\s+src="scripts/syncfusion-config\.js[^"]*"\s*(charset="utf-8")?>\s*</script>\n?', '', content)
        
        with open(file_name, 'w') as f:
            f.write(content)
            
        print(f"Cleaned {file_name}")
    except Exception as e:
        print(f"Error processing {file_name}: {e}")
