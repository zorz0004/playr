/* 
File: main.js
Course: MAD-9022
Student: Marcos Zorzi Rosa
Project: PLAYR
Date: Feb 02 2019 */


const zorz0004 = {
    pages: [],
    musics: [],
    show: new Event("show"),
    init: function() {
        zorz0004.pages = document.querySelectorAll(".page");
        zorz0004.musics = document.querySelectorAll(".music-item");
        
        zorz0004.musics.forEach((ms) =>{
            ms.addEventListener("click", zorz0004.player);
        });     
    },

player: function(){
    console.log("click");
    let music = "file:///android_asset/www/media/evidencias.mp3";
    console.log(music);
    // Audio player 
    //let my_media = new Media(music, zorz0004.ftw, zorz0004.wtf); 
    let media = new Media(music, function(){
        console.log("success");
    },
    function(ev){
        console.log("Error: "+ ev);
    });
    media.play();

    // mediaTimer = setInterval(function () {
    //     // get media amplitude
    //     my_media.getCurrentAmplitude(
    //         // success callback
    //         function (amp) {
    //             console.log(amp + "%");
    //         },
    //         // error callback
    //         function (e) {
    //             console.log("Error getting amp=" + e);
    //         }
    //     );
    // }, 1000);
},

ftw: function(my_media){
    my_media.play();
    console.log("Success: my_media.play");
},

wtf: function(ev){
    console.log("Error: "+ ev);
}

}

if (document.deviceready) {
    document.addEventListener("deviceready", zorz0004.init);
} else {
    document.addEventListener("DOMContentLoaded", zorz0004.init);
}




    /*
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();*/