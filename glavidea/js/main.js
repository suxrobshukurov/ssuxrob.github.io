jQuery(function() {

    console.log("hello");

    jQuery('#dropdown-btn').on('click', function() {
        jQuery('.menu-submenu').toggleClass('open-submenu');
        jQuery('.dropdown-btn').toggleClass('open');
    });

    jQuery('.menu-btn').on('click', function() {
        jQuery('.menu-btn').toggleClass('active');
        jQuery('.header-menu').toggleClass('active');

    });
});