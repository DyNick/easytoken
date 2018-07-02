
/*======================ANIMATION==================*/

$(document).ready(function () {

    // Function which adds the 'animated' class to any '.animatable' in view
    var doAnimations = function() {

        // Calc current offset and get all animatables
        var offset = $(window).scrollTop() + $(window).height(),
            $animatables = $('.animatable');

        // Unbind scroll handler if we have no animatables
        if ($animatables.length == 0) {
            $(window).off('scroll', doAnimations);
        }

        // Check all animatables and animate them if necessary
        $animatables.each(function(i) {
            var $animatable = $(this);
            if (($animatable.offset().top + $animatable.height() - 10) < offset) {
                $animatable.removeClass('animatable').addClass('animated');
            }
        });

    };

var  addCalssFunc= function() {

        // Calc current offset and get all animatables
        var offset = $(window).scrollTop() + $(window).height(),
            $sc = $('.scroll-slider-initialthation');

        // Unbind scroll handler if we have no animatables
        if ($sc.length == 0) {
            $(window).off('scroll',  addCalssFunc);
        }

        // Check all animatables and animate them if necessary
        $sc.each(function(i) {
            var $sc1 = $(this);
            if (($sc1.offset().top + $sc1.height() - 1000) < offset) {
                $sc1.addClass('test');
                //$sc1.css('transform','matrix(1, 0, 0, 1, 0, 0)!important');
            }
        });

    };



    // Hook doAnimations on scroll, and trigger a scroll
    $(window).on('scroll', doAnimations);
    $(window).on('scroll',  addCalssFunc);
    $(window).trigger('scroll');

});


/*=====FOR TABLET HEADER=============*/
$(window).scroll(function() {

    if ($(window).width() < 960) {
        $('.header').addClass('shrink');
        $('.fullpage').attr("id", "fullpage-new");
    }
    else{
        var t = $(".header").height()
            , e = $(".header");

        $(window).scrollTop() >= 1 * t ? e.addClass("shrink") : e.removeClass("shrink") ;
    }
});









/*===============SCrollMAgic===============*/



/*====secondt-slider===*/
!(function($) {

    'use strict';

    var $slider = $('.scroll-slider'),
        $slides = $('.scroll-slide'),
        $sliderWrapper = $('.scroll-wrapper'),
        $firstSlide = $slides.first();

    var settings = {},
        resizing = false,
        scrollController = null,
        scrollTween = null,
        scrollTimeline = null,
        progress = 0,
        scrollScene = null;

    function scrollSlider(options) {

        // Default
        settings = $.extend({
            slider: '.scroll-slider',
            sliderWrapper: '.scroll-wrapper',
            slides: '.scroll-slide',
            slideWidth: null,
            slideHeight: null,
        }, options);

        // Set dimensions
        setDimensions();

        // On resize
        $(window).on( 'resize', function() {
            clearTimeout(resizing);
            resizing = setTimeout(function() {
                setDimensions();
            }, 250);
        });

    }

    function setDimensions() {

        settings.slideWidth = $firstSlide.width();
        settings.slideHeight = $firstSlide.height();

        console.log(settings.slideWidth);
        console.log(settings.slideHeight);

        // Calculate slider width and height
        settings.sliderWidth = Math.ceil((settings.slideWidth * $slides.length));
        settings.sliderHeight = $firstSlide.outerHeight(true);

        // Set slider width and height
        $sliderWrapper.width(settings.sliderWidth);
        //$sliderWrapper.height(settings.sliderHeight);

        // Set scene
        setScene();

        //resizing = false;
    }

    function setScene() {

        var xDist = -$slides.width() * ( $slides.length - 1 ),
            tlParams = { x: xDist, ease: Power2.easeInOut };

        if (scrollScene != null && scrollTimeline != null) {

            progress = 0;
            scrollScene.progress(progress);

            scrollTimeline = new TimelineMax();
            scrollTimeline.to( $sliderWrapper, 2, tlParams );

            scrollScene.setTween(scrollTimeline);

            scrollScene.refresh();

        } else {
            // Init ScrollMagic controller
            scrollController = new ScrollMagic.Controller();

            //Create Tween
            scrollTimeline = new TimelineMax();
            scrollTimeline.to( $sliderWrapper, 2, tlParams );
            scrollTimeline.progress( progress );

            // Create scene to pin and link animation
            scrollScene = new ScrollMagic.Scene({
                triggerElement: settings.slider,
                triggerHook: "onLeave",
                duration: settings.sliderWidth
            })
                .setPin(settings.slider)
                .setTween(scrollTimeline)
                .addTo(scrollController)
                .on('start', function (event) {
                    scrollTimeline.time(0);
                });
        }

    }

    $(document).ready(function() {
        scrollSlider();
    });

})(jQuery);

