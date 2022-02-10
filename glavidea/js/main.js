jQuery(function() {
    jQuery('.burger').click(function() {
        jQuery('.burger span').toggleClass("active");
        jQuery('ul.nav-list').toggleClass("animate");
    });
});