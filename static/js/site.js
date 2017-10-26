/* global $this: true */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "animationsSlider" }] */

if ($.cookie('themeCSSpath')) {
    $('link#theme-stylesheet').attr('href', $.cookie('themeCSSpath'));
}
if ($.cookie('themeLayout')) {
    $('body').addClass($.cookie('themeLayout'));
}

$(function () {
    sliders();
    menuSliding();
    utils();
    animations();
});

/* sliders */
function sliders() {
    if ($('.owl-carousel').length) {

        $('.reviews-slider').owlCarousel({
            nav: true, // Show next and prev buttons
            navText: ['<i class="fa fa-play fa-flip"></i>', '<i class="fa fa-play"></i>'],
            dots: false,
            items: 1,
            slideSpeed: 500,
            paginationSpeed: 300,
            autoPlay: true,
            stopOnHover: true,
            singleItem: true,
            margin: 10,
            autoHeight: true,
            autoHeightClass: 'equalize'
        });

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
            margin: 10,
            autoHeight: true,
            autoHeightClass: 'equalize',
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            callbacks: true,
            URLhashListener: true
        });
    }
}

/* menu sliding */
function menuSliding() {
    $('.dropdown').on('show.bs.dropdown', function () {
        if ($(window).width() > 750) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
        } else {
            $(this).find('.dropdown-menu').first().stop(true, true).show();
        }
    });

    $('.dropdown').on('hide.bs.dropdown', function () {
        if ($(window).width() > 750) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
        } else {
            $(this).find('.dropdown-menu').first().stop(true, true).hide();
        }
    });
}

/* animations */
function animations() {
    var delayTime = 0;
    $('[data-animate]').css({ opacity: '0' });
    $('[data-animate]').waypoint(function () {
        delayTime += 150;
        $(this).delay(delayTime).queue(function (next) {
            $(this).toggleClass('animated');
            $(this).toggleClass($(this).data('animate'));
            delayTime = 0;
            next();
            // $(this).removeClass('animated')
            // $(this).toggleClass($(this).data('animate'))
        });
    }, {
        offset: '90%',
        triggerOnce: true
    });

    $('[data-animate-hover]').hover(function () {
        $(this).css({ opacity: 1 });
        $(this).addClass('animated');
        $(this).removeClass($(this).data('animate'));
        $(this).addClass($(this).data('animate-hover'));
    }, function () {
        $(this).removeClass('animated');
        $(this).removeClass($(this).data('animate-hover'));
    });
}

function animationsSlider() {
    var delayTimeSlider = 400;

    $('.owl-item:not(.active) [data-animate-always]').each(function () {
        $(this).removeClass('animated');
        $(this).removeClass($(this).data('animate-always'));
        $(this).stop(true, true, true).css({ opacity: 0 });
    });

    $('.owl-item.active [data-animate-always]').each(function () {
        delayTimeSlider += 500;

        $(this).delay(delayTimeSlider).queue(function () {
            $(this).addClass('animated');
            $(this).addClass($(this).data('animate-always'));

            console.log($(this).data('animate-always'));
        });
    });
}

/* full screen intro */
function fullScreenContainer() {
    var screenWidth = $(window).width() + 'px';
    var screenHeight = '500px';

    if ($(window).height() > 500) {
        screenHeight = $(window).height() + 'px';
    }

    $('#intro, #intro .item').css({
        width: screenWidth,
        height: screenHeight
    });
}

function utils() {
    /* tooltips */
    $('[data-toggle="tooltip"]').tooltip();

    /* click on the box activates the radio */
    $('#checkout').on('click', '.box.shipping-method, .box.payment-method', function () {
        var radio = $(this).find(':radio');
        radio.prop('checked', true);
    });

    /* click on the box activates the link in it */
    $('.box.clickable').on('click', function () {
        window.location = $(this).find('a').attr('href');
    });

    /* external links in new window */
    $('.external').on('click', function (e) {
        e.preventDefault();
        window.open($(this).attr('href'));
    });

    /* animated scrolling */
    $('.scroll-to, .scroll-to-top').click(function (event) {
        var fullUrl = this.href;
        var parts = fullUrl.split('#');

        if (parts.length > 1) {
            scrollTo(fullUrl);
            event.preventDefault();
        }
    });

    function scrollTo(fullUrl) {
        var parts = fullUrl.split('#');
        var trgt = parts[1];
        var targetOffset = $('#' + trgt).offset();
        var targetTop = targetOffset.top - 100;

        if (targetTop < 0) {
            targetTop = 0;
        }

        $('html, body').animate({
            scrollTop: targetTop
        }, 1000);
    }
}

