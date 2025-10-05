"use strict";
//----------------modal function--------------//
var modal = document.querySelector("[data-modal]");
var modalWrong = document.querySelector(".modal .wrong");
var modalRight = document.querySelector(".modal .right");
var modalCloseBtns = document.querySelectorAll("[data-modal-close]");
var modalCloseOverlay = document.querySelector("[data-modal-overlay]");
var contactContent = document.querySelectorAll(".contact-content");
var contactLabel = document.querySelectorAll(".contact-label");
var labelBase = true;

function modalOpenFunc() {
  modal.classList.add("open");
}

function modalCloseFunc() {
  modal.classList.remove("open");
}
modalCloseOverlay.addEventListener("click", modalCloseFunc);
modalCloseBtns.forEach((btn) => {
  btn.addEventListener("click", modalCloseFunc);
})

contactContent.forEach((content) => {
  var input = content.querySelector(".contact-input");
  var label = content.querySelector(".contact-label");
  input.addEventListener("keyup", () => {
    label.classList.add("active");
  });
});

function sendEmail() {
  (function () {
    emailjs.init("4Dvwy80sMzEqTd6qj");
  })();
  var params = {
    from_name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };
  emailjs
    .send("service_ts6b2hr", "template_q6ljdxd", params)
    .then((res) => {
      modalOpenFunc();
      modalWrong.classList.remove("active");
      modalRight.style.display = "block";
    })
    .catch((err) => {
        modalOpenFunc();
        modalWrong.classList.add("active");
        modalRight.style.display = "none";
    });
  contactLabel.forEach((label) => {
    label.classList.remove("active");
  });
}

// mobile nav toggler------------------/
var navbar = document.querySelector("[data-navbar]");
var navTogglers = document.querySelectorAll("[data-nav-toggler]");
var overlay = document.querySelector("[data-overlay]");
var addEventOnElements = function (elements, eventType, callback) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};
var togglenav = () => {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

addEventOnElements(navTogglers, "click", togglenav);
overlay.addEventListener("click", CloseMenu);

function CloseMenu() {
  if (navbar.classList.contains("active")) {
    navbar.classList.remove("active");
  }
  if (overlay.classList.contains("active")) {
    overlay.classList.remove("active");
  }
}

//header animation - when scrolldown to 100px header will be active--------------/
var header = document.querySelector("[data-header]");
var backTop = document.querySelector("[data-back-top-btn]");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTop.classList.add("active");
  } else {
    header.classList.remove("active");
    backTop.classList.remove("active");
  }
});

//--------------------nav-highliter---------/
var highliterSec = document.querySelectorAll(".section");
var navMenu = document.querySelectorAll(".hover-1");

