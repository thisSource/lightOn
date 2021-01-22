
const button = document.getElementById("button")
const onCss = document.getElementById("on")
const offCss = document.getElementById("off")

const background = document.querySelector("body")


let socket = io();

fetch("/api")
.then(data => data.text())
.then(data => console.log(data))


socket.on("click", (data)=>{
    if(data.isOn === true){
        button.style.background ="lightgray"
        onCss.style.color = "green"
        offCss.style.color = "darkgray"
        background.style.background ="white"
        clickOnSound()

    } else {
        button.style.background ="gray"
        onCss.style.color = "darkgray"
        offCss.style.color = "red"
        background.style.background ="black"
        clickOffSound()
    }
 console.log(data)
})

let onOff = true


button.addEventListener("click", ()=>{
if (onOff.isOn === false){
    onOff = {isOn: true}
   
    button.style.background ="lightgray"
    onCss.style.color = "green"
    offCss.style.color = "darkgray"
    background.style.background ="white"
    clickOnSound()
} else {
    onOff = {isOn: false}
   
    button.style.background ="gray"
    onCss.style.color = "darkgray"
    offCss.style.color = "red"
    background.style.background ="black"
    clickOffSound()
}


socket.emit("click", onOff)

// console.log("sending... " + onOff)
})
 
function clickOnSound(){
    var audio = new Audio("Click.mp3");
    audio.play();
  }
  
  function clickOffSound(){
    var audio = new Audio("ClickFast.mp3");
    audio.play();
  }


