<?php

date_default_timezone_set('Asia/Manila');

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$individuals = $con->getData("SELECT * FROM individuals WHERE id = $_POST[id]");

header("Content-Type: application/json");
echo json_encode($individuals[0]);

?>