var time = 1;
var eyesOpen = true;

var interval = setInterval(function() {
   if (time <= 1000) {
     if (eyesOpen) {
       document.getElementById("faceImage").src = "closed-eyes.png";
       eyesOpen = false;
     } else {
       document.getElementById("faceImage").src = "open-eyes.png";
       eyesOpen = true;
     }
     time++;
   }
}, 1000);
