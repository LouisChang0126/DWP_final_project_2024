<?php
// session_start();

// 定義處理請求的函數
function friends($name) {
    $link = mysqli_connect("localhost", "root", "", "dwp_final");
    if (!$link) {
        die("Database connection failed: " . mysqli_connect_error());
    }
    $link->set_charset("UTF8");

    // 查詢自己的好友
    $stmt = $link->prepare("SELECT friends FROM user WHERE username = ?");
    $stmt->bind_param("s", $name);
    $stmt->execute();
    $stmt->bind_result($friends);
    $stmt->fetch();
    $stmt->close();
    mysqli_close($link);
    return $friends;
}

function history($name) {
    $link = mysqli_connect("localhost", "root", "", "dwp_final");
    if (!$link) {
        die("Database connection failed: " . mysqli_connect_error());
    }
    $link->set_charset("UTF8");

    // 歷史時間表
    $stmt = $link->prepare("SELECT history FROM user WHERE username = ?");
    $stmt->bind_param("s", $name);
    $stmt->execute();
    $stmt->bind_result($history);
    $stmt->fetch();
    $stmt->close();

    mysqli_close($link);
    return $history;
}

function about($name) {
    $link = mysqli_connect("localhost", "root", "", "dwp_final");
    if (!$link) {
        die("Database connection failed: " . mysqli_connect_error());
    }
    $link->set_charset("UTF8");

    // 個人時間表
    $stmt = $link->prepare("SELECT email, quick_table FROM user WHERE username = ?");
    $stmt->bind_param("s", $name);
    $stmt->execute();
    $stmt->bind_result($email, $quick_table);
    $stmt->fetch();
    $stmt->close();

    mysqli_close($link);
    return $email . $quick_table;
}

function others_quicktable($uid) {
    $link = mysqli_connect("localhost", "root", "", "dwp_final");
    if (!$link) {
        die("Database connection failed: " . mysqli_connect_error());
    }
    $link->set_charset("UTF8");

    $stmt = $link->prepare("SELECT quick_table FROM user WHERE uid = ?");
    $stmt->bind_param("i", $uid);
    $stmt->execute();
    $stmt->bind_result($quick_table);
    $stmt->fetch();
    $stmt->close();

    mysqli_close($link);
    return $quick_table;
}

function edit_quicktable($jsonAndUsername) {
    list($jsonPart, $namePart) = explode('###', $jsonAndUsername, 2);

    $link = mysqli_connect("localhost", "root", "", "dwp_final");
    if (!$link) {
        die("Database connection failed: " . mysqli_connect_error());
    }
    $link->set_charset("UTF8");

    // 檢查 JSON 格式是否有效
    if (!is_string($jsonPart) || json_decode($jsonPart) === null) {
        mysqli_close($link);
        return "error";
    }

    $stmt = $link->prepare("UPDATE user SET quick_table = ? WHERE username = ?");
    $stmt->bind_param("ss", $jsonPart, $namePart);
    $result = $stmt->execute();
    $stmt->close();

    if ($result) {
        $response = "success";
    } else {
        $response = "error";
    }

    mysqli_close($link);
    return $response;
}

// 接收 AJAX 請求並調用對應的函數
$response = ['success' => false, 'message' => '', 'data' => null];

try {
    // 獲取請求的 JSON 資料
    $input = json_decode(file_get_contents('php://input'), true);
    $action = $input['action'] ?? '';
    $parameter = $input['parameter'] ?? '';

    // 根據請求的 action 執行不同邏輯
    switch ($action) {
        case 'friends':
            $response['data'] = friends($parameter);
            $response['success'] = true;
            break;
        case 'history':
            $response['data'] = history($parameter);
            $response['success'] = true;
            break;
        case 'about':
            $response['data'] = about($parameter);
            $response['success'] = true;
            break;
        case 'others_quicktable':
            $response['data'] = others_quicktable($parameter);
            $response['success'] = true;
            break;
        case 'edit_quicktable':
            $response['data'] = edit_quicktable($parameter);
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