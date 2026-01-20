const editor = document.getElementById("typing-area");
const start = document.getElementById("start-btn");
class Session {
  constructor() {
    this.startTime = null;
    this.events = [];
  }

  start() {
    if (this.startTime) return;
    this.startTime = Date.now();
  }

  type(char) {
    this.events.push({
      offset: Date.now() - this.startTime,
      value: char,
    });
  }
}
const session = new Session();
let startTime = null;

function debounce(fn, delay) {
  //debounce func is used delay the func till the user stops doing something
  let timer;
  //set a timer a timer forms a closure
  return function (...args) {
    clearTimeout(timer);
    //clear the previous timer if exist this way when you call the func it wont run on the previous delay
    //give a delay from this point
    timer = setTimeout(() => {
      fn.apply(this, args);
      //after the delay run the func
    }, delay);
  };
}

function throttle(fn, limit) {
  // func is used to run a func only once in the timeframe i.e is limit like on every 10 sec run the func only once
  // after one sec you can run the function
  let inThrottle = false;
  // the in the time frame like func has been run in the time frame or not
  return function (...args) {
    if (!inThrottle) {
      //if the func isn't run in the time frame
      fn.apply(this, args);
      // run the function
      inThrottle = true;
      // update the value
      setTimeout(() => (inThrottle = false), limit);
      //make it such that you set the throttle as false after the time limit
    }
  };
}

start.addEventListener("click", (ev) => {
  play();
});

editor.addEventListener("input", (ev) => {
  session.start();
  session.type(ev.target.value);
});

function play() {
  editor.value = "";
  session.events.forEach((ev) => {
    setTimeout(() => {
      editor.value = ev.value;
    }, ev.offset);
  });
}
