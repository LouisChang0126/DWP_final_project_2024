<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $link = mysqli_connect("localhost", "root", "", "dwp_final");
    if (!$link) {
        die("Database connection failed: " . mysqli_connect_error());
    }
    $link->set_charset("UTF8");

    $username = trim($_POST['name']);
    $password = trim($_POST['password']);
    $email = trim($_POST['email']);

    if (empty($username) || empty($password) || empty($email)) {
        echo "<p style='color: red;'>帳密不得為空</p>";
    }
    else {
        // 帳號是否已存在
        $stmt = $link->prepare("SELECT COUNT(*) FROM user WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        $stmt->close();

        if ($count > 0) {
            echo "<p style='color: red;'>帳號名已註冊</p>";
        } 
        elseif (strlen($username) > 15 || strlen($password) > 15 || strlen($email) > 35) {
            echo "<p style='color: red;'>帳號與密碼長度不可超過15個字元，信箱不能超過35個字元</p>";
        }
        else {
            // 加入新帳號
            $stmt = $link->prepare("INSERT INTO user (username, password, email) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $username, $password, $email);
            if ($stmt->execute()) {
                $_SESSION['username'] = $username;
                $_SESSION['passwd'] = $password;
                echo "<p style='color: green;'>註冊成功!</p>";
            }
            else {
                echo "<p style='color: red;'>Error: " . $stmt->error . "</p>";
            }
            $stmt->close();
        }
    }
    mysqli_close($link);
}
?>
