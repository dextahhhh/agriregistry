<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$mun_code = $_POST['id'];

if($_SESSION['id']) {

    $barangays = $con->getData("SELECT * FROM refbrgy WHERE citymunCode = $mun_code ORDER BY brgyDesc");

    header("Content-Type: application/json");
    echo json_encode($barangays);

} else {

    echo json_encode(array("message" => "Unauthorized, session not found.","status" => 401));
    return;
}

?>