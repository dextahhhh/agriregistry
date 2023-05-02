<?php

date_default_timezone_set('Asia/Manila');

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$users = $con->getData("SELECT * FROM users WHERE id = $_POST[id]");
$users[0]['password'] = "";

$groups = $con->getData("SELECT * FROM groups WHERE id = ".$users[0]['groups']);
$users[0]['groups'] = $groups[0];

header("Content-Type: application/json");
echo json_encode($users[0]);

?>