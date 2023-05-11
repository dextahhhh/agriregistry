<?php

date_default_timezone_set('Asia/Manila');

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$provinces = $con->getData("SELECT * FROM provinces WHERE id != '999' ORDER BY province_description ASC");

foreach ($provinces as $key => $province) {		

	$municipalities = $con->getData("SELECT * FROM municipalities WHERE provCode = ".$province['provCode']);

        foreach ($municipalities as $index => $municipality) {		

            $barangays = $con->getData("SELECT * FROM barangays WHERE citymunCode = ".$municipality['citymunCode']);
                
            $municipalities[$index]['barangays'] = $barangays;	
        
        };

	$provinces[$key]['municipalities'] = $municipalities;	

};
header("Content-Type: application/json");
echo json_encode($provinces);

?>