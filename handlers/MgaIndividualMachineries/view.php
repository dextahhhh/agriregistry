<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

if($_SESSION['id']) {

    $individual_machinery = $con->getData("SELECT * FROM individual_machineries WHERE id = $_POST[id]");
    
    header("Content-Type: application/json");
    echo json_encode($individual_machinery[0]);

} else {

    echo json_encode(array("message" => "Unauthorized, session not found.","status" => 401));
    return;
}

?>