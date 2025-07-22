<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Versión vertical de mi anuncio
$V = [
    "urlMiAnuncioCanvaV" => "https://www.canva.com/design/DAGqwRWVM7Y/L3es50td8eR3xUhmZ8hRRw/watch?embed"
];

// Versión horizontal de mi anuncio
$H = [
    "urlMiAnuncioCanvaH" => "https://www.canva.com/design/DAGrACxQsfU/IeDHlRWfz4w20N5cKNQslw/watch?embed"
];

// Combinamos ambas versiones
$data = array_merge($V, $H);

// Devolvemos como JSON
echo json_encode($data);
