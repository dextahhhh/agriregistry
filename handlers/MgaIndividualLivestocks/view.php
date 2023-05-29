<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

if($_SESSION['id']) {

    $individual_livestock = $con->getData("SELECT * FROM individual_livestocks WHERE id = $_POST[id]");
	
	$individual_livestock[0]['is_fattening'] = ($individual_livestock[0]['is_fattening'])?true:false;
	$individual_livestock[0]['is_breeder'] = ($individual_livestock[0]['is_breeder'])?true:false;
	$individual_livestock[0]['is_dairy'] = ($individual_livestock[0]['is_dairy'])?true:false;
	$individual_livestock[0]['is_layers'] = ($individual_livestock[0]['is_layers'])?true:false;
	$individual_livestock[0]['is_broilers'] = ($individual_livestock[0]['is_broilers'])?true:false;
	$individual_livestock[0]['is_fighting_cocks'] = ($individual_livestock[0]['is_fighting_cocks'])?true:false;
	$individual_livestock[0]['is_others'] = ($individual_livestock[0]['is_others'])?true:false;
    
    header("Content-Type: application/json");
    echo json_encode($individual_livestock[0]);

} else {

    echo json_encode(array("message" => "Unauthorized, session not found.","status" => 401));
    return;
}

?>