<?php

date_default_timezone_set('Asia/Manila');

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$users = $con->getData("SELECT * FROM users");

foreach($users as $key => $user){
	
	$offices = $con->getData("SELECT * FROM offices WHERE id = $user[div_id]");
	$users[$key]['div_id'] = $offices[0];
	
	$groups = $con->getData("SELECT * FROM groups WHERE id = $user[group_id]");
	$users[$key]['group_id'] = $groups[0];
	
}

header("Content-Type: application/json");
echo json_encode($users);

?>