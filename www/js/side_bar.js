const menuItems = document.querySelectorAll('.menu_item');

menuItems.forEach(item =>
{
    item.addEventListener('click', function (e)
    {
        e.preventDefault();
        console.log(this.id);

        document.querySelectorAll('.section').forEach(section =>
        {
            section.classList.add('hidden');
        });

        const targetId = this.id;
        const targetSection = document.getElementById(targetId);
        if (targetSection)
        {
            targetSection.classList.remove('hidden');
            if (targetId === "friend"){
                friends();
            }
            else if (targetId === "history"){
                history();
            }
            else if (targetId === "about"){
                about();
            }
        }
    });
});


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
                    } else {
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
    sendAjaxRequest('friends', document.getElementById("loginUsername").innerText, function(data) {
        try {
            const jsonObject = JSON.parse(data);
            friend_scroll = document.getElementById("friend-scroll");
            Object.entries(jsonObject).forEach(([key, value]) => {
                friend_scroll.innerHTML += `
                    <hr class="divider">
                    <div class="block">
                        <img src="./images/avatar1.png" alt="Avatar">
                        <h2>${key}</h2>
                        <button type="button" class="btn" onclick="popupSchedule(${value})">Schedule</button>
                    </div>
                `
            });
        } catch (error) {
            console.error("無效的 JSON 字串:", error);
        }
    });
}

function history() {
    sendAjaxRequest('history', document.getElementById("loginUsername").innerText, function(data) {
        try {
            const jsonObject = JSON.parse(data);
            history_scroll = document.getElementById("history-scroll");
            Object.entries(jsonObject).forEach(([key, value]) => {
                history_scroll.innerHTML += `
                    <hr class="divider">
                    <div class="block history-item">
                        <h1>${key}</h1>
                        <h3>Participants, Another one, And another one, Homeless, Me</h3>
                        <button type="button" class="btn"  onclick="location.href='event.php?${value}'">Link</button>
                    </div>
                `
            });
        } catch (error) {
            console.error("無效的 JSON 字串:", error);
        }
    });
}

function about() {
    sendAjaxRequest('about', document.getElementById("loginUsername").innerText, function(data) {
        try {
            const jsonObject = JSON.parse(data);
            // history_scroll = document.getElementById("history-scroll");
            Object.entries(jsonObject).forEach(([key, value]) => {
                // history_scroll.innerHTML = `
                //     <div class="block history-item">
                //         <h1>${key}</h1>
                //         <h3>Participants, Another one, And another one, Homeless, Me</h3>
                //         <button type="button" class="btn">Link</button>
                //     </div>
                // `
            });
        } catch (error) {
            console.error("無效的 JSON 字串:", error);
        }
    });
}