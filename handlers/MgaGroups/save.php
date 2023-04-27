<?php

date_default_timezone_set('Asia/Manila');

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';
require_once '../../classes.php';

session_start();

$con = new pdo_db("groups");

$privileges = [];
if (isset($_POST['privileges'])) {
	
	$arrayHex = new ArrayHex();
		
	$privileges = $arrayHex->toHex(json_encode($_POST['privileges']));
	$_POST['group']['privileges'] = $privileges;
	
};

if ($_POST['group']['id']) {
	
	$_POST['group']['update_log'] = date("Y-m-d H:i:s");
	$group = $con->updateObj($_POST['group'],'id');
	
} else {
	
	$group = $con->insertObj($_POST['group']);
	echo $con->insertId;
	
}

?>