window.onscroll = () => {
  highliterSec.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 180;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");
    if (top >= offset && top < offset + height) {
      navMenu.forEach((nav) => {
        nav.classList.remove("active");
        document
          .querySelector(".hover-1[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};

//-----------------progressbar-----------/
var skillSec = document.querySelector("[data-skill-sec]");
var htmlBar = document.querySelector("[data-html]");
var cssBar = document.querySelector("[data-css]");
var jsBar = document.querySelector("[data-js]");
var bootstrap = document.querySelector("[data-bootstrap]");
var wpBar = document.querySelector("[data-wp]");

var observer = new IntersectionObserver(
  (bars) => {
    //------create new observer---/
    bars.forEach((bar) => {
      if (bar.isIntersecting) {
        htmlBar.classList.add("active");
        cssBar.classList.add("active");
        jsBar.classList.add("active");
        bootstrap.classList.add("active");
        wpBar.classList.add("active");
        startCounting();
      } else {
        htmlBar.classList.remove("active");
        cssBar.classList.remove("active");
        jsBar.classList.remove("active");
        bootstrap.classList.remove("active");
        wpBar.classList.remove("active");
        stopCounting();
      }
    });
  },
  {
    threshold: 0.5, //----------if 0.5 then observer will start observe when scroll half of the element
  }
);
observer.observe(skillSec);

//-----------------------counter------------/

var numbers = document.querySelectorAll(".num");
var interval = 2000;

function startCounting() {
  numbers.forEach((num) => {
    var startValue = parseInt(num.getAttribute("data-start-val"));
    var endValue = parseInt(num.getAttribute("data-end-val"));
    var duration = Math.floor(interval / endValue);
    var counter = setInterval(function () {
      startValue++;
      num.textContent = startValue + "%";
      if (startValue == endValue) {
        clearInterval(counter);
      }
    }, duration);
  });
}

function stopCounting() {
  numbers.forEach((num) => {
    var startValue = parseInt(num.getAttribute("data-end-val"));
    var endValue = 0;
    var duration = Math.floor(interval / endValue);
    var counter = setInterval(function () {
      startValue--;
      num.textContent = startValue + "%";
      if (startValue == endValue) {
        clearInterval(counter);
      }
    }, duration);
  });
}

//----------------circular-progress--------------/
var firstProgressSec = document.querySelector("[data-first-progress-sec]");
var secondProgressSec = document.querySelector("[data-second-progress-sec]");
var thirdProgressSec = document.querySelector("[data-third-progress-sec]");
var fourProgressSec = document.querySelector("[data-four-progress-sec]");
var progressOne = document.querySelector(".progress-one");
var progressTwo = document.querySelector(".progress-two");
var progressThree = document.querySelector(".progress-three");
var progressFour = document.querySelector(".progress-four");
var firstValueContainer = document.querySelector(
  "[data-value-container-first]"
);
var secondValueContainer = document.querySelector(
  "[data-value-container-second]"
);
var thirdValueContainer = document.querySelector(
  "[data-value-container-third]"
);
var fourValueContainer = document.querySelector("[data-value-container-four]");
var progressInterval = 2000;

//----------------observe-first-circle------------------/
var firstCircleObserver = new IntersectionObserver(
  (circles) => {
    circles.forEach((circle) => {
      if (circle.isIntersecting) {
        firstCircularFunc();
      } else {
        hideFirstCircularFunc();
      }
    });
  },
  {
    threshold: 0.5,
  }
);
firstCircleObserver.observe(firstProgressSec);

//----------------observe-second-circle------------------/
var secondCircleObserver = new IntersectionObserver(
  (circles) => {
    circles.forEach((circle) => {
      if (circle.isIntersecting) {
        secondCircularFunc();
      } else {
        hideSecondCircularFunc();
      }
    });
  },
  {
    threshold: 0.5,
  }
);
secondCircleObserver.observe(secondProgressSec);

//----------------observe-third-circle------------------/
var thirdCircleObserver = new IntersectionObserver(
  (circles) => {
    circles.forEach((circle) => {
      if (circle.isIntersecting) {
        thirdCircularFunc();
      } else {
        hideThirdCircularFunc();
      }
    });
  },
  {
    threshold: 0.5,
  }
);
thirdCircleObserver.observe(thirdProgressSec);

//----------------observe-fourth-circle------------------/
var fourCircleObserver = new IntersectionObserver(
  (circles) => {
    circles.forEach((circle) => {
      if (circle.isIntersecting) {
        fourCircularFunc();
      } else {
        hideFourCircularFunc();
      }
    });
  },
  {
    threshold: 0.5,
  }
);
fourCircleObserver.observe(fourProgressSec);

//----------------stop circular progress---------/
function hideFirstCircularFunc() {
  var prgStart = parseInt(firstValueContainer.getAttribute("data-prgend-val"));
  var prgEnd = 0;
  var speed = Math.floor(progressInterval / prgEnd);
  var progressCounter = setInterval(() => {
    prgStart--;
    firstValueContainer.textContent = `${prgStart}%`;
    progressOne.classList.remove("active");
    progressOne.style.background = `conic-gradient(#0ea5ea ${
      prgStart * 3.6
    }deg ,#223044 ${prgStart * 3.6}deg )`;
    if (prgStart == prgEnd) {
      clearInterval(progressCounter);
    }
  }, speed);
}

function hideSecondCircularFunc() {
  var prgStart = parseInt(secondValueContainer.getAttribute("data-prgend-val"));
  var prgEnd = 0;
  var speed = Math.floor(progressInterval / prgEnd);
  var progressCounter = setInterval(() => {
    prgStart--;
    secondValueContainer.textContent = `${prgStart}%`;
    progressTwo.classList.remove("active");
    progressTwo.style.background = `conic-gradient(#0ea5ea ${
      prgStart * 3.6
    }deg ,#223044 ${prgStart * 3.6}deg )`;
    if (prgStart == prgEnd) {
      clearInterval(progressCounter);
    }
  }, speed);
}

function hideThirdCircularFunc() {
  var prgStart = parseInt(thirdValueContainer.getAttribute("data-prgend-val"));
  var prgEnd = 0;
  var speed = Math.floor(progressInterval / prgEnd);
  var progressCounter = setInterval(() => {
    prgStart--;
    thirdValueContainer.textContent = `${prgStart}%`;
    progressThree.classList.remove("active");
    progressThree.style.background = `conic-gradient(#0bd1d1 ${
      prgStart * 3.6
    }deg ,#223044 ${prgStart * 3.6}deg )`;
    if (prgStart == prgEnd) {
      clearInterval(progressCounter);
    }
  }, speed);
}

function hideFourCircularFunc() {
  var prgStart = parseInt(fourValueContainer.getAttribute("data-prgend-val"));
  var prgEnd = 0;
  var speed = Math.floor(progressInterval / prgEnd);
  var progressCounter = setInterval(() => {
    prgStart--;
    fourValueContainer.textContent = `${prgStart}%`;
    progressFour.classList.remove("active");
    progressFour.style.background = `conic-gradient(#0bd1d1 ${
      prgStart * 3.6
    }deg ,#223044 ${prgStart * 3.6}deg )`;
    if (prgStart == prgEnd) {
      clearInterval(progressCounter);
    }
  }, speed);
}

//------------------startcircularprogress------------/

function firstCircularFunc() {
  var prgStart = 50;
  var prgEnd = parseInt(firstValueContainer.getAttribute("data-prgend-val"));
  var speed = Math.floor(progressInterval / prgEnd);
  var progressCounter = setInterval(() => {
    prgStart++;
    firstValueContainer.textContent = `${prgStart}%`;
    progressOne.classList.add("active");
    progressOne.style.background = `conic-gradient(#0ea5ea ${
      prgStart * 3.6
    }deg ,#223044 ${prgStart * 3.6}deg )`;
    if (prgStart == prgEnd) {
      clearInterval(progressCounter);
    }
  }, speed);
}

function secondCircularFunc() {
  var prgStart = 30;
  var prgEnd = parseInt(secondValueContainer.getAttribute("data-prgend-val"));
  var speed = Math.floor(progressInterval / prgEnd);
  var progressCounter = setInterval(() => {
    prgStart++;
    secondValueContainer.textContent = `${prgStart}%`;
    progressTwo.classList.add("active");
    progressTwo.style.background = `conic-gradient(#0ea5ea  ${
      prgStart * 3.6
    }deg ,#223044 ${prgStart * 3.6}deg )`;
    if (prgStart == prgEnd) {
      clearInterval(progressCounter);
    }
  }, speed);
}

function thirdCircularFunc() {
  var prgStart = 50;
  var prgEnd = parseInt(thirdValueContainer.getAttribute("data-prgend-val"));
  var speed = Math.floor(progressInterval / prgEnd);
  var progressCounter = setInterval(() => {
    prgStart++;
    thirdValueContainer.textContent = `${prgStart}%`;
    progressThree.classList.add("active");
    progressThree.style.background = `conic-gradient(#0bd1d1 ${
      prgStart * 3.6
    }deg ,#223044 ${prgStart * 3.6}deg )`;
    if (prgStart == prgEnd) {
      clearInterval(progressCounter);
    }
  }, speed);
}

function fourCircularFunc() {
  var prgStart = 60;
  var prgEnd = parseInt(fourValueContainer.getAttribute("data-prgend-val"));
  var speed = Math.floor(progressInterval / prgEnd);
  var progressCounter = setInterval(() => {
    prgStart++;
    fourValueContainer.textContent = `${prgStart}%`;
    progressFour.classList.add("active");
    progressFour.style.background = `conic-gradient(#0bd1d1 ${
      prgStart * 3.6
    }deg ,#223044 ${prgStart * 3.6}deg )`;
    if (prgStart == prgEnd) {
      clearInterval(progressCounter);
    }
  }, speed);
}

//------------------timeline------------------/
var timelineFirst = document.querySelector("[data-timeline-first]");
var timelineSecond = document.querySelector("[data-timeline-second]");
var timelineThird = document.querySelector("[data-timeline-third]");
var timelineFourth = document.querySelector("[data-timeline-fourth]");
var timelineFifth = document.querySelector("[data-timeline-fifth]");
var timelineSixth = document.querySelector("[data-timeline-sixth]");
var timelineIconOne = document.querySelector("[data-icon-one]");
var timelineIconTwo = document.querySelector("[data-icon-two]");
var timelineIconThree = document.querySelector("[data-icon-three]");
var timelineIconFour = document.querySelector("[data-icon-four]");
var timelineIconFive = document.querySelector("[data-icon-five]");
var timelineIconSix = document.querySelector("[data-icon-six]");
var timelineContentOne = document.querySelector("[data-timeline-contentone]");
var timelineContentTwo = document.querySelector("[data-timeline-contenttwo]");
var timelineContentThree = document.querySelector(
  "[data-timeline-contentthree]"
);
var timelineContentFour = document.querySelector("[data-timeline-contentfour]");
var timelineContentFive = document.querySelector("[data-timeline-contentfive]");
var timelineContentSix = document.querySelector("[data-timeline-contentsix]");

//-------------------first-timeline---------/
var timelineObserverFirst = new IntersectionObserver(
  (timeline) => {
    timeline.forEach((line) => {
      if (line.isIntersecting) {
        timelineIconOne.classList.add("active");
        timelineContentOne.classList.add("active");
        timelineFirst.classList.add("active");
      } else {
        timelineIconOne.classList.remove("active");
        timelineContentOne.classList.remove("active");
        timelineFirst.classList.remove("active");
      }
    });
  },
  {
    threshold: 0.5,
  }
);
timelineObserverFirst.observe(timelineFirst);

//------------------second-timeline---------/
var timelineObserverSecond = new IntersectionObserver(
  (timeline) => {
    timeline.forEach((line) => {
      if (line.isIntersecting) {
        timelineIconTwo.classList.add("active");
        timelineContentTwo.classList.add("active");
        timelineSecond.classList.add("active");
      } else {
        timelineIconTwo.classList.remove("active");
        timelineContentTwo.classList.remove("active");
        timelineSecond.classList.remove("active");
      }
    });
  },
  {
    threshold: 0.5,
  }
);
timelineObserverSecond.observe(timelineSecond);

//------------------third-timeline---------/
var timelineObserverThird = new IntersectionObserver(
  (timeline) => {
    timeline.forEach((line) => {
      if (line.isIntersecting) {
        timelineIconThree.classList.add("active");
        timelineContentThree.classList.add("active");
        timelineThird.classList.add("active");
      } else {
        timelineIconThree.classList.remove("active");
        timelineContentThree.classList.remove("active");
        timelineThird.classList.remove("active");
      }
    });
  },
  {
    threshold: 0.5,
  }
);
timelineObserverThird.observe(timelineThird);

//------------------fourth-timeline---------/
var timelineObserverFourth = new IntersectionObserver(
  (timeline) => {
    timeline.forEach((line) => {
      if (line.isIntersecting) {
        timelineIconFour.classList.add("active");
        timelineContentFour.classList.add("active");
        timelineFourth.classList.add("active");
      } else {
        timelineIconFour.classList.remove("active");
        timelineContentFour.classList.remove("active");
        timelineFourth.classList.remove("active");
      }
    });
  },
  {
    threshold: 0.5,
  }
);
timelineObserverFourth.observe(timelineFourth);

//------------------fifth-timeline---------/
var timelineObserverFifth = new IntersectionObserver(
  (timeline) => {
    timeline.forEach((line) => {
      if (line.isIntersecting) {
        timelineIconFive.classList.add("active");
        timelineContentFive.classList.add("active");
        timelineFifth.classList.add("active");
      } else {
        timelineIconFive.classList.remove("active");
        timelineContentFive.classList.remove("active");
        timelineFifth.classList.remove("active");
      }
    });
  },
  {
    threshold: 0.5,
  }
);
timelineObserverFifth.observe(timelineFifth);

//------------------sixth-timeline---------/
var timelineObserverSixth = new IntersectionObserver(
  (timeline) => {
    timeline.forEach((line) => {
      if (line.isIntersecting) {
        timelineIconSix.classList.add("active");
        timelineContentSix.classList.add("active");
        timelineSixth.classList.add("active");
      } else {
        timelineIconSix.classList.remove("active");
        timelineContentSix.classList.remove("active");
        timelineSixth.classList.remove("active");
      }
    });
  },
  {
    threshold: 0.5,
  }
);
timelineObserverSixth.observe(timelineSixth);

//--------------------------review-carousel-------------------/
var reviewWrapper = document.querySelector("[data-review-wrapper]");
var carousel = document.querySelector("[data-review-carousel]");
var carouselBtns = document.querySelectorAll("[data-carousel-btn]");
var cardWidth = document.querySelector("[data-review-card]").offsetWidth;
var carouselChildren = [...carousel.children];
var isDragging = false,
  startX,
  startScrollLeft,
  isAutoPlay = true,
  timeOut;
//getting number of cards can fit in carousel at once
var cardPreview = Math.round(carousel.offsetWidth / cardWidth);
//inserting copied few last cards to begining of carousel for infinite scroll
carouselChildren
  .slice(-cardPreview)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });
//inserting copied few first cards to end of the carousel for infinite scroll
carouselChildren.slice(0, cardPreview).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

var dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging"); //restrict the text being selected while scrolling
  //recording initial cursor and scroll position
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft; //scroll the content according to the mouse pointer
};

var dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging"); //stop scrolling when the mouse button is up
};

var dragging = (e) => {
  //returning here if the isDragging value is false
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX); //scrollleft returns the number of pixel the content is scrolled horizontali
};

