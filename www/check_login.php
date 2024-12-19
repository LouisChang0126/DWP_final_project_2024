<?php
session_start();

$response = array("loggedin" => false);

if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
    $response["loggedin"] = true;
    $response["username"] = $_SESSION["username"];
    $username = $_SESSION["username"];
    // fetch email from db
    include("./connect_db.php");
    $sql = "SELECT email FROM user WHERE username = '$username'";
    $result = mysqli_query($link, $sql);
    $row = mysqli_fetch_assoc($result);
    $response["email"] = $row["email"];
    mysqli_close($link);
}

header('Content-Type: application/json');
echo json_encode($response);
?>