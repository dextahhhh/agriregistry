<?php

date_default_timezone_set('Asia/Manila');

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$individuals = $con->getData("SELECT *, DATE_FORMAT(system_log, '%M %d, %Y %h:%i %p') system_log, DATE_FORMAT(update_log, '%M %d, %Y %h:%i %p') update_log FROM individuals WHERE id = $_POST[id]");
//slider
$individuals[0]['for_farmers'] = ($individuals[0]['for_farmers'])?true:false;
$individuals[0]['for_livestock'] = ($individuals[0]['for_livestock'])?true:false;
$individuals[0]['for_fisherfolk'] = ($individuals[0]['for_fisherfolk'])?true:false;

$individuals[0]['is_fisherfolk_capture_fishing'] = ($individuals[0]['is_fisherfolk_capture_fishing'])?true:false;
$individuals[0]['is_fisherfolk_aquaculture'] = ($individuals[0]['is_fisherfolk_aquaculture'])?true:false;
$individuals[0]['is_fisherfolk_gleaning'] = ($individuals[0]['is_fisherfolk_gleaning'])?true:false;
$individuals[0]['is_fisherfolk_fish_vending'] = ($individuals[0]['is_fisherfolk_fish_vending'])?true:false;

//checkbox
$individuals[0]['for_farmers_rice'] = ($individuals[0]['for_farmers_rice'])?true:false;
$individuals[0]['for_farmers_corn'] = ($individuals[0]['for_farmers_corn'])?true:false;
$individuals[0]['for_farmers_other_crops'] = ($individuals[0]['for_farmers_other_crops'])?true:false;
$individuals[0]['for_farmers_livestock'] = ($individuals[0]['for_farmers_livestock'])?true:false;
$individuals[0]['for_farmers_poultry'] = ($individuals[0]['for_farmers_poultry'])?true:false;
$individuals[0]['for_farmers_land_preparation'] = ($individuals[0]['for_farmers_land_preparation'])?true:false;
$individuals[0]['for_farmers_planting'] = ($individuals[0]['for_farmers_planting'])?true:false;
$individuals[0]['for_farmers_cultivation'] = ($individuals[0]['for_farmers_cultivation'])?true:false;
$individuals[0]['for_farmers_harvesting'] = ($individuals[0]['for_farmers_harvesting'])?true:false;
$individuals[0]['for_farmers_others'] = ($individuals[0]['for_farmers_others'])?true:false;

$individuals[0]['is_capture_fishing_motorized'] = ($individuals[0]['is_capture_fishing_motorized'])?true:false;
$individuals[0]['is_capture_fishing_non_motorized'] = ($individuals[0]['is_capture_fishing_non_motorized'])?true:false;
$individuals[0]['is_capture_fishing_commercial'] = ($individuals[0]['is_capture_fishing_commercial'])?true:false;

$individuals[0]['is_method_hook'] = ($individuals[0]['is_method_hook'])?true:false;
$individuals[0]['is_method_gill'] = ($individuals[0]['is_method_gill'])?true:false;
$individuals[0]['is_method_seine'] = ($individuals[0]['is_method_seine'])?true:false;
$individuals[0]['is_method_scoop'] = ($individuals[0]['is_method_scoop'])?true:false;
$individuals[0]['is_method_pots'] = ($individuals[0]['is_method_pots'])?true:false;
$individuals[0]['is_method_lift'] = ($individuals[0]['is_method_lift'])?true:false;
$individuals[0]['is_method_falling'] = ($individuals[0]['is_method_falling'])?true:false;
$individuals[0]['is_method_misc'] = ($individuals[0]['is_method_misc'])?true:false;

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