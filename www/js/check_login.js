// Function to check login status
function checkLoginStatus() {
	fetch('check_login.php')
	.then(response => response.json())
	.then(data => {
		if (data.loggedin == false) {
			// Redirect to login page if not logged in
			alert ("Please Login!");
			window.location.href = "access.php";
		} else {
			$username = data.username;
			document.getElementById("loginUserName").textContent = data.username;
		}
	})
}