jQuery(function() {

    // sticky header 
    jQuery(document).on('scroll', function() {
        if (jQuery(document).scrollTop() >= 210) {
            jQuery('.header-fixed-js').addClass('fixed');
        } else {
            jQuery('.header-fixed-js').removeClass('fixed');
        }
    })

    // hover position aware effect 
    jQuery('.btn-posnawr')
        .on('mouseenter', function(e) {
            let parentOffset = jQuery(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            jQuery(this).find('span').css({ top: relY, left: relX });
        })
        .on('mouseout', function(e) {
            let parentOffset = jQuery(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            jQuery(this).find('span').css({ top: relY, left: relX });
        });

    // menu slider
    let swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    //slider big banner
    let indexBigBanner = new Swiper('.maxwidth-banner-js', {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
            el: '.mb-carusel__dots',
            clickable: true,
        },
        navigation: {
            //reverse button XD
            nextEl: '.mb-button-prev',
            prevEl: '.mb-button-next',
        },
        loop: true,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        speed: 1000,
    });
    createMainSlider('.staffSlider')
});

function createMainSlider(sliderId = '.mainSlider', sliderPerView = 3, slideBetween = 1) {
    new Swiper(sliderId, {
        slidesPerView: sliderPerView,
        spaceBetween: slideBetween,
        navigation: {
            nextEl: 'mS-btn-next',
            prevEl: 'ms-btn-prev',
        },
        loop: true,
        speed: 1000,
    });
}