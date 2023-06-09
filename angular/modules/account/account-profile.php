<?php

require_once '../../../db.php';

require_once '../../../system_privileges.php';
require_once '../../../classes.php';

session_start();

if (!isset($_SESSION['id'])) header('X-Error-Message: Session timeout', true, 500);

$con = new pdo_db("users");

$account = $con->get(["id"=>$_SESSION['id']],["CONCAT(firstname, ' ', lastname) fullname, (SELECT groups.id FROM groups WHERE groups.id = users.groups) groups"]);

$con->table = "groups";

$group_privileges = $con->get(array("id"=>$account[0]['groups']),["privileges"]);

$pages_access = [];

if (count($group_privileges)) {
	
	if ($group_privileges[0]['privileges']!=NULL) {

		$privileges_obj = new privileges(system_privileges,$group_privileges[0]['privileges']);
		$pages_access = $privileges_obj->getPagesPrivileges();

	};
}

$account[0]['pages_access'] = $pages_access;

$avatar = "pictures/image.png";

$profile = array(
	"fullname"=>$account[0]['fullname'],
	"picture"=>$avatar,
	"pages_access"=>$pages_access,
	"groups"=>$account[0]['groups'],
	
);

echo json_encode($profile);

?>