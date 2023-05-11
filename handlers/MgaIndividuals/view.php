<?php

date_default_timezone_set('Asia/Manila');

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$individuals = $con->getData("SELECT * FROM individuals WHERE id = $_POST[id]");

//Address
$provinces = $con->getData("SELECT * FROM provinces WHERE id = ".$individuals[0]['province']);
$individuals[0]['province'] = $provinces[0];

$municipality = $con->getData("SELECT * FROM municipalities WHERE id = ".$individuals[0]['municipality']);
$individuals[0]['municipality'] = $municipality[0];

$barangay = $con->getData("SELECT * FROM barangays WHERE id = ".$individuals[0]['barangay']);
$individuals[0]['barangay'] = $barangay[0];

//Birth Place
$birth_province = $con->getData("SELECT * FROM provinces WHERE id = ".$individuals[0]['birth_province']);
$individuals[0]['birth_province'] = $birth_province[0];

$birth_municipality = $con->getData("SELECT * FROM municipalities WHERE id = ".$individuals[0]['birth_municipality']);
$individuals[0]['birth_municipality'] = $birth_municipality[0];

//Emergency Contact Address
$emergency_province = $con->getData("SELECT * FROM provinces WHERE id = ".$individuals[0]['emergency_province']);
$individuals[0]['emergency_province'] = $emergency_province[0];

$emergency_municipality = $con->getData("SELECT * FROM municipalities WHERE id = ".$individuals[0]['emergency_municipality']);
$individuals[0]['emergency_municipality'] = $emergency_municipality[0];

$emergency_barangay = $con->getData("SELECT * FROM barangays WHERE id = ".$individuals[0]['emergency_barangay']);
$individuals[0]['emergency_barangay'] = $emergency_barangay[0];

header("Content-Type: application/json");
echo json_encode($individuals[0]);

?>