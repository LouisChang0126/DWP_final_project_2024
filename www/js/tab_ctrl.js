var tab_buttons = document.getElementsByClassName("tab_button");
var tab_contents = document.getElementsByClassName("tab_content");

for (var i = 0; i < tab_buttons.length; i++) {
    console.log(i);
    tab_buttons[i].addEventListener("click", function() {
        for (var j = 0; j < tab_buttons.length; j++) {
            tab_buttons[j].classList.remove("active");
            tab_contents[j].classList.remove("active");
        }
        this.classList.add("active");
        tab_contents[this.id].classList.add("active");
    });
}