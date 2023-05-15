<?php

date_default_timezone_set('Asia/Manila');

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

session_start();

$con = new pdo_db("individuals");

$date_year = date("Y");

$check_qr_code = $con->getData("SELECT id, registration_no FROM individuals ORDER BY id DESC LIMIT 1");

$municipality = $_POST['municipality']['citymunDesc'];

if(isset($check_qr_code[0]['registration_no'])) {

	$format = $check_qr_code[0]['registration_no'];

} else {

	$zero_no = "000000";

	$format = 'INDV'.'-'.$municipality.'-'.$date_year.'-'.$zero_no;
	
}

// Get QR Code Number
$next_qr_code = $format;
preg_match_all("/\d+/", $next_qr_code, $matches);
$year_qr_number = $matches[0][0].$matches[0][1];

// Sum
$next_qr_code = $year_qr_number + 1;

// Remove year
$computed = substr($next_qr_code, 4);

$qr_code_result = 'INDV'.'-'.$municipality.'-'.$date_year.'-'.$computed;

var_dump($qr_code_result); exit();

if ($_POST['id']) {
	
	unset($_POST['system_log']);
	$id = $_POST['id'];
	$_POST['update_log'] = date("Y-m-d H:i:s");
	$_POST['last_updated_by'] = $_SESSION['id'];
	$office = $con->updateObj($_POST,'id');

} else {
	
	$office = $con->insertObj($_POST);
	// $id = $con->insertId;
	echo $con->insertId;

}

?>