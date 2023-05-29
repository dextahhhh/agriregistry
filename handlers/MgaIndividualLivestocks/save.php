<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("individual_livestocks");

session_start();

if($_SESSION['id']) {

    $individual_id = $_POST['individual_id'];
    $individual_livestock = $_POST['individual_livestock'];
    $user_id = $_SESSION['id'];
    
    if ($individual_livestock['id']) {
    
        $individual_livestock['individual_id'] = $individual_id;
        $id = $individual_livestock['id'];
        $update = $con->updateObj($individual_livestock,'id');
    
    } else {
    
		$individual_livestock['individual_id'] = $individual_id;
        $insert = $con->insertObj($individual_livestock);
        $id = $con->insertId;
    
    }
    
    echo $id;

} else {

    echo json_encode(array("message" => "Unauthorized, session not found.","status" => 401));
    return;
}

?>