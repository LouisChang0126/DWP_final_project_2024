var table = document.getElementById('user_schedule');

var isEditing = false;

function edit_quick_table(){
    const allTdElements = document.querySelectorAll("table.availability-table td");
    var btn = document.getElementsByClassName('edit-button')[0];
    if (!isEditing){
        allTdElements.forEach(td => {
            td.classList.add("clickable");
        });
        btn.style.backgroundColor = "#28a745";
        btn.innerHTML = 'Save';
        isEditing = true;
    }
    else{
        allTdElements.forEach(td => {
            td.classList.remove("clickable");
        });
        btn.style.backgroundColor = "steelblue";
        btn.innerHTML = 'Edit';
        isEditing = false;
        update_db_quick_table()
    }
}

document.addEventListener("click", function(event)
{
    const target = event.target;
    if (target.tagName === 'TD' && target.classList.contains('clickable'))
    {
        target.classList.toggle('unavailable');
        target.classList.toggle('available');
    }
});

function create_table(quick_table){
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const table = document.createElement('table');
    table.classList.add('availability-table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const emptyTh = document.createElement('th');
    emptyTh.classList.add('first');
    headerRow.appendChild(emptyTh);

    days.forEach(day =>
    {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);


    const tbody = document.createElement('tbody');
    
    // 插入時間表的資料行
    Object.entries(JSON.parse(quick_table)).forEach(([key, value]) => {
        const row = document.createElement("tr");
        const timeCell = document.createElement("td");
        timeCell.textContent = key;
        row.appendChild(timeCell);

        value.forEach((v) => {
            const cell = document.createElement("td");
            cell.className = v ? "available" : "unavailable";
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    return table;
}

function update_db_quick_table(){
    var username = document.getElementById("loginUsername").innerText;
    var json_str = JSON.stringify(quick_table_json());
    sendAjaxRequest('edit_quicktable', json_str+'###'+username, function(data) {
        console.log(data);
    });
}

function quick_table_json() { 
    const allTrElements = document.querySelectorAll("table.availability-table tr");

    // 初始化 JSON 結構
    const tableJson = {};

    // 獲取表頭中的星期名稱
    const days = Array.from(allTrElements[0].querySelectorAll("th"))
        .slice(1) // 排除第一個空白列標題
        .map(th => th.textContent.trim()); // 提取文字並去掉空格

    // 遍歷每一行，從第二行開始處理時間及可用性
    allTrElements.forEach((tr, index) => {
        if (index === 0) return; // 跳過表頭行

        // 獲取時間（第一列）
        const time = tr.querySelector("td").textContent.trim();

        // 獲取此行的所有可用性數據
        const availability = Array.from(tr.querySelectorAll("td"))
            .slice(1) // 排除第一列時間
            .map(td => (td.classList.contains("available") ? 1 : 0)); // 判斷可用性

        // 將時間和可用性數據添加到 JSON
        tableJson[time] = availability;
    });

    return tableJson;
}
