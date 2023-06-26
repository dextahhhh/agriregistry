<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("individual_aquacultures");

session_start();

if($_SESSION['id']) {

    $individual_id = $_POST['individual_id'];
    $individual_aquaculture = $_POST['individual_aquaculture'];
    $user_id = $_SESSION['id'];
    
    if ($individual_aquaculture['id']) {
    
        $individual_aquaculture['individual_id'] = $individual_id;
        $id = $individual_aquaculture['id'];
        $update = $con->updateObj($individual_aquaculture,'id');
    
    } else {
    
		$individual_aquaculture['individual_id'] = $individual_id;
        $insert = $con->insertObj($individual_aquaculture);
        $id = $con->insertId;
    
    }
    
    echo $id;

} else {

    echo json_encode(array("message" => "Unauthorized, session not found.","status" => 401));
    return;
}

?>