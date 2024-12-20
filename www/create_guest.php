<?php
header('Content-Type: application/json');

try {
    include("connect_db.php");
    
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);
    $event_id = $data['event_id'];
    $user_name = $data['user_name'];
    $user_pw = $data['user_pw'] ?? null;

    // Get existing user_table
    $stmt = $link->prepare("SELECT user_table FROM timetable WHERE id = ?");
    $stmt->bind_param("i", $event_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        $user_table = json_decode($row['user_table'], true);
        
        // Create new guest entry
        $user_table['guestdata'][$user_name] = [
            'pw' => $user_pw,
            'avail' => array_fill(0, count($user_table['metadata']['times']), 
                      array_fill(0, count($user_table['metadata']['dates']), 0))
        ];
        
        // Save back to database
        $updated_json = json_encode($user_table);
        $stmt = $link->prepare("UPDATE timetable SET user_table = ? WHERE id = ?");
        $stmt->bind_param("si", $updated_json, $event_id);
        
        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'data' => $user_table['guestdata'][$user_name]
            ]);
        } else {
            throw new Exception('Failed to update database');
        }
    } else {
        throw new Exception('Event not found');
    }

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

mysqli_close($link);
?>