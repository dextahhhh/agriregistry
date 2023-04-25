<?php

date_default_timezone_set('Asia/Manila');

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

session_start();

$con = new pdo_db("users");

unset($_POST['history']);

if ($_POST['id']) {
		
	$_POST['can_initial'] = ($_POST['can_initial'])?1:0;
	$_POST['can_signature'] = ($_POST['can_signature'])?1:0;
	
	if($_POST['password']=="") {

		unset($_POST['password']);
		$id = $_POST['id'];
		$user = $con->updateObj($_POST,'id');
		
		$con->table = "history";
		$history = array (
			"user_id"=>$_SESSION['id'],
			"description"=>"Updated a user information",
		);
		$con->insertData($history);
		
	} else {

		$_POST['password'] = hash('sha512',$_POST['password']);
		$id = $_POST['id'];
		$user = $con->updateObj($_POST,'id');
		
		$con->table = "history";
		$history = array (
			"user_id"=>$_SESSION['id'],
			"description"=>"Updated a user information",
		);
		$con->insertData($history);
	}

} else {
	
	$_POST['password'] = hash('sha512',$_POST['password']);
	$user = $con->insertObj($_POST);
	// $id = $con->insertId;
	echo $con->insertId;
	
	$con->table = "history";
	$history = array (
		"user_id"=>$_SESSION['id'],
		"description"=>"Added a user",
	);
	$con->insertData($history);

}

?>