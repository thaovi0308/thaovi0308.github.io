/**
 * @name Site
 * @description Global variables and functions
 * @version 1.0
 */
jQuery(function() {
    // Slide footer
    $('.single-slick').slick({
        dots: true,
        arrows: false
    });

    // Init trigger scroll
    var $animation_elements = $('.animation-element');
    var $window = $(window);
    var check_if_in_view = function() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);
        $.each($animation_elements, function() {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                $element.addClass('in-view');
            } else {
                $element.removeClass('in-view');
            }
        });
    }
    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');

    // Init google map
    function initialize() {
        var mapProp = {
            center: new google.maps.LatLng(51.508742, -0.120850),
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"), mapProp);
    }
    google.maps.event.addDomListener(window, 'load', initialize);
});
/**
 *  @name plugin sticky
 *  @description scroll and fixed 
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    destroy
 */
;(function($) {
    'use strict';

    var pluginName = 'sticky',
        $win = $(window);

    var checkMobile = function(stickyElement) {
        var isMobile = window.Modernizr.mq('(max-width: 992px)');

        if (isMobile) {
            stickyElement.css({
                'position': 'absolute',
                'top': '0',
                'z-index': 0
            });

            return true;
        }
        return false;
    };


    /**
     * [toggleFixedTop toggle fixed navigation]
     * @param  {[number]} scrollPosition 
     * @param  {[array]} stickyElement
     * @param  {[number]} $position
     * @return {none}
     */
    var toggleFixedTop = function(scrollPosition, stickyElement, $position) {
        if (scrollPosition >= $position) {
            if ('fixed' !== stickyElement.css('position')) {
                stickyElement.css({
                    'position': 'fixed',
                    'top': 0,
                    'z-index': 1
                });
            }
        } else {

            stickyElement.css({
                'position': 'absolute',
                'top': '27px',
                'z-index': 0
            });

        }
    };

    /**
     * [scrollPage Handle scroll page]
     * @param  {[array]} element
     * @param  {[number]} $position
     * @return {[none]}
     */
    var scrollPage = function(stickyElement, $position) {
        if (checkMobile(stickyElement)) {
            return;
        }
        var scrollPosition = $win.scrollTop();
        toggleFixedTop(scrollPosition, stickyElement, $position);
    };

    function Sticky(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Sticky.prototype = {
        init: function() {
            var that = this,
                stickyElement = that.element,
                $position = stickyElement.position().top;
            // Handle scroll
            $win.scroll(function() {
                scrollPage(stickyElement, $position);
            });
            $win.resize(function() {
                scrollPage(stickyElement, $position);
            });
            // Trigger scroll
            $win.scroll();
        },

        destroy: function() {
            // remove events
            // deinitialize
            $.removeData(this.element[0], pluginName);
        }
    };

    $.fn[pluginName] = function(options, params) {
        return this.each(function() {
            var instance = $.data(this, pluginName);

            if (!instance) {
                $.data(this, pluginName, new Sticky(this, options));
            } else if (instance[options]) {
                instance[options](params);
            }
        });
    };

    $.fn[pluginName].defaults = {};

    $(function() {
        $('[data-' + pluginName + ']')[pluginName]();
    });

}(jQuery));