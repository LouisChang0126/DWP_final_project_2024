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

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

var UT = create_table(days, times, 'user');
var GT = create_table(days, times, 'group');
var UTC = document.getElementById('user_table_container');
var GTC = document.getElementById('group_table_container');
var UTI = Array.from({ length: times.length }, () => Array.from({ length: days.length }, () => 0));
var GTI = Array.from({ length: times.length }, () => Array.from({ length: days.length }, () => 0));

UTC.innerHTML = '';
GTC.innerHTML = '';
UTC.appendChild(UT);
GTC.appendChild(GT);

/* load info*/
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
        th.textContent = day;
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