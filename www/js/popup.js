document.addEventListener("click", function(e)
{
    if (e.target.tagName === "BUTTON" && e.target.textContent === "Schedule")
    {
        var username = e.target.parentNode.querySelector("h2").textContent;
        var popups = document.getElementsByClassName("pop-up-windows")[0];
        var popup = popups.querySelector(`#${username}`);
        popup.style.display = "flex";
    }
    if (e.target.classList.contains("close"))
    {
        var popup = e.target.closest(".pop-up-window");
        popup.style.display = "none";
    }
});