var infiniteScroll = () => {
  //if the carousel is at beging, scroll to end
  //else carousel at end, scroll to begining
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  //clearing the timeout & starting the autoplay if the mouse is not hovering the carousel
  clearTimeout(timeOut);
  if (!reviewWrapper.matches(":hover")) autoPlay();
};

var autoPlay = () => {
  if (!autoPlay) return;
  //autoplaying the carousel after every 2500ms
  timeOut = setTimeout(() => {
    carousel.scrollLeft += cardWidth;
  }, 5000);
};
autoPlay();

carousel.addEventListener("scroll", infiniteScroll); //infinity scroll
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragStop);
//autoplay will be active only when there is no hover on carousel
reviewWrapper.addEventListener("mouseenter", () => clearTimeout(timeOut));
reviewWrapper.addEventListener("mouseleave", autoPlay);


// dots is an array of Dot objects,
// mouse is an object used to track the X and Y position
   // of the mouse, set with a mousemove event listener below
var dots = [],
    mouse = {
      x: 0,
      y: 0
    };

// The Dot object used to scaffold the dots
var Dot = function() {
  this.x = 0;
  this.y = 0;
  this.node = (function(){
    var n = document.createElement("div");
    n.className = "trail";
    document.body.appendChild(n);
    return n;
  }());
};
// The Dot.prototype.draw() method sets the position of 
  // the object's <div> node
Dot.prototype.draw = function() {
  this.node.style.left = this.x + "px";
  this.node.style.top = this.y + "px";
};

// Creates the Dot objects, populates the dots array
for (var i = 0; i < 12; i++) {
  var d = new Dot();
  dots.push(d);
}

// This is the screen redraw function
function draw() {
  // Make sure the mouse position is set everytime
    // draw() is called.
  var x = mouse.x,
      y = mouse.y;
  
  // This loop is where all the 90s magic happens
  dots.forEach(function(dot, index, dots) {
    var nextDot = dots[index + 1] || dots[0];
    
    dot.x = x;
    dot.y = y;
    dot.draw();
    x += (nextDot.x - dot.x) * .6;
    y += (nextDot.y - dot.y) * .6;

  });
}

addEventListener("mousemove", function(event) {
  //event.preventDefault();
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  var trail = document.querySelectorAll(".trail");
  trail.forEach((dot) => { dot.classList.add("active")});
});

// animate() calls draw() then recursively calls itself
  // everytime the screen repaints via requestAnimationFrame().
function animate() {
  draw();
  requestAnimationFrame(animate);
}

// And get it started by calling animate().
animate();




