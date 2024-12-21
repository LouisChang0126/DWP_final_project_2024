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
function search(){
    inputFriendsEmail = document.getElementById("inputFriendsEmail").value;

    if(inputFriendsEmail === ""){
        alert("沒有填寫搜尋欄!");
    }
    else{ // finish check
        sendAjaxRequest('search_friends', inputFriendsEmail, function(data) {
            if(data){
                const parts = data.split("###");
                add_friend(parts[0], parts[1]);
                // document.getElementById("search_result").textContent = data;
            }
            else{
                document.getElementById("search_result").textContent = "沒找到朋友";
            }
        });
    }
}
function add_friend(fname, fid){
    username = document.getElementById("loginUsername").innerText;
    if(search_result != "" && search_result != "沒找到"){
        sendAjaxRequest('add_friends', fname+'###'+fid+'###'+username, function(data) {
            if(Number(data) != -1){
                document.getElementById("search_result").textContent = "已新增好友: "+fname;
                // alert('success');
            }
            else{
                document.getElementById("search_result").textContent = "沒找到朋友";
            }
        });
    }
    else{
        document.getElementById("search_result").textContent = "沒找到朋友";
    }
}