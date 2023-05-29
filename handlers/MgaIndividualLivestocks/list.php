<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$id = $_POST['id'];

$individual_livestocks = $con->getData("SELECT * FROM individual_livestocks WHERE individual_id = $id");

header("Content-Type: application/json");
echo json_encode($individual_livestocks);

?>