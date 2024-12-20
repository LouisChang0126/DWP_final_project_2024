<?php
header('Content-Type: application/json');

// fetch login from db
include("./connect_db.php");

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
$user_name = $data['user_name'];
$user_pw = $data['user_pw'];

$stmt = $link->prepare("SELECT password FROM user WHERE username = ?");
$stmt->bind_param("s", $user_name);
$stmt->execute();
$result = $stmt->get_result();

$response = array();
$response["success"] = false;
$response["error"] = "";
$response["error_code"] = "";

if ($row = $result->fetch_assoc()) {
    $stored_password = $row['password'];
    // Continue with comparison
    if ($user_pw === $stored_password){
        getUserData($link, $user_name);
    } else {
        $response["success"] = false;
        $response["error"] = "Wrong password";
        $response["error_code"] = "wrong_pw";
        echo json_encode($response);
    }
} else {
    $response["success"] = false;
    $response["error"] = "User not found";
    $response["error_code"] = "no_user";
    echo json_encode($response);
}

function getUserData($link, $user_name){
    $stmt = $link->prepare("SELECT uid, quick_table FROM user WHERE username = ?");
    $stmt->bind_param("s", $user_name);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $stmt->close();
    $response = array(
        "success" => true,
        "user_id" => $row['uid'],
        "quick_table" => $row['quick_table']
    );
    echo json_encode($response);
}
mysqli_close($link);
?>