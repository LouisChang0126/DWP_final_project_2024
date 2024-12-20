<?php
include("connect_db.php");
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$event_id = $data['event_id'];
$user_name = $data['user_name'];
$availability = $data['availability'];

// Get existing user_table
$stmt = $link->prepare("SELECT user_table FROM timetable WHERE id = ?");
$stmt->bind_param("i", $event_id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$user_table = json_decode($row['user_table'], true);

// Update user's availability
$user_table['guestdata'][$user_name]['avail'] = $availability;

// Save back to database
$updated_json = json_encode($user_table);
$stmt = $link->prepare("UPDATE timetable SET user_table = ? WHERE id = ?");
$stmt->bind_param("si", $updated_json, $event_id);

echo json_encode(['success' => $stmt->execute()]);
$link->close();
?>