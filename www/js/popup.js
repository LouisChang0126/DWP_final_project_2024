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
function popupSchedule(uid){
    const mainElement = document.querySelector("main");
    // var popup = document.getElementById("pop-up-window");
    // popup.style.display = "flex";
    mainElement.innerHTML+=`
    <div class="pop-up-window" id="ScheduleTable">
        <div class="pop-up-content" style="overflow-y:auto; max-height:65%">
            <span class="close" onclick="kill_popupSchedule()">&times;</span>
            <h1>Sytwu's Schedule</h1>
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
                    <tbody>
                        <tr>
                            <td>9:00 AM</td>
                            <td class="unavailable"></td>
                            <td class="unavailable"></td>
                            <td class="unavailable"></td>
                            <td class="unavailable"></td>
                            <td class="unavailable"></td>
                            <td class="unavailable"></td>
                            <td class="unavailable"></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>10:00 AM</td>
                            <td class="available"></td>
                            <td class="available"></td>
                            <td class="available"></td>
                            <td class="available"></td>
                            <td class="available"></td>
                            <td class="available"></td>
                            <td class="available"></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>11:00 AM</td>
                            <td class="available"></td>
                            <td class="available"></td>
                            <td class="available"></td>
                            <td class="available"></td>
                            <td class="available"></td>
                            <td class="available"></td>
                            <td class="available"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `
};
function kill_popupSchedule(){
    document.getElementById("ScheduleTable").remove(); 
}