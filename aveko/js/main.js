jQuery(function() {
    // анимация 
    wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 160,
        mobile: true,
        live: true

    });
    wow.init();

    let swiper = new Swiper(".mySwiper", {
        grabCursor: true,
        effect: "cards",
        loop: false
    });

    // телефон маска в форме
    jQuery('#js-phone-field').mask("+7 (999) 999-99-99");

    //кнопка вверх
    jQuery(document).ready(function() {
        let toTopArrow = jQuery('.js-to-top'),
            scrollAnchorElem = jQuery('.exam'),
            viewportHeight = jQuery(window).height();

        // init
        setToTopDisplay();

        // onScroll function
        jQuery(window).on('scroll', function() {
            setToTopDisplay();
        });

        // toTop click
        jQuery('.js-to-top').on('click', function() {
            jQuery('html').animate({
                    scrollTop: 0 // прокручиваем страницу к требуемому элементу
                }, 1500 // скорость прокрутки
            );
            return false;
        });

        // toTop show/hide
        function setToTopDisplay() {
            let maxY = scrollAnchorElem.offset().top - jQuery(window).scrollTop();


            if (maxY < viewportHeight) {
                if (toTopArrow.is(':hidden')) {
                    toTopArrow.stop().fadeIn();
                }
            } else {
                if (toTopArrow.is(':visible')) {
                    toTopArrow.stop().fadeOut();
                }
            }
        }
        // кнопка мобильного меню
        jQuery(document).ready(function() {
            jQuery('.menu-burger').click(function() {
                jQuery('.menu-burger').toggleClass('open-menu');
                jQuery('.mob-menu').toggleClass('open');
                jQuery('body').toggleClass('fixed-page');
            });
        });
    });

    //плавный скролл
    jQuery('.flowing-scroll').on('click', function() {
        let el = $(this);
        let dest = el.attr('href'); // получаем направление
        if (dest !== undefined && dest !== '') { // проверяем существование
            jQuery('html').animate({
                    scrollTop: $(dest).offset().top // прокручиваем страницу к требуемому элементу
                }, 1500 // скорость прокрутки
            );
        }
        return false;
    });


});


// генерация частиц в блоке how-can
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 27,
            "density": {
                "enable": true,
                "value_area": 700
            }
        },
        "color": { "value": "#28ABB8" },
        "shape": {
            "type": "circle",
            "stroke": { "width": 0, "color": "#000000" },
            "polygon": { "nb_sides": 1 },
            "image": { "src": "", "width": 100, "height": 100 }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 10,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 145,
            "color": "#28ABB8",
            "opacity": 0.5,
            "width": 2
        },
        "move": {
            "enable": true,
            "speed": 1,
            "direction": "bottom-right",
            "random": false,
            "straight": false,
            "out_mode": "bounce",
            "bounce": true,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1122.388442605866
            }
        }
    },
    "interactivity": {
        "detect_on": "window",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": false,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 150,
                "line_linked": {
                    "opacity": 0.8061729816883573
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});
let count_particles, stats, update;
stats = new Stats;
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '10px';
stats.domElement.style.top = '0px';

document.body.appendChild(stats.domElement);
count_particles = document.querySelector('.js-count-particles');
update = function() {
    stats.begin();
    stats.end();
    if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; }
    requestAnimationFrame(update);
};
requestAnimationFrame(update);;