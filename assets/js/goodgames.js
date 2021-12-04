/*!-----------------------------------------------------------------
    Name: GoodGames - Game Portal / Store HTML Template
    Version: 1.4.0
    Author: nK
    Website: https://nkdev.info/
    Purchase: https://themeforest.net/item/goodgames-portal-store-html-gaming-template/17704593?ref=_nK
    Support: https://nk.ticksy.com/
    License: You must have a valid license purchased only from ThemeForest (the above link) in order to legally use the theme for your project.
    Copyright 2018.
-------------------------------------------------------------------*/
    /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/*------------------------------------------------------------------

  Utility

-------------------------------------------------------------------*/
var $ = jQuery;
var tween = window.TweenMax;
var isIOs = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var isMobile = /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/g.test(navigator.userAgent || navigator.vendor || window.opera);
var isFireFox = typeof InstallTrigger !== 'undefined';
var isTouch = 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;

// add 'is-mobile' or 'is-desktop' classname to html tag
$('html').addClass(isMobile ? 'is-mobile' : 'is-desktop');

/**
 * window size
 */
var $wnd = $(window);
var $doc = $(document);
var $body = $('body');
var wndW = 0;
var wndH = 0;
var docH = 0;
function getWndSize() {
    exports.wndW = wndW = $wnd.width();
    exports.wndH = wndH = $wnd.height();
    exports.docH = docH = $doc.height();
}
getWndSize();
$wnd.on('resize load orientationchange', getWndSize);

/**
 * Debounce resize
 */
var resizeArr = [];
var resizeTimeout = void 0;
function debounceResized() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
        if (resizeArr.length) {
            for (var k = 0; k < resizeArr.length; k++) {
                resizeArr[k]();
            }
        }
    }, 50);
}
$wnd.on('ready load resize orientationchange', debounceResized);
debounceResized();

function debounceResize(func) {
    if (typeof func === 'function') {
        resizeArr.push(func);
    } else {
        window.dispatchEvent(new Event('resize'));
    }
}

/**
 * Throttle scroll
 * thanks: https://jsfiddle.net/mariusc23/s6mLJ/31/
 */
var hideOnScrollList = [];
var didScroll = void 0;
var lastST = 0;

$wnd.on('scroll load resize orientationchange', function () {
    if (hideOnScrollList.length) {
        didScroll = true;
    }
});

function hasScrolled() {
    var ST = $wnd.scrollTop();

    var type = ''; // [up, down, end, start]

    if (ST > lastST) {
        type = 'down';
    } else if (ST < lastST) {
        type = 'up';
    } else {
        type = 'none';
    }

    if (ST === 0) {
        type = 'start';
    } else if (ST >= docH - wndH) {
        type = 'end';
    }

    hideOnScrollList.forEach(function (item) {
        if (typeof item === 'function') {
            item(type, ST, lastST, $wnd);
        }
    });

    lastST = ST;
}

setInterval(function () {
    if (didScroll) {
        didScroll = false;
        window.requestAnimationFrame(hasScrolled);
    }
}, 250);

function throttleScroll(callback) {
    hideOnScrollList.push(callback);
}

/**
 * Body Overflow
 * Thanks https://jsfiddle.net/mariusc23/s6mLJ/31/
 * Usage:
 *    // enable
 *    bodyOverflow(1);
 *
 *    // disable
 *    bodyOverflow(0);
 */
var bodyOverflowEnabled = void 0;
var isBodyOverflowing = void 0;
var scrollbarWidth = void 0;
var originalBodyPadding = void 0;
var $headerContent = $('.nk-header > *');
function isBodyOverflowed() {
    return bodyOverflowEnabled;
}
function bodyGetScrollbarWidth() {
    // thx d.walsh
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'nk-body-scrollbar-measure';
    $body[0].appendChild(scrollDiv);
    var result = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    $body[0].removeChild(scrollDiv);
    return result;
}
function bodyCheckScrollbar() {
    var fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) {
        // workaround for missing window.innerWidth in IE8
        var documentElementRect = document.documentElement.getBoundingClientRect();
        fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }
    isBodyOverflowing = $body[0].clientWidth < fullWindowWidth;
    scrollbarWidth = bodyGetScrollbarWidth();
}
function bodySetScrollbar() {
    if (typeof originalBodyPadding === 'undefined') {
        originalBodyPadding = $body.css('padding-right') || '';
    }

    if (isBodyOverflowing) {
        $body.add($headerContent).css('paddingRight', scrollbarWidth + 'px');
    }
}
function bodyResetScrollbar() {
    $body.css('paddingRight', originalBodyPadding);
    $headerContent.css('paddingRight', '');
}
function bodyOverflow(enable) {
    if (enable && !bodyOverflowEnabled) {
        bodyOverflowEnabled = 1;
        bodyCheckScrollbar();
        bodySetScrollbar();
        $body.css('overflow', 'hidden');
    } else if (!enable && bodyOverflowEnabled) {
        bodyOverflowEnabled = 0;
        $body.css('overflow', '');
        bodyResetScrollbar();
    }
}

/**
 * In Viewport checker
 * return visible percent from 0 to 1
 */
function isInViewport($item, returnRect) {
    var rect = $item[0].getBoundingClientRect();
    var result = 1;

    if (rect.right <= 0 || rect.left >= wndW) {
        result = 0;
    } else if (rect.bottom < 0 && rect.top <= wndH) {
        result = 0;
    } else {
        var beforeTopEnd = Math.max(0, rect.height + rect.top);
        var beforeBottomEnd = Math.max(0, rect.height - (rect.top + rect.height - wndH));
        var afterTop = Math.max(0, -rect.top);
        var beforeBottom = Math.max(0, rect.top + rect.height - wndH);
        if (rect.height < wndH) {
            result = 1 - (afterTop || beforeBottom) / rect.height;
        } else if (beforeTopEnd <= wndH) {
            result = beforeTopEnd / wndH;
        } else if (beforeBottomEnd <= wndH) {
            result = beforeBottomEnd / wndH;
        }
        result = result < 0 ? 0 : result;
    }
    if (returnRect) {
        return [result, rect];
    }
    return result;
}

/**
 * Scroll To
 */
function scrollTo($to, callback) {
    var scrollPos = false;
    var speed = this.options.scrollToAnchorSpeed / 1000;

    if ($to === 'top') {
        scrollPos = 0;
    } else if ($to === 'bottom') {
        scrollPos = Math.max(0, docH - wndH);
    } else if (typeof $to === 'number') {
        scrollPos = $to;
    } else {
        scrollPos = $to.offset ? $to.offset().top : false;
    }

    if (scrollPos !== false && $wnd.scrollTop() !== scrollPos) {
        tween.to($wnd, speed, {
            scrollTo: {
                y: scrollPos,

                // disable autokill on iOs (buggy scrolling)
                autoKill: !isIOs
            },
            ease: Power2.easeOut,
            overwrite: 5
        });
        if (callback) {
            tween.delayedCall(speed, callback);
        }
    } else if (typeof callback === 'function') {
        callback();
    }
}

exports.$ = $;
exports.tween = tween;
exports.isIOs = isIOs;
exports.isMobile = isMobile;
exports.isFireFox = isFireFox;
exports.isTouch = isTouch;
exports.$wnd = $wnd;
exports.$doc = $doc;
exports.$body = $body;
exports.wndW = wndW;
exports.wndH = wndH;
exports.docH = docH;
exports.debounceResize = debounceResize;
exports.throttleScroll = throttleScroll;
exports.bodyOverflow = bodyOverflow;
exports.isBodyOverflowed = isBodyOverflowed;
exports.isInViewport = isInViewport;
exports.scrollTo = scrollTo;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/*------------------------------------------------------------------

  Theme Options

-------------------------------------------------------------------*/
var options = {
    scrollToAnchorSpeed: 700,

    templates: {
        secondaryNavbarBackItem: 'Back',

        plainVideoIcon: '<span class="nk-video-icon"><span class="fa fa-play pl-5"></span></span>',
        plainVideoLoadIcon: '<span class="nk-video-icon"><span class="nk-loading-icon"></span></span>',

        audioPlainButton: '<div class="nk-audio-plain-play-pause">\n                <span class="nk-audio-plain-play">\n                    <span class="ion-play ml-3"></span>\n                </span>\n                <span class="nk-audio-plain-pause">\n                    <span class="ion-pause"></span>\n                </span>\n            </div>',

        instagram: '<div class="col-4">\n                <a href="{{link}}" target="_blank">\n                    <img src="{{image}}" alt="{{caption}}" class="nk-img-stretch">\n                </a>\n            </div>',
        instagramLoadingText: 'Loading...',
        instagramFailText: 'Failed to fetch data',
        instagramApiPath: 'php/instagram/instagram.php',

        twitter: '<div class="nk-twitter">\n                <span class="nk-twitter-icon fab fa-twitter"></span>\n                <div class="nk-twitter-name">\n                      <a href="https://twitter.com/{{screen_name}}" target="_blank">@{{screen_name}}</a>\n                </div>\n                <div class="nk-twitter-date">\n                    <span>{{date}}</span>\n                </div>\n                <div class="nk-twitter-text">\n                   {{tweet}}\n                </div>\n            </div>',
        twitterLoadingText: 'Loading...',
        twitterFailText: 'Failed to fetch data',
        twitterApiPath: 'php/twitter/tweet.php',

        countdown: '<div class="nk-hexagon">\n                <div class="nk-hexagon-inner"></div>\n                <span>%D</span>\n                <small>Days</small>\n            </div>\n            <div class="nk-hexagon">\n                <div class="nk-hexagon-inner"></div>\n                <span>%H</span>\n                <small>Hours</small>\n            </div>\n            <div class="nk-hexagon">\n                <div class="nk-hexagon-inner"></div>\n                <span>%M</span>\n                <small>Minutes</small>\n            </div>\n            <div class="nk-hexagon">\n                <div class="nk-hexagon-inner"></div>\n                <span>%S</span>\n                <small>Seconds</small>\n            </div>'
    }
};

exports.options = options;

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

/* Plugins */


var _options = __webpack_require__(1);

var _utility = __webpack_require__(0);

var _setOptions2 = __webpack_require__(6);

var _initNavbar2 = __webpack_require__(7);

var _initNavbarSide2 = __webpack_require__(8);

var _initNavbarDropEffect2 = __webpack_require__(9);

var _initBackgrounds2 = __webpack_require__(10);

var _initCounters2 = __webpack_require__(11);

var _initStore2 = __webpack_require__(12);

var _initNewsBox2 = __webpack_require__(13);

var _initAnchors2 = __webpack_require__(14);

var _initVideoBlocks2 = __webpack_require__(15);

var _initGIF2 = __webpack_require__(16);

var _initInfoBoxes2 = __webpack_require__(17);

var _initForms2 = __webpack_require__(18);

var _initFormsMailChimp2 = __webpack_require__(19);

var _initAudioPlayer2 = __webpack_require__(20);

var _initImageSlider2 = __webpack_require__(21);

var _initFacebook2 = __webpack_require__(22);

var _initInstagram2 = __webpack_require__(23);

var _initTwitter2 = __webpack_require__(24);

var _initPluginStickySidebar2 = __webpack_require__(25);

var _initPluginFastClick2 = __webpack_require__(26);

var _initPluginNano2 = __webpack_require__(27);

var _initPluginJarallax2 = __webpack_require__(28);

var _initPluginFlickity2 = __webpack_require__(29);

var _initPluginPhotoswipe2 = __webpack_require__(30);

var _initPluginModal2 = __webpack_require__(31);

var _initPluginTabs2 = __webpack_require__(32);

var _initPluginAccordions2 = __webpack_require__(33);

var _initPluginCountdown2 = __webpack_require__(34);

var _initPluginSeiyriaBootstrapSlider2 = __webpack_require__(35);

var _initPluginSummernote2 = __webpack_require__(36);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*------------------------------------------------------------------

  Khaki Class

