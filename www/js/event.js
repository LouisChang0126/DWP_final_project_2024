var btn = document.getElementById('confirm');

btn.addEventListener('click', function()
{
    var sections = document.querySelectorAll('.section');
    sections.forEach(section =>
    {
        section.classList.remove('hidden');
        if (section.id === 'signin')
        {
            section.classList.add('hidden');
        }
    });
    btn.classList.add('hidden');
});


/*
    U = User
    G = Group
    T = Table
    C = Container
    I = Information
*/

let days = ['20241212', '20241213', '20241214', '20241215', '20241216', '20241217', '20241218'];
let times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
// let days = [];
// let times = [];

var UT = create_table(days, times, 'user');
var GT = create_table(days, times, 'group');
var UTC = document.getElementById('user_table_container');
var GTC = document.getElementById('group_table_container');
var UTI = Array.from({ length: times.length }, () => Array.from({ length: days.length }, () => 0));
var GTI = Array.from({ length: times.length }, () => Array.from({ length: days.length }, () => 0));
var event_id = new URLSearchParams(window.location.search).get('event_id');


UTC.innerHTML = '';
GTC.innerHTML = '';
UTC.appendChild(UT);
GTC.appendChild(GT);


/* load event data */
for (var i = 0; i < times.length; i++)
{
    for (var j = 0; j < days.length; j++)
    {
        GTI[i][j] = Math.floor(Math.random() * 5);
    }
}
update_table(GT, GTI);

document.addEventListener('click', function(object)
{
    classes = object.target.classList;
    if (classes.contains('available'))
    {
        classes.remove('available');
        classes.add('unavailable');
    }
    else if (classes.contains('unavailable'))
    {
        classes.remove('unavailable');
        classes.add('available');
    }

    UTI = get_table_info(UT);
    update_table(GT, add_array(UTI, GTI));
});

// Date display formatter
function formatDateForDisplay(yyyymmdd) {
    const year = yyyymmdd.substring(0, 4);
    const month = yyyymmdd.substring(4, 6);
    const day = yyyymmdd.substring(6, 8);
    const dateObj = new Date(year, month - 1, day);
    return dateObj.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
    });
}

function create_table(days, times, role='user')
{
    cell_class = {'user':'unavailable', 'group':'result'}[role];

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
        th.textContent = formatDateForDisplay(day);
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);


    const tbody = document.createElement('tbody');

    times.forEach(time =>
    {
        const row = document.createElement('tr');
        const timeCell = document.createElement('td');
        timeCell.textContent = time;
        row.appendChild(timeCell);

        days.forEach(() => 
        {
            const cell = document.createElement('td');
            cell.classList.add(cell_class);
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    return table;
}

// only for user table
function get_table_info(table)
{
    var info = [];
    for (var i = 1; i < table.rows.length; i++)
    {
        var row = [];
        for (var j = 1; j < table.rows[i].cells.length; j++)
        {
            row.push(table.rows[i].cells[j].classList.contains('available') ? 1 : 0);
        }
        info.push(row);
    }
    return info;
}

function update_table(table, info)
{
    var max_value = Math.max(...info.flat());
    var start_color = '#111';
    var end_color = '#28a745';
    info.forEach((row, i) =>
    {
        row.forEach((value, j) =>
        {
            var color = interpolateColor(start_color, end_color, value / max_value);
            table.rows[i+1].cells[j+1].style = "background-color:" + color;
        });
    });

    var display = document.getElementById('display_ratio')
    display.innerHTML = '';
    display.innerHTML += `<p style="margin:10px">0/${max_value}</p>`;
    for (var i = 0; i <= max_value; i++)
    {
        var color = interpolateColor(start_color, end_color, i / max_value);
        display.innerHTML += `
        <table width="30" height="10" border="0" cellspacing="0" cellpadding="0">
           <tr>
                <td width="30" height="10" bgcolor="${color}"></td>
           </tr>
        </table>`;
    }
    display.innerHTML += `<p style="margin:10px">${max_value}/${max_value}</p>`;
}

function add_array(arr1, arr2)
{
    return arr1.map((row, i) => row.map((value, j) => value + arr2[i][j]));
}



function hexToRgb(hex)
{
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function rgbToHex(r, g, b)
{
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function interpolateColor(startHex, endHex, factor)
{
    const t = Math.min(1, Math.max(0, factor));

    const startRgb = hexToRgb(startHex);
    const endRgb = hexToRgb(endHex);

    const interpolatedRgb = startRgb.map((start, i) =>
        Math.round(start + t * (endRgb[i] - start))
    );

    return rgbToHex(...interpolatedRgb);
}

function updateGroupTimetable(event_id) {
    // extract unique dates and times from user table data
    // then determine the Group Timetable size
    // then fetch userdata and color the Group Timetable
    // using function loadUserData(userTable)
    fetch(`get_event_data.php?event_id=${event_id}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const userTable = data.data;
                
                // Get the first user's data (structure will be same for all users)
                const firstUser = userTable[Object.keys(userTable)[0]];
                
                // Extract all times
                times = Object.keys(firstUser);
                
                // Extract all dates from the first time slot
                const firstTimeSlot = firstUser[times[0]];
                days = Object.keys(firstTimeSlot);

                // Create tables
                UT = create_table(days, times, 'user');
                GT = create_table(days, times, 'group');

                // Initialize arrays with correct size
                UTI = Array.from({ length: times.length }, () => Array.from({ length: days.length }, () => 0));
                GTI = Array.from({ length: times.length }, () => Array.from({ length: days.length }, () => 0));

                // Update the DOM
                UTC.innerHTML = '';
                GTC.innerHTML = '';
                UTC.appendChild(UT);
                GTC.appendChild(GT);
                // Update tables with initial data
                update_table(UT, UTI);
                update_table(GT, GTI);

                // Load user data
                loadUserData(userTable);
            }
        })
        .catch(error => console.error('Error:', error));
}

function loadUserData(userTable) {
    console.log('Initial userTable:', userTable);
    
    GTI = Array.from({ length: times.length }, () => 
        Array.from({ length: days.length }, () => 0)
    );
    
    Object.keys(userTable).forEach(userId => {
        const userData = userTable[userId];
        times.forEach((time, timeIndex) => {
            days.forEach((day, dayIndex) => {
                if (userData[time]?.[day]) {
                    GTI[timeIndex][dayIndex] += 1;
                }
            });
        });
    });
    
    console.log('Final GTI:', GTI);
    update_table(GT, GTI);
}

// Call the initialization function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const event_id = new URLSearchParams(window.location.search).get('event_id');
    if (event_id) {
        updateGroupTimetable(event_id);
    }
});