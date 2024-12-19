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
function sendAjaxRequest(action, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'test_ajax.php', true);
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
        parameter: document.getElementById("loginUsername").innerText
    };
    xhr.send(JSON.stringify(data));
}

function friends() {
    sendAjaxRequest('friends', function(data) {
        try {
            const jsonObject = JSON.parse(data);
            friend_scroll = document.getElementById("friend-scroll");
            Object.entries(jsonObject).forEach(([key, value]) => {
                friend_scroll.innerHTML += `
                    <div class="block" style="background-color: darkcyan">
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
    sendAjaxRequest('history', function(data) {
        // document.getElementById('output').textContent = `Session Data: ${data}`;
    });
}

function about() {
    sendAjaxRequest('about', function(data) {
        // document.getElementById('output').textContent = `Session Data: ${data}`;
    });
}