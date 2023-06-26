<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db("individual_aquacultures");

if($_SESSION['id']) {

    $delete = $con->deleteData(array("id" => implode(",", $_POST['id'])));

} else {

    echo json_encode(array("message" => "Unauthorized, session not found.","status" => 401));
    return;
}

?>