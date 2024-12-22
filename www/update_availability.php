<?php
include("connect_db.php");
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$event_id = $data['event_id'];
$user_id = $data['user_id']; // user_id if regular user
$user_name = $data['user_name']; // user_name if guest
$availability = $data['availability'];

// Get existing user_table
$stmt = $link->prepare("SELECT user_table FROM timetable WHERE id = ?");
$stmt->bind_param("i", $event_id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$user_table = json_decode($row['user_table'], true);

// Update user's availability
if ($user_id !== null) {
	// Update registered user data
    $logMessage = sprintf("Regular user updated - ID: %s", $user_id);
    $user_table['userdata'][$user_id]['avail'] = $availability;
} else {
	// Update guest data
    $logMessage = sprintf("Guest user updated - Name: %s", $user_name);
    $user_table['guestdata'][$user_name]['avail'] = $availability;
}

// Save back to database
$updated_json = json_encode($user_table);
$stmt = $link->prepare("UPDATE timetable SET user_table = ? WHERE id = ?");
$stmt->bind_param("si", $updated_json, $event_id);

// echo json_encode(['success' => $stmt->execute()]);
echo json_encode([
    'success' => $stmt->execute(),
    'log' => $logMessage
]);
$link->close();
?>