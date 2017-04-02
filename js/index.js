var app;
var currAdd = '';
var texts = [];
var lines = [];
var usedIds = [];
var currId = 0;
var selectedId = 0;
var numLines = 0;
var websiteInProgress = 0;
var prompts = 0;
var isHexCode  = /^#[0-9A-F]{6}$/i.test('#aabbcc');
var detected = [];
var prompted = 0;
var greeted = 0;
var titlePrompt = 0;
var bgPrompt = 0;
var paraPrompt = 0;
var bulletPrompt = 0;
var numberPrompt = 0;
var boldPrompt = 0;
var imagePrompt = 0;
var movePrompt = 0;
var textPrompt = [];
var highlightedElement;
var numListCount = 1;
var c = 0;
var tag;
var inner;
var msg;
var sound = 0;
var firstChosen = 0;
var dl = "";


var q = [];
var ids = [];

// possible user-entered keywords
var greetings = ["Hello, I am Buildy! Do you want me to build you a website?", "Howdy! My name is Buildy and I can make you a website! Do you want me to (Yes/No)?"];
var titles = ["title", "header", "head"];
var paragraph = ["paragraph", "line", "sentence"];
var afterDirections = ["after", "underneath", "below", "under"];
var beforeDirections = ["before", "above"];
var bulletedList = ["bullet points", "bullets", "bullet", "bulleted list"];
var numberedList = ["numbered list", "ordered list", "numbers list", "number list", "numbers"];
var bgColors = ["background color", "background"];
var images = ["image", "picture", "images", "pictures"];
var breaks = ["space", "double space", "break"];


(function() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition || mozSpeechRecognition || msSpeechRecognition;

    // End if SpeechRecognition api not available in Browser
    if(!SpeechRecognition){
        alert('Your Browser dosen\'t support');
        return;
    }

    var speech = new SpeechRecognition();
    speech.lang = 'en-US';

    // if any error occour
    speech.onerror = function(event) {
        if(event.error == 'not-allowed') {
            alert('Please allow microphone.');
        } else {
            alert('There is an error. Please see your console');
            console.log(event);
        }
    };

    // on result event;
    speech.onresult = function(event) {
        msg = event.results[0][0].transcript;
        $(".messages").append("<div class='message'><div class='you'>" + msg + "</div></div>");
        check(msg);
        document.querySelector('#editer').value = event.results[0][0].transcript;
        sound = 1;
        toggle();
    };

    //on speak button click
    document.querySelector('#speek').addEventListener('click', function(e){
        e.preventDefault();
        toggle();
        speech.start();
      });

    var nowflg = true;
    function toggle() {
        document.querySelector('#speek-now').style.visibility = nowflg? 'hidden': 'visible';
        nowflg = !nowflg;
    }
    toggle();

}());



function hoverEffect() {

    $('.bottom').children().mouseover(function(e){
        $(".hova").removeClass("hova");
        $(e.target).addClass("hova");
      return false;
    }).mouseout(function(e) {
        $(this).removeClass("hova");
    });
  }


function findingColors() {
  for (var i = 0; i < bgColors.length; i++) {
    if (msg.indexOf(bgColors[i]) >= 0){
      return this.bot_post("Background color detected!");
      document.getElementById("userPage").style.backgroundColor = "lightblue";
    }
  }
}
function findTitle() {
  for (var i = 0; i < titles.length; i++) {
    if (msg.indexOf(titles[i]) >= 0){
      detected.push("titles");
    }
  }
}


$(document).ready(function() {
  return app.init();
});

function bolder(selectTag) {
    var listValue = selectTag.options[selectTag.selectedIndex].text;
    alert(listValue);
    document.getElementById(selectedId).style.fontWeight = listValue;
    boldPrompt = 0;
}

