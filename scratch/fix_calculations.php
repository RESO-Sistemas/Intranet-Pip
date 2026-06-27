<?php
echo "================================================\n";
echo "  CORRIGIENDO CÁLCULOS DE PREGUNTAS DE RANGO\n";
echo "================================================\n\n";

$files = [
    '/Users/gerardoplata/Developer/Intranet-Pip/scripts/ResultadosEvaluacion/data.js',
    '/Users/gerardoplata/Developer/Intranet-Pip/scripts/my-results/data-results.js',
    '/Users/gerardoplata/Developer/Intranet-Pip/scripts/my-subordinates/data-results.js'
];

foreach ($files as $filePath) {
    if (!file_exists($filePath)) {
        echo "[ERROR] El archivo no existe: $filePath\n";
        continue;
    }

    echo "Procesando $filePath...\n";
    $content = file_get_contents($filePath);

    // Normalizar saltos de línea a \n para facilitar el reemplazo
    $normalizedContent = str_replace("\r\n", "\n", $content);

    // Definir el patrón a buscar. Usamos regex para ignorar diferencias en espacios y comentarios
    // Buscamos:
    // let diffRange = ...;
    // let diffValue = ...;
    // let restFinal = ...;
    // ... opcionalmente comentarios ...
    // sumFinal += restFinal;
    
    $pattern = '/let\s+diffRange\s*=\s*\(\s*\(\s*Number\(\s*dataQuestion\[\s*0\s*\]\.RangoFinal\s*\)\s*-\s*Number\(\s*dataQuestion\[\s*0\s*\]\.RangoInicial\s*\)\s*\)\s*\)\s*;\s*\n\s*let\s+diffValue\s*=\s*\(\s*Number\(\s*diffRange\s*\)\s*-\s*Number\(\s*question\.Calificacion\s*\)\s*\)\s*;\s*\n\s*let\s+restFinal\s*=\s*\(\s*100\s*-\s*diffValue\s*\)\s*;\s*(\n\s*\/\/.*)*\n\s*sumFinal\s*\+=\s*restFinal\s*;/';

    $replacement = 'let diffRange = ((Number(dataQuestion[0].RangoFinal) - Number(dataQuestion[0].RangoInicial)));
        let restFinal = 0;
        if (diffRange > 0) {
          restFinal = ((Number(question.Calificacion) - Number(dataQuestion[0].RangoInicial)) / diffRange) * 100;
        }
        sumFinal += restFinal;';

    // Realizar el reemplazo
    $count = 0;
    $newContent = preg_replace($pattern, $replacement, $normalizedContent, -1, $count);

    if ($count > 0) {
        // Restaurar retornos de carro estilo Windows si el original los tenía
        if (strpos($content, "\r\n") !== false) {
            $newContent = str_replace("\n", "\r\n", $newContent);
        }
        file_put_contents($filePath, $newContent);
        echo "  - ¡Reemplazos exitosos! Se realizaron $count reemplazos.\n";
    } else {
        echo "  - [ADVERTENCIA] No se encontró el patrón en este archivo. Verificando reemplazo manual alternativo...\n";
        
        // Intento de reemplazo literal simple por si acaso
        $literalTarget = 'let diffRange = ((Number(dataQuestion[0].RangoFinal) - Number(dataQuestion[0].RangoInicial)));
        let diffValue = (Number(diffRange) - Number(question.Calificacion));
        let restFinal = (100 - diffValue);';
        
        $literalReplacement = 'let diffRange = ((Number(dataQuestion[0].RangoFinal) - Number(dataQuestion[0].RangoInicial)));
        let restFinal = 0;
        if (diffRange > 0) {
          restFinal = ((Number(question.Calificacion) - Number(dataQuestion[0].RangoInicial)) / diffRange) * 100;
        }';
        
        // Reemplazo simple en contenido original sin normalizar
        $newContentLiteral = str_replace($literalTarget, $literalReplacement, $content);
        if ($newContentLiteral !== $content) {
            file_put_contents($filePath, $newContentLiteral);
            echo "  - ¡Reemplazo literal simple exitoso!\n";
        } else {
            // Reemplazo con retorno de carro Windows \r\n
            $literalTargetWindows = str_replace("\n", "\r\n", $literalTarget);
            $literalReplacementWindows = str_replace("\n", "\r\n", $literalReplacement);
            $newContentLiteralWin = str_replace($literalTargetWindows, $literalReplacementWindows, $content);
            if ($newContentLiteralWin !== $content) {
                file_put_contents($filePath, $newContentLiteralWin);
                echo "  - ¡Reemplazo literal estilo Windows exitoso!\n";
            } else {
                echo "  - [ERROR] No se pudo aplicar ninguna de las estrategias de reemplazo.\n";
            }
        }
    }
}

echo "\n================================================\n";
echo "  PROCESO DE CORRECCIÓN COMPLETADO\n";
echo "================================================\n";
?>
