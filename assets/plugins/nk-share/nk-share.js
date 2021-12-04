/*!
 * Name    : nK Share
 * Version : 1.0.0
 * Author  : _nK http://nkdev.info
 */
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {

    // nKShare instance
    var nKShare = (function() {
        var instanceID = 0;

        function nKShare(item, userOptions) {
            var _this = this;

            _this.$item      = $(item);

            _this.defaults   = {
                name          : null,
                text          : null,
                link          : null,
                media         : null,
                popupOptions  : 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600',
                networks      : {
                    facebook: function() {
                        var result = '//www.facebook.com/share.php?m2w&s=100&p[url]=' + encodeURIComponent(this.options.link);

                        if (this.options.media) {
                            result += '&p[images][0]=' + encodeURIComponent(this.options.media);
                        }
                        if (this.options.text) {
                            result += '&p[title]=' + encodeURIComponent(this.options.text);
                        }

                        window.open(result, 'Facebook', this.options.popupOptions);
                    },
                    twitter: function() {
                        var result = 'https://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(this.options.link);

                        if (this.options.text) {
                            result += '&text=' + encodeURIComponent(this.options.text) + '%20' + encodeURIComponent(this.options.link);
                        } else {
                            result += '&text=' + encodeURIComponent(this.options.link);
                        }

                        window.open(result, 'Twitter', this.options.popupOptions);
                    },
                    pinterest: function() {
                        var result = '//pinterest.com/pin/create/button/?url=' + encodeURIComponent(this.options.link);

                        if (this.options.media) {
                            result += '&media=' + encodeURIComponent(this.options.media);
                        }
                        if (this.options.text) {
                            result += '&description=' + encodeURIComponent(this.options.text);
                        }

                        window.open(result, 'Pinterest', this.options.popupOptions);
                    },
                    'google-plus': function() {
                        window.open('//plus.google.com/share?url=' + encodeURIComponent(this.options.link), 'GooglePlus', this.options.popupOptions);
                    },
                    linkedin: function() {
                        var result = '//www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(this.options.link) + '&source=' + encodeURIComponent(this.options.link);

                        if (this.options.text) {
                            result += '&title=' + encodeURIComponent(this.options.text);
                        }

                        window.open(result, 'LinkedIn', this.options.popupOptions);
                    },
                    vk: function() {
                        window.open('//vk.com/share.php?url=' + encodeURIComponent(this.options.link), 'Vkontakte', this.options.popupOptions);
                    }
                }
            };

            _this.options    = $.extend({}, _this.defaults, userOptions);

            _this.instanceID = instanceID++;

            _this.onClickInit();
        }

        return nKShare;
    }());

    nKShare.prototype.onClickInit = function() {
        var self = this;

        self.$item.on('click', function(e) {
            if(self.options.networks[self.options.name]) {
                e.preventDefault();
                self.options.networks[self.options.name].call(self);
            }
        })
    }

    var oldNkshare = $.fn.nkshare;

    $.fn.nkshare = function() {
        var items = this,
            options = arguments[0] || {},
            args = Array.prototype.slice.call(arguments, 1),
            len = items.length,
            k = 0,
            ret;

        for (k; k < len; k++) {
            if (typeof options === 'object') {
                if(!items[k].nkshare) {
                    var thisOpts = $.extend({}, options);
                    var $item = $(items[k]);

                    // prepare options
                    if(typeof thisOpts.name === 'undefined') {
                        thisOpts.name = $item.attr('data-share');
                    }
                    if(typeof thisOpts.name === 'undefined') {
                        return false
                    }
                    if(typeof thisOpts.text === 'undefined') {
                        thisOpts.text = $item.attr('data-share-text') || document.title;
                    }
                    if(typeof thisOpts.link === 'undefined') {
                        thisOpts.link = $item.attr('data-share-link') || window.location.href.replace(window.location.hash, '');
                    }
                    if(typeof thisOpts.media === 'undefined') {
                        thisOpts.media = $item.attr('data-share-media');
                    }

                    // init
                    items[k].nkshare = new nKShare(items[k], thisOpts);
                }
            }
            else {
                ret = items[k].nkshare ? items[k].nkshare[options].apply(items[k].nkshare, args) : undefined;
            }
            if (typeof ret !== 'undefined') {
                return ret;
            }
        }

        return this;
    };

    // no conflict
    $.fn.nkshare.noConflict = function () {
        $.fn.nkshare = oldNkshare;
        return this;
    };

    // data-share initialization
    $(document).on('ready.data-nkshare', function () {
        $('[data-share]').nkshare();
    });
}));
