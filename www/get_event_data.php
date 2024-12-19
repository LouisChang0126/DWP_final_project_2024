<?php
header('Content-Type: application/json');
include("./connect_db.php");

$event_id = $_GET['event_id']; // Get event ID from URL parameter

$query = "SELECT user_table FROM timetable WHERE id = ?";
$stmt = $link->prepare($query);
$stmt->bind_param("i", $event_id);
$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_assoc();

echo json_encode([
    'success' => true,
    'data' => json_decode($data['user_table'])
]);

mysqli_close($link);
?>