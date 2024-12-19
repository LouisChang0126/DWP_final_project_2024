// document.addEventListener("click", function(e)
// {
//     if (e.target.tagName === "BUTTON" && e.target.textContent === "Schedule")
//     {
//         var username = e.target.parentNode.querySelector("h2").textContent;
//         var popups = document.getElementsByClassName("pop-up-windows")[0];
//         var popup = popups.querySelector(`#${username}`);
//         popup.style.display = "flex";
//     }
//     if (e.target.classList.contains("close"))
//     {
//         var popup = e.target.closest(".pop-up-window");
//         popup.style.display = "none";
//     }
// });

function get_others_quicktable(uid) {
    return new Promise((resolve, reject) => {
        sendAjaxRequest('others_quicktable', uid, function(data) {
            try {
                const table = JSON.parse(data);
                resolve(table); // 成功時解析 Promise
            } catch (error) {
                console.error("無效的 JSON 字串:", error);
                reject(error); // 發生錯誤時拒絕 Promise
            }
        });
    });
}
async function popupSchedule(username, uid) {
    // 抓取資料庫
    try {
        const tb = await get_others_quicktable(uid);

        // 檢查是否已經存在舊的彈窗，若有則刪除
        const existingTable = document.getElementById("ScheduleTable");
        if (existingTable) {
            existingTable.remove();
        }

        // 建立新的彈窗
        const mainElement = document.querySelector("main");
        const childElement = document.createElement("div");
        childElement.className = "pop-up-window";
        childElement.id = "ScheduleTable";

        // 彈窗內容的標題部分
        childElement.innerHTML = `
            <div class="pop-up-content" style="overflow-y:auto; max-height:65%">
                <span class="close" onclick="kill_popupSchedule()">&times;</span>
                <h1>${username}'s Schedule</h1>
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
                        <tbody id="schedule-body"></tbody>
                    </table>
                </div>
            </div>
        `;

        // 插入到 main 中
        mainElement.appendChild(childElement);

        // 插入時間表的資料行
        const scheduleBody = document.getElementById("schedule-body");
        Object.entries(tb).forEach(([key, value]) => {
            const row = document.createElement("tr");
            const timeCell = document.createElement("td");
            timeCell.textContent = key;
            row.appendChild(timeCell);

            value.forEach((v) => {
                const cell = document.createElement("td");
                cell.className = v ? "available" : "unavailable";
                row.appendChild(cell);
            });

            scheduleBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching table:', error);
        alert('Failed to fetch the schedule. Please try again later.');
    }
}

function kill_popupSchedule(){
    document.getElementById("ScheduleTable").remove();
}