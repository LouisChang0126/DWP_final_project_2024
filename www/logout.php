<?php
	session_start();
	// Unset all session variables
	$_SESSION = array();
	// Destroy the session
	session_destroy();
	echo "You have been logged out.";
?>

<script>
	alert ("You have been logged out.");
	window.location.href = "access.php";
</script>