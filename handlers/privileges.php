<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';
require_once '../system_privileges.php';
require_once '../classes.php';

$con = new pdo_db("groups");

$group_privileges = $con->get(array("id"=>$_POST['id']),["privileges"]);

if (count($group_privileges)) {
	if ($group_privileges[0]['privileges']!=NULL) {

		$privileges_obj = new privileges(system_privileges,$group_privileges[0]['privileges']);
		$privileges = $privileges_obj->getPrivileges();

	} else {
		
		$privileges = system_privileges;		
		
	}
} else {
	
	$privileges = system_privileges;	
	
}

foreach($privileges as $key => $privilege)	{
	
	$privileges[$key]['icon'] = "fa fa-dashboard";
	
	if($privilege['id']=="dashboard"){
		$privileges[$key]['icon'] = "fa fa-dashboard";
	}
	if($privilege['id']=="dashboard"){
		$privileges[$key]['icon'] = "fa fa-dashboard";
	}
	else if($privilege['id']=="add_document"){
		$privileges[$key]['icon'] = "fa fa-file";
	}else if($privilege['id']=="receive_document"){
		$privileges[$key]['icon'] = "fa fa-file";
	}else if($privilege['id']=="file_document"){
		$privileges[$key]['icon'] = "fa fa-file";
	}else if($privilege['id']=="update_tracks"){
		$privileges[$key]['icon'] = "fa fa-map-marker";
	}else if($privilege['id']=="track_document"){
		$privileges[$key]['icon'] = "fa fa-map-marker";
	}else if($privilege['id']=="list_of_documents"){
		$privileges[$key]['icon'] = "fa fa-file";
	}else if($privilege['id']=="accounts"){
		$privileges[$key]['icon'] = "fa fa-user-plus";
	}else if($privilege['id']=="groups"){
		$privileges[$key]['icon'] = "fa fa-users";
	}else if($privilege['id']=="maintenance"){
		$privileges[$key]['icon'] = "fa fa-cogs";
	}else {
		$privileges[$key]['icon'] = "fa fa-dashboard";
	}

}

echo json_encode($privileges);

?>