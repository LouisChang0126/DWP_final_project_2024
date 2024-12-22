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
    var username = document.getElementById("str_user_avail").innerText;
    username = username.substring(0, username.length - ("'s Availability").length);
    sendAjaxRequest('friends', username, function(data) {
        try {
            const jsonObject = JSON.parse(data);
            finded_friends = document.getElementById("finded_friends");

            var temp_html = "";
            Object.entries(jsonObject).forEach(([key, value]) => {
                temp_html += `
                        <hr class="divider">
                        <div class="block">
                            <img src="./images/avatar1.png" alt="Avatar">
                            <h2>${key}</h2>
                            <button type="button" class="btn" onclick="invite('${key}',${event_id})" style="position:static;transform: translate(0%, 0%);">Invite</button>
                        </div>
                `;
            
            finded_friends.innerHTML = `
            <div class="pop-up-window" id="invite">
                <div class="pop-up-content" style="max-height:90%">
                    <span class="close" onclick="kill_popup()">&times;</span>
                    <h1>Invite Friends</h1>
                    <hr class="soft" style="width:50%">
                    <div class="scroll">
                    ${temp_html}
                    </div>
                </div>
            </div>
            `;
            });
        } catch (error) {
            console.error("無效的 JSON 字串:", error);
        }
    });
}
function invite(friendName, event_id) {
    alert("已寄信邀請"+friendName);
}

function kill_popup(){
    document.getElementById("invite").remove();
}