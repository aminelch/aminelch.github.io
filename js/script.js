/************************************************************
 * Author: Amine L'ch 
 * Author URL: https://aminelch.github.io
 * License: Creative Commons Attribution 3.0 Unported
 * License URL: http://creativecommons.org/licenses/by/3.0/
 ************************************************************/

$(function() {

    // console.error('Le document est bien chargée')


    /*** on scroll Event */

    $(".scroll").click(function(event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: $(this.hash).offset().top
        }, 1000);
    });


    /*** On responsive mode : i will show the menu from right to left */

    $("span.menu").click(function() {
        $("ul.nav1").slideToggle(300, function() {
            // Animation complete.
            console.log('iam here')
        });
    });

    /*** OWL Carousel  */

    $("#owl-demo1").owlCarousel({
        items: 1,
        lazyLoad: false,
        autoPlay: true,
        navigation: false,
        navigationText: false,
        pagination: true,
    });

    $("#owl-demo3").owlCarousel({
        items: 1,
        lazyLoad: false,
        autoPlay: true,
        navigation: true,
        navigationText: true,
        pagination: true,
    });




    $('.progress .progress-bar').css("width",
        function() {
            return $(this).attr("aria-valuenow") + "%";
        }
    );

    $().UItoTop({ easingType: 'easeOutQuart' });




    /*** CSS Loader animation */
    var cssAnimation = function() {
        setTimeout(function() {
            $('body').addClass('loaded');
        }, 1400);
    }

    clearTimeout(cssAnimation());




    var defaults = {
        containerID: 'toTop', // fading element id
        containerHoverID: 'toTopHover', // fading element hover id
        scrollSpeed: 1200,
        easingType: 'linear'
    };


    /*** GITHUB CALENDAR */
    GitHubCalendar(".github-calendar", "aminelch", { responsive: true });
    /*** GOOGLE ANALYTIC  */
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'UA-108288516-1');



});