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