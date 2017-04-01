var app;
var texts = [];
var lines = [];
var numLines = 0;
var websiteInProgress = 0;
var prompts = 0;
var isHexCode  = /^#[0-9A-F]{6}$/i.test('#aabbcc');
var detected = [];
var prompted = 0;
var greeted = 0;
var q = [];


// possible user-entered keywords
var greetings = ["Hello, I am Buildy! Do you want me to build you a website?", "Howdy! My name is Buildy and I can make you a website! Do you want me to (Yes/No)?"];
var titles = ["title", "header", "head"];
var paragraph = ["paragraph", "line", "sentence"];
var afterDirections = ["after", "underneath", "below", "under"];
var beforeDirections = ["before", "above"];

var bgColors = ["background color", "background"];



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
    var msg;
    msg = $(".text").val().trim();
    if (msg) {
      $(".text").val("");
      $(".messages").append("<div class='message'><div class='you'>" + msg + "</div></div>");
      return this.check(msg);
    }
  },
  check: function(msg) {

    if (prompted == 1) {
      if (msg.indexOf("Yes") >= 0 || msg.indexOf("yes") >= 0) {
        prompted = 0;
        this.bot_post("Great! Let's get started. Try saying 'I want a page with a light blue background and green text.'");
        return;

      } else if (msg == "No" || msg == "no") {
        prompted = 0;
        return this.bot_post("Oh :( That's too bad. Maybe next time?)");
      } else {
        return this.bot_post("Sorry, I didn't understand (Try saying 'yes' or 'no').");
      }
    }


    for (var i = 0; i < bgColors.length; i++) {
      if (msg.indexOf(bgColors[i]) >= 0){
        document.getElementById("userPage").style.backgroundColor = "lightblue";
        return this.bot_post("Background color detected!");
      }
    }

    for (var i = 0; i < titles.length; i++) {
      if (msg.indexOf(titles[i]) >= 0 && msg.match(/'([^']+)'/)[1].length > 0) {
        {
          return this.bot_post("Your title is " + msg.match(/'([^']+)'/)[1]);
        }
      }
    }

    for (var i = 0; i < titles.length; i++) {
      if (msg.indexOf(titles[i]) >= 0) {
        return this.bot_post("What is your title?");
      }
    }

    if (msg.substring(0, 6) === "Hello!" && prompted != 1) {
      prompted = 1;
      return this.bot_post(greetings[Math.floor((Math.random() * 2))]);

    } else {
      prompted = 1;
      return this.bot_post(greetings[Math.floor((Math.random() * 2))]);
    }


  },
  bot_post: function(msg) {
    return $(".messages").append("<div class='message'><div class='bot'>" + msg + "</div></div>");
  }
};
