<?php

date_default_timezone_set('Asia/Manila');

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

session_start();

$con = new pdo_db("individuals");

if ($_POST['id']) {
	
	$id = $_POST['id'];
	$office = $con->updateObj($_POST,'id');

} else {
	
	$office = $con->insertObj($_POST);
	// $id = $con->insertId;
	echo $con->insertId;

}

?>