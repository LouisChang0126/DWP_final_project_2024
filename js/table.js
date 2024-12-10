const cells = document.querySelectorAll('td.available, td.unavailable');

cells.forEach(cell =>
{
    cell.addEventListener('click', function()
    {
        if (this.classList.contains('available'))
        {
            this.classList.remove('available');
            this.classList.add('unavailable');
        }
        else if (this.classList.contains('unavailable'))
        {
            this.classList.remove('unavailable');
            this.classList.add('available');
        }
    });
});
