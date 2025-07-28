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

// Información adicional
$infoAdicional = [
    "miWa" => "+524772547348",
	"urlMiSitioWeb" => "https://yotepromociono.com",
    "miMail" => "adanmendezeng@gmail.com"
];

// Combinamos todas las variables
$data = array_merge($V, $H, $infoAdicional);

// Devolvemos como JSON
echo json_encode($data);
?>