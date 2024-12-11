<!DOCTYPE html>

<html>
   <head>
      <meta charset = "utf-8">
      <title>When2Meet Pro</title>
      <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
      <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
      <link rel="icon" type="image/jpg" href="/images/sad_tako.png">
      <link rel="stylesheet" type="text/css" href = "./css/access.css">
   </head>

   <body>
		<?php
			session_start();
			if (!isset($_SESSION['register_show'])){
				$_SESSION['register_show'] = "active";
				$_SESSION['login_show'] = "";
            $_SESSION['show_p'] = "";
			}
		?>
      <header>
         <h1>When2Meet Pro</h1>
      </header>

      <main style="overflow:hidden">
        <img src="/images/NYCU.jpg" alt="NYCU Background" class="full">
        <section class="tab-container">
            <div class="buttons-container">
                <button class="tab_button first <?php echo $_SESSION['register_show']; ?>" id="0">Register</button>
                <button class="tab_button last <?php echo $_SESSION['login_show']; ?>" id="1">Login</button>
            </div>
            <div class="contents-container">
                <div class="tab_content <?php echo $_SESSION['register_show']; ?>" id="0">
                    <form method="post" action="">
                        Username: <input type="text" name="username"><br>
                        Password: <input type="password" name="password"><br>
                        Email: <input type="email" name="email"><br>
                        <input type="submit" name="action" value="register">
                        <?php echo $_SESSION['show_p']; ?>
                    </form>
                </div>
                <div class="tab_content <?php echo $_SESSION['login_show']; ?>" id="1">
                    <form method="post" action="">
                        Username: <input type="text" name="username"><br>
                        Password: <input type="password" name="password"><br>
                        <input type="submit" name="action" value="login">
                        <?php echo $_SESSION['show_p']; ?>
                    </form>
                </div>
            </div>
        </section>
      </main>

      <footer>
         <p>Copyright © 2024 張家睿、司徒立中、蔡欣龍 All Rights Reserved</p>
      </footer>

      <script src="/js/tab_ctrl.js"></script>
   </body>
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   $action = $_POST['action'] ?? '';

   if($action == "login"){
      login();
   }
   elseif($action == "register"){
      register();
   }

   header("Location: " . $_SERVER['PHP_SELF']);
   exit();
}

function register(){
   $link = mysqli_connect("localhost", "root", "", "dwp_final");
   if (!$link) {
      die("Database connection failed: " . mysqli_connect_error());
   }
   $link->set_charset("UTF8");

   $username = trim($_POST['username']);
   $password = trim($_POST['password']);
   $email = trim($_POST['email']);

   $_SESSION['register_show'] = "active";
   $_SESSION['login_show'] = "";
   $_SESSION['show_p'] = "";

   if (empty($username) || empty($password) || empty($email)) {
      $_SESSION['show_p'] = "<p style='color: red;'>帳密不得為空</p>";
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
         $_SESSION['show_p'] = "<p style='color: red;'>帳號名已註冊</p>";
      } 
      elseif (strlen($username) > 15 || strlen($password) > 15 || strlen($email) > 35) {
         $_SESSION['show_p'] = "<p style='color: red;'>帳號與密碼長度不可超過15個字元，信箱不能超過35個字元</p>";
      }
      else {
         // 加入新帳號
         $empty = '{}';
         $stmt = $link->prepare("INSERT INTO user (username, password, email, quick_table, friends, history) VALUES (?, ?, ?, ?, ?, ?)");
         $stmt->bind_param("ssssss", $username, $password, $email, $empty, $empty, $empty);
         if ($stmt->execute()) {
               $_SESSION['username'] = $username;
               $_SESSION['passwd'] = $password;
               $_SESSION['show_p'] = "<p style='color: green;'>註冊成功!</p>";
         }
         else {
               $_SESSION['show_p'] = "<p style='color: red;'>Error: " . $stmt->error . "</p>";
         }
         $stmt->close();
      }
   }
   mysqli_close($link);
}
function login(){
   $link = mysqli_connect("db", "root", "", "dwp_final");
   if (!$link) {
      die("Database connection failed: " . mysqli_connect_error());
   }
   $link->set_charset("UTF8");

   $username = trim($_POST['username']);
   $password = trim($_POST['password']);

   $_SESSION['register_show'] = "";
   $_SESSION['login_show'] = "active";

   if (empty($username) || empty($password)) {
      $_SESSION['show_p'] = "<p style='color: red;'>帳密不得為空</p>";
   }
   else {
      $stmt = $link->prepare("SELECT password FROM user WHERE username = ?");
      $stmt->bind_param("s", $username);
      $stmt->execute();
      $stmt->store_result();

      if ($stmt->num_rows > 0) {
         $stmt->bind_result($stored_password);
         $stmt->fetch();
         if ($password === $stored_password) {
               $_SESSION['show_p'] = "<p style='color: green;'>登入成功!將跳轉到遊戲~</p>";

               $_SESSION['username'] = $username;
               $_SESSION['loggedin'] = true;
               
               echo "<script>
                     setTimeout(function() {
                           window.location.href = 'home.php';
                     }, 1000);
                  </script>";
               exit();
         } else {
               $_SESSION['show_p'] = "<p style='color: red;'>帳號或密碼錯誤</p>";
         }
      } else {
         $_SESSION['show_p'] = "<p style='color: red;'>帳號或密碼錯誤</p>";
      }

      $stmt->close();
   }
   mysqli_close($link);
}
?>
</html>