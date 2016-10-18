/* Table of Contents
==================================================
# Navigation Height
# Counter
# Progress Bar
# EasyPieChart
# MagnificPopup
# onePageNav
# Sticky Nav
# Mobile Toggle Control

==================================================

*/


// -------------------------------------------------------------
//  Navigation Height 
// -------------------------------------------------------------

(function() {

    var height = $(window).height();
     $(".banner-content, .menu-one .navbar-nav").innerHeight(height);
    
}());    
           
           
// -------------------------------------------------------------
// Counter
// -------------------------------------------------------------

(function () {

    $('.counter').counterUp({
    delay: 10,
    time: 1000
    
	});

}());

// -------------------------------------------------------------
// Progress Bar
// -------------------------------------------------------------

(function () {

    $('.rating-bar').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $.each($('div.progress-bar'),function(){
                $(this).css('width', $(this).attr('aria-valuenow')+'%');
            });
            $(this).unbind('inview');
        }
    });

}());

// -------------------------------------------------------------
// EasyPieChart
// -------------------------------------------------------------

(function () {

    $('.language-skill').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $('.chart').easyPieChart({
                //your configuration goes here
                easing: 'easeOut',
                delay: 3000,
                scaleColor: false,
                animate: 2000,
                onStep: function(from, to, percent) {
                    this.el.children[0].innerHTML = Math.round(percent);
                }

            });
        }
    }); 
}());


// -------------------------------------------------------------
// MagnificPopup
// -------------------------------------------------------------

(function () {
    $('.portfolio-info a').magnificPopup({
      type: 'image',
      gallery:{
        enabled:true
      }
    });
}());

// -------------------------------------------------------------
// onePageNav
// -------------------------------------------------------------

$(function() {

    $('.nav').onePageNav();

});

// -------------------------------------------------------------
//  Sticky Nav
// -------------------------------------------------------------


(function () {

    $(window).scroll(function() {
        var nav = $('.home-two .navbar');
        var $this = $(this);

        if($this.scrollTop() > 735) {
            nav.addClass('navbar-fixed-top animated fadeInDown');
        }
        else {
            nav.removeClass('navbar-fixed-top animated fadeInDown');
        }
    });

}());    

// -------------------------------------------------------------
//Mobile Toggle Control
// -------------------------------------------------------------

$(function(){ 
    var navMain = $(".collapse");
    navMain.on("click", "a", null, function () {
        navMain.collapse('hide');
    });
});     


