// Function to check login status
function checkLoginStatus() {
	fetch('check_login.php')
	.then(response => response.json())
	.then(data => {
		console.log(data); // Log the response data for debugging
		if (data.loggedin == false) {
			// Redirect to login page if not logged in
			alert ("Please Login!");
			window.location.href = "access.php";
		}
		document.getElementById("loginUsername").textContent = data.username;
		document.getElementById("loginEmail").textContent = data.email;
		document.getElementById('user_schedule').appendChild(create_table(data.quick_table));
	})
	.catch(error => console.error('Error:', error)); // Log any errors
}

// Call checkLoginStatus when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    checkLoginStatus();
});