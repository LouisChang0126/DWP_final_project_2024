<?php
session_start();

$response = array("loggedin" => false);

if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
    $response["loggedin"] = true;
    $response["username"] = $_SESSION["username"];
    $username = $_SESSION["username"];
    // fetch email from db
    include("./connect_db.php");
    $stmt = $link->prepare("SELECT email,quick_table FROM user WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($email, $quick_table);
    $stmt->fetch();
    $stmt->close();
    $response["email"] = $email;
    $response["quick_table"] = $quick_table;
    mysqli_close($link);
}

header('Content-Type: application/json');
echo json_encode($response);
?>