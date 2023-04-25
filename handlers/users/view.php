<?php

date_default_timezone_set('Asia/Manila');

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$users = $con->getData("SELECT * FROM users WHERE id = $_POST[id]");
$users[0]['password'] = "";

foreach($users as $key => $user) {
	
	$history = $con->getData("SELECT *,DATE_FORMAT(system_log,'%M %d, %Y %h:%i %p') system_log FROM history WHERE user_id = $user[id]");
	$users[$key]['history'] = $history;
	
	$users[$key]['can_initial'] = ($users[$key]['can_initial'])?true:false;
	$users[$key]['can_signature'] = ($users[$key]['can_signature'])?true:false;
		
}

$offices = $con->getData("SELECT * FROM offices WHERE id = ".$users[0]['div_id']);
$users[0]['div_id'] = $offices[0];

$groups = $con->getData("SELECT * FROM groups WHERE id = ".$users[0]['group_id']);
$users[0]['group_id'] = $groups[0];

header("Content-Type: application/json");
echo json_encode($users[0]);

?>