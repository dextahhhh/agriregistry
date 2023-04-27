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
		"id"=>"individuals",
		"description"=>"Individuals",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show Individuals","value"=>false),
			array("id"=>2,"description"=>"Add Individuals","value"=>false),
			array("id"=>3,"description"=>"Edit Individuals","value"=>false),
			array("id"=>4,"description"=>"Delete Individuals","value"=>false),
		),
	),
	array(
		"id"=>"users",
		"description"=>"Users",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show User Accounts","value"=>false),
			array("id"=>2,"description"=>"Add User Accounts","value"=>false),
			array("id"=>3,"description"=>"Edit User Accounts","value"=>false),
			array("id"=>4,"description"=>"Delete User Accounts","value"=>false),
		),
	),
	array(
		"id"=>"groups",
		"description"=>"Groups",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show Groups","value"=>false),
			array("id"=>2,"description"=>"Add Groups","value"=>false),
			array("id"=>3,"description"=>"Edit Groups","value"=>false),
			array("id"=>4,"description"=>"Delete Groups","value"=>false),
		),
	),
	
));

?>