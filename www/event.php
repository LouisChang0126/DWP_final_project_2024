<!DOCTYPE html>

<html>
   <head>
      <meta charset = "utf-8">
      <title>When2Meet Pro</title>
      <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
      <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
      <link rel="icon" type="image/jpg" href="./images/sad_tako.png">
      <link rel="stylesheet" type="text/css" href = "./css/event.css">
   </head>

   <body>
      <header>
         <h1>When2Meet Pro</h1>
      </header>

      <main>
         <div class="container">
            <button id="confirm">
               Confirm
            </button>
            <div class="section" id="signin">
               <h2>Sign In</h2>
               <hr class="soft" style="width:50%;">
               <div class="row_container">
                  <p>Your Name</p>
                  <input type="text" name="Name" placeholder="Name" required  style="margin:10px">
               </div>
               <div class="row_container">
                  <p style="margin:8px">Password</p>
                  <input type="text" name="Password" placeholder="(optional)" required  style="margin:10px">
               </div>
            </div>
            <div class="section hidden">
               <h2 id="str_user_avail">User's Availability</h2>
               <div class="row_container">
                  <p style="margin:10px">Unavailable</p>
                  <table width="30" height="10" border="0" cellspacing="0" cellpadding="0">
                     <tr>
                        <td width="30" height="10" bgcolor="#f8d7da"></td>
                     </tr>
                  </table>
                  <p style="margin:10px">Available</p>
                  <table width="30" height="10" border="0" cellspacing="0" cellpadding="0">
                     <tr>
                        <td width="30" height="10" bgcolor="#28a745"></td>
                     </tr>
                  </table>
               </div>
               <hr class="soft" style="width:50%;">
               <div class="table_container" id="user_table_container">
                  <p>
                     Errors occurred in event.js with user <br>
                     Please check the function named create_table <br>
                     Remember to appendChild(table) <br>
                  </p>
               </div>
            </div>
            <div class="line"></div>
            <div class="section">
               <h2>Group's Availability</h2>
               <div class="row_container" id="display_ratio">
                  <p>
                     Errors occurred in event.js <br>
                     Please check the function named update_table <br>
                  </p>
               </div>
               <hr class="soft" style="width:50%;">
               <div class="table_container" id="group_table_container">
                  <p>
                     Errors occurred in event.js with group <br>
                     Please check the function named create_table <br>
                     Remember to appendChild(table) <br>
                  </p>
               </div>
            </div>
         </div>
      </main>

      <footer>
         <p>Copyright © 2024 張家睿、司徒立中、蔡欣龍 All Rights Reserved</p>
      </footer>
      <script src="./js/event.js"></script>
   </body>
</html>