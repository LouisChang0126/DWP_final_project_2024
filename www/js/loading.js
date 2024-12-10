document.addEventListener("DOMContentLoaded", () =>
{
    setTimeout(() =>
    {
        const loadingContainer = document.querySelector('.loading-container');
        loadingContainer.classList.add('hidden');
    }, 5000);
});