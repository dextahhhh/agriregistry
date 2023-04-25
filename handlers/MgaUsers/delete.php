<?php

date_default_timezone_set('Asia/Manila');

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db("users");

$delete = $con->deleteData(array("id"=>implode(",",$_POST['id'])));	

$con->table = "history";

$history = array (
    "user_id"=>$_SESSION['id'],
    "description"=>"Deleted a user information",
);

$con->insertData($history);

?>