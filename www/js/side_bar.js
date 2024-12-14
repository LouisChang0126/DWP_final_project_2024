const menuItems = document.querySelectorAll('.menu_item');

menuItems.forEach(item =>
{
    item.addEventListener('click', function (e)
    {
        e.preventDefault();
        console.log(this.id);

        document.querySelectorAll('.section').forEach(section =>
        {
            section.classList.add('hidden');
        });

        const targetId = this.id;
        const targetSection = document.getElementById(targetId);
        if (targetSection)
        {
            targetSection.classList.remove('hidden');
        }
    });
});
