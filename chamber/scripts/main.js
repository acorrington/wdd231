const navbutton = document.querySelector("#ham-btn");
const mainNav = document.querySelector('#main-nav');

navbutton.addEventListener("click", () => {
    navbutton.classList.toggle("show");
    mainNav.classList.toggle('show');
});