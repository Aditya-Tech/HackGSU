
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
        bot_post(event.results[0][0].transcript);
        alert(event.results[0][0].transcript);
        document.querySelector('#editer').value = event.results[0][0].transcript;
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
