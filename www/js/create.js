var calender = [];
var chooseDay = [];

document.addEventListener("DOMContentLoaded", function()
{
    const container = document.querySelector('.table_container');
    container.innerHTML = '';
    const table = create_table();
    container.appendChild(table);
});

document.addEventListener("click", function(event)
{
    const target = event.target;
    if (target.tagName === 'TD')
    {
        target.classList.toggle('unavailable');
        target.classList.toggle('available');
        chooseDay = get_table_info();
    }
});

function create_table(){
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - today.getDay());

    const table = document.createElement('table');
    table.classList.add('availability-table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const emptyTh = document.createElement('th');
    headerRow.appendChild(emptyTh);
    daysOfWeek.forEach(day =>
    {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    tbody.id = 'availability-tbody';
    for (let week = 0; week < 4; week++){
        var calender_week = [];
        const row = document.createElement('tr');

        const monthCell = document.createElement('td');
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + week * 7);
        monthCell.textContent = currentDate.toLocaleString('en-US', { month: 'short' });
        row.appendChild(monthCell);

        for (let day = 0; day < 7; day++)
        {
            const cell = document.createElement('td');
            cell.classList.add('unavailable');
            const date = new Date(startDate);
            date.setDate(date.getDate() + week * 7 + day);
            cell.textContent = date.getDate();
            row.appendChild(cell);
            calender_week.push(date.getFullYear()+String(date.getMonth() + 1).padStart(2, '0')+String(date.getDate()).padStart(2, '0'));
        }

        tbody.appendChild(row);
        calender.push(calender_week);
    }
    table.appendChild(tbody);

    return table;
}

function get_table_info(){
    var table = document.getElementById("availability-tbody");
    var info = [];
    for (var i = 0; i < table.rows.length; i++)    {
        var row = [];
        for (var j = 1; j < table.rows[i].cells.length; j++){
            if(table.rows[i].cells[j].classList.contains('available')){
                info.push(calender[i][j-1]);
            }
        }
    }
    // console.log(info);
    return info;
}

//ajax
function sendAjaxRequest(action, para, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'create_ajax.php', true);
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

function preFlyCheck(){
    inputEventName = document.getElementById("inputEventName").value;
    const earlier = Number(document.querySelector('select[name="NoEarlierThan"]').value);
    const later = Number(document.querySelector('select[name="NoLaterThan"]').value);
    // console.log(earlier, later);
    if(inputEventName === ""){
        alert("沒有填寫活動名稱!");
    }
    else if(chooseDay.length === 0){
        alert("沒有選要哪天!");
    }
    else if(earlier >= later){
        alert("最晚時間比最早時間早!");
    }
    else{ // finish check
        const timeline = Array.from({ length: later - earlier + 1 }, (_, i) => `${i + earlier}:00`);
        // console.log(timeline);
        var send_json = {
            "metadata": {
              "times": timeline,
              "dates": chooseDay
            }
        }
        // console.log(JSON.stringify(send_json)+'###'+inputEventName);
        sendAjaxRequest('create', JSON.stringify(send_json)+'###'+inputEventName, function(data) {
            if(Number(data) != -1){
                // alert("good");
                window.location.href = 'event.php?event_id=' + data;
            }
            else{
                alert("error");
            }
        });
    }
}