-------------------------------------------------------------------*/
var GOODGAMES = function () {
    function GOODGAMES() {
        _classCallCheck(this, GOODGAMES);

        this.options = _options.options;
    }

    _createClass(GOODGAMES, [{
        key: 'init',
        value: function init() {
            // prt:sc:dm

            var self = this;

            // run sidebar first because of may occurs some troubles with other functions
            self.initPluginStickySidebar();

            self.initNavbar();
            self.initNavbarSide();
            self.initNavbarDropEffect1();
            self.initStore();
            self.initBackgrounds();
            self.initCounters();
            self.initNewsBox();
            self.initAnchors();
            self.initVideoBlocks();
            self.initGIF();
            self.initInfoBoxes();
            self.initForms();
            self.initFormsMailChimp();
            self.initAudioPlayer();
            self.initImageSlider();
            self.initFacebook();
            self.initInstagram();
            self.initTwitter();

            // init plugins
            self.initPluginFastClick();
            self.initPluginNano();
            self.initPluginJarallax();
            self.initPluginFlickity();
            self.initPluginPhotoswipe();
            self.initPluginModal();
            self.initPluginTabs();
            self.initPluginAccordions();
            self.initPluginCountdown();
            self.initPluginSeiyriaBootstrapSlider();
            self.initPluginSummernote();

            return self;
        }
    }, {
        key: 'setOptions',
        value: function setOptions(newOpts) {
            return _setOptions2.setOptions.call(this, newOpts);
        }
    }, {
        key: 'debounceResize',
        value: function debounceResize(func) {
            return _utility.debounceResize.call(this, func);
        }
    }, {
        key: 'throttleScroll',
        value: function throttleScroll(callback) {
            return _utility.throttleScroll.call(this, callback);
        }
    }, {
        key: 'bodyOverflow',
        value: function bodyOverflow(type) {
            return _utility.bodyOverflow.call(this, type);
        }
    }, {
        key: 'isInViewport',
        value: function isInViewport($item, returnRect) {
            return _utility.isInViewport.call(this, $item, returnRect);
        }
    }, {
        key: 'scrollTo',
        value: function scrollTo($to, callback) {
            return _utility.scrollTo.call(this, $to, callback);
        }
    }, {
        key: 'initNavbar',
        value: function initNavbar() {
            return _initNavbar2.initNavbar.call(this);
        }
    }, {
        key: 'initNavbarSide',
        value: function initNavbarSide() {
            return _initNavbarSide2.initNavbarSide.call(this);
        }
    }, {
        key: 'initNavbarDropEffect1',
        value: function initNavbarDropEffect1() {
            return _initNavbarDropEffect2.initNavbarDropEffect1.call(this);
        }
    }, {
        key: 'initBackgrounds',
        value: function initBackgrounds($context) {
            return _initBackgrounds2.initBackgrounds.call(this, $context);
        }
    }, {
        key: 'initCounters',
        value: function initCounters() {
            return _initCounters2.initCounters.call(this);
        }
    }, {
        key: 'initStore',
        value: function initStore() {
            return _initStore2.initStore.call(this);
        }
    }, {
        key: 'initNewsBox',
        value: function initNewsBox() {
            return _initNewsBox2.initNewsBox.call(this);
        }
    }, {
        key: 'initAnchors',
        value: function initAnchors() {
            return _initAnchors2.initAnchors.call(this);
        }
    }, {
        key: 'initVideoBlocks',
        value: function initVideoBlocks() {
            return _initVideoBlocks2.initVideoBlocks.call(this);
        }
    }, {
        key: 'initGIF',
        value: function initGIF() {
            return _initGIF2.initGIF.call(this);
        }
    }, {
        key: 'initInfoBoxes',
        value: function initInfoBoxes() {
            return _initInfoBoxes2.initInfoBoxes.call(this);
        }
    }, {
        key: 'initForms',
        value: function initForms() {
            return _initForms2.initForms.call(this);
        }
    }, {
        key: 'initFormsMailChimp',
        value: function initFormsMailChimp() {
            return _initFormsMailChimp2.initFormsMailChimp.call(this);
        }
    }, {
        key: 'initAudioPlayer',
        value: function initAudioPlayer() {
            return _initAudioPlayer2.initAudioPlayer.call(this);
        }
    }, {
        key: 'initImageSlider',
        value: function initImageSlider() {
            return _initImageSlider2.initImageSlider.call(this);
        }
    }, {
        key: 'initFacebook',
        value: function initFacebook() {
            return _initFacebook2.initFacebook.call(this);
        }
    }, {
        key: 'initInstagram',
        value: function initInstagram() {
            return _initInstagram2.initInstagram.call(this);
        }
    }, {
        key: 'initTwitter',
        value: function initTwitter() {
            return _initTwitter2.initTwitter.call(this);
        }
    }, {
        key: 'initPluginStickySidebar',
        value: function initPluginStickySidebar() {
            return _initPluginStickySidebar2.initPluginStickySidebar.call(this);
        }
    }, {
        key: 'initPluginFastClick',
        value: function initPluginFastClick() {
            return _initPluginFastClick2.initPluginFastClick.call(this);
        }
    }, {
        key: 'initPluginNano',
        value: function initPluginNano($context) {
            return _initPluginNano2.initPluginNano.call(this, $context);
        }
    }, {
        key: 'initPluginJarallax',
        value: function initPluginJarallax($context) {
            return _initPluginJarallax2.initPluginJarallax.call(this, $context);
        }
    }, {
        key: 'initPluginFlickity',
        value: function initPluginFlickity($context) {
            return _initPluginFlickity2.initPluginFlickity.call(this, $context);
        }
    }, {
        key: 'initPluginPhotoswipe',
        value: function initPluginPhotoswipe($context) {
            return _initPluginPhotoswipe2.initPluginPhotoswipe.call(this, $context);
        }
    }, {
        key: 'initPluginModal',
        value: function initPluginModal($context) {
            return _initPluginModal2.initPluginModal.call(this, $context);
        }
    }, {
        key: 'initPluginTabs',
        value: function initPluginTabs($context) {
            return _initPluginTabs2.initPluginTabs.call(this, $context);
        }
    }, {
        key: 'initPluginAccordions',
        value: function initPluginAccordions($context) {
            return _initPluginAccordions2.initPluginAccordions.call(this, $context);
        }
    }, {
        key: 'initPluginCountdown',
        value: function initPluginCountdown($context) {
            return _initPluginCountdown2.initPluginCountdown.call(this, $context);
        }
    }, {
        key: 'initPluginSeiyriaBootstrapSlider',
        value: function initPluginSeiyriaBootstrapSlider($context) {
            return _initPluginSeiyriaBootstrapSlider2.initPluginSeiyriaBootstrapSlider.call(this, $context);
        }
    }, {
        key: 'initPluginSummernote',
        value: function initPluginSummernote($context) {
            return _initPluginSummernote2.initPluginSummernote.call(this, $context);
        }
    }]);

    return GOODGAMES;
}();

/*------------------------------------------------------------------

  Init GoodGames

-------------------------------------------------------------------*/


window.GoodGames = new GOODGAMES();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setOptions = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Set Custom Options

-------------------------------------------------------------------*/
function setOptions(newOpts) {
    var self = this;

    var optsTemplates = _utility.$.extend({}, this.options.templates, newOpts && newOpts.templates || {});
    var optsShortcuts = _utility.$.extend({}, this.options.shortcuts, newOpts && newOpts.shortcuts || {});
    var optsEvents = _utility.$.extend({}, this.options.events, newOpts && newOpts.events || {});

    self.options = _utility.$.extend({}, self.options, newOpts);
    self.options.templates = optsTemplates;
    self.options.shortcuts = optsShortcuts;
    self.options.events = optsEvents;
}

exports.setOptions = setOptions;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initNavbar = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Navbar

-------------------------------------------------------------------*/
function initNavbar() {
    var self = this;
    var $navbarTop = (0, _utility.$)('.nk-navbar-top');

    // add mobile navbar
    var $mobileNavItems = (0, _utility.$)('[data-nav-mobile]');
    if ($mobileNavItems.length) {
        $mobileNavItems.each(function () {
            var $nav = (0, _utility.$)((0, _utility.$)(this).html());
            var $mobileNav = (0, _utility.$)((0, _utility.$)(this).attr('data-nav-mobile'));

            // insert into mobile nav
            $mobileNav.find('.nk-navbar-mobile-content > ul.nk-nav').append($nav);
        });

        var $nav = (0, _utility.$)('.nk-navbar-mobile-content > ul.nk-nav');

        // remove background images
        $nav.find('.bg-image, .bg-video').remove();

        // remove mega menus
        $nav.find('.nk-mega-item > .dropdown').each(function () {
            var $drop = (0, _utility.$)(this).children('ul').addClass('dropdown');

            // fix mega menu columns
            $drop.find('> li > label').each(function () {
                (0, _utility.$)(this).next().addClass('dropdown');
                (0, _utility.$)(this).parent().addClass('nk-drop-item');
                (0, _utility.$)(this).replaceWith((0, _utility.$)('<a href="#"></a>').html((0, _utility.$)(this).html()));
            });

            (0, _utility.$)(this).replaceWith($drop);
        });
        $nav.find('.nk-mega-item').removeClass('nk-mega-item');
    }

    // sticky navbar
    var navbarTop = $navbarTop.length ? $navbarTop.offset().top : 0;
    // fake hidden navbar to prevent page jumping on stick
    var $navbarFake = (0, _utility.$)('<div>').hide();
    function onScrollNav() {
        var stickyOn = _utility.$wnd.scrollTop() >= navbarTop;

        if (stickyOn) {
            $navbarTop.addClass('nk-navbar-fixed');
            $navbarFake.show();
        } else {
            $navbarTop.removeClass('nk-navbar-fixed');
            $navbarFake.hide();
        }
    }
    if ($navbarTop.hasClass('nk-navbar-sticky')) {
        _utility.$wnd.on('scroll resize', onScrollNav);
        onScrollNav();

        $navbarTop.after($navbarFake);
        self.debounceResize(function () {
            $navbarFake.height($navbarTop.innerHeight());
        });
    }

    // correct dropdown position
    function correctDropdown($item) {
        if ($item.parent().is('.nk-nav')) {
            var $dropdown = $item.children('.dropdown');
            var $parent = $item.closest('.nk-navbar');
            var $parentContainer = $parent.children('.container');
            $parentContainer = $parentContainer.length ? $parentContainer : $parent;

            // fix right value when sub menu is not hidden
            var css = {
                marginLeft: '',
                marginRight: '',
                marginTop: 0,
                display: 'block'
            };

            $dropdown.css(css);

            var rect = $dropdown[0].getBoundingClientRect();
            var rectContainer = $parentContainer[0].getBoundingClientRect();
            var itemRect = $item[0].getBoundingClientRect();

            // move dropdown from right corner (right corner will check in nav container)
            if (rect.right > rectContainer.right) {
                css.marginLeft = rectContainer.right - rect.right;
                $dropdown.css(css);
                rect = $dropdown[0].getBoundingClientRect();
            }

            // move dropdown from left corner
            if (rect.left < 0) {
                css.marginLeft = -rect.left;
                $dropdown.css(css);
                rect = $dropdown[0].getBoundingClientRect();
            }

            // check if dropdown not under item
            var currentLeftPost = rect.left + (css.marginLeft || 0);
            if (currentLeftPost > itemRect.left) {
                css.marginLeft = (css.marginLeft || 0) - (currentLeftPost - itemRect.left);
            }

            // correct top position
            // 10 - transform value
            css.marginTop = $parent.innerHeight() - $dropdown.offset().top + $parent.offset().top + 5;

            // hide menu
            css.display = 'none';

            $dropdown.css(css);
        }
    }

    // toggle dropdown
    function closeSubmenu($item) {
        if ($item.length) {
            $item.removeClass('open');
            _utility.tween.to($item.children('.dropdown'), 0.3, {
                opacity: 0,
                display: 'none'
            });
            _utility.$wnd.trigger('nk-closed-submenu', [$item]);
        }
    }
    function openSubmenu($item) {
        if (!$item.hasClass('open')) {
            correctDropdown($item);
            _utility.tween.to($item.children('.dropdown'), 0.3, {
                opacity: 1,
                display: 'block'
            });
            $item.addClass('open');
            _utility.$wnd.trigger('nk-opened-submenu', [$item]);
        }
    }
    var dropdownTimeout = void 0;
    $navbarTop.on('mouseenter', 'li.nk-drop-item', function () {
        var $item = (0, _utility.$)(this);
        var $openedSiblings = $item.siblings('.open').add($item.siblings().find('.open')).add($item.parents('.nk-nav:eq(0)').siblings().find('.open')).add($item.parents('.nk-nav:eq(0)').siblings('.open')).add($item.parents('.nk-nav:eq(0)').parent().siblings().find('.open'));

        clearTimeout(dropdownTimeout);
        closeSubmenu($openedSiblings);
        openSubmenu($item);
    }).on('mouseleave', 'li.nk-drop-item', function () {
        var $item = (0, _utility.$)(this);
        clearTimeout(dropdownTimeout);
        dropdownTimeout = setTimeout(function () {
            closeSubmenu($item);
        }, 200);
    });
    $navbarTop.on('mouseleave', function () {
        clearTimeout(dropdownTimeout);
        dropdownTimeout = setTimeout(function () {
            closeSubmenu($navbarTop.find('.open'));
        }, 400);
    });

    // hide / show
    // add / remove solid color
    var $autohideNav = $navbarTop.filter('.nk-navbar-autohide');
    self.throttleScroll(function (type, scroll) {
        var start = 400;
        var hideClass = 'nk-onscroll-hide';
        var showClass = 'nk-onscroll-show';

        // hide / show
        if (type === 'down' && scroll > start) {
            $autohideNav.removeClass(showClass).addClass(hideClass);
        } else if (type === 'up' || type === 'end' || type === 'start') {
            $autohideNav.removeClass(hideClass).addClass(showClass);
        }

        // add solid color
        if ($navbarTop.hasClass('nk-navbar-transparent')) {
            $navbarTop[(scroll > 70 ? 'add' : 'remove') + 'Class']('nk-navbar-solid');
        }
    });
}

