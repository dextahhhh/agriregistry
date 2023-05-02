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
	
	$privileges[$key]['icon'] = "ki-duotone ki-element-11";
	
	if($privilege['id']=="dashboard"){
		$privileges[$key]['icon'] = "ki-duotone ki-element-11";
	}
	else if($privilege['id']=="add_document"){
		$privileges[$key]['icon'] = "fa fa-file";
	}else if($privilege['id']=="individuals"){
		$privileges[$key]['icon'] = "ki-duotone ki-address-book";
	}else if($privilege['id']=="users"){
		$privileges[$key]['icon'] = "ki-duotone ki-user";
	}else if($privilege['id']=="groups"){
		$privileges[$key]['icon'] = "ki-duotone ki-people";
	}else {
		$privileges[$key]['icon'] = "ki-duotone ki-element-11";
	}

}

echo json_encode($privileges);

?>