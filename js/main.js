var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
var phone =  navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i);
        
window.addEventListener("orientationchange", function() {
  if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
    document.documentElement.innerHTML = document.documentElement.innerHTML;
  }
}, false);


$( document ).ready(function() {
    initScrollers();
    initContactForm();
    $( window ).scroll(function() {
        //fixViewheightIOS();
        if(!phone){
            initTopFade(); //don't do this stuff on ios, only triggers scroll event on release of thumb
            initBottomFade(); //don't do this stuff on ios, only triggers scroll event on release of thumb
        }
    }); 
});

function initContactForm() 
{
    $('#contactform').on('submit', function(){
        $('#section-contact p strong').remove();
        $('#section-contact p').append('<strong>Thanks for your message. I will contact you as soon as possible!');
        event.preventDefault();
        var message = $( this ).serialize();
        $.post( "/sendmail.php", {message: message},function( data ) {
            //@todo: something with result
        });
    });
}

/**
 *
 * @see : http://www.weareconvoy.com/2014/07/24/css-vw-and-vh-units-are-they-worth-using-yet/
 */
function fixViewheightIOS()
{
   if(iOS) {
       $('#section-can-do').height($(window).height()); 
   }
}

/**
 * Fade the top section to opacity 0 when it reaches the bottom of the viewport
 *
 */
function initTopFade()
{
    var pixelsFromBottom = $("#section-can-do").height() + $("#section-can-do").offset().top - $(window).scrollTop();
    var percentageVisible = (pixelsFromBottom - 150) / $(window).height();
    percentageVisible = Math.round(percentageVisible * 100) / 100 + 0.3;
    $('#section-can-do').css('opacity', percentageVisible);
}

/**
 * Fade the bottom section to opacity 1 from 0
 *
 */
function initBottomFade()
{
    var bottomElement = $('#section-contact');
    var bottomElementHeight =  bottomElement.height();
    var pixelsFromTop = bottomElement.offset().top + bottomElementHeight - $(window).scrollTop() - $(window).height() ;
    var percentage = (pixelsFromTop - bottomElementHeight) / bottomElementHeight * -1;
    percentage = Math.round(percentage * 100) / 100;
    percentage = Math.min (1, percentage);
    percentage = Math.max (0, percentage);
    bottomElement.css('opacity', percentage);
}

function initScrollers()
{
    $('.portFoliolink').click(function() {
        event.preventDefault();
        smoothScroll($('#section-portfolio')); 
    });


    $('.homeLink').click(function(event) {
        event.preventDefault();
        smoothScroll($('#section-can-do')); 
    });

    $('.contactLink').click(function(event) {
        event.preventDefault();
        smoothScroll($('#section-contact')); 
    });
}


function smoothScroll(target)
{
        $('html,body').animate({
            scrollTop: target.offset().top
        }, 400);
        return false;
}
