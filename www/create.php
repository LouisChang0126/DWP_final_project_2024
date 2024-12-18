<!DOCTYPE html>

<html>
   <head>
      <meta charset = "utf-8">
      <title>When2Meet Pro</title>
      <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
      <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
      <link rel="icon" type="image/jpg" href="./images/sad_tako.png">
      <link rel="stylesheet" type="text/css" href = "./css/create.css">
   </head>

   <body>
      <header>
         <h1>When2Meet Pro</h1>
      </header>
      <button onclick="preFlyCheck()">Next >></button>
      <main>
         <div class="container">
            <div class="section">
               <div class="sapce" style="height:10%"></div>
               <img src="images/event1.png" alt="event">
               <h2>Event Name</h2>
               <hr class="soft" style="width:50%;">
               <input id="inputEventName" type="text" name="EventName" placeholder="Event Name" required>
            </div>
            <div class="line"></div>
            <div class="section">
               <div class="sapce" style="height:10%"></div>
               <img src="images/date1.png" alt="date">
               <h2>Choose Dates</h2>
               <hr class="soft" style="width:50%;">
               <div class="table_container">
                  <p>
                     Errors occurred in create.js <br>
                     Please check the function named create_table <br>
                     Remember to appendChild(table) <br>
                  </p>
               </div>
            </div>
            <div class="line"></div>
            <div class="section">
               <div class="sapce" style="height:10%"></div>
               <img src="images/time1.png" alt="time">
               <h2>Choose Time</h2>
               <hr class="soft" style="width:50%;">
               <div class="row_container">
                  <p>No earlier than</p>
                  <select name="NoEarlierThan" style="margin:10px">
                     <option value="0">12:00 AM</option>
                     <option value="1">1:00 AM</option>
                     <option value="2">2:00 AM</option>
                     <option value="3">3:00 AM</option>
                     <option value="4">4:00 AM</option>
                     <option value="5">5:00 AM</option>
                     <option value="6">6:00 AM</option>
                     <option value="7">7:00 AM</option>
                     <option value="8">8:00 AM</option>
                     <option selected value="9">9:00 AM</option>
                     <option value="10">10:00 AM</option>
                     <option value="11">11:00 AM</option>
                     <option value="12">12:00 PM</option>
                     <option value="13">1:00 PM</option>
                     <option value="14">2:00 PM</option>
                     <option value="15">3:00 PM</option>
                     <option value="16">4:00 PM</option>
                     <option value="17">5:00 PM</option>
                     <option value="18">6:00 PM</option>
                     <option value="19">7:00 PM</option>
                     <option value="20">8:00 PM</option>
                     <option value="21">9:00 PM</option>
                     <option value="22">10:00 PM</option>
                     <option value="23">11:00 PM</option>
                  </select>
               </div>
               <div class="row_container">
                  <p style="margin:10px">No later than</p>
                  <select name="NoLaterThan" style="margin:10px">
                     <option value="0">12:00 AM</option>
                     <option value="1">1:00 AM</option>
                     <option value="2">2:00 AM</option>
                     <option value="3">3:00 AM</option>
                     <option value="4">4:00 AM</option>
                     <option value="5">5:00 AM</option>
                     <option value="6">6:00 AM</option>
                     <option value="7">7:00 AM</option>
                     <option value="8">8:00 AM</option>
                     <option value="9">9:00 AM</option>
                     <option value="10">10:00 AM</option>
                     <option value="11">11:00 AM</option>
                     <option value="12">12:00 PM</option>
                     <option value="13">1:00 PM</option>
                     <option value="14">2:00 PM</option>
                     <option value="15">3:00 PM</option>
                     <option value="16">4:00 PM</option>
                     <option selected value="17">5:00 PM</option>
                     <option value="18">6:00 PM</option>
                     <option value="19">7:00 PM</option>
                     <option value="20">8:00 PM</option>
                     <option value="21">9:00 PM</option>
                     <option value="22">10:00 PM</option>
                     <option value="23">11:00 PM</option>
                  </select>
               </div>
            </div>
         </div>
      </main>
      <footer>
         <p>Copyright © 2024 張家睿、司徒立中、蔡欣龍 All Rights Reserved</p>
      </footer>
      <script src="./js/create.js"></script>
   </body>
</html>