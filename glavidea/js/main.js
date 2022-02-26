window.onload = function() {
    let menuBtn = document.querySelector('.menu-btn');
    let menu = document.querySelector('.header__menu');

    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        menu.classList.toggle("active");
    })
};

jQuery(function() {
    console.log("hello");
});