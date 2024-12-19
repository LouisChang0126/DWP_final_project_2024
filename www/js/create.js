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
    }
});

function create_table()
{
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
    for (let week = 0; week < 4; week++)
    {
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
        }

        tbody.appendChild(row);
    }
    table.appendChild(tbody);

    return table;
}