

var open = true;
var time = 1;

var interval = setInterval(function() {
   if (time <= 1000) {
     if (open) {
       document.getElementById("image").src = "closed-eyes.png";
       open = false;
     } else if (!open) {
       document.getElementById("image").src = "open-eyes.png";
       open = true;
     }
     time++;
   }
}, 1000);