$.fn.alignElementsSameHeight = function () {
    $('.same-height-row').each(function () {
        var maxHeight = 0;
        var children = $(this).find('.same-height');
        children.height('auto');

        if ($(window).width() > 768) {
            children.each(function () {
                if ($(this).innerHeight() > maxHeight) {
                    maxHeight = $(this).innerHeight();
                }
            });
            children.innerHeight(maxHeight);
        }

        maxHeight = 0;
        children = $(this).find('.same-height-always');
        children.height('auto');
        children.each(function () {
            if ($(this).height() > maxHeight) {
                maxHeight = $(this).innerHeight();
            }
        });
        children.innerHeight(maxHeight);
    });
};

var windowWidth;
$(function () {
    windowWidth = $(window).width();

    $(this).alignElementsSameHeight();
});

$(window).resize(function () {
    var newWindowWidth = $(window).width();

    if (windowWidth !== newWindowWidth) {
        setTimeout(function () {
            $(this).alignElementsSameHeight();
            fullScreenContainer();
        }, 205);
        windowWidth = newWindowWidth;
    }
});
!function (a, b) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.LazyLoad = b();
}(this, function () {
  "use strict";
  var a = { elements_selector: "img", container: window, threshold: 300, throttle: 150, data_src: "original", data_srcset: "original-set", class_loading: "loading", class_loaded: "loaded", class_error: "error", class_initial: "initial", skip_invisible: !0, callback_load: null, callback_error: null, callback_set: null, callback_processed: null };const b = !("onscroll" in window) || /glebot/.test(navigator.userAgent),
        c = function (a, b) {
    a && a(b);
  },
        d = function (a) {
    return a.getBoundingClientRect().top + window.pageYOffset - a.ownerDocument.documentElement.clientTop;
  },
        e = function (a, b, c) {
    return (b === window ? window.innerHeight + window.pageYOffset : d(b) + b.offsetHeight) <= d(a) - c;
  },
        f = function (a) {
    return a.getBoundingClientRect().left + window.pageXOffset - a.ownerDocument.documentElement.clientLeft;
  },
        g = function (a, b, c) {
    const d = window.innerWidth;return (b === window ? d + window.pageXOffset : f(b) + d) <= f(a) - c;
  },
        h = function (a, b, c) {
    return (b === window ? window.pageYOffset : d(b)) >= d(a) + c + a.offsetHeight;
  },
        i = function (a, b, c) {
    return (b === window ? window.pageXOffset : f(b)) >= f(a) + c + a.offsetWidth;
  };var j = function (a, b, c) {
    return !(e(a, b, c) || h(a, b, c) || g(a, b, c) || i(a, b, c));
  };const k = function (a, b) {
    let c = new a(b),
        d = new CustomEvent("LazyLoad::Initialized", { detail: { instance: c } });window.dispatchEvent(d);
  };const l = function (a, b) {
    const c = a.parentElement;if ("PICTURE" === c.tagName) for (let a = 0; a < c.children.length; a++) {
      let d = c.children[a];if ("SOURCE" === d.tagName) {
        let a = d.dataset[b];a && d.setAttribute("srcset", a);
      }
    }
  };var m = function (a, b, c) {
    const d = a.tagName,
          e = a.dataset[c];if ("IMG" === d) {
      l(a, b);const c = a.dataset[b];return c && a.setAttribute("srcset", c), void (e && a.setAttribute("src", e));
    }if ("IFRAME" === d) return void (e && a.setAttribute("src", e));e && (a.style.backgroundImage = "url(" + e + ")");
  };const n = function (b) {
    this._settings = Object.assign({}, a, b), this._queryOriginNode = this._settings.container === window ? document : this._settings.container, this._previousLoopTime = 0, this._loopTimeout = null, this._boundHandleScroll = this.handleScroll.bind(this), this._isFirstLoop = !0, window.addEventListener("resize", this._boundHandleScroll), this.update();
  };n.prototype = { _reveal: function (a) {
      const b = this._settings,
            d = function () {
        b && (a.removeEventListener("load", e), a.removeEventListener("error", d), a.classList.remove(b.class_loading), a.classList.add(b.class_error), c(b.callback_error, a));
      },
            e = function () {
        b && (a.classList.remove(b.class_loading), a.classList.add(b.class_loaded), a.removeEventListener("load", e), a.removeEventListener("error", d), c(b.callback_load, a));
      };"IMG" !== a.tagName && "IFRAME" !== a.tagName || (a.addEventListener("load", e), a.addEventListener("error", d), a.classList.add(b.class_loading)), m(a, b.data_srcset, b.data_src), c(b.callback_set, a);
    }, _loopThroughElements: function () {
      const a = this._settings,
            d = this._elements,
            e = d ? d.length : 0;let f,
          g = [],
          h = this._isFirstLoop;for (f = 0; f < e; f++) {
        let c = d[f];a.skip_invisible && null === c.offsetParent || (b || j(c, a.container, a.threshold)) && (h && c.classList.add(a.class_initial), this._reveal(c), g.push(f), c.dataset.wasProcessed = !0);
      }for (; g.length > 0;) d.splice(g.pop(), 1), c(a.callback_processed, d.length);0 === e && this._stopScrollHandler(), h && (this._isFirstLoop = !1);
    }, _purgeElements: function () {
      const a = this._elements,
            b = a.length;let c,
          d = [];for (c = 0; c < b; c++) {
        let b = a[c];b.dataset.wasProcessed && d.push(c);
      }for (; d.length > 0;) a.splice(d.pop(), 1);
    }, _startScrollHandler: function () {
      this._isHandlingScroll || (this._isHandlingScroll = !0, this._settings.container.addEventListener("scroll", this._boundHandleScroll));
    }, _stopScrollHandler: function () {
      this._isHandlingScroll && (this._isHandlingScroll = !1, this._settings.container.removeEventListener("scroll", this._boundHandleScroll));
    }, handleScroll: function () {
      const a = this._settings.throttle;if (0 !== a) {
        const b = () => {
          new Date().getTime();
        };let c = b(),
            d = a - (c - this._previousLoopTime);d <= 0 || d > a ? (this._loopTimeout && (clearTimeout(this._loopTimeout), this._loopTimeout = null), this._previousLoopTime = c, this._loopThroughElements()) : this._loopTimeout || (this._loopTimeout = setTimeout(function () {
          this._previousLoopTime = b(), this._loopTimeout = null, this._loopThroughElements();
        }.bind(this), d));
      } else this._loopThroughElements();
    }, update: function () {
      this._elements = Array.prototype.slice.call(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)), this._purgeElements(), this._loopThroughElements(), this._startScrollHandler();
    }, destroy: function () {
      window.removeEventListener("resize", this._boundHandleScroll), this._loopTimeout && (clearTimeout(this._loopTimeout), this._loopTimeout = null), this._stopScrollHandler(), this._elements = null, this._queryOriginNode = null, this._settings = null;
    } };let o = window.lazyLoadOptions;return o && function (a, b) {
    let c = b.length;if (c) for (let d = 0; d < c; d++) k(a, b[d]);else k(a, b);
  }(n, o), n;
});
$(document).ready(function () {
  if (!is_touch_device()) {

    $(".dropdown, .dropdown-active").hover(function () {
      $(this).find('.dropdown-menu').eq(0).stop(true, true).fadeIn(200);
    }, function () {
      $(this).find('.dropdown-menu').eq(0).stop(true, true).fadeOut(200);
    });
  } else {
    $(".dropdown > a").click(function (e) {
      e.stopImmediatePropagation();
      if ($(this).hasClass('dropdown-toggle')) {
        $(this).parent('.dropdown').toggleClass('open');
      } else {
        e.preventDefault();
        $(this).next('.dropdown-menu').stop(true, true).fadeToggle(200);
      }
    });
  }
});

function is_touch_device() {
  return 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

//# sourceMappingURL=site.js.map