app = {
  init: function() {
    return this.bind_events();
  },
  bind_events: function() {
    return $(document).on("submit", "#chat", function(e) {
      app.send_message();
      return e.preventDefault();
    });
  },
  send_message: function() {
    if (sound == 0) {
      msg = $(".text").val().trim();
    }


    if (msg) {
      $(".text").val("");
      $(".messages").append("<div class='message'><div class='you'>" + msg + "</div></div>");
      return this.check(msg);
    }
  },

  check: function(msg) {


    sound = 0;

    if (msg.indexOf("Cancel") >= 0 || msg.indexOf("cancel") >= 0) {
      indexOfMover = 0;
      indexOfNewPos = 0;
      return;
    }


      $('.bottom').children().mouseover(function(e){
          $(".hova").removeClass("hova");
          $(e.target).addClass("hova");
        return false;
      }).mouseout(function(e) {
          $(this).removeClass("hova");
      });



    if (msg == "DONE") {
      bulletPrompt = 0;
      numberPrompt = 0;
       return this.bot_post("What do you wanna do next?");
    }

    if (msg.indexOf("Delete") >= 0 || msg.indexOf("delete") >= 0) {
      if (selectedId == 0) {
        return this.bot_post("You must select a text element first to center it.");
      }
      document.getElementById(selectedId).outerHTML = '';
    }


    if (msg.indexOf("Center") >= 0 || msg.indexOf("center") >= 0) {
      if (selectedId == 0) {
        return this.bot_post("You must select a text element first to center it.");
      }
      document.getElementById(selectedId).style.textAlign = "center";
      selectedId = 0;
      return;
    }

    if (msg.indexOf("Bold") >= 0 || msg.indexOf("bold") >= 0 || boldPrompt == 1) {
      boldPrompt = 1;
      if (selectedId == 0) {
        return this.bot_post("You must select a text element first to change its font weight.");
      }
      $(".messages").append("<div class='message'><div class='bot'>" + "Choose a font weight change and then type DONE" + "</div></div>");
      selectedId = 0;
      return $(".messages").append("<div class='message'><div class='bot'>" + "<select onchange='bolder(this);' size='13'>" + "<option>normal</option><option>bold</option><option>bolder</option><option>lighter</option><option>100</option><option>200</option><option>300</option><option>400</option><option>500</option><option>600</option><option>700</option><option>800</option><option>900</option></select>" + "</div></div>");
    }

    if (msg.indexOf("Italics") >= 0 || msg.indexOf("italics") >= 0 || msg.indexOf("italicize") >= 0 || msg.indexOf("Italicize") >= 0) {
      if (selectedId == 0) {
        return this.bot_post("You must select a text element first to italicize it.");
      }
      document.getElementById(selectedId).style.fontStyle = "italic";
      selectedId == 0
      return;
    }

    if (bgPrompt == 1) {
      var color = msg;
      hoverEffect();
      document.getElementById("userPage").style.backgroundColor = msg;
      bgPrompt = 0;
    }

    if (titlePrompt == 1) {
      currId = Math.floor((Math.random() * 1000000) + 1);
      while (usedIds.includes(currId)) {
        currId = Math.floor((Math.random() * 1000000) + 1);
      }

      q.push('<h1 onclick="markActiveLink(this);" id=' + currId + '>' + msg + '</h1>');
      ids.push(currId);
      $(".bottom").append('<h1 onclick="markActiveLink(this);" id=' + currId + '>' + msg + '</h1>');
      hoverEffect();

      titlePrompt = 0;
      return;
}
    if (paraPrompt == 1) {
      currId = Math.floor((Math.random() * 1000000) + 1);
      while (usedIds.includes(currId)) {
        currId = Math.floor((Math.random() * 1000000) + 1);
      }
      q.push('<p onclick="markActiveLink(this);" onload="hoverEffect()" id=' + currId + '>' + msg + '</p>');
      ids.push(currId);
      $(".bottom").append('<div><p onclick="markActiveLink(this);" id=' + currId + '>' + msg + '</p></div>');
      hoverEffect();
      paraPrompt = 0;
      return;
    }

    if (imagePrompt == 1) {
      currId = Math.floor((Math.random() * 1000000) + 1);
      while (usedIds.includes(currId)) {
        currId = Math.floor((Math.random() * 1000000) + 1);
      }
      q.push('<img src=' + msg + ' onclick="markActiveLink(this);" onload="hoverEffect()" id=' + currId + '>');
      ids.pudh(currId);
      $(".bottom").append('<img src=' + msg + ' onclick="markActiveLink(this);" onload="hoverEffect()" id=' + currId + '>');
      hoverEffect();
      imagePrompt = 0;
      return;
    }

    if (bulletPrompt == 1) {
      if (msg != "DONE") {
        currId = Math.floor((Math.random() * 1000000) + 1);
        while (usedIds.includes(currId)) {
          currId = Math.floor((Math.random() * 1000000) + 1);
        }
        q.push('<li onclick="markActiveLink(this);" id=' + currId + '>' + msg + '</li>');
        ids.push(currId);
        $(".bottom").append('<li onclick="markActiveLink(this);" id=' + currId + '>' + msg + '</li>');
        return this.bot_post("Any other list items? Type 'DONE' when you're finished.");
      }
      bulletPrompt = 0;
      hoverEffect();
      return;
    }

    if (numberPrompt == 1) {
      if (msg != "DONE") {
        currId = Math.floor((Math.random() * 1000000) + 1);
        while (usedIds.includes(currId)) {
          currId = Math.floor((Math.random() * 1000000) + 1);
        }
        q.push('<p onclick="markActiveLink(this);" id=' + currId + '>' + numListCount + '.   '+ msg + '</p>');
        ids.push(currId);
        $(".bottom").append('<p onclick="markActiveLink(this);" id=' + currId + '>' + numListCount + '.   '+ msg + '</p>');
        numListCount++;
        return this.bot_post("Any other list items? Type 'DONE' when you're finished.");
      }
      bulletPrompt = 0;
      hoverEffect();
      return;
    }

    if (prompted == 1 && websiteInProgress != 1) {
      if (msg.indexOf("Yes") >= 0 || msg.indexOf("yes") >= 0) {
        websiteInProgress = 1;
        prompted == 0;
        numLines++;
        this.bot_post("Great! Let's get started. Try saying 'I want a page with a light blue background and green text.'");
        return;

      } else if (msg == "No" || msg == "no") {
        numLines = 0;
        this.bot_post("Oh :( That's too bad. Maybe next time?)");
      } else {
        numLines++;
        return this.bot_post("Sorry, I didn't understand (Try saying 'yes' or 'no').");
      }
    }


    for (var i = 0; i < bgColors.length; i++) {
      if (msg.indexOf(bgColors[i]) >= 0){
        bgPrompt = 1;
        return this.bot_post("You want to change the " + "background color? Sure thing! Choose your color.");
      }
    }

    for (var i = 0; i < breaks.length; i++) {
      if (msg.indexOf(breaks[i]) >= 0){
        currId = Math.floor((Math.random() * 1000000) + 1);
        while (usedIds.includes(currId)) {
          currId = Math.floor((Math.random() * 1000000) + 1);
        }
        q.push('<br id=' + currId + '>');
        ids.push(currId);
        $(".bottom").append('<br id=' + currId + '>');

      }
    }

    for (var i = 0; i < titles.length; i++) {
      if (msg.indexOf(titles[i]) >= 0) {
          titlePrompt = 1;
          setInterval(function() {
            if (c <= 4) {
              if (open) {
                document.getElementById("image").src = "closed-mouth.png";
                open = false;
              } else if (!open) {
                document.getElementById("image").src = "open-mouth2.png";
                open = true;
              }
              c++;
            }
         }, 200);
         c = 0;
        return this.bot_post("You want a to add a " + titles[i] + " to your site? Sure thing! What do you want it to be called?");
      }
    }

    for (var i = 0; i < paragraph.length; i++) {

      if (msg.indexOf(paragraph[i]) >= 0) {
          paraPrompt = 1;
          return this.bot_post("You want a to add a " + paragraph[i] + " to your site? Sure thing! What do you want it to say?");

      }

    }

    for (var i = 0; i < images.length; i++) {

      if (msg.indexOf(images[i]) >= 0) {
          imagePrompt = 1;
          return this.bot_post("You want to add an image to your site? Sure thing, send me the URL!");

      }

    }

    for (var i = 0; i < bulletedList.length; i++) {
      if (msg.indexOf(bulletedList[i]) >= 0) {
        bulletPrompt = 1;
        return this.bot_post("You want a bulleted list? Sure! Start entering your list and type 'DONE' when you're finished!")
      }
    }

    for (var i = 0; i < numberedList.length; i++) {
      if (msg.indexOf(numberedList[i]) >= 0) {
        numberPrompt = 1;
        return this.bot_post("You want a numbered list? Sure! Start entering your list and type 'DONE' when you're finished!")
      }
    }



    if (msg.substring(0, 6) === "Hello!" && prompted != 1) {
      prompted = 1;
      return this.bot_post(greetings[Math.floor((Math.random() * 2))]);
      numLines++;

    } else if (numLines < 1) {
      prompted = 1;
      numLines++;
      return this.bot_post(greetings[Math.floor((Math.random() * 2))]);
    } else {
        prompted = 1;
        return this.bot_post("If you need help on what to do next, click on the info button at the bottom.");
    }


  },
  bot_post: function(msg) {
    return $(".messages").append("<div class='message'><div class='bot'>" + msg + "</div></div>");
  }
};


function myFunction() {
 alert(q.join(''));
}
