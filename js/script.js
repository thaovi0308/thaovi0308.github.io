/**
 * @name Site
 * @description Global variables and functions
 * @version 1.0
 */
jQuery(function() {
    $('.single-slick').slick({
        dots: true,
        arrows: false
    });
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
