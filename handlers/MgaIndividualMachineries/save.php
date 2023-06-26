<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("individual_machineries");

session_start();

if($_SESSION['id']) {

    $individual_id = $_POST['individual_id'];
    $individual_machinery = $_POST['individual_machinery'];
    $user_id = $_SESSION['id'];
    
    if ($individual_machinery['id']) {
    
        $individual_machinery['individual_id'] = $individual_id;
        $id = $individual_machinery['id'];
        $update = $con->updateObj($individual_machinery,'id');
    
    } else {
    
		$individual_machinery['individual_id'] = $individual_id;
        $insert = $con->insertObj($individual_machinery);
        $id = $con->insertId;
    
    }
    
    echo $id;

} else {

    echo json_encode(array("message" => "Unauthorized, session not found.","status" => 401));
    return;
}

?>