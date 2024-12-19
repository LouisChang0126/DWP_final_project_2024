<!DOCTYPE html>

<html>
    <head>
        <meta charset = "utf-8">
        <title>When2Meet Pro</title>
        <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
        <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
        <link rel="icon" type="image/jpg" href="./images/sad_tako.png">
        <link rel="stylesheet" type="text/css" href = "./css/home.css">
    </head>

    <body>
        <header>
            <h1 id="welcomeMessage">When2Meet Pro</h1>
        </header>

        <main>
            <div class="section hidden" id="add">
                <h2>New Event</h2>
                <hr class="soft" style="width:50%;">
                <br>
                <button onclick="window.location.href = 'create.php';">Create</button>
                <br>
            </div>

            <div class="section hidden" id="friend">
                <h2>Friends</h2>
                <hr class="soft" style="width:50%;">
                <br>
                <div class="scroll" id="friend-scroll">
                </div>
            </div>

            <div class="section hidden" id="history">
                <h2>History</h2>
                <hr class="soft" style="width:50%;">
                <br>
                <div class="scroll" id="history-scroll">
                </div>
            </div>

            <div class="section hidden" id="logout">
                <h2>Logout</h2>
                <hr class="soft" style="width:50%;">
                <br>
                <button onclick="window.location.href = 'logout.php';">Logout</button>
                <br>
            </div>

            <div class="section" id="about">
                <div class="user-info-container">
                    <div class="user-left">
                        <img src="./images/avatar1.png" alt="User Avatar" class="user-avatar" style="width:70%; height:auto">
                        <h1 class="user-name" id="loginUsername">User Name</h1>
                        <p class="user-email" style="font-size:16px" id="loginEmail">example@example.com</p>
                        <button type="button" class="edit-button" onclick="edit_quick_table()">Edit</button>
                    </div>
                    <div class="user-right">
                        <div class="table_container" id="user_schedule">
                        </div>
                    </div>
                </div>
            </div>

            <input type="checkbox" id="check1">
            <label for="check1">
               <i class="fas fa-bars" id="btn_left"></i>
               <i class="fas fa-times" id="cancel_left"></i>
            </label>
            <div class="sidebar_left">
               <header>Menu</header>
               <header>Menu</header>
               <a href="#" class="menu_item" id="add"    ><i class="fa fa-plus-square"     id="add"    ></i><span id="add"    >New Event</span></a>
               <a href="#" class="menu_item" id="friend" ><i class="fa fa-users"           id="friend" ></i><span id="friend" >Friends</span></a>
               <a href="#" class="menu_item" id="history"><i class="fa fa-history"         id="history"></i><span id="history">History</span></a>
               <a href="#" class="menu_item" id="logout" ><i class="fa fa-sign-out-alt"    id="logout" ></i><span id="logout" >Logout</span></a>
               <a href="#" class="menu_item" id="about"  ><i class="fa fa-question-circle" id="about"  ></i><span id="about"  >About</span></a>
            </div>
        </main>

        <footer>
            <p>Copyright © 2024 張家睿、司徒立中、蔡欣龍 All Rights Reserved</p>
        </footer>
        <script src="./js/tab_ctrl.js"></script>
        <script src="./js/side_bar.js"></script>
        <script src="./js/popup.js"></script>
        <script src="./js/edit_table.js"></script>
        <script src="./js/check_login.js"></script>
    </body>
</html>