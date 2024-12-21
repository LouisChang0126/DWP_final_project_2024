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
         <h1>When2Meet Pro</h1>
      </header>
      
      <main>
         <div class="container">
            <div class="section">
               <h2>user name:</h2><h1 class="user-name" id="loginUsername">a</h1>
               <hr class="soft" style="width:50%;">
               <button onclick="friends()">trigger</button>
            </div>
        </div>
         <div class="container">
            <div class="section">
                <div class="scroll" id="finded_friends"></div>
            </div>
         </div>
      </main>

<script>
//ajax
function sendAjaxRequest(action, para, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'home_ajax.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        callback(response.data);
                    }
                    else {
                        alert('Error: ' + response.message);
                    }
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    alert('Invalid response from server');
                }
            } else {
                alert('AJAX request failed');
            }
        }
    };
    const data = {
        action: action,
        parameter: para
    };
    xhr.send(JSON.stringify(data));
}
function friends() {
    const search = new URLSearchParams(window.location.search);
    var event_id = search.get('event_id');
    if(!event_id){
        alert("先在網址後加上'?event_id={event_id}'")
    }
    sendAjaxRequest('friends', document.getElementById("loginUsername").innerText, function(data) {
        try {
            const jsonObject = JSON.parse(data);
            finded_friends = document.getElementById("finded_friends");
            finded_friends.innerHTML = "";
            Object.entries(jsonObject).forEach(([key, value]) => {
                finded_friends.innerHTML += `
                    <hr class="divider">
                    <div class="block">
                        <h2>${key}</h2>
                        <button type="button" class="btn" onclick="invite('${key}',${event_id})">Invite</button>
                    </div>
                `
            });
        } catch (error) {
            console.error("無效的 JSON 字串:", error);
        }
    });
}
function invite(friendName, event_id) {
    alert(friendName+" "+event_id);
}
</script>
   </body>
</html>