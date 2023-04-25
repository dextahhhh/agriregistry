<?php

define('system_privileges', array(
	array(
		"id"=>"dashboard",
		"description"=>"Dashboard",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show Dashboard","value"=>false),
		),
	),
	array(
		"id"=>"scan_qr",
		"description"=>"Scan QR Code",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show Scan QR Code","value"=>false),
		),
	),
	array(
		"id"=>"prepare_document",
		"description"=>"Prepare Document",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show Prepare Documents","value"=>false),
			array("id"=>2,"description"=>"Add Document","value"=>false),
			array("id"=>3,"description"=>"Edit Document","value"=>false),
			array("id"=>4,"description"=>"Delete Document","value"=>false),
		),
	),
	array(
		"id"=>"receive_document",
		"description"=>"Receive Document",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show Receive Documents","value"=>false),
			array("id"=>2,"description"=>"Receive Document","value"=>false),
		),
	),
	array(
		"id"=>"release_document",
		"description"=>"Release Document",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show Release Documents","value"=>false),
			array("id"=>2,"description"=>"Release Document","value"=>false),
		),
	),
	array(
		"id"=>"documents_list",
		"description"=>"Documents List",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show Documents List","value"=>false),
			array("id"=>2,"description"=>"File Document","value"=>false),
		),
	),
	array(
		"id"=>"update_tracks",
		"description"=>"Update Tracks",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show Update Tracks","value"=>false),
			array("id"=>2,"description"=>"View Document","value"=>false),
			array("id"=>3,"description"=>"Initial Document","value"=>false),
			array("id"=>4,"description"=>"Sign Document","value"=>false),
			array("id"=>5,"description"=>"Add/Edit Comment","value"=>false),
			array("id"=>6,"description"=>"Delete Comment","value"=>false),
			array("id"=>7,"description"=>"Print Comment","value"=>false),
			array("id"=>8,"description"=>"For Revision","value"=>false),
			array("id"=>9,"description"=>"Mark document for pick up","value"=>false),
			array("id"=>10,"description"=>"Route Document","value"=>false),
		),
	),
	array(
		"id"=>"tracks",
		"description"=>"Track Document",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show Track Document","value"=>false),
			array("id"=>2,"description"=>"Track Document","value"=>false),
			array("id"=>3,"description"=>"Print Tracking","value"=>false),
		),
	),
	array(
		"id"=>"reports",
		"description"=>"Reports",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show Reports","value"=>false),
		),
	),
	array(
		"id"=>"accounts",
		"description"=>"Accounts",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show User Accounts","value"=>false),
			array("id"=>2,"description"=>"Add User Account","value"=>false),
			array("id"=>3,"description"=>"Edit User Account","value"=>false),
			array("id"=>4,"description"=>"Delete User Account","value"=>false),
		),
	),
	array(
		"id"=>"groups",
		"description"=>"Groups",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show User Groups","value"=>false),
			array("id"=>2,"description"=>"Add User Groups","value"=>false),
			array("id"=>3,"description"=>"Edit User Groups","value"=>false),
			array("id"=>4,"description"=>"Delete User Groups","value"=>false),
		),
	),
	array(
		"id"=>"maintenance",
		"description"=>"Maintenance",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show Maintenance","value"=>false),
			array("id"=>2,"description"=>"Add/Edit Item","value"=>false),
			array("id"=>3,"description"=>"Delete Item","value"=>false),
		),
	)
));

?>