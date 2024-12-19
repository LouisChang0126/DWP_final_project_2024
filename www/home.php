<!DOCTYPE html>

<html>
    <head>
        <meta charset = "utf-8">
        <title>When2Meet Pro</title>
        <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
        <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
        <link rel="icon" type="image/jpg" href="./images/sad_tako.png">
        <link rel="stylesheet" type="text/css" href = "./css/home.css">
        <script src="./js/home.js"></script>
        <script src="./js/check_login.js"></script>
    </head>

    <body>
        <header>
            <h1 id="welcomeMessage">When2Meet Pro</h1>
        </header>

        <main>
            <script>checkLoginStatus()</script>
            <div class="section hidden" id="add">
                <h2>New Event</h2>
                <hr class="soft" style="width:50%;">
                <br>
            </div>

            <div class="section hidden" id="friend">
                <h2>Friends</h2>
                <hr class="soft" style="width:50%;">
                <br>
                <div class="scroll">
                    <div class="block">
                        <img src="./images/avatar1.png" alt="Avatar">
                        <h2>Sytwu</h2>
                        <button type="button" class="btn">Schedule</button>
                        
                    </div>
                    <hr class="divider">
                    <div class="block">
                        <img src="./images/avatar1.png" alt="Avatar">
                        <h2>Louis</h2>
                        <button type="button" class="btn">Schedule</button>
                    </div>
                    <hr class="divider">
                    <div class="block">
                        <img src="./images/avatar1.png" alt="Avatar">
                        <h2>Darren</h2>
                        <button type="button" class="btn">Schedule</button>
                    </div>
                </div>
            </div>

            <div class="section hidden" id="history">
                <h2>History</h2>
                <hr class="soft" style="width:50%;">
                <br>
                <div class="scroll">
                    <div class="block history-item">
                        <h1>Event1</h1>
                        <h3>Participants, Another one, And another one, Homeless, Me</h3>
                        <button type="button" class="btn">Link</button>
                    </div>
                    <hr class="divider">
                    <div class="block history-item">
                        <h1>Event2</h1>
                        <h3>Participants</h3>
                        <button type="button" class="btn">Link</button>
                    </div>
                    <hr class="divider">
                    <div class="block history-item">
                        <h1>Event3</h1>
                        <h3>Participants</h3>
                        <button type="button" class="btn">Link</button>
                    </div>
                </div>
            </div>

            <div class="section hidden" id="logout">
                <h2>Logout</h2>
                <hr class="soft" style="width:50%;">
                <br>
                <button onclick=btnLogout()>Logout</button>
                <br>
            </div>

            <div class="section" id="about">
                <h2>About</h2>
                <hr class="soft" style="width:50%;">
                <div class="user-info-container">
                    <div class="user-left">
                        <img src="./images/avatar1.png" alt="User Avatar" class="user-avatar" style="width:70%; height:auto">
                        <h1 class="user-name" id="loginUsername">User Name</h1>
                        <p class="user-email" style="font-size:16px" id="loginEmail">example@example.com</p>
                        <p class="user-description" style="font-size:20px">This is a brief description about the yourself.</p>
                    </div>
                    <div class="user-right">
                    <div class="table_container">
                            <table class="availability-table">
                                <thead>
                                    <tr>
                                        <th class="first"></th>
                                        <th>Sun</th>
                                        <th>Mon</th>
                                        <th>Tue</th>
                                        <th>Wed</th>
                                        <th>Thu</th>
                                        <th>Fri</th>
                                        <th>Sat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>9:00 AM</td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td>10:00 AM</td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td>11:00 AM</td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button type="button" class="edit-button">Edit</button>
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

            <div class="pop-up-windows">
                <div class="pop-up-window" id="Sytwu">
                    <div class="pop-up-content" style="overflow-y:auto; max-height:65%">
                        <span class="close">&times;</span>
                        <h1>Sytwu's Schedule</h1>
                        <hr class="soft" style="width:80%;">
                        
                        <div class="table_container">
                            <table class="availability-table">
                                <thead>
                                    <tr>
                                        <th class="first"></th>
                                        <th>Sun</th>
                                        <th>Mon</th>
                                        <th>Tue</th>
                                        <th>Wed</th>
                                        <th>Thu</th>
                                        <th>Fri</th>
                                        <th>Sat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>9:00 AM</td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td>10:00 AM</td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td>11:00 AM</td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <div class="pop-up-window" id="Louis">
                    <div class="pop-up-content" style="overflow-y:auto; max-height:65%">
                        <span class="close">&times;</span>
                        <h1>Louis's Schedule</h1>
                        <hr class="soft" style="width:80%;">
                        
                        <div class="table_container">
                            <table class="availability-table">
                                <thead>
                                    <tr>
                                        <th class="first"></th>
                                        <th>Sun</th>
                                        <th>Mon</th>
                                        <th>Tue</th>
                                        <th>Wed</th>
                                        <th>Thu</th>
                                        <th>Fri</th>
                                        <th>Sat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>9:00 AM</td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="unavailable"></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td>10:00 AM</td>
                                        <td class="unavailable"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="unavailable"></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td>11:00 AM</td>
                                        <td class="unavailable"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="available"></td>
                                        <td class="unavailable"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <div class="pop-up-window" id="Darren">
                    <div class="pop-up-content" style="overflow-y:auto; max-height:65%">
                        <span class="close">&times;</span>
                        <h1>Darren's Schedule</h1>
                        <hr class="soft" style="width:80%;">
                        
                        <div class="table_container">
                            <table class="availability-table">
                                <thead>
                                    <tr>
                                        <th class="first"></th>
                                        <th>Sun</th>
                                        <th>Mon</th>
                                        <th>Tue</th>
                                        <th>Wed</th>
                                        <th>Thu</th>
                                        <th>Fri</th>
                                        <th>Sat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>9:00 AM</td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td>10:00 AM</td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td>11:00 AM</td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                        <td class="unavailable"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <footer>
            <p>Copyright © 2024 張家睿、司徒立中、蔡欣龍 All Rights Reserved</p>
        </footer>
        <script src="./js/tab_ctrl.js"></script>
        <script src="./js/side_bar.js"></script>
        <script src="./js/popup.js"></script>
    </body>
</html>