/*==========youtube========*/

    $(function() {
        $(".youtube").each(function() {
            // Based on the YouTube ID, we can easily find the thumbnail image
            $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

            // Overlay the Play icon to make it look like a video player
            $(this).append($('<div/>', {'class': 'play'}));

            $(document).delegate('#'+this.id, 'click', function() {
                // Create an iFrame with autoplay set to true
                var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1&rel=0&fs=1";
                if ($(this).data('params')) iframe_url+='&'+$(this).data('params');

                // The height and width of the iFrame should be the same as parent
                var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height(),'allowfullscreen':'allowfullscreen' })

                // Replace the YouTube thumbnail with YouTube HTML5 Player
                $(this).replaceWith(iframe);
            });
        });
    });

/*==========//youtube========*/
/*=====================TABS==================*/
var tabs = document.getElementById('icetab-container').children;
var tabcontents = document.getElementById('icetab-content').children;

var myFunction = function() {
    var tabchange = this.mynum;
    for(var int=0;int<tabcontents.length;int++){
        tabcontents[int].className = ' tabcontent';
        tabs[int].className = ' icetab';
    }
    tabcontents[tabchange].classList.add('tab-active');
    this.classList.add('current-tab');
}


for(var index=0;index<tabs.length;index++){
    tabs[index].mynum=index;
    tabs[index].addEventListener('click', myFunction, false);
}
/*===========popup contact===============*/
$(document).ready(function(){


    $('.contact-button-click').click(function(){
        $('.modal-call-back').addClass('active');
        $('.modal-inner').addClass('active');
        /*$('body').addClass('overflow');*/
    });
    $('.btn-close').click(function(){
        $('.modal-call-back').removeClass('active');
        $('.modal-inner').removeClass('active');
        /*$('body').removeClass('overflow');*/
    });
    $('.extra-services-click').click(function(){
        $('.modal-form-services').addClass('active');
       /* $('.modal-inner--services').addClass('active');*/
        /*$('body').addClass('overflow');*/
    });
    $('.btn-close-services').click(function(){
        $('.modal-form-services').removeClass('active');
       /* $('.modal-inner--services').removeClass('active');*//* $('.modal-inner--services').removeClass('active');*/
  /*      $('body').removeClass('overflow');*/
    });

});

/*==========MENU============*/
$(".menu-toggle").on('click', function() {
    $(this).toggleClass("on");
    $('.menu-toggle').toggleClass("active");
    $('.navigation__continer').toggleClass("active");


});

$(document).ready(function() {
   $("#owl-example").owlCarousel({
        navigation : true,
        slideSpeed : 3000,
        paginationSpeed : 4000,
        nav:!0,
        dots:!0,
        singleItem: true,
        pagination: false,
        rewindSpeed: 500,
        items:1,
        loop: true,
        autoplay:true,
        autoplayTimeout:5000,
       touchDrag: false,
       mouseDrag: false,
        autoplaySpeed:5000,
       navText:['<svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>','<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>'],
        navSpeed:1000
    });





});


/*=============TABS CAROUSEL=========*/

$(document).ready(function() {
    $(window).on("resize", function() {
        $(window).width() <= 998 ? ($(".container-inner--first-tab").addClass("study-carousel"),
            $(".container-inner--first-tab").addClass("owl-carousel")) : ($(".container-inner--first-tab").removeClass("study-carousel"),
            $(".container-inner--first-tab").removeClass("owl-carousel"))
    }).trigger("resize");
    $(".study-carousel").owlCarousel({
        loop: !0,
        margin: 30,
        nav: !0,
        navSpeed: 500,
        touchDrag: true,
        mouseDrag: true,
        navText:['<svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>','<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>'],
        responsive: {
            0: {
                items: 1
            },
            998: {
                items: 1
            }

        }
    })
});


/*==================LINK TO SECTION==============*/
$(".navigation-list__item").find("a").click(function(e) {
    e.preventDefault();
    var section = $(this).attr("href");
    $("html, body").animate({
        scrollTop: $(section).offset().top - 100
    });
    $('.navigation__continer').removeClass('active');
    $('.menu-toggle').toggleClass("on");
    $('.menu-toggle').toggleClass("active");
});




/*==============checkboxes=========*/