<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("individual_trainings");

session_start();

if($_SESSION['id']) {

    $individual_id = $_POST['individual_id'];
    $individual_training = $_POST['individual_training'];
    $user_id = $_SESSION['id'];
    
    if ($individual_training['id']) {
    
        $individual_training['individual_id'] = $individual_id;
        $id = $individual_training['id'];
        $update = $con->updateObj($individual_training,'id');
    
    } else {
    
		$individual_training['individual_id'] = $individual_id;
        $insert = $con->insertObj($individual_training);
        $id = $con->insertId;
    
    }
    
    echo $id;

} else {

    echo json_encode(array("message" => "Unauthorized, session not found.","status" => 401));
    return;
}

?>