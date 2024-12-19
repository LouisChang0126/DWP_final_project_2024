<?php
	$link = mysqli_connect("localhost", "root", "", "dwp_final");
	if (!$link) {
		die("Database connection failed: " . mysqli_connect_error());
	}
	$link->set_charset("UTF8");
	// to close the connection, use mysqli_close($link);
?>