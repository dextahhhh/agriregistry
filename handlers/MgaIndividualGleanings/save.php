<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("individual_gleanings");

session_start();

if($_SESSION['id']) {

    $individual_id = $_POST['individual_id'];
    $individual_gleaning = $_POST['individual_gleaning'];
    $user_id = $_SESSION['id'];
    
    if ($individual_gleaning['id']) {
    
        $individual_gleaning['individual_id'] = $individual_id;
        $id = $individual_gleaning['id'];
        $update = $con->updateObj($individual_gleaning,'id');
    
    } else {
    
		$individual_gleaning['individual_id'] = $individual_id;
        $insert = $con->insertObj($individual_gleaning);
        $id = $con->insertId;
    
    }
    
    echo $id;

} else {

    echo json_encode(array("message" => "Unauthorized, session not found.","status" => 401));
    return;
}

?>