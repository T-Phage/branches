
/* *************************************************************
  Change p-sidenav position from fixed to relative when footer is in view
************************************************************ */
// function isScrolledIntoView(elem)
// {
//     var docViewTop = $(window).scrollTop();
//     var docViewBottom = docViewTop + $(window).height();
//
//     var elemTop = $(elem).offset().top;
//     var elemBottom = elemTop + $(elem).height();
//
//     return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
// }

// Utililty function that accepts the footer element
function Utils() {

}

Utils.prototype = {
    constructor: Utils,
    isElementInView: function (element, fullyInView) {
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).height();

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }
};

var Utils = new Utils();

document.addEventListener('scroll', function(e) {
var isElementInView = Utils.isElementInView($('.footer'), false);

  if (isElementInView) {
      // console.log('in view');
      document.getElementsByClassName('p-sidenav')[0].style.position = "absolute";
      document.getElementsByClassName('p-sidenav')[0].style.height = "auto";
  } else {
      // console.log('out of view');
      document.getElementsByClassName('p-sidenav')[0].style.position = "fixed";
      document.getElementsByClassName('p-sidenav')[0].style.height = "100%";
  }
})

/* Detect a left swipe */

document.getElementsByClassName('main-privacy')[0].addEventListener('touchstart', handleTouchStart, false);
document.getElementsByClassName('main-privacy')[0].addEventListener('touchmove', handleTouchMove, false);
var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */
            // alert('left swipe')
            closeNav()
        } else {
            /* right swipe */
            // alert('right swipe')
            openNav()
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
            // alert('sweped up')
            showinfo()
        } else {
            /* down swipe */
            showinfo()
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "340px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

/* Display quick links slide information */
function showinfo(){
  document.getElementsByClassName('scroll-alert')[0].style.display = 'block';

  setTimeout(function(){
    document.getElementsByClassName('scroll-alert')[0].style.display = 'none';
  }, 3000)
}
