
// Media queries (see Notes)
var mqls = [
  window.matchMedia("(min-width: 576px)"),
  window.matchMedia("(min-width: 768px)")
]

// Don't use else...if; breakpoints aren't mutually exclusive
function mediaQueryResponse(mql) {
  if (mqls[0].matches) {  // 576 sm
    generateStars(13);
  }
  if (mqls[1].matches) {  // 768 md
    generateStars(22);
  }
  if (!mqls[0].matches && // Default for < 576 xs
      !mqls[1].matches) {
    generateStars(7);
  }
}

for (var i = 0; i < mqls.length; i++) {
  mediaQueryResponse(mqls[i]);
  mqls[i].addListener(mediaQueryResponse);
}


// Random star generator
function generateStars(num) {
  $('.img-star').remove();
  for (var i = 1; i <= num; i++) {
    $('.div-flyball').append("<img class='img-star' src='images/star.gif'>")
  }

  $(".img-star").each(function() {
    $(this).css ({
      'left': Math.floor(Math.random() * $(".div-flyball").width()),
      'top': Math.floor(Math.random() * $(".div-flyball").height() - 50),
      'transform': 'rotate(' + Math.floor(Math.random() * 360) + 'deg)' + 'scale(' + Math.random() * .5 + ')'
    });
  });
}

// Flyball animation
$(document).ready(function(){
  animateDiv();
});

function makeNewPosition() {

  // Get viewport dimensions (remove the dimension of the div)
  var h = $('.div-flyball').height() - 157;  // was window selector
  var w = $('.div-flyball').width() - 300;

  // Get new random number smaller than viewport dimensions
  var nh = Math.floor(Math.random() * h);
  var nw = Math.floor(Math.random() * w);

  return [nh, nw]; // New postion coordiates
}

function animateDiv() {
  var newPos = makeNewPosition();

  // get coords of element relative to document
  var oldPos = $('.img-flyball').offset();

  // Called with 2 arrays containing old and new positions
  var speed = calcSpeed([oldPos.top, oldPos.left], newPos);

  $('.img-flyball').animate({ top: newPos[0], left: newPos[1]}, speed, function() {
      animateDiv(); // Recursion :-) !
  });
};

function calcSpeed(prev, next) {
  var x = Math.abs(prev[1] - next[1]); // left coordinates (width)
  var y = Math.abs(prev[0] - next[0]); // top coordinates (height)

  var greatest = x > y ? x : y;

  var speedModifier = .42;

  var speed = Math.ceil(greatest/speedModifier);

  return speed;
}

/***** Notes ******
Media query background:
https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries

Multiple media query structure:
http://www.javascriptkit.com/javatutors/matchmediamultiple.shtml

Animation code background:   https://stackoverflow.com/questions/10385950/how-to-get-a-div-to-randomly-move-around-a-page-using-jquery-or-css
// http://jsfiddle.net/Xw29r/10547/
*/
