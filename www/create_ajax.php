<?php
function create($jsonAndName) {
    list($jsonPart, $namePart) = explode('###', $jsonAndName, 2);

    $link = mysqli_connect("localhost", "root", "", "dwp_final");
    if (!$link) {
        die("Database connection failed: " . mysqli_connect_error());
    }
    $link->set_charset("UTF8");

    // 檢查 JSON 格式是否有效
    if (!is_string($jsonPart) || json_decode($jsonPart) === null) {
        mysqli_close($link);
        return -1;
    }

    $stmt = $link->prepare("INSERT INTO timetable (name, user_table) VALUES (?,?)");
    $stmt->bind_param("ss", $namePart, $jsonPart);
    $result = $stmt->execute();
    $insertedId = $link->insert_id; // 獲取剛剛插入的 AUTO_INCREMENT 值
    $stmt->close();

    if ($result) {
        $response = $insertedId;
    } else {
        $response = -1;
    }

    mysqli_close($link);
    return $response;
}

// 接收 AJAX 請求並調用對應的函數
$response = ['success' => false, 'message' => '', 'data' => -1];

try {
    // 獲取請求的 JSON 資料
    $input = json_decode(file_get_contents('php://input'), true);
    $action = $input['action'] ?? '';
    $parameter = $input['parameter'] ?? '';


    // 根據請求的 action 執行不同邏輯
    switch ($action) {
        case 'create':
            $response['data'] = create($parameter);
            $response['success'] = true;
            break;
        default:
            $response['message'] = 'Invalid action';
    }
} catch (Exception $e) {
    $response['message'] = $e->getMessage();
}

// 返回 JSON 響應
header('Content-Type: application/json');
echo json_encode($response);
?>