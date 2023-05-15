<?php

date_default_timezone_set('Asia/Manila');

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$individuals = $con->getData("SELECT * FROM individuals WHERE id = $_POST[id]");

//Address
if($individuals[0]['province']!=null) {
    
	$provinces = $con->getData("SELECT * FROM refprovince WHERE id = ".$individuals[0]['province']);	
	$individuals[0]['province'] = $provinces[0];
	
}

if($individuals[0]['municipality']!=null) {
	
	$municipality = $con->getData("SELECT * FROM refcitymun WHERE psgcCode = ".$individuals[0]['municipality']);
	$individuals[0]['municipality'] = $municipality[0];
	
	$municipalities = $con->getData("SELECT * FROM refcitymun WHERE provCode = ".$provinces[0]['provCode']);
	$individuals[0]['municipality']['municipalities'] = $municipalities;
	
}

if($individuals[0]['barangay']!=null) {
    
	$barangay = $con->getData("SELECT * FROM refbrgy WHERE brgyCode = ".$individuals[0]['barangay']);
	$individuals[0]['barangay'] = $barangay[0];
	
	$barangays = $con->getData("SELECT * FROM refbrgy WHERE citymunCode = ".$municipality[0]['citymunCode']);
	$individuals[0]['barangay']['barangays'] = $barangays;
	
}

header("Content-Type: application/json");
echo json_encode($individuals[0]);

?>