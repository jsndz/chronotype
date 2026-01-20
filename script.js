const editor = document.getElementById("typing-area");
const start = document.getElementById("start-btn");
const speed = document.getElementById("speed");
const showSave = document.getElementById("save");
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
const debouncedSave = debounce(() => {
  console.log("Auto-saving session to LocalStorage...");
  localStorage.setItem("chrono_session", JSON.stringify(session));
  throttledSave();
}, 5000);

const throttledInput = throttle((value) => {
  session.type(value);
}, 50);

const throttledSave = throttle(() => {
  showSave.innerText = "saved";
}, 1000);

function save() {
  debouncedSave();
}

start.addEventListener("click", (ev) => {
  play();
});

editor.addEventListener("input", (ev) => {
  showSave.innerText = "";
  session.start();
  throttledInput(ev.target.value);
  save();
});

function play() {
  editor.value = "";
  session.events.forEach((ev) => {
    const playbackSpeed = Number(speed.value);

    setTimeout(() => {
      editor.value = ev.value;
    }, ev.offset / playbackSpeed);
  });
}
