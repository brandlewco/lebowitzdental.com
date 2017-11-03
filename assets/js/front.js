/* global $this: true */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "animationsSlider" }] */

if ($.cookie('themeCSSpath')) {
    $('link#theme-stylesheet').attr('href', $.cookie('themeCSSpath'))
}
if ($.cookie('themeLayout')) {
    $('body').addClass($.cookie('themeLayout'))
}

$(function() {
    sliders()
    menuSliding()
    utils()
    animations()
})


/* sliders */
function sliders() {
    if ($('.owl-carousel').length) {


        $('.reviews-slider').owlCarousel({
            nav:false, // Show next and prev buttons
            //navText: ['<i class="fa fa-play fa-flip"></i>', '<i class="fa fa-play"></i>'],
            dots: true,
            items: 1,
            slideSpeed: 500,
            paginationSpeed: 300,
            autoPlay: true,
            stopOnHover: true,
            singleItem: true,
            margin: 10,
            autoHeight: true,
            autoHeightClass: 'equalize',
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
        })

        $('.comparison-slider').owlCarousel({
            lazyLoad: true,
            items: 1.001,
            dots: false,
            nav: true, // Show next and prev buttons
            navText: ['<i class="fa fa-play fa-flip"></i>', '<i class="fa fa-play"></i>'],
            slideSpeed: 500,
            paginationSpeed: 300,
            autoPlay: true,
            stopOnHover: true,
            singleItem: true,
            margin: 10,
            autoHeight: true,
            autoHeightClass: 'equalize',
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            callbacks: true,
            URLhashListener: true
        })
    }
}


/* menu sliding */
function menuSliding() {
    $('.dropdown').on('show.bs.dropdown', function() {
        if ($(window).width() > 750) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideDown()
        } else {
            $(this).find('.dropdown-menu').first().stop(true, true).show()
        }
    })

    $('.dropdown').on('hide.bs.dropdown', function() {
        if ($(window).width() > 750) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideUp()
        } else {
            $(this).find('.dropdown-menu').first().stop(true, true).hide()
        }
    })
}

// /* animations */
// function animations() {
//     var delayTime = 0
//     $('[data-animate]').css({ opacity: '0' })
//     $('[data-animate]').waypoint(function() {
//         delayTime += 150
//         $(this).delay(delayTime).queue(function(next) {
//             $(this).toggleClass('animated')
//             $(this).toggleClass($(this).data('animate'))
//             delayTime = 0
//             next()
//                 // $(this).removeClass('animated')
//                 // $(this).toggleClass($(this).data('animate'))
//         })
//     }, {
//         offset: '90%',
//         triggerOnce: true
//     })

//     $('[data-animate-hover]').hover(function() {
//         $(this).css({ opacity: 1 })
//         $(this).addClass('animated')
//         $(this).removeClass($(this).data('animate'))
//         $(this).addClass($(this).data('animate-hover'))
//     }, function() {
//         $(this).removeClass('animated')
//         $(this).removeClass($(this).data('animate-hover'))
//     })
// }

// function animationsSlider() {
//     var delayTimeSlider = 400

//     $('.owl-item:not(.active) [data-animate-always]').each(function() {
//         $(this).removeClass('animated')
//         $(this).removeClass($(this).data('animate-always'))
//         $(this).stop(true, true, true).css({ opacity: 0 })
//     })

//     $('.owl-item.active [data-animate-always]').each(function() {
//         delayTimeSlider += 500

//         $(this).delay(delayTimeSlider).queue(function() {
//             $(this).addClass('animated')
//             $(this).addClass($(this).data('animate-always'))

//             console.log($(this).data('animate-always'))
//         })
//     })
// }




// /* full screen intro */
// function fullScreenContainer() {
//     var screenWidth = $(window).width() + 'px'
//     var screenHeight = '500px'

//     if ($(window).height() > 500) {
//         screenHeight = $(window).height() + 'px'
//     }

//     $('#intro, #intro .item').css({
//         width: screenWidth,
//         height: screenHeight
//     })
// }

function utils() {
    /* tooltips */
    $('[data-toggle="tooltip"]').tooltip()

    /* click on the box activates the radio */
    $('#checkout').on('click', '.box.shipping-method, .box.payment-method', function() {
        var radio = $(this).find(':radio')
        radio.prop('checked', true)
    })

    /* click on the box activates the link in it */
    $('.box.clickable').on('click', function() {
        window.location = $(this).find('a').attr('href')
    })

    /* external links in new window */
    $('.external').on('click', function(e) {
        e.preventDefault()
        window.open($(this).attr('href'))
    })

    /* animated scrolling */
    $('.scroll-to, .scroll-to-top').click(function(event) {
        var fullUrl = this.href
        var parts = fullUrl.split('#')

        if (parts.length > 1) {
            scrollTo(fullUrl)
            event.preventDefault()
        }
    })

    function scrollTo(fullUrl) {
        var parts = fullUrl.split('#')
        var trgt = parts[1]
        var targetOffset = $('#' + trgt).offset()
        var targetTop = targetOffset.top - 100

        if (targetTop < 0) {
            targetTop = 0
        }

        $('html, body').animate({
            scrollTop: targetTop
        }, 1000)
    }
}

$.fn.alignElementsSameHeight = function() {
    $('.same-height-row').each(function() {
        var maxHeight = 0
        var children = $(this).find('.same-height')
        children.height('auto')

        if ($(window).width() > 768) {
            children.each(function() {
                if ($(this).innerHeight() > maxHeight) {
                    maxHeight = $(this).innerHeight()
                }
            })
            children.innerHeight(maxHeight)
        }

        maxHeight = 0
        children = $(this).find('.same-height-always')
        children.height('auto')
        children.each(function() {
            if ($(this).height() > maxHeight) {
                maxHeight = $(this).innerHeight()
            }
        })
        children.innerHeight(maxHeight)
    })
}

var windowWidth
$(function() {
    windowWidth = $(window).width()

    $(this).alignElementsSameHeight()
})

$(window).resize(function() {
    var newWindowWidth = $(window).width()

    if (windowWidth !== newWindowWidth) {
        setTimeout(function() {
            $(this).alignElementsSameHeight()
            fullScreenContainer()
        }, 205)
        windowWidth = newWindowWidth
    }
})
