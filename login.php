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

    if (empty($username) || empty($password)) {
        echo "<p style='color: red;'>帳密不得為空</p>";
    }
    else {
        $stmt = $link->prepare("SELECT password FROM user WHERE name = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($stored_password);
            $stmt->fetch();
            if ($password === $stored_password) {
                echo "<p style='color: green;'>登入成功!將跳轉到遊戲~</p>";

                $_SESSION['username'] = $username;
                $_SESSION['loggedin'] = true;
                
                echo "<script>
                        setTimeout(function() {
                            window.location.href = 'access.php';
                        }, 1000);
                      </script>";
                exit();
            } else {
                echo "<p style='color: red;'>帳號或密碼錯誤</p>";
            }
        } else {
            echo "<p style='color: red;'>帳號或密碼錯誤</p>";
        }

        $stmt->close();
    }
    mysqli_close($link);
}
?>