<?php

date_default_timezone_set('Asia/Manila');

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$barangays = $con->getData("SELECT * FROM barangays");

header("Content-Type: application/json");
echo json_encode($barangays);

?>