var container = document.getElementById('user_schedule');
var btn = document.getElementsByClassName('edit-button')[0];
var des = document.getElementsByClassName('user-description')[0];
var table = create_table();
container.appendChild(table);


let isEditing = false;

btn.addEventListener('click', function()
{
    if (!isEditing)
    {
        for (var i = 0; i < table.rows.length; i++)
        {
            for (var j = 0; j < table.rows[i].cells.length; j++)
            {
                table.rows[i].cells[j].classList.add('clickable');
            }
        }
        des.contentEditable = true;
        btn.innerHTML = 'Save';
        isEditing = true;
    }
    else
    {
        for (var i = 0; i < table.rows.length; i++)
        {
            for (var j = 0; j < table.rows[i].cells.length; j++)
            {
                table.rows[i].cells[j].classList.remove('clickable');
            }
        }
        des.contentEditable = false;
        btn.innerHTML = 'Edit';
        isEditing = false;
    }
});

document.addEventListener("click", function(event)
{
    const target = event.target;
    if (target.tagName === 'TD' && target.classList.contains('clickable'))
    {
        target.classList.toggle('unavailable');
        target.classList.toggle('available');
    }
});

function create_table()
{
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

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
            cell.classList.add('unavailable');
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    return table;
}