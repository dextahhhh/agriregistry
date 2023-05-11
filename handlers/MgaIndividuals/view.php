<?php

date_default_timezone_set('Asia/Manila');

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$individuals = $con->getData("SELECT * FROM individuals WHERE id = $_POST[id]");

$individuals[0]['is_4ps'] = ($individuals[0]['is_4ps'])?true:false;

//Address
if($individuals[0]['province']!=null) {
    
	$provinces = $con->getData("SELECT * FROM provinces WHERE id = ".$individuals[0]['province']);
	$individuals[0]['province'] = $provinces[0];
	
}

if($individuals[0]['municipality']!=null) {
    
	$municipality = $con->getData("SELECT * FROM municipalities WHERE id = ".$individuals[0]['municipality']);
	$individuals[0]['municipality'] = $municipality[0];
	
}

if($individuals[0]['barangay']!=null) {
    
	$barangay = $con->getData("SELECT * FROM barangays WHERE id = ".$individuals[0]['barangay']);
	$individuals[0]['barangay'] = $barangay[0];
	
}

//Birth Place

if($individuals[0]['birth_province']!=null) {
    
	$birth_province = $con->getData("SELECT * FROM provinces WHERE id = ".$individuals[0]['birth_province']);
	$individuals[0]['birth_province'] = $birth_province[0];
	
}

if($individuals[0]['birth_municipality']!=null) {
    
	$birth_municipality = $con->getData("SELECT * FROM municipalities WHERE id = ".$individuals[0]['birth_municipality']);
	$individuals[0]['birth_municipality'] = $birth_municipality[0];
	
}

//Emergency Contact Address

if($individuals[0]['emergency_province']!=null) {
    
	$emergency_province = $con->getData("SELECT * FROM provinces WHERE id = ".$individuals[0]['emergency_province']);
	$individuals[0]['emergency_province'] = $emergency_province[0];
	
}

if($individuals[0]['emergency_municipality']!=null) {
    
	$emergency_municipality = $con->getData("SELECT * FROM municipalities WHERE id = ".$individuals[0]['emergency_municipality']);
	$individuals[0]['emergency_municipality'] = $emergency_municipality[0];
	
}

if($individuals[0]['emergency_barangay']!=null) {
    
	$emergency_barangay = $con->getData("SELECT * FROM barangays WHERE id = ".$individuals[0]['emergency_barangay']);
	$individuals[0]['emergency_barangay'] = $emergency_barangay[0];
	
}

header("Content-Type: application/json");
echo json_encode($individuals[0]);

?>