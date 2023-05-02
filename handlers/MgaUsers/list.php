<?php

date_default_timezone_set('Asia/Manila');

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$users = $con->getData("SELECT *, CONCAT(firstname,' ',middlename,' ',lastname) fullname, DATE_FORMAT(system_log,'%M %d, %Y %h:%i %p') system_log FROM users");

foreach($users as $key => $user){
	
	$groups = $con->getData("SELECT * FROM groups WHERE id = $user[groups]");
	$users[$key]['groups'] = $groups[0];
	
}

header("Content-Type: application/json");
echo json_encode($users);

?>