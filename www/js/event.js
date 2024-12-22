var btn = document.getElementById('confirm');

btn.addEventListener('click', function()
{
    const name = document.querySelector('input[name="Name"]').value;
    const password = document.querySelector('input[name="Password"]').value;
    
    if (!name) {
        alert('Please enter your name');
        return;
    }
    
    validateSignIn(event_id, name, password);
});


/*
    U = User
    G = Group
    T = Table
    C = Container
    I = Information
*/

// let days = [];
// let times = [];
let days = ['20241212', '20241213', '20241214', '20241215', '20241216', '20241217', '20241218'];
let times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

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


// Add event listener to each cell
document.addEventListener('click', function(object)
{
    const cell = object.target;
    if (cell.classList.contains('available') || cell.classList.contains('unavailable')) {
        // Toggle cell state
        cell.classList.toggle('available');
        cell.classList.toggle('unavailable');
        
        // Update group table
        UTI = get_table_info(UT);
        update_table(GT, add_array(UTI, GTI));

        // Send update to server
        const userName = document.querySelector('input[name="Name"]').value;
        updateUserAvailability(event_id, userName, UTI);
    }
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

    times.forEach((time, rowIndex) =>
    {
        const row = document.createElement('tr');
        const timeCell = document.createElement('td');
        timeCell.textContent = time;
        row.appendChild(timeCell);

        days.forEach((_, colIndex) => 
        {
            const cell = document.createElement('td');
            cell.classList.add('cell', cell_class);

            cell.dataset.row = rowIndex;
            cell.dataset.col = colIndex;
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

// Compose the group timetable from participating users avaliability
function updateGroupTimetable(event_id) {
    fetch(`get_event_data.php?event_id=${event_id}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Set event name
                document.getElementById('eventName').textContent = data.name;

                // Extract metadata
                const metadata = data.data.metadata;
                times = metadata.times;
                days = metadata.dates;

                // Create tables
                UT = create_table(days, times, 'user');
                GT = create_table(days, times, 'group');

                // Initialize arrays
                UTI = Array.from({ length: times.length }, () => 
                    Array.from({ length: days.length }, () => 0));
                GTI = Array.from({ length: times.length }, () => 
                    Array.from({ length: days.length }, () => 0));

                // Process userdata if exists
                if (data.data?.userdata) {
                    Object.values(data.data.userdata).forEach(userData => {
                        if (userData?.avail) {
                            userData.avail.forEach((timeSlot, timeIndex) => {
                                timeSlot?.forEach((available, dateIndex) => {
                                    GTI[timeIndex][dateIndex] += available;
                                });
                            });
                        }
                    });
                }

                // Process guestdata if exists
                if (data.data?.guestdata) {
                    Object.values(data.data.guestdata).forEach(guestData => {
                        if (guestData?.avail) {
                            guestData.avail.forEach((timeSlot, timeIndex) => {
                                timeSlot?.forEach((available, dateIndex) => {
                                    GTI[timeIndex][dateIndex] += available;
                                });
                            });
                        }
                    });
                }

                // Update DOM
                UTC.innerHTML = '';
                GTC.innerHTML = '';
                UTC.appendChild(UT);
                GTC.appendChild(GT);
                
                // Update tables
                update_table(UT, UTI);
                update_table(GT, GTI);
            }
        })
        .catch(error => console.error('Error:', error));
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const event_id = new URLSearchParams(window.location.search).get('event_id');
    if (event_id) {
        updateGroupTimetable(event_id);
    }
});

// User sign-in validation
function validateSignIn(event_id, name, password) {
    fetch(`get_event_data.php?event_id=${event_id}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const guestdata = data.data.guestdata || {};
                const guest = guestdata[name];

                if (guest) {
                    // Guest login handling
                    if (!guest.pw || guest.pw === password) {
                        showAvailability(guest, name);
                    } else {
                        alert('Guest Login: Incorrect password');
                    }
                } else {
                    // User login handling
                    fetch('eventLogin.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            user_name: name,
                            user_pw: password
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            showAvailability({ avail: [] }, name);
                        } else {
                            if (data.error_code === 'no_user') {
                                // User does not exist, create new guest
                                create_guest(name, password);
                            } else if (data.error_code === 'wrong_pw') {
                                alert('User Login: Incorrect password');
                            } else {
                                alert(data.error || 'Login failed');
                            }
                        }
                    })
                    .catch(error => console.error('Login error:', error));
                }

            }
        });
}

function create_guest(name, password) {
    alert("Creating new guest account...");
    fetch('create_guest.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            event_id: event_id,
            user_name: name,
            user_pw: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAvailability(data.data, name);
        } else {
            console.error('Failed to create guest');
        }
    });
}

function showAvailability(user, userName) {
    // Get DOM elements
    const signinSection = document.getElementById('signin');
    const confirmBtn = document.getElementById('confirm');
    const nameDisplay = document.getElementById('str_user_avail');

    // Hide signin section and confirm button
    signinSection.classList.add('hidden');
    confirmBtn.classList.add('hidden');
    
    // Show other sections
    document.querySelectorAll('.section').forEach(section => {
        if (section.id !== 'signin') {
            section.classList.remove('hidden');
        }
    });

    // Display user's name
    nameDisplay.textContent = userName + "'s Availability";

    // Load user's existing availability
    if (user.avail) {
        user.avail.forEach((timeSlot, timeIndex) => {
            timeSlot.forEach((available, dateIndex) => {
                if (available) {
                    const cell = UT.rows[timeIndex + 1].cells[dateIndex + 1];
                    cell.classList.remove('unavailable');
                    cell.classList.add('available');
                }
            });
        });
    }
}

function updateUserAvailability(event_id, userName, availability) {
    fetch('update_availability.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            event_id: event_id,
            user_name: userName,
            availability: availability
        })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            console.error('Failed to update availability');
        }
    });
}





var isDragging = false;
var dragStartCell = null;
var dragEndCell = null;
var dragMode = null;

document.addEventListener('mousedown', function (event)
{
    const cell = event.target;
    if (cell.classList.contains('available') || cell.classList.contains('unavailable'))
    {
        isDragging = true;
        dragStartCell = cell;
        dragMode = cell.classList.contains('available') ? 'unavailable' : 'available';
    }
});

document.addEventListener('mouseover', function (event) {
    if (isDragging) {
        const cell = event.target;
        if (cell.classList.contains('available') || cell.classList.contains('unavailable'))
        {
            dragEndCell = cell;
        }
    }
});

document.addEventListener('mouseup', function ()
{
    if (isDragging && dragStartCell && dragEndCell)
    {
        isDragging = false;

        const startRow = dragStartCell.dataset.row;
        const startCol = dragStartCell.dataset.col;
        const endRow = dragEndCell.dataset.row;
        const endCol = dragEndCell.dataset.col;

        const minRow = Math.min(startRow, endRow);
        const maxRow = Math.max(startRow, endRow);
        const minCol = Math.min(startCol, endCol);
        const maxCol = Math.max(startCol, endCol);

        for (let row = minRow; row <= maxRow; row++)
        {
            for (let col = minCol; col <= maxCol; col++)
            {
                const cell = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
                if (cell)
                {
                    cell.classList.remove('available', 'unavailable');
                    cell.classList.add(dragMode);
                }
            }
        }

        const UTI = get_table_info(UT);
        update_table(GT, add_array(UTI, GTI));

        const userName = document.querySelector('input[name="Name"]').value;
        updateUserAvailability(event_id, userName, UTI);
    }

    dragStartCell = null;
    dragEndCell = null;
    dragMode = null;
});
