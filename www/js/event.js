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