exports.initNavbar = initNavbar;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initNavbarSide = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Navbar Side

-------------------------------------------------------------------*/
function initNavbarSide() {
    var self = this;
    var $overlay = (0, _utility.$)('<div class="nk-navbar-overlay">').appendTo(_utility.$body);

    // side navbars
    var $leftSide = (0, _utility.$)('.nk-navbar-left-side');
    var $rightSide = (0, _utility.$)('.nk-navbar-right-side');
    var $sideNavs = (0, _utility.$)('.nk-navbar-side');

    // toggle navbars
    function updateTogglers() {
        (0, _utility.$)('[data-nav-toggle]').each(function eachNavToggle() {
            var active = (0, _utility.$)((0, _utility.$)(this).attr('data-nav-toggle')).hasClass('open');
            (0, _utility.$)(this)[(active ? 'add' : 'remove') + 'Class']('active');
        });
    }
    self.toggleSide = function ($side, speed) {
        self[$side.hasClass('open') ? 'closeSide' : 'openSide']($side, speed);
    };
    self.openSide = function ($side, speed) {
        if ($side.css('display') === 'none') {
            return;
        }

        $side.addClass('open');

        // show sidebar
        _utility.tween.to($side, speed || 0.4, {
            x: $side.hasClass('nk-navbar-left-side') ? '100%' : '-100%',
            force3D: true
        });

        // show overlay
        if ($side.hasClass('nk-navbar-overlay-content')) {
            _utility.tween.to($overlay, 0.3, {
                opacity: 0.8,
                display: 'block',
                force3D: true
            });
        }

        updateTogglers();
    };
    self.closeSide = function ($side, speed) {
        $side.each(function eachSide() {
            (0, _utility.$)(this).removeClass('open');

            // hide sidebar
            _utility.tween.to(this, speed || 0.4, {
                x: '0%',
                force3D: true
            });
            updateTogglers();
        });

        if (!$sideNavs.filter('.nk-navbar-overlay-content.open').length) {
            // hide overlay
            _utility.tween.to($overlay, 0.3, {
                opacity: 0,
                display: 'none',
                force3D: true
            });
        }
    };
    _utility.$doc.on('click', '[data-nav-toggle]', function onNavToggleClick(e) {
        var $nav = (0, _utility.$)((0, _utility.$)(this).attr('data-nav-toggle'));
        if ($nav.hasClass('open')) {
            self.closeSide($nav);
        } else {
            // hide another navigations
            (0, _utility.$)('[data-nav-toggle]').each(function eachNavToggle() {
                self.closeSide((0, _utility.$)((0, _utility.$)(this).attr('data-nav-toggle')));
            });

            self.openSide($nav);
        }
        e.preventDefault();
    });

    // overlay
    _utility.$doc.on('click', '.nk-navbar-overlay', function () {
        self.closeSide($sideNavs);
    });

    // hide sidebar if it invisible
    self.debounceResize(function () {
        $sideNavs.filter('.open').each(function eachOpenedNavs() {
            if (!(0, _utility.$)(this).is(':visible')) {
                self.closeSide((0, _utility.$)(this));
            }
        });
    });

    // swipe side navbars
    if (!_utility.isTouch || typeof Hammer === 'undefined') {
        return;
    }
    var swipeStartSize = 50;
    var $swipeItem = void 0;
    var navSize = void 0;
    var openNav = void 0;
    var closeNav = void 0;
    var isRightSide = void 0;
    var isLeftSide = void 0;
    var isScrolling = 0;
    var swipeDir = void 0;
    var sidePos = false;
    var startSwipe = false;
    var endSwipe = false;

    // strange solution to fix pan events on the latest Chrome
    // https://github.com/hammerjs/hammer.js/issues/1065
    var mc = new Hammer.Manager(document, {
        touchAction: 'auto',
        inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
        recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }]]
    });

    // If we detect a scroll before a panleft/panright, disable panning
    // thanks: https://github.com/hammerjs/hammer.js/issues/771
    mc.on('panstart', function (e) {
        if (e.additionalEvent === 'panup' || e.additionalEvent === 'pandown') {
            isScrolling = 1;
        }
    });
    // Reenable panning
    mc.on('panend', function (e) {
        if (!isScrolling) {
            if ($swipeItem) {
                var swipeSize = void 0;
                if (sidePos) {
                    if (openNav) {
                        swipeSize = sidePos;
                    } else if (closeNav) {
                        swipeSize = navSize - sidePos;
                    } else {
                        swipeSize = 0;
                    }
                } else {
                    swipeSize = 0;
                }

                var transitionTime = Math.max(0.15, 0.4 * (navSize - swipeSize) / navSize);
                var swiped = 0;

                if (swipeSize && swipeSize > 10) {
                    var velocityTest = Math.abs(e.velocityX) > 0.7;
                    if (swipeSize >= navSize / 3 || velocityTest) {
                        swiped = 1;
                        if (openNav) {
                            self.openSide($swipeItem, transitionTime);
                        } else {
                            self.closeSide($swipeItem, transitionTime);
                        }
                    }
                }
                if (!swiped) {
                    if (openNav) {
                        self.closeSide($swipeItem, transitionTime);
                    } else {
                        self.openSide($swipeItem, transitionTime);
                    }
                }
            }
            openNav = false;
            closeNav = false;
            isRightSide = false;
            isLeftSide = false;
            swipeDir = false;
            sidePos = false;
            $swipeItem = false;
            startSwipe = false;
            endSwipe = false;
        }
        isScrolling = 0;
    });
    mc.on('panleft panright panup pandown', function (e) {
        if (isScrolling) {
            return;
        }

        var isFirst = false;
        var isFinal = e.isFinal;

        if (startSwipe === false) {
            startSwipe = e.center.x;
            isFirst = true;
        }
        endSwipe = e.center.x;

        // init
        if (isFirst) {
            if (e.direction === 2) {
                swipeDir = 'left';
            } else if (e.direction === 4) {
                swipeDir = 'right';
            } else {
                swipeDir = false;
            }

            // right side
            if ($rightSide && $rightSide.length) {
                navSize = $rightSide.width();

                // open
                if (_utility.wndW - startSwipe <= swipeStartSize && !$rightSide.hasClass('open') && !$leftSide.hasClass('open')) {
                    openNav = 1;
                    isRightSide = 1;

                    // close
                } else if (_utility.wndW - startSwipe >= navSize - 100 && $rightSide.hasClass('open')) {
                    closeNav = 1;
                    isRightSide = 1;
                }
            }

            // left side
            if ($leftSide && $leftSide.length && !isRightSide && $leftSide.is(':visible')) {
                navSize = $leftSide.width();

                // open
                if (startSwipe <= swipeStartSize && !$rightSide.hasClass('open') && !$leftSide.hasClass('open')) {
                    openNav = 1;
                    isLeftSide = 1;

                    // close
                } else if (startSwipe >= navSize - 100 && $leftSide.hasClass('open')) {
                    closeNav = 1;
                    isLeftSide = 1;
                }
            }

            // swipe item
            if (isLeftSide) {
                $swipeItem = $leftSide;
            } else if (isRightSide) {
                $swipeItem = $rightSide;
            } else {
                $swipeItem = false;
            }

            // move
        } else if (!isFinal && $swipeItem) {
            if (isRightSide && (openNav && swipeDir === 'left' || closeNav && swipeDir === 'right')) {
                // open side navbar
                if (openNav) {
                    sidePos = Math.min(navSize, Math.max(0, startSwipe - endSwipe));
                }

                // close side navbar
                if (closeNav) {
                    var curPos = startSwipe - endSwipe;
                    if (startSwipe < _utility.wndW - navSize) {
                        curPos = _utility.wndW - navSize - endSwipe;
                    }
                    sidePos = navSize - Math.abs(Math.max(-navSize, Math.min(0, curPos)));
                }

                _utility.tween.set($swipeItem, {
                    x: -100 * sidePos / navSize + '%'
                });
            } else if (isLeftSide && (openNav && swipeDir === 'right' || closeNav && swipeDir === 'left')) {
                // open mobile navbar
                if (openNav) {
                    sidePos = Math.min(navSize, Math.max(0, endSwipe - startSwipe));
                }

                // close mobile navbar
                if (closeNav) {
                    var curPos2 = endSwipe - startSwipe;
                    if (startSwipe > navSize) {
                        curPos2 = endSwipe - navSize;
                    }
                    sidePos = navSize - Math.abs(Math.max(-navSize, Math.min(0, curPos2)));
                }

                _utility.tween.set($swipeItem, {
                    x: 100 * sidePos / navSize + '%'
                });
            }
        }
    });

    // prevent scrolling when opening/hiding navigation
    window.addEventListener('touchmove', function (e) {
        if (isRightSide || isLeftSide) {
            e.srcEvent.preventDefault();
            e.preventDefault();
        }
    }, { passive: false });
}

exports.initNavbarSide = initNavbarSide;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initNavbarDropEffect1 = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Dropdown Effect 1 for side navbars and fullscreen

-------------------------------------------------------------------*/
function initNavbarDropEffect1() {
    var self = this;
    var $navbars = (0, _utility.$)('.nk-navbar-side, .nk-navbar-full');

    // add back item for dropdowns
    $navbars.find('.dropdown').prepend('<li class="bropdown-back"><a href="#">' + self.options.templates.secondaryNavbarBackItem + '</a></li>');

    // change height of opened dropdown
    function updateSideNavDropdown($item) {
        var $nav = $item.parents('.nk-navbar:eq(0)');
        var $khNav = $nav.find('.nk-nav');
        var $nanoCont = $khNav.children('.nano-content');
        var $khNavRow = $khNav.parent();
        var $drop = $nav.find('.nk-drop-item.open > .dropdown:not(.closed)');

        if ($drop.length) {
            var dropHeight = $drop.innerHeight();

            // vertical center for dropdown
            if ($khNavRow.hasClass('nk-nav-row-center')) {
                $drop.css({
                    top: 0
                });

                $khNav.hide();
                var nanoHeight = $khNavRow.innerHeight();
                $khNav.show();
                var nanoNavRowHeight = nanoHeight;
                var nanoTop = $khNavRow.offset().top;
                var dropTop = $drop.offset().top;

                var top = nanoTop - dropTop;
                if (dropHeight < nanoNavRowHeight) {
                    top += (nanoHeight - dropHeight) / 2;
                }

                $drop.css({
                    top: top
                });
            }

            $khNav.css('height', dropHeight);
            self.initPluginNano($nav);

            // scroll to top
            _utility.tween.to($nanoCont, 0.3, {
                scrollTo: { y: 0 },
                delay: 0.2
            });
        } else {
            $khNav.css('height', '');
        }
        self.initPluginNano($nav);
    }

    // open / close submenu
    function toggleSubmenu(open, $drop) {
        var $newItems = $drop.find('> .dropdown > li > a');
        var $oldItems = $drop.parent().find('> li > a');

        if (open) {
            $drop.addClass('open').parent().addClass('closed');
        } else {
            $drop.removeClass('open').parent().removeClass('closed');

            var tmp = $newItems;
            $newItems = $oldItems;
            $oldItems = tmp;
        }

        // show items
        _utility.tween.set($newItems, {
            x: open ? '20%' : '-20%',
            opacity: 0,
            display: 'block'
        }, 0.1);
        _utility.tween.staggerTo($newItems, 0.2, {
            x: '0%',
            opacity: 1,
            delay: 0.1
        }, 0.05);

        // hide items
        _utility.tween.staggerTo($oldItems, 0.2, {
            x: open ? '-20%' : '20%',
            opacity: 0
        }, 0.05, function () {
            $oldItems.css('display', 'none');
        });
    }

    $navbars.on('click', '.nk-drop-item > a', function (e) {
        toggleSubmenu(true, (0, _utility.$)(this).parent());
        updateSideNavDropdown((0, _utility.$)(this));
        e.preventDefault();
    });
    $navbars.on('click', '.bropdown-back > a', function (e) {
        toggleSubmenu(false, (0, _utility.$)(this).parent().parent().parent());
        updateSideNavDropdown((0, _utility.$)(this));
        e.preventDefault();
    });
}

