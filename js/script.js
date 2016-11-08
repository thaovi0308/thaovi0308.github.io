/**
 * @name Site
 * @description Global variables and functions
 * @version 1.0
 */
jQuery(function() {

  /* Reset svg file */
  (function resetSvg() {
    $('img.svg').each(function() {
      var $img = $(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');

      $.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Check if the viewport is set, else we gonna set it if we can.
        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }

        // Replace image with new SVG
        $img.replaceWith($svg);

      }, 'xml');
    });
  })();

  // Call sticky top navigation
  (function() {
      Sticky();
  })()

  function processScrollWindow() {
    var positionWindow = $(window).scrollTop();
    // Add class fixed
    if (positionWindow >= this.positionNav) {
      if (!this.nav.hasClass('navbar-fixed-top')) {
        this.nav.addClass('navbar-fixed-top');
      }
    } else {
      if (this.nav.hasClass('navbar-fixed-top')) {
        this.nav.removeClass('navbar-fixed-top');
      }
    }
  }

  function processOnClick(e) {
    // Remove event default
      e.preventDefault();
      var aTag = $(this);
      if (!aTag.hasClass('active')) {
          var nav = $('nav');
        //   var positionNav = nav.offset().top;
          // Remove curent active
          nav.find('ul li').removeClass('active');
          // Add class active
          aTag.parent().addClass('active');
          var sectionId = aTag.attr('href');
          $('html, body').animate({
              scrollTop: $(sectionId).offset().top - 100
          }, 1000);
      }
  }

  (function() {
      $('.bnt-down').off('click')
                    .on('click', function() {
                        $('html, body').animate({
                            scrollTop: $('#services').offset().top - 100
                        }, 1000);
                    })
  })()

  // Handle sticky top navigation
  function Sticky() {
    // Get top navigation
    this.nav = $('nav');
    // Get position navigation
    this.positionNav = nav.offset().top;
    // On click a tag
    this.aTags = this.nav.find('ul a');
    this.aTags.on('click', processOnClick);
    // On window scroll
    $(window).off('scroll').on('scroll', processScrollWindow.bind(this));
    // Initialize load page
    processScrollWindow.call(this);
  }

  // Init google map
  function initialize() {
    var mapProp = {
      center: new google.maps.LatLng(10.8166418, 106.6738968),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapProp);
  }
  google.maps.event.addDomListener(window, 'load', initialize);
});
