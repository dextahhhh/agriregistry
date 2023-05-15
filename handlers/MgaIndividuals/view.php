<?php

date_default_timezone_set('Asia/Manila');

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$individuals = $con->getData("SELECT *, DATE_FORMAT(system_log, '%M %d, %Y %h:%i %p') system_log, DATE_FORMAT(update_log, '%M %d, %Y %h:%i %p') update_log FROM individuals WHERE id = $_POST[id]");

if($individuals[0]['last_updated_by']!=null) {
    
	$users = $con->getData("SELECT * FROM users WHERE id = ".$individuals[0]['last_updated_by']);	
	$individuals[0]['last_updated_by'] = $users[0];
	
}

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

//Birth Address
if($individuals[0]['birth_province']!=null) {
    
	$provinces = $con->getData("SELECT * FROM refprovince WHERE id = ".$individuals[0]['birth_province']);	
	$individuals[0]['birth_province'] = $provinces[0];
	
}

if($individuals[0]['birth_municipality']!=null) {
	
	$municipality = $con->getData("SELECT * FROM refcitymun WHERE psgcCode = ".$individuals[0]['birth_municipality']);
	$individuals[0]['birth_municipality'] = $municipality[0];
	
	$municipalities = $con->getData("SELECT * FROM refcitymun WHERE provCode = ".$provinces[0]['provCode']);
	$individuals[0]['birth_municipality']['municipalities'] = $municipalities;
	
}

//Emergency Address
if($individuals[0]['emergency_province']!=null) {
    
	$provinces = $con->getData("SELECT * FROM refprovince WHERE id = ".$individuals[0]['emergency_province']);	
	$individuals[0]['emergency_province'] = $provinces[0];
	
}

if($individuals[0]['emergency_municipality']!=null) {
	
	$municipality = $con->getData("SELECT * FROM refcitymun WHERE psgcCode = ".$individuals[0]['emergency_municipality']);
	$individuals[0]['emergency_municipality'] = $municipality[0];
	
	$municipalities = $con->getData("SELECT * FROM refcitymun WHERE provCode = ".$provinces[0]['provCode']);
	$individuals[0]['emergency_municipality']['municipalities'] = $municipalities;
	
}

if($individuals[0]['emergency_barangay']!=null) {
    
	$barangay = $con->getData("SELECT * FROM refbrgy WHERE brgyCode = ".$individuals[0]['emergency_barangay']);
	$individuals[0]['emergency_barangay'] = $barangay[0];
	
	$barangays = $con->getData("SELECT * FROM refbrgy WHERE citymunCode = ".$municipality[0]['citymunCode']);
	$individuals[0]['emergency_barangay']['barangays'] = $barangays;
	
}

header("Content-Type: application/json");
echo json_encode($individuals[0]);

?>