exports.initNavbarDropEffect1 = initNavbarDropEffect1;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initBackgrounds = undefined;

var _utility = __webpack_require__(0);

/* Bootstrap Backgrounds */
function initBackgrounds() {
    if (typeof MutationObserver === 'undefined') {
        return;
    }

    // fix page backgrounds right offset when body padding changed (for example when showed bootstrap modal).
    var $backgrounds = (0, _utility.$)('.nk-page-background-top, .nk-page-background-bottom, .nk-page-background-fixed');
    if ($backgrounds.length) {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function () {
                var right = (0, _utility.$)('body').css('padding-right');
                if (right) {
                    $backgrounds.css('width', 'calc(100% - ' + right + ')');
                } else {
                    $backgrounds.css('width', '');
                }
            });
        });

        observer.observe(_utility.$body[0], { attributes: true, attributeFilter: ['style'] });
    }
}

exports.initBackgrounds = initBackgrounds;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initCounters = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Counters

-------------------------------------------------------------------*/
function initCounters() {
    var self = this;
    var $progressCount = (0, _utility.$)('.nk-progress.nk-count');
    var $numberCount = (0, _utility.$)('.nk-count:not(.nk-progress)');

    // set default progress
    $progressCount.each(function () {
        (0, _utility.$)(this).attr('data-nk-count', (0, _utility.$)(this).attr('data-progress')).attr('data-nk-mask', (0, _utility.$)(this).attr('data-progress-mask')).find('.nk-progress-line > div').css('width', ((0, _utility.$)(this).attr('data-nk-count-from') || '0') + '%').find('.nk-progress-percent').html('');
    });

    // set default numbers
    $numberCount.each(function () {
        (0, _utility.$)(this).attr('data-nk-count', (0, _utility.$)(this).attr('data-nk-count') || parseInt((0, _utility.$)(this).text(), 10)).html((0, _utility.$)(this).attr('data-nk-count-from') || '0');
    });

    var countersNum = 1;
    function runCounters() {
        if (!countersNum) {
            return;
        }

        var progress = $progressCount.filter('[data-nk-count]');
        var numbers = $numberCount.filter('[data-nk-count]');
        countersNum = progress.length + numbers.length;

        // progress
        $progressCount.filter('[data-nk-count]').each(function () {
            var $item = (0, _utility.$)(this);
            if (self.isInViewport($item)) {
                var count = {
                    curr: $item.attr('data-nk-count-from') || '0',
                    to: $item.attr('data-nk-count'),
                    mask: $item.attr('data-nk-mask') || '{$}%'
                };
                var $itemLine = $item.find('.nk-progress-line > div');
                var $itemLabel = $item.find('.nk-progress-percent');

                _utility.tween.to($itemLine, 1, {
                    width: count.to + '%'
                });
                _utility.tween.to(count, 1, {
                    curr: count.to,
                    roundProps: 'curr',
                    ease: Circ.easeIn,
                    onUpdate: function onUpdate() {
                        $itemLabel.text(count.mask.replace('{$}', count.curr));
                    }
                });
                $item.removeAttr('data-nk-count');
            }
        });

        // number
        $numberCount.filter('[data-nk-count]').each(function () {
            var $item = (0, _utility.$)(this);
            if (self.isInViewport($item)) {
                var count = {
                    curr: $item.text(),
                    to: $item.attr('data-nk-count')
                };
                $item.removeAttr('data-nk-count data-nk-count-from');
                _utility.tween.to(count, 1, {
                    curr: count.to,
                    roundProps: 'curr',
                    ease: Circ.easeIn,
                    onUpdate: function onUpdate() {
                        $item.text(count.curr);
                    }
                });
            }
        });
    }

    self.throttleScroll(runCounters);
    runCounters();
}

exports.initCounters = initCounters;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initStore = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Store

-------------------------------------------------------------------*/
function initStore() {
    var self = this;

    // scroll to ratings
    _utility.$doc.on('click', 'a.nk-product-rating', function (e) {
        var isHash = this.hash;
        if (isHash) {
            var $hashBlock = (0, _utility.$)(isHash).parents('.nk-tabs:eq(0)');
            if ($hashBlock.length) {
                self.scrollTo($hashBlock);
            }
            (0, _utility.$)('.nk-tabs').find('[data-toggle="tab"][href="' + isHash + '"]').click();
        }
        e.preventDefault();
    });
}

exports.initStore = initStore;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initNewsBox = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

 Init News Box

 -------------------------------------------------------------------*/
function initNewsBox() {
    _utility.$doc.on('click', '.nk-news-box .nk-news-box-item', function () {
        var $this = (0, _utility.$)(this);
        var $info = $this.parents('.nk-news-box:eq(0)').find('.nk-news-box-each-info');

        // get data
        var data = {
            title: $this.find('.nk-news-box-item-title').html(),
            img: $this.find('.nk-news-box-item-full-img').attr('src'),
            img_alt: $this.find('.nk-news-box-item-full-img').attr('alt'),
            categories: $this.find('.nk-news-box-item-categories').html(),
            text: $this.find('.nk-news-box-item-text').html(),
            url: $this.find('.nk-news-box-item-url').attr('href'),
            date: $this.find('.nk-news-box-item-date').html()
        };

        // set data
        $info.find('.nk-news-box-item-title').html(data.title);
        if ($info.find('.nk-news-box-item-image > img').length) {
            $info.find('.nk-news-box-item-image > img').attr('src', data.img).attr('alt', data.img_alt);
        } else {
            $info.find('.nk-news-box-item-image').css('background-image', 'url("' + data.img + '")');
        }
        $info.find('.nk-news-box-item-categories').html(data.categories);
        $info.find('.nk-news-box-item-text').html(data.text);
        $info.find('.nk-news-box-item-more').attr('href', data.url);
        $info.find('.nk-news-box-item-date').html(data.date);

        // activate item
        $this.addClass('nk-news-box-item-active').siblings().removeClass('nk-news-box-item-active');
    });

    // click on active item on load
    (0, _utility.$)('.nk-news-box .nk-news-box-item-active').trigger('click');
}

exports.initNewsBox = initNewsBox;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initAnchors = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Anchors

