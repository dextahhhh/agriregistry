<?php

date_default_timezone_set('Asia/Manila');

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$individuals = $con->getData("SELECT *, CONCAT(firstname,' ',middlename,' ',lastname,' ',appellation) fullname, DATE_FORMAT(system_log,'%M %d, %Y %h:%i %p') system_log FROM individuals");

header("Content-Type: application/json");
echo json_encode($individuals);

?>