const button = document.getElementById("button");
const bulb = document.getElementById("bulb");
const buttonImg = document.getElementById("buttonImg");

const background = document.querySelector("body");
let dataF;
let nodeAPI = "/api";
let socket = io();

runSystemFromStart();
async function runSystemFromStart() {
  let dataStart = await fetch(nodeAPI);
  let dataToUse = await dataStart.json();
  //

  let onOff = dataToUse;
  if (onOff === true) {
    turnOn();
  } else {
    turnOff();
  }

  socket.on("click", (data) => {
    if (data.isOn === true) {
      turnOn();
      clickOnSound();
    } else {
      turnOff();
      clickOffSound();
    }
  });

  button.addEventListener("click", () => {
    if (onOff.isOn === false) {
      onOff = { isOn: true };
      turnOn();
      clickOnSound();
    } else {
      onOff = { isOn: false };
      turnOff();
      clickOffSound();
    }

    socket.emit("click", onOff);
  });

  function clickOnSound() {
    var audio = new Audio("Click.mp3");
    audio.play();
  }

  function clickOffSound() {
    var audio = new Audio("ClickFast.mp3");
    audio.play();
  }
}
function turnOn() {
  buttonImg.src = "buttonOn.png";
  background.style.background = "lightyellow";
  bulb.src = "on.png";
}

function turnOff() {
  buttonImg.src = "buttonOff.png";
  background.style.background = "rgb(15,15,17";
  bulb.src = "off.png";
}