-------------------------------------------------------------------*/
function initAnchors() {
    var self = this;

    // click on anchors
    var $leftSideNav = (0, _utility.$)('.nk-navbar-left-side');
    var $rightSideNav = (0, _utility.$)('.nk-navbar-right-side');
    function closeNavs() {
        self.closeSide($leftSideNav);
        self.closeSide($rightSideNav);
        self.closeFullscreenNavbar();
    }
    _utility.$doc.on('click', '.navbar a, .nk-navbar a, a.btn, a.nk-btn, a.nk-anchor', function (e) {
        var isHash = this.hash;
        var isURIsame = this.baseURI === window.location.href;

        if (isHash && isURIsame) {
            // sometimes hashs have no valid selector like ##hash, it will throw errors
            try {
                var $hashBlock = (0, _utility.$)(isHash);
                var hash = isHash.replace(/^#/, '');
                if ($hashBlock.length || hash === 'top' || hash === 'bottom') {
                    // close navigations
                    closeNavs();

                    // scroll to block
                    self.scrollTo($hashBlock.length ? $hashBlock : hash);

                    e.preventDefault();
                }
                // eslint-disable-next-line
            } catch (evt) {}
        }
    });

    // add active class on navbar items
    var $anchorItems = (0, _utility.$)('.nk-navbar .nk-nav > li > a[href*="#"]');
    var anchorBlocks = [];
    function hashInArray(item) {
        for (var k = 0; k < anchorBlocks.length; k++) {
            if (anchorBlocks[k].hash === item) {
                return k;
            }
        }
        return false;
    }
    // get all anchors + blocks on the page
    $anchorItems.each(function () {
        var hash = this.hash.replace(/^#/, '');
        if (!hash) {
            return;
        }

        var $item = (0, _utility.$)(this).parent();
        var $block = (0, _utility.$)('#' + hash);

        if (hash && $block.length || hash === 'top') {
            var inArray = hashInArray(hash);
            if (inArray === false) {
                anchorBlocks.push({
                    hash: hash,
                    $item: $item,
                    $block: $block
                });
            } else {
                anchorBlocks[inArray].$item = anchorBlocks[inArray].$item.add($item);
            }
        }
    });
    // prepare anchor list and listen for scroll to activate items in navbar
    function updateAnchorItemsPositions() {
        for (var k = 0; k < anchorBlocks.length; k++) {
            var item = anchorBlocks[k];
            var blockTop = 0;
            var blockH = _utility.wndH;
            if (item.$block.length) {
                blockTop = item.$block.offset().top;
                blockH = item.$block.innerHeight();
            }
            item.activate = blockTop - _utility.wndH / 2;
            item.deactivate = blockTop + blockH - _utility.wndH / 2;
        }
    }
    function setAnchorActiveItem(type, ST) {
        for (var k = 0; k < anchorBlocks.length; k++) {
            var item = anchorBlocks[k];
            var active = ST >= item.activate && ST < item.deactivate;
            item.$item[active ? 'addClass' : 'removeClass']('active');
        }
    }
    if (anchorBlocks.length) {
        updateAnchorItemsPositions();
        setAnchorActiveItem('static', _utility.$wnd.scrollTop());
        self.throttleScroll(setAnchorActiveItem);
        self.debounceResize(updateAnchorItemsPositions);
    }
}

exports.initAnchors = initAnchors;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initVideoBlocks = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Video Blocks

-------------------------------------------------------------------*/
function initVideoBlocks() {
    if (typeof window.VideoWorker === 'undefined') {
        return;
    }
    var self = this;

    // init plain video
    function addPlainPlayButton($plainCont) {
        $plainCont.find('.nk-video-plain-toggle').html(self.options.templates.plainVideoIcon);
    }
    function addPlainLoadButton($plainCont) {
        $plainCont.find('.nk-video-plain-toggle').html(self.options.templates.plainVideoLoadIcon);
    }
    (0, _utility.$)('.nk-plain-video[data-video]').each(function () {
        var $plainCont = (0, _utility.$)(this);
        var $plainIframe = void 0;
        var url = (0, _utility.$)(this).attr('data-video');
        var thumb = (0, _utility.$)(this).attr('data-video-thumb');
        var api = new VideoWorker(url, {
            autoplay: 0,
            loop: 0,
            mute: 0,
            controls: 1
        });

        if (api && api.isValid()) {
            var loaded = 0;
            var clicked = 0;

            // add play event
            $plainCont.on('click', function () {
                if (_utility.isMobile) {
                    window.open(api.url);
                    return;
                }

                if (clicked) {
                    return;
                }
                clicked = 1;

                // add loading button
                if (!loaded) {
                    addPlainLoadButton($plainCont);

                    api.getIframe(function (iframe) {
                        // add iframe
                        $plainIframe = (0, _utility.$)(iframe);
                        var $parent = $plainIframe.parent();
                        _utility.tween.set(iframe, {
                            opacity: 0,
                            visibility: 'hidden'
                        });
                        $plainIframe.appendTo($plainCont);
                        $parent.remove();
                        api.play();
                    });
                } else {
                    api.play();
                }
            });

            // add play button
            $plainCont.append('<span class="nk-video-plain-toggle"></span>');
            addPlainPlayButton($plainCont);

            // set thumb
            if (thumb) {
                $plainCont.css('background-image', 'url("' + thumb + '")');
            } else {
                api.getImageURL(function (imgSrc) {
                    $plainCont.css('background-image', 'url("' + imgSrc + '")');
                });
            }

            if (_utility.isMobile) {
                return;
            }

            api.on('ready', function () {
                api.play();
            });
            api.on('play', function () {
                _utility.tween.to($plainIframe, 0.5, {
                    opacity: 1,
                    visibility: 'visible',
                    onComplete: function onComplete() {
                        // add play button
                        if (!loaded) {
                            addPlainPlayButton($plainCont);
                            loaded = 1;
                        }
                    }
                });

                // pause audio
                if (typeof soundManager !== 'undefined') {
                    soundManager.pauseAll();
                }
            });
            api.on('pause', function () {
                _utility.tween.to($plainIframe, 0.5, {
                    opacity: 0,
                    onComplete: function onComplete() {
                        _utility.tween.set($plainIframe, {
                            visibility: 'hidden'
                        });
                        clicked = 0;
                    }
                });
            });
        }
    });
}

exports.initVideoBlocks = initVideoBlocks;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initGIF = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init GIFs

-------------------------------------------------------------------*/
function initGIF() {
    var self = this;

    // load gif in background
    function loadGif(url, cb) {
        var temp = new Image();
        temp.onload = function () {
            cb();
        };
        temp.src = url;
    }

    // play gif
    function playGif(item) {
        var $item = (0, _utility.$)(item);
        if (!item.gifPlaying) {
            item.gifPlaying = true;
            if (item.khGifLoaded) {
                $item.addClass('nk-gif-playing');
                $item.find('img').attr('src', $item.find('img').attr('data-gif'));
            } else if (!item.khGifLoading) {
                item.khGifLoading = 1;
                $item.addClass('nk-gif-loading');
                loadGif($item.find('img').attr('data-gif'), function () {
                    item.khGifLoaded = 1;
                    $item.removeClass('nk-gif-loading');
                    if (item.gifPlaying) {
                        item.gifPlaying = false;
                        playGif(item);
                    }
                });
            }
        }
    }

    // stop playing gif
    function stopGif(item) {
        var $item = (0, _utility.$)(item);
        if (item.gifPlaying) {
            item.gifPlaying = false;
            $item.removeClass('nk-gif-playing');
            $item.find('img').attr('src', $item.find('img').attr('data-gif-static'));
        }
    }

    // prepare gif containers
    (0, _utility.$)('.nk-gif').each(function () {
        var $this = (0, _utility.$)(this);
        // add toggle button
        $this.append('<a class="nk-gif-toggle">' + self.options.templates.gifIcon + '</a>');

        // add loading circle
        $this.append('<div class="nk-loading-spinner"><i></i></div>');

        $this.find('img').attr('data-gif-static', $this.find('img').attr('src'));
    });

    // hover gif
    (0, _utility.$)('.nk-gif-hover').on('mouseenter', function () {
        (0, _utility.$)(this).addClass('hover');
        playGif(this);
    }).on('mouseleave', function () {
        (0, _utility.$)(this).removeClass('hover');
        stopGif(this);
    });

    // click gif
    (0, _utility.$)('.nk-gif-click').on('click', function () {
        if (this.gifPlaying) {
            (0, _utility.$)(this).removeClass('hover');
            stopGif(this);
        } else {
            (0, _utility.$)(this).addClass('hover');
            playGif(this);
        }
    });

    // autoplay in viewport
    var $gifVP = (0, _utility.$)('.nk-gif-viewport');
    if ($gifVP.length) {
        self.throttleScroll(function () {
            $gifVP.each(function () {
                var inVP = self.isInViewport((0, _utility.$)(this), 1);
                if (inVP[0]) {
                    if (inVP[1].height / _utility.wndH < 0.7) {
                        if (inVP[0] === 1) {
                            playGif(this);
                        } else {
                            stopGif(this);
                        }
                    } else if (inVP[0] >= 0.7) {
                        playGif(this);
                    } else {
                        stopGif(this);
                    }
                } else {
                    stopGif(this);
                }
            });
        });
    }

    // autoplay gif
    (0, _utility.$)('.nk-gif:not(.nk-gif-click):not(.nk-gif-hover):not(.nk-gif-viewport)').each(function () {
        playGif(this);
    });
}

exports.initGIF = initGIF;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initInfoBoxes = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Info Boxes / Alerts

-------------------------------------------------------------------*/
function initInfoBoxes() {
    var self = this;

    // close
    _utility.$doc.on('click', '.nk-info-box .nk-info-box-close', function (e) {
        e.preventDefault();
        var $box = (0, _utility.$)(this).parents('.nk-info-box:eq(0)');
        _utility.tween.to($box, 0.3, {
            opacity: 0,
            onComplete: function onComplete() {
                _utility.tween.to($box, 0.3, {
                    height: 0,
                    padding: 0,
                    margin: 0,
                    display: 'none',
                    onComplete: function onComplete() {
                        self.debounceResize();
                    }
                });
            }
        });
    });
}

exports.initInfoBoxes = initInfoBoxes;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initForms = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init AJAX Forms

-------------------------------------------------------------------*/
function initForms() {
    if (typeof _utility.$.validator === 'undefined') {
        return;
    }
    var self = this;

    // Validate Khaki Forms
    (0, _utility.$)('form:not(.nk-form-ajax):not(.nk-mchimp):not([novalidate])').each(function () {
        (0, _utility.$)(this).validate({
            errorClass: 'nk-error',
            errorElement: 'div',
            errorPlacement: function errorPlacement(error, element) {
                var $parent = element.parent('.input-group');
                if ($parent.length) {
                    $parent.after(error);
                } else {
                    element.after(error);
                }
                self.debounceResize();
            }
        });
    });
    // ajax form
    (0, _utility.$)('form.nk-form-ajax:not([novalidate])').each(function () {
        (0, _utility.$)(this).validate({
            errorClass: 'nk-error',
            errorElement: 'div',
            errorPlacement: function errorPlacement(error, element) {
                var $parent = element.parent('.input-group');
                if ($parent.length) {
                    $parent.after(error);
                } else {
                    element.after(error);
                }
                self.debounceResize();
            },

            // Submit the form via ajax (see: jQuery Form plugin)
            submitHandler: function submitHandler(form) {
                var $responseSuccess = (0, _utility.$)(form).find('.nk-form-response-success');
                var $responseError = (0, _utility.$)(form).find('.nk-form-response-error');
                var $form = (0, _utility.$)(form);

                _utility.$.ajax({
                    type: 'POST',
                    url: $form.attr('action'),
                    data: $form.serialize(),
                    success: function success(response) {
                        response = JSON.parse(response);
                        if (response.type && response.type === 'success') {
                            $responseError.hide();
                            $responseSuccess.html(response.response).show();
                            form.reset();
                        } else {
                            $responseSuccess.hide();
                            $responseError.html(response.response).show();
                        }
                        self.debounceResize();
                    },
                    error: function error(response) {
                        $responseSuccess.hide();
                        $responseError.html(response.responseText).show();
                        self.debounceResize();
                    }
                });
            }
        });
    });
}

exports.initForms = initForms;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initFormsMailChimp = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init MailChimp

-------------------------------------------------------------------*/
function initFormsMailChimp() {
    var $mchimp = (0, _utility.$)('form.nk-mchimp');
    if (typeof _utility.$.validator === 'undefined' || !$mchimp.length) {
        return;
    }
    var self = this;

    // Additional Validate Methods From MailChimp
    // Validate a multifield birthday
    _utility.$.validator.addMethod('mc_birthday', function (date, element, groupingClass) {
        var isValid = false;
        var $fields = (0, _utility.$)('input:not(:hidden)', (0, _utility.$)(element).closest(groupingClass));
        if ($fields.filter(':filled').length === 0 && this.optional(element)) {
            isValid = true; // None have been filled out, so no error
        } else {
            var dateArray = [];
            dateArray.month = $fields.filter('input[name*="[month]"]').val();
            dateArray.day = $fields.filter('input[name*="[day]"]').val();

            // correct month value
            dateArray.month -= 1;

            var testDate = new Date(1970, dateArray.month, dateArray.day);
            if (testDate.getDate() !== dateArray.day || testDate.getMonth() !== dateArray.month) {
                isValid = false;
            } else {
                isValid = true;
            }
        }
        return isValid;
    }, 'Please enter a valid month and day.');

    // Validate a multifield date
    _utility.$.validator.addMethod('mc_date', function (date, element, groupingClass) {
        var isValid = false;
        var $fields = (0, _utility.$)('input:not(:hidden)', (0, _utility.$)(element).closest(groupingClass));
        if ($fields.filter(':filled').length === 0 && this.optional(element)) {
            isValid = true; // None have been filled out, so no error
        } else {
            var dateArray = [];
            dateArray.month = $fields.filter('input[name*="[month]"]').val();
            dateArray.day = $fields.filter('input[name*="[day]"]').val();
            dateArray.year = $fields.filter('input[name*="[year]"]').val();

            // correct month value
            dateArray.month -= 1;

            // correct year value
            if (dateArray.year.length < 4) {
                dateArray.year = parseInt(dateArray.year, 10) < 50 ? 2000 + parseInt(dateArray.year, 10) : 1900 + parseInt(dateArray.year, 10);
            }

            var testDate = new Date(dateArray.year, dateArray.month, dateArray.day);
            if (testDate.getDate() !== dateArray.day || testDate.getMonth() !== dateArray.month || testDate.getFullYear() !== dateArray.year) {
                isValid = false;
            } else {
                isValid = true;
            }
        }
        return isValid;
    }, 'Please enter a valid date');

    // Validate a multifield phone number
    _utility.$.validator.addMethod('mc_phone', function (phoneNumber, element, groupingClass) {
        var isValid = false;
        var $fields = (0, _utility.$)('input:filled:not(:hidden)', (0, _utility.$)(element).closest(groupingClass));
        if ($fields.length === 0 && this.optional(element)) {
            isValid = true; // None have been filled out, so no error
        } else {
            phoneNumber = $fields.eq(0).val() + $fields.eq(1).val() + $fields.eq(2).val();
            isValid = phoneNumber.length === 10 && phoneNumber.match(/[0-9]{9}/);
        }
        return isValid;
    }, 'Please specify a valid phone number');

    _utility.$.validator.addMethod('skip_or_complete_group', function (value, element, groupingClass) {
        var $fields = (0, _utility.$)('input:not(:hidden)', (0, _utility.$)(element).closest(groupingClass));
        var $fieldsFirst = $fields.eq(0);
        var validator = $fieldsFirst.data('valid_skip') ? $fieldsFirst.data('valid_skip') : _utility.$.extend({}, this);
        var numberFilled = $fields.filter(function () {
            return validator.elementValue(this);
        }).length;
        var isValid = numberFilled === 0 || numberFilled === $fields.length;

        // Store the cloned validator for future validation
        $fieldsFirst.data('valid_skip', validator);

        // If element isn't being validated, run each field's validation rules
        if (!(0, _utility.$)(element).data('being_validated')) {
            $fields.data('being_validated', true);
            $fields.each(function () {
                validator.element(this);
            });
            $fields.data('being_validated', false);
        }
        return isValid;
    }, _utility.$.validator.format('Please supply missing fields.'));

    _utility.$.validator.addMethod('skip_or_fill_minimum', function (value, element, options) {
        var $fields = (0, _utility.$)(options[1], element.form);
        var $fieldsFirst = $fields.eq(0);
        var validator = $fieldsFirst.data('valid_skip') ? $fieldsFirst.data('valid_skip') : _utility.$.extend({}, this);
        var numberFilled = $fields.filter(function () {
            return validator.elementValue(this);
        }).length;
        var isValid = numberFilled === 0 || numberFilled >= options[0];
        // Store the cloned validator for future validation
        $fieldsFirst.data('valid_skip', validator);

        // If element isn't being validated, run each skip_or_fill_minimum field's validation rules
        if (!(0, _utility.$)(element).data('being_validated')) {
            $fields.data('being_validated', true);
            $fields.each(function () {
                validator.element(this);
            });
            $fields.data('being_validated', false);
        }
        return isValid;
    }, _utility.$.validator.format('Please either skip these fields or fill at least {0} of them.'));

    _utility.$.validator.addMethod('zipcodeUS', function (value, element) {
        return this.optional(element) || /^\d{5}-\d{4}$|^\d{5}$/.test(value);
    }, 'The specified US ZIP Code is invalid');

    $mchimp.each(function () {
        var $form = (0, _utility.$)(this);
        if (!$form.length) {
            return;
        }

        var validator = $form.validate({
            errorClass: 'nk-error',
            errorElement: 'div',
            // Grouping fields makes jQuery Validation display one error for all the fields in the group
            // It doesn't have anything to do with how the fields are validated (together or separately),
            // it's strictly for visual display of errors
            groups: function groups() {
                var groups = {};
                $form.find('.input-group').each(function () {
                    // TODO: What about non-text inputs like number?
                    var inputs = (0, _utility.$)(this).find('input:text:not(:hidden)');
                    if (inputs.length > 1) {
                        var mergeName = inputs.first().attr('name');
                        var fieldNames = _utility.$.map(inputs, function (f) {
                            return f.name;
                        });
                        groups[mergeName.substring(0, mergeName.indexOf('['))] = fieldNames.join(' ');
                    }
                });
                return groups;
            },

            // Place a field's inline error HTML just before the div.input-group closing tag
            errorPlacement: function errorPlacement(error, element) {
                element.closest('.input-group').after(error);
                self.debounceResize();
            },

            // Submit the form via ajax (see: jQuery Form plugin)
            submitHandler: function submitHandler() {
                var $responseSuccess = $form.find('.nk-form-response-success');
                var $responseError = $form.find('.nk-form-response-error');
                var url = $form.attr('action');
                url = url.replace('/post?u=', '/post-json?u=');
                url += '&c=?';

                _utility.$.ajax({
                    dataType: 'jsonp',
                    url: url,
                    data: $form.serializeArray(),
                    success: function success(resp) {
                        $responseSuccess.hide();
                        $responseError.hide();

                        // On successful form submission, display a success message and reset the form
                        if (resp.result === 'success') {
                            $responseSuccess.show().html(resp.msg);
                            $form[0].reset();

                            // If the form has errors, display them, inline if possible, or appended to #mce-error-response
                        } else {
                            // Example errors - Note: You only get one back at a time even if you submit several that are bad.
                            // Error structure - number indicates the index of the merge field that was invalid, then details
                            // Object {result: "error", msg: "6 - Please enter the date"}
                            // Object {result: "error", msg: "4 - Please enter a value"}
                            // Object {result: "error", msg: "9 - Please enter a complete address"}

                            // Try to parse the error into a field index and a message.
                            // On failure, just put the dump thing into in the msg letiable.
                            var index = -1;
                            var msg = void 0;
                            try {
                                var parts = resp.msg.split(' - ', 2);
                                if (typeof parts[1] === 'undefined') {
                                    msg = resp.msg;
                                } else {
                                    var i = parseInt(parts[0], 10);
                                    if (i.toString() === parts[0]) {
                                        index = parts[0];
                                        msg = parts[1];
                                    } else {
                                        index = -1;
                                        msg = resp.msg;
                                    }
                                }
                            } catch (e) {
                                index = -1;
                                msg = resp.msg;
                            }

                            try {
                                // If index is -1 if means we don't have data on specifically which field was invalid.
                                // Just lump the error message into the generic response div.
                                if (index === -1) {
                                    $responseError.show().html(msg);
                                } else {
                                    var fieldName = $form.find('input[name]:eq(' + index + ')').attr('name'); // Make sure this exists
                                    var data = {};
                                    data[fieldName] = msg;
                                    validator.showErrors(data);
                                }
                            } catch (e) {
                                $responseError.show().html(msg);
                            }
                        }
                        self.debounceResize();
                    },
                    error: function error(response) {
                        $responseSuccess.hide();
                        $responseError.html(response.responseText).show();
                        self.debounceResize();
                    }
                });
            }
        });
    });

    // Custom validation methods for fields with certain css classes
    _utility.$.validator.addClassRules('birthday', { digits: true, mc_birthday: '.datefield' });
    _utility.$.validator.addClassRules('datepart', { digits: true, mc_date: '.datefield' });
    _utility.$.validator.addClassRules('phonepart', { digits: true, mc_phone: '.phonefield' });
}

exports.initFormsMailChimp = initFormsMailChimp;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initAudioPlayer = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

 Init Audio Player

 -------------------------------------------------------------------*/
function initAudioPlayer() {
    if (typeof soundManager === 'undefined') {
        return;
    }

    var _self = this;
    var progressBusy = false; // busy when user drag progress bar

    /* Plain audio players */
    var $playersPlain = (0, _utility.$)('.nk-audio-plain');
    // add play and pause buttons
    $playersPlain.prepend(_self.options.templates.audioPlainButton);
    var PlayersPlain = function PlayersPlain($item) {
        var self = this;
        self.$item = $item;
        self.url = $item.attr('data-src');
        self.$playPauseBtn = $item.find('.nk-audio-plain-play-pause');
        self.$progress = $item.find('.nk-audio-progress-current');

        self.$timer = $item.find('.nk-audio-plain-duration');
        self.$timer.attr('data-duration', self.$timer.text());

        function onPlay() {
            $item.addClass('nk-audio-plain-playing');
        }
        function onStop() {
            self.seek(0);
            self.step();
            self.$item.removeClass('nk-audio-plain-playing');
            self.$timer.text(self.$timer.attr('data-duration'));
        }
        self.api = soundManager.createSound({
            volume: 100,
            whileplaying: function whileplaying() {
                self.step();
            },

            onplay: onPlay,
            onresume: onPlay,
            onpause: function onpause() {
                self.$item.removeClass('nk-audio-plain-playing');
                self.$timer.text(self.$timer.attr('data-duration'));
            },

            onstop: onStop,
            onfinish: onStop,
            onload: function onload(ok) {
                if (!ok && this._iO && this._iO.onerror) {
                    this._iO.onerror();
                }
            }
        });

        self.$playPauseBtn.on('click', function () {
            if (!self.api.paused && self.api.playState && self.api.url) {
                self.pause();
            } else {
                self.play();
            }
        });
    };
    PlayersPlain.prototype = {
        /**
         * Play a song in the playlist.
         * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
         */
        play: function play() {
            // pause all players
            soundManager.pauseAll();

            // Begin playing the sound.
            this.api.play({
                url: this.url
            });
        },


        /**
         * Pause the currently playing track.
         */
        pause: function pause() {
            // Puase the sound.
            soundManager.pauseAll();
        },

        /**
         * Seek to a new position in the currently playing track.
         * @param  {Number} per Percentage through the song to skip.
         */
        seek: function seek(per) {
            this.api.setPosition(this.api.duration * per);
        },

        /**
         * The step called within requestAnimationFrame to update the playback position.
         */
        step: function step() {
            var self = this;
            // Determine our current seek position.
            var seek = self.api.position || 0;
            self.progress = seek / self.api.duration;
            self.$timer[0].innerHTML = self.formatTime(Math.round(seek));

            if (!progressBusy) {
                self.$progress[0].style.width = (self.progress * 100 || 0) + '%';
            }
        },


        /**
         * Format the time from seconds to M:SS.
         * @param  {Number} secs Seconds to format.
         * @return {String}      Formatted time.
         */
        formatTime: function formatTime(msec) {
            var secs = Math.round(msec / 1000) || 0;
            var minutes = Math.floor(secs / 60) || 0;
            minutes = (minutes < 10 ? '0' : 0) + minutes;
            var seconds = secs - minutes * 60;
            return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        }
    };

    // progress
    if (typeof Hammer !== 'undefined') {
        var $progresses = $playersPlain.find('.nk-audio-progress');
        $progresses.each(function () {
            var $curProgressCont = (0, _utility.$)(this);
            var $curProgres = $curProgressCont.children();
            var curApi = void 0;
            var progressW = void 0;
            var progressCurW = void 0;
            var progressStart = false;
            var HammerProgress = new Hammer.Manager($curProgressCont[0]);
            HammerProgress.add(new Hammer.Pan({
                pointers: 1,
                threshold: 0
            }));
            HammerProgress.add(new Hammer.Press({
                time: 1
            }));
            HammerProgress.on('pan press pressup', function (e) {
                // start
                if (e.type === 'press' || progressStart === false) {
                    progressBusy = true;
                    progressW = $curProgressCont.width();
                    progressStart = e.pointers[0].clientX - $curProgressCont[0].getBoundingClientRect().left;
                    $curProgressCont.addClass('hover');
                }

                // each
                progressCurW = Math.min(1, Math.max(0, (progressStart + e.deltaX) / progressW));
                $curProgres[0].style.width = progressCurW * 100 + '%';

                // end
                if (e.isFinal || e.type === 'pressup') {
                    if (!curApi) {
                        curApi = $curProgressCont.parents('.nk-audio-player-main, .nk-audio-plain')[0].audioAPI;
                    }
                    if (curApi) {
                        curApi.seek(progressCurW);
                    }

                    $curProgressCont.removeClass('hover');
                    progressBusy = false;
                    progressStart = false;
                }

                e.preventDefault();
            });
        });
    }

    soundManager.onready(function () {
        if ($playersPlain.length) {
            $playersPlain.each(function () {
                this.audioAPI = new PlayersPlain((0, _utility.$)(this));
            });
        }
    });
}

exports.initAudioPlayer = initAudioPlayer;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initImageSlider = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

 Init Image Slider

 -------------------------------------------------------------------*/
function initImageSlider() {
    var $sliders = (0, _utility.$)('.nk-image-slider');

    // transition animation
    function transitionStart(data, currentSlide, cb) {
        // set new bg
        data.$bgTransition.css({
            'background-image': 'url(\'' + currentSlide.image + '\')'
        });
        _utility.tween.set(data.$bgTransition, {
            scale: 1.4,
            opacity: 0
        });
        _utility.tween.to(data.$bgTransition, 0.5, {
            scale: 1,
            opacity: 1,
            zIndex: -1,
            onComplete: function onComplete() {
                // change default background image
                data.$bg.css({
                    'background-image': 'url(\'' + currentSlide.image + '\')'
                });
                _utility.tween.set(data.$bgTransition, {
                    opacity: 0,
                    zIndex: -2
                });
            }
        });

        // set new content
        _utility.tween.to(data.$contentWrapper, 0.5, {
            opacity: 0,
            onComplete: function onComplete() {
                data.$content.html(currentSlide.content);
                if (currentSlide.content) {
                    _utility.tween.to(data.$contentWrapper, 0.5, {
                        opacity: 1
                    });
                }
                if (cb) {
                    cb();
                }
            }
        });
    }

    // select slide
    var busy = 0;
    function selectSlide($slider) {
        var slideNum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (busy) {
            return;
        }
        busy = 1;
        var data = $slider.data('nk-image-slider');

        // get next slide
        if (slideNum === false) {
            slideNum = data.$thumbs.find('.nk-image-slider-thumbs-active').index() + 1;
        }

        var currentSlide = data.slides[slideNum];

        // in there is no selected slide
        if (typeof currentSlide === 'undefined') {
            slideNum = 0;
            currentSlide = data.slides[slideNum];
        }

        // stop autoplay
        data.stopAutoplay();

        // select thumb
        data.selectThumb(slideNum);

        // start transition
        transitionStart(data, currentSlide, function () {
            // update nano
            if (typeof _utility.$.fn.nanoScroller !== 'undefined') {
                data.$content.parent('.nano').nanoScroller();
            }

            // run autoplay
            data.runAutoplay();
            busy = 0;
        });
    }

    // convert time for timer format from ms to ceil second
    function convertTime(time) {
        return Math.ceil(time / 1000);
    }

    // prepare each slider
    $sliders.each(function () {
        var $this = (0, _utility.$)(this);
        var autoplay = parseInt($this.attr('data-autoplay'), 10) || false;
        var slides = [];
        var defaultSlide = 0;

        // parse all slides
        $this.find('.nk-image-slider-item').each(function () {
            var $slide = (0, _utility.$)(this);
            slides.push({
                image: $slide.find('.nk-image-slider-img').attr('src'),
                thumb: $slide.find('.nk-image-slider-img').attr('data-thumb'),
                content: $slide.find('.nk-image-slider-content').html() || ''
            });
        });

        // no slides
        if (!slides.length) {
            $this.remove();
            return;
        }

        // prepare slider inner template
        var thumbs = '';
        slides.forEach(function (item, k) {
            thumbs += '<li class="' + (k === defaultSlide ? 'nk-image-slider-thumbs-active' : '') + '" style="background-image: url(\'' + item.thumb + '\');"><div class="nk-image-slider-thumbs-overlay"></div></li>';
        });
        var template = '\n            <div class="nk-image-slider-bg" style="background-image: url(\'' + slides[defaultSlide].image + '\');"></div>\n            <div class="nk-image-slider-bg-transition"></div>\n            <div class="nk-image-slider-content" style="' + (slides[defaultSlide].content ? '' : 'opacity: 0;') + '">\n                <div class="nano">\n                    <div class="nano-content">' + slides[defaultSlide].content + '</div>\n                </div>\n            </div>\n            <div class="nk-image-slider-thumbs">\n                <ul>' + thumbs + '</ul>\n            </div>\n        ';

        // append template in slider
        $this.append(template);

        // move thumbs cont
        var $thumbs = $this.find('.nk-image-slider-thumbs');
        var $thumbsCont = $thumbs.find('> ul');
        var startX = false;
        var curX = 0;
        var thumbsW = 0;
        var thumbsContW = 0;

        function updateThumbsData() {
            if ($thumbsCont[0]._gsTransform && $thumbsCont[0]._gsTransform.x) {
                curX = $thumbsCont[0]._gsTransform.x;
            } else {
                curX = 0;
            }
            thumbsW = $thumbs.width();
            thumbsContW = $thumbsCont[0].scrollWidth;
        }

        // select current thumb and scroll
        function selectThumb(i) {
            $thumbs.find('li:eq(' + i + ')').addClass('nk-image-slider-thumbs-active').siblings().removeClass('nk-image-slider-thumbs-active');

            //
            var $nextItem = $thumbs.find('li:eq(' + (i + 1) + ')');
            if (!$nextItem.length) {
                $nextItem = $thumbs.find('li:eq(' + 0 + ')');
            }

            // scroll nav
            updateThumbsData();
            var nextLeft = $nextItem.position().left;
            if (nextLeft < 0) {
                _utility.tween.to($thumbsCont, 0.2, {
                    x: curX - nextLeft
                });
            } else {
                var nextW = $nextItem.width();
                if (nextLeft + nextW > thumbsW) {
                    _utility.tween.to($thumbsCont, 0.2, {
                        x: curX - (nextLeft + nextW - thumbsW)
                    });
                }
            }
        }

        var mc = new Hammer.Manager($thumbs[0]);
        mc.add(new Hammer.Pan({
            pointers: 1,
            threshold: 0
        }));
        mc.on('pan press', function (e) {
            e.preventDefault();

            // init
            if (startX === false) {
                startX = curX;
                updateThumbsData();
                $thumbs.addClass('is-dragging');
            }

            // move
            if (thumbsContW > thumbsW) {
                curX = Math.min(0, Math.max(e.deltaX + startX, thumbsW - thumbsContW));
                _utility.tween.set($thumbsCont, {
                    x: curX
                });
            }
            if (e.isFinal) {
                $thumbs.removeClass('is-dragging');
                startX = false;
            }
        });

        // setup autoplay
        var autoplayInterval = void 0;
        var autoplayStart = new Date();
        var autoplayPaused = void 0;
        function stopAutoplay() {
            var dontTouchCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            if (!autoplay) {
                return;
            }
            clearInterval(autoplayInterval);
            if (!dontTouchCount) {
                $thumbs.find('.nk-image-slider-thumbs-count').remove();
            }
        }
        function runAutoplay() {
            if (!autoplay) {
                return;
            }
            var $currentThumb = $thumbs.find('.nk-image-slider-thumbs-active');
            var $nextThumb = $currentThumb.next();
            if (!$nextThumb.length) {
                $nextThumb = $thumbs.find('li:eq(0)');
            }

            // remove old timer
            $thumbs.find('.nk-image-slider-thumbs-count').remove();

            // add new timer
            var $timer = (0, _utility.$)('<div class="nk-image-slider-thumbs-count"></div>').text(convertTime(autoplay));
            $nextThumb.append($timer);

            autoplayStart = +new Date();

            stopAutoplay(1);
            var prevValue = autoplay;
            autoplayInterval = setInterval(function () {
                if (autoplayPaused) {
                    return;
                }
                var currentTime = autoplayStart + autoplay - new Date();

                // fix if counter > autoplay (occurs when you click on thumbnails)
                if (currentTime > autoplay) {
                    autoplayStart = +new Date();
                    currentTime = autoplay;
                }

                // update value on thumbnail when counter was changed
                if (prevValue !== convertTime(currentTime)) {
                    prevValue = convertTime(currentTime);
                    $timer.text(prevValue);
                }

                // stop autoplay and select next slide
                if (currentTime <= 0) {
                    stopAutoplay();
                    selectSlide($this);
                }
            }, 100);
        }
        function pauseAutoplay() {
            autoplayPaused = +new Date();
        }
        function resumeAutoplay() {
            autoplayStart += new Date() - autoplayPaused;
            autoplayPaused = false;
        }

        // save slider data
        var data = {
            slides: slides,
            autoplay: autoplay,
            $thumbs: $thumbs,
            $thumbsCont: $thumbsCont,
            $content: $this.find('.nk-image-slider-content .nano-content'),
            $contentWrapper: $this.find('.nk-image-slider-content'),
            $bg: $this.find('.nk-image-slider-bg'),
            $bgTransition: $this.find('.nk-image-slider-bg-transition'),
            runAutoplay: runAutoplay,
            stopAutoplay: stopAutoplay,
            pauseAutoplay: pauseAutoplay,
            resumeAutoplay: resumeAutoplay,
            selectThumb: selectThumb
        };
        $this.data('nk-image-slider', data);

        // start autoplay
        runAutoplay();
    });

    // click handler
    _utility.$doc.on('click', '.nk-image-slider .nk-image-slider-thumbs li:not(.nk-image-slider-thumbs-active)', function () {
        var $li = (0, _utility.$)(this);
        var $slider = $li.parents('.nk-image-slider:eq(0)');
        selectSlide($slider, $li.index());
    });

    // pause autoplay on mouseenter
    _utility.$doc.on('mouseenter', '.nk-image-slider', function () {
        var data = (0, _utility.$)(this).data('nk-image-slider');
        if (data) {
            data.pauseAutoplay();
        }
    });
    _utility.$doc.on('mouseleave', '.nk-image-slider', function () {
        var data = (0, _utility.$)(this).data('nk-image-slider');
        if (data) {
            data.resumeAutoplay();
        }
    });
}

exports.initImageSlider = initImageSlider;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initFacebook = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Facebook

-------------------------------------------------------------------*/
function initFacebook() {
    if (!(0, _utility.$)('.fb-page').length) {
        return;
    }

    _utility.$body.append('<div id="fb-root"></div>');

    (function (d, s, id) {
        if (window.location.protocol === 'file:') {
            return;
        }
        var fjs = d.getElementsByTagName(s)[0];

        if (d.getElementById(id)) {
            return;
        }

        var js = d.createElement(s);js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4';
        fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
}

exports.initFacebook = initFacebook;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initInstagram = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Instagram

-------------------------------------------------------------------*/
function initInstagram() {
    var self = this;
    var $instagram = (0, _utility.$)('.nk-instagram');
    if (!$instagram.length || !self.options.templates.instagram) {
        return;
    }

    /**
     * Templating a instagram item using '{{ }}' braces
     * @param  {Object} data Instagram item details are passed
     * @return {String} Templated string
     */
    function templating(data, temp) {
        var tempVariables = ['link', 'image', 'caption'];

        for (var i = 0, len = tempVariables.length; i < len; i++) {
            temp = temp.replace(new RegExp('{{' + tempVariables[i] + '}}', 'gi'), data[tempVariables[i]]);
        }

        return temp;
    }

    $instagram.each(function () {
        var $this = (0, _utility.$)(this);
        var options = {
            userID: $this.attr('data-instagram-user-id') || null,
            count: $this.attr('data-instagram-count') || 6,
            template: $this.attr('data-instagram-template') || self.options.templates.instagram,
            quality: $this.attr('data-instagram-quality') || 'sm', // sm, md, lg
            loadingText: self.options.templates.instagramLoadingText,
            failText: self.options.templates.instagramFailText,
            apiPath: self.options.templates.instagramApiPath
        };

        // stop if running in file protocol
        if (window.location.protocol === 'file:') {
            $this.html('<div class="col-12">' + options.failText + '</div>');
            // eslint-disable-next-line
            console.error('You should run you website on webserver with PHP to get working Instagram');
            return;
        }

        $this.html('<div class="col-12">' + options.loadingText + '</div>');

        // Fetch instagram images
        _utility.$.getJSON(options.apiPath, {
            userID: options.userID,
            count: options.count
        }, function (response) {
            $this.html('');

            for (var i = 0; i < options.count; i++) {
                var instaItem = false;
                if (response[i]) {
                    instaItem = response[i];
                } else if (response.statuses && response.statuses[i]) {
                    instaItem = response.statuses[i];
                } else {
                    break;
                }

                var resolution = 'thumbnail';
                if (options.quality === 'md') {
                    resolution = 'low_resolution';
                }
                if (options.quality === 'lg') {
                    resolution = 'standard_resolution';
                }

                var tempData = {
                    link: instaItem.link,
                    image: instaItem.images[resolution].url,
                    caption: instaItem.caption
                };

                $this.append(templating(tempData, options.template));
            }

            // resize window
            self.debounceResize();
        }).fail(function (a) {
            $this.html('<div class="col-12">' + options.failText + '</div>');
            _utility.$.error(a.responseText);
        });
    });
}

exports.initInstagram = initInstagram;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initTwitter = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Twitter

-------------------------------------------------------------------*/
function initTwitter() {
    var self = this;
    var $twtFeeds = (0, _utility.$)('.nk-twitter-list');
    if (!$twtFeeds.length || !self.options.templates.twitter) {
        return;
    }

    /**
     * Templating a tweet using '{{ }}' braces
     * @param  {Object} data Tweet details are passed
     * @return {String}      Templated string
     */
    function templating(data, temp) {
        var tempVariables = ['date', 'tweet', 'avatar', 'url', 'retweeted', 'screen_name', 'user_name'];

        for (var i = 0, len = tempVariables.length; i < len; i++) {
            temp = temp.replace(new RegExp('{{' + tempVariables[i] + '}}', 'gi'), data[tempVariables[i]]);
        }

        return temp;
    }

    $twtFeeds.each(function () {
        var $this = (0, _utility.$)(this);
        var options = {
            username: $this.attr('data-twitter-user-name') || null,
            list: null,
            hashtag: $this.attr('data-twitter-hashtag') || null,
            count: $this.attr('data-twitter-count') || 2,
            hideReplies: $this.attr('data-twitter-hide-replies') === 'true',
            template: $this.attr('data-twitter-template') || self.options.templates.twitter,
            loadingText: self.options.templates.twitterLoadingText,
            failText: self.options.templates.twitterFailText,
            apiPath: self.options.templates.twitterApiPath
        };

        // stop if running in file protocol
        if (window.location.protocol === 'file:') {
            $this.html(options.failText);
            // eslint-disable-next-line
            console.error('You should run you website on webserver with PHP to get working Twitter');
            return;
        }

        // Set loading
        $this.html('<span>' + options.loadingText + '</span>');

        // Fetch tweets
        _utility.$.getJSON(options.apiPath, {
            username: options.username,
            list: options.list,
            hashtag: options.hashtag,
            count: options.count,
            exclude_replies: options.hideReplies
        }, function (twt) {
            $this.html('');

            for (var i = 0; i < options.count; i++) {
                var tweet = false;
                if (twt[i]) {
                    tweet = twt[i];
                } else if (twt.statuses && twt.statuses[i]) {
                    tweet = twt.statuses[i];
                } else {
                    break;
                }

                var tempData = {
                    user_name: tweet.user.name,
                    date: tweet.date_formatted,
                    tweet: tweet.text_entitled,
                    avatar: '<img src="' + tweet.user.profile_image_url + '" />',
                    url: 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str,
                    retweeted: tweet.retweeted,
                    screen_name: tweet.user.screen_name
                };

                $this.append(templating(tempData, options.template));
            }

            // resize window
            self.debounceResize();
        }).fail(function (a) {
            $this.html(options.failText);
            _utility.$.error(a.responseText);
        });
    });
}

exports.initTwitter = initTwitter;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginStickySidebar = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Plugin Sticky Sidebar

-------------------------------------------------------------------*/
function initPluginStickySidebar() {
    if (typeof _utility.$.fn.stick_in_parent === 'undefined') {
        return;
    }

    (0, _utility.$)('.nk-sidebar-sticky').each(function () {
        var $this = (0, _utility.$)(this);
        var $parent = $this.parent();

        $parent.addClass('nk-sidebar-sticky-parent');

        $this.wrapInner('<div>').children().stick_in_parent({
            parent: $parent,
            recalc_every: 50,
            offset_top: parseInt($this.attr('data-offset-top'), 10) || 130,

            // fixed ADS reloading issue https://github.com/leafo/sticky-kit/issues/45
            spacer: false
        })

        // we need to set min height on parent block (in theme it is equal height column) to prevent sidebar content jumping
        .on('sticky_kit:unbottom sticky_kit:stick sticky_kit:bottom', function () {
            $parent.css('min-height', (0, _utility.$)(this).height());
        }).on('sticky_kit:unstick', function () {
            $parent.css('min-height', '');
        });
    });
}

exports.initPluginStickySidebar = initPluginStickySidebar;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/* FastClick */
function initPluginFastClick() {
    if (typeof FastClick !== 'undefined') {
        FastClick.attach(document.body);
    }
}

exports.initPluginFastClick = initPluginFastClick;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginNano = undefined;

var _utility = __webpack_require__(0);

/* Nano Scroller */
function initPluginNano($context) {
    if (typeof _utility.$.fn.nanoScroller !== 'undefined') {
        ($context || _utility.$doc).find('.nano').nanoScroller();
    }
}

exports.initPluginNano = initPluginNano;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginJarallax = undefined;

var _utility = __webpack_require__(0);

/* Jarallax */
function initPluginJarallax() {
    if (typeof _utility.$.fn.jarallax === 'undefined') {
        return;
    }
    var self = this;

    // video backgrounds
    (0, _utility.$)('.bg-video[data-video]').each(function () {
        (0, _utility.$)(this).attr('data-jarallax-video', (0, _utility.$)(this).attr('data-video'));
        (0, _utility.$)(this).removeAttr('data-video');
    });

    // primary parallax
    (0, _utility.$)('.bg-image-parallax, .bg-video-parallax').jarallax({
        speed: self.options.parallaxSpeed
    });

    // video without parallax
    (0, _utility.$)('.bg-video:not(.bg-video-parallax)').jarallax({
        speed: 1
    });
}

exports.initPluginJarallax = initPluginJarallax;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginFlickity = undefined;

var _utility = __webpack_require__(0);

/* Flickity */
function initPluginFlickity() {
    if (typeof window.Flickity === 'undefined') {
        return;
    }

    function addDefaultArrows($carousel) {
        (0, _utility.$)('<div class="nk-flickity-arrow nk-flickity-arrow-prev"><span class="ion-ios-arrow-back"></span></div>').on('click', function () {
            $carousel.flickity('previous');
        }).appendTo($carousel);

        (0, _utility.$)('<div class="nk-flickity-arrow nk-flickity-arrow-next"><span class="ion-ios-arrow-forward"></span></div>').on('click', function () {
            $carousel.flickity('next');
        }).appendTo($carousel);
    }

    // prevent click event fire when drag carousel
    function noClickEventOnDrag($carousel) {
        $carousel.on('dragStart.flickity', function () {
            (0, _utility.$)(this).find('.flickity-viewport').addClass('is-dragging');
        });
        $carousel.on('dragEnd.flickity', function () {
            (0, _utility.$)(this).find('.flickity-viewport').removeClass('is-dragging');
        });
    }

    // carousel
    (0, _utility.$)('.nk-carousel > .nk-carousel-inner').each(function () {
        (0, _utility.$)(this).flickity({
            pageDots: (0, _utility.$)(this).parent().attr('data-dots') === 'true' || false,
            autoPlay: parseFloat((0, _utility.$)(this).parent().attr('data-autoplay')) || false,
            prevNextButtons: false,
            wrapAround: true,
            imagesLoaded: true,
            cellAlign: (0, _utility.$)(this).parent().attr('data-cell-align') || 'center'
        });
        if ((0, _utility.$)(this).parent().attr('data-arrows') === 'true') {
            addDefaultArrows((0, _utility.$)(this));
        }
        noClickEventOnDrag((0, _utility.$)(this));
    });
}

exports.initPluginFlickity = initPluginFlickity;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginPhotoswipe = undefined;

var _utility = __webpack_require__(0);

/* PhotoSwipe */
function initPluginPhotoswipe() {
    var $gallery = (0, _utility.$)('.nk-popup-gallery');
    if (typeof PhotoSwipe === 'undefined' || !$gallery.length) {
        return;
    }

    // prepare photoswipe markup
    var markup = '<div id="gallery" class="pswp" tabindex="-1" role="dialog" aria-hidden="true">\n          <div class="pswp__bg"></div>\n          <div class="pswp__scroll-wrap">\n            <div class="pswp__container">\n              <div class="pswp__item"></div>\n              <div class="pswp__item"></div>\n              <div class="pswp__item"></div>\n            </div>\n            <div class="pswp__ui pswp__ui--hidden">\n              <div class="pswp__top-bar">\n                <div class="pswp__counter"></div>\n                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>\n                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>\n                <div class="pswp__preloader">\n                  <div class="pswp__preloader__icn">\n                    <div class="pswp__preloader__cut">\n                      <div class="pswp__preloader__donut"></div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class="pswp__loading-indicator"><div class="pswp__loading-indicator__line"></div></div>\n              <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>\n              <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>\n              <div class="pswp__caption">\n                <div class="pswp__caption__center">\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>';
    _utility.$body.append(markup);

    // init code
    function parseThumbnailElements(el) {
        var thumbElements = (0, _utility.$)(el).find('a.nk-gallery-item');
        var items = [];
        var descrElement = void 0;
        var size = void 0;
        var item = void 0;

        thumbElements.each(function eachThumbs() {
            descrElement = (0, _utility.$)(this).next('.nk-gallery-item-description');
            size = (this.getAttribute('data-size') || '1920x1080').split('x');

            // create slide object
            item = {
                src: this.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10),
                author: this.getAttribute('data-author')
            };

            if (descrElement.length) {
                item.title = descrElement.html();
            }

            var mediumSrc = this.getAttribute('data-med') || item.src;
            if (mediumSrc) {
                size = (this.getAttribute('data-med-size') || this.getAttribute('data-size') || '1920x1080').split('x');
                // "medium-sized" image
                item.m = {
                    src: mediumSrc,
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };
            }
            // original image
            item.o = {
                src: item.src,
                w: item.w,
                h: item.h
            };
            items.push(item);
        });

        return items;
    }

    function openPhotoSwipe(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = (0, _utility.$)('.pswp')[0];
        var items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        var options = {
            captionAndToolbarShowEmptyCaptions: false,
            mainClass: 'pswp--minimal--dark',
            barsSize: { top: 0, bottom: 0 },
            captionEl: true,
            fullscreenEl: false,
            shareEl: false,
            bgOpacity: 0.85,
            tapToClose: true,
            tapToToggleControls: false,
            showHideOpacity: true,

            // Function builds caption markup
            addCaptionHTMLFn: function addCaptionHTMLFn(item, captionEl) {
                // item      - slide object
                // captionEl - caption DOM element
                // isFake    - true when content is added to fake caption container
                //             (used to get size of next or previous caption)

                if (!item.title && !item.author) {
                    captionEl.children[0].innerHTML = '';
                    return false;
                }
                var caption = '';
                if (item.title) {
                    caption += item.title;
                }
                if (item.author) {
                    if (item.title) {
                        caption += '<br>';
                    }
                    caption += '<small>' + item.author + '</small>';
                }
                captionEl.children[0].innerHTML = caption;
                return true;
            },


            galleryUID: galleryElement.getAttribute('data-pswp-uid')
        };

        if (fromURL) {
            if (options.galleryPIDs) {
                // parse real index when custom PIDs are used
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid === index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if (Number.isNaN(options.index)) {
            return;
        }

        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

        // see: http://photoswipe.com/documentation/responsive-images.html
        var realViewportWidth = void 0;
        var useLargeImages = false;
        var firstResize = true;
        var imageSrcWillChange = void 0;

        gallery.listen('beforeResize', function () {
            var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
            dpiRatio = Math.min(dpiRatio, 2.5);
            realViewportWidth = gallery.viewportSize.x * dpiRatio;

            if (realViewportWidth >= 1200 || !gallery.likelyTouchDevice && realViewportWidth > 800 || _utility.wndW > 1200) {
                if (!useLargeImages) {
                    useLargeImages = true;
                    imageSrcWillChange = true;
                }
            } else if (useLargeImages) {
                useLargeImages = false;
                imageSrcWillChange = true;
            }

            if (imageSrcWillChange && !firstResize) {
                gallery.invalidateCurrItems();
            }

            if (firstResize) {
                firstResize = false;
            }

            imageSrcWillChange = false;
        });

        gallery.listen('gettingData', function (idx, item) {
            if (useLargeImages) {
                item.src = item.o.src;
                item.w = item.o.w;
                item.h = item.o.h;
            } else {
                item.src = item.m.src;
                item.w = item.m.w;
                item.h = item.m.h;
            }
        });

        gallery.init();
    }

    function photoswipeParseHash() {
        var hash = window.location.hash.substring(1);
        var params = {};

        if (hash.length < 5) {
            // pid=1
            return params;
        }

        var vars = hash.split('&');
        for (var _i = 0; _i < vars.length; _i++) {
            if (!vars[_i]) {
                continue;
            }
            var pair = vars[_i].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    }

    // select all gallery elements
    var i = 0;
    $gallery.each(function eachGallery() {
        var $thisGallery = (0, _utility.$)(this);
        $thisGallery.attr('data-pswp-uid', i + 1);

        $thisGallery.on('click', 'a.nk-gallery-item', function onGalleryItemClick(e) {
            e.preventDefault();
            var index = 0;
            var clicked = this;
            $thisGallery.find('a.nk-gallery-item').each(function eachGalleryItem(idx) {
                if (this === clicked) {
                    index = idx;
                    return false;
                }
                return true;
            });
            openPhotoSwipe(index, $thisGallery[0]);
        });
        i++;
    });

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, $gallery.get(hashData.gid - 1), true, true);
    }
}

exports.initPluginPhotoswipe = initPluginPhotoswipe;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginModal = undefined;

var _utility = __webpack_require__(0);

/* Bootstrap Modal */
function initPluginModal() {
    _utility.$doc.on('shown.bs.modal', function () {
        (0, _utility.$)(this).find('[autofocus]').focus();
    });
}

exports.initPluginModal = initPluginModal;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginTabs = undefined;

var _utility = __webpack_require__(0);

/* Bootstrap Tabs */
function initPluginTabs() {
    var self = this;
    _utility.$wnd.on('shown.bs.tab', function () {
        self.debounceResize();
    });
}

exports.initPluginTabs = initPluginTabs;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginAccordions = undefined;

var _utility = __webpack_require__(0);

/* Bootstrap Accordions */
function initPluginAccordions() {
    var self = this;
    _utility.$wnd.on('shown.bs.collapse', function () {
        self.debounceResize();
    });
}

exports.initPluginAccordions = initPluginAccordions;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginCountdown = undefined;

var _utility = __webpack_require__(0);

/* Countdown */
function initPluginCountdown() {
    if (typeof _utility.$.fn.countdown === 'undefined' || typeof moment === 'undefined' || typeof moment.tz === 'undefined') {
        return;
    }
    var self = this;

    (0, _utility.$)('.nk-countdown').each(function () {
        var tz = (0, _utility.$)(this).attr('data-timezone');
        var end = (0, _utility.$)(this).attr('data-end');
        end = moment.tz(end, tz).toDate();

        (0, _utility.$)(this).countdown(end, function (event) {
            (0, _utility.$)(this).html(event.strftime(self.options.templates.countdown));
        });
    });
}

exports.initPluginCountdown = initPluginCountdown;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginSeiyriaBootstrapSlider = undefined;

var _utility = __webpack_require__(0);

/* Bootstrap Slider */
function initPluginSeiyriaBootstrapSlider() {
    if (typeof _utility.$.fn.bootstrapSlider === 'undefined') {
        return;
    }

    // set labels on slider change
    function setLabels($labels, values) {
        var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        for (var k = 0; k < values.newValue.length; k++) {
            if (typeof $labels[k] !== 'undefined' && (force || values.newValue[k] !== values.oldValue[k])) {
                $labels[k].text(values.newValue[k]);
            }
        }
    }

    (0, _utility.$)('.nk-input-slider').each(function () {
        var $this = (0, _utility.$)(this);
        var $input = $this.find('input');
        var $labels = [];

        for (var k = 0; k < 3; k++) {
            $labels.push($this.find('.nk-input-slider-value-' + k));
        }

        $input.bootstrapSlider().on('change', function (e) {
            if (e.value && e.value.newValue) {
                setLabels($labels, e.value);
            }
        });

        // set default labels
        setLabels($labels, {
            newValue: $input.bootstrapSlider('getValue')
        }, true);
    });
}

exports.initPluginSeiyriaBootstrapSlider = initPluginSeiyriaBootstrapSlider;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginSummernote = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Blog

-------------------------------------------------------------------*/
function initPluginSummernote() {
    if (typeof _utility.$.fn.summernote === 'undefined') {
        return;
    }

    (0, _utility.$)('.nk-summernote').summernote({
        height: 300,
        dialogsInBody: true,
        toolbar: [
        // [groupName, [list of button]]
        ['style', ['bold', 'italic', 'underline']], ['fontsize', ['fontsize']], ['color', ['color']], ['insert', ['link', 'picture', 'video']], ['para', ['ul', 'ol', 'paragraph']], ['height', ['height']], ['misc', ['codeview']]]
    });

    // fix after load popovers are visible
    (0, _utility.$)('.note-popover').hide();
}

exports.initPluginSummernote = initPluginSummernote;

/***/ })
/******/ ]);