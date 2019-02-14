/* 
File: main.js
Course: MAD-9022
Student: Marcos Zorzi Rosa
Project: PLAYR
Date: Feb 02 2019 */


const zorz0004 = {
    pages: [],
    musics: [],
    tracks: [{
        id: 0,
        artist: "Chitaozinho & Xororó",
        title: "Evidências",
        file: "file:///android_asset/www/media/evidencias.mp3",
        image: "file:///android_asset/www/img/chx.jpg",
        volume: 0.5
    },
    {
        id: 1,
        artist: "Capital Inicial",
        title: "Primeiros Erros",
        file: "file:///android_asset/www/media/primeiroserros.mp3",
        image: "file:///android_asset/www/img/capital-inicial.jpg",
        volume: 0.5
    },
    {
        id: 2,
        artist: "Cassia Eller (feat. Nando Reis)",
        title: "Relicário",
        file: "file:///android_asset/www/media/relicario.mp3",
        image: "file:///android_asset/www/img/cassia-eller.jpg",
        volume: 0.5
    },
    {
        id: 3,
        artist: "Engenheiros do Hawaii",
        title: "Outras Freqüências",
        file: "file:///android_asset/www/media/outras-frequencias.mp3",
        image: "file:///android_asset/www/img/engenheiros.jpg",
        volume: 0.5
    },
    {
        id: 4,
        artist: "Kid Abelha",
        title: "Fixação",
        file: "file:///android_asset/www/media/fixacao.mp3",
        image: "file:///android_asset/www/img/kid-abelha.jpg",
        volume: 0.5
    },
    {
        id: 5,
        artist: "Ira! (feat. Samuel Rosa)",
        title: "Tarde Vazia",
        file: "file:///android_asset/www/media/tarde-vazia.mp3",
        image: "file:///android_asset/www/img/ira.jpg",
        volume: 0.5
    }
],
    mediaStatus: 0,
    media:null,
    actual: 0,
    nextTrack: {},
    auto: 0,
    stopped: 0,
    show: new Event("show"),
    init: function() {
        zorz0004.pages = document.querySelectorAll(".page");
        
        // let music = zorz0004.tracks.file;
        zorz0004.addinfo();
        zorz0004.addlisteners();
        
    },

player: function(el){
    //Check auto play
    if(zorz0004.auto = 1){
        zorz0004.auto = 0;
    } else{
        // console.log("click");
        el.preventDefault();
        el.stopPropagation();
    }

    //Open Control Menu
    if(document.getElementById("controlmenu").classList.contains("hide")){
        document.getElementById("controlmenu").classList.remove("hide");
        document.getElementById("controlmenu").classList.add("show");
    }


    //Apply spin on image element
    document.querySelectorAll(".playing").forEach(item =>{
        item.classList.remove("playing");
    });
    document.getElementById(this.id).querySelector(".music-img").classList.add("playing");



    document.getElementById("musicRange").value = "0";

    if(zorz0004.mediaStatus !== 0){
        zorz0004.media.release();
    }

    let music = zorz0004.tracks[this.id].file;
    zorz0004.actual = zorz0004.tracks[this.id].id;
    //let mediaStatus = 0;
    console.log(music);

    // Audio player 
    if(zorz0004.mediaStatus != 0 && zorz0004.mediaStatus != 1){
        zorz0004.media.release();
    }
    zorz0004.media = null;
    zorz0004.media = new Media(music, function(){
        console.log("success");
        //Call next track
        if(zorz0004.media.getDuration() > 1 && zorz0004.stopped != 1){
            zorz0004.next.apply();
        } 
    },
    function(ev){
        console.log("Error: "+ ev);
    }, function(status){
        zorz0004.mediaStatus = status;
    });
    zorz0004.media.play();

    if(zorz0004.stopped = 1){
        zorz0004.stopped = 0;
    }

    
    // Get duration to track bar
    var counter = 0;
    var timerDur = setInterval(function() {
        counter = counter + 100;
        if (counter > 2000) {
            clearInterval(timerDur);
        }
    var dur = zorz0004.media.getDuration();
    if (dur > 0) {
        clearInterval(timerDur);
        //set max value on track bar
        document.getElementById('musicRange').setAttribute("max", dur);
        //Set end time
        document.querySelector('.end').innerHTML =  (Math.floor((dur % 3600) / 60)) +":"+(Math.floor(dur % 60));
    }
    }, 100);


    // Update media position every second
    let mediaTimer = setInterval(function () {
    // get media position
    zorz0004.media.getCurrentPosition(
        // success callback
        function (position) {
            if (position >= 0) {
                //console.log((position) + " sec");
                //Update track bar
                document.getElementById("musicRange").value = position;
                //Update start time
                document.querySelector('.start').innerHTML =  (Math.floor((position % 3600) / 60)) +":"+(Math.floor(position % 60));
            }
            if(document.getElementById("musicRange").value != position){
                position = document.getElementById("musicRange").value;
            }
        },
        // error callback
        function (e) {
            console.log("Error getting pos=" + e);
        }
        );
    }, 1000);


    //Update track according to track bar
    // let trackUpdater = document.getElementById("musicRange").value;
    // console.log("trackslider" + trackUpdater);
    // trackUpdater.oninput = function(){
    //     console.log("TRACK BAR: "+ this);
    //     zorz0004.media.seekTo(this.value);
    // }
    
    //let sliderControl = function(){
        // document.getElementById("musicRange").addEventListener("mouseup", function (){
        //     let trackUpdater = document.getElementById("musicRange").value;
        //     zorz0004.media.seekTo(trackUpdater);
        document.getElementById("musicRange").addEventListener("input", function(){
            //zorz0004.media.pause();
            zorz0004.media.seekTo(document.getElementById("musicRange").value);
            //zorz0004.media.play();
        });
    //};
   
        // let trackControl = document.getElementById("musicRange");
        // document.getElementById("musicRange").value = trackControl;
        //zorz0004.media.seekTo(document.getElementById("musicRange").value);

},

ftw: function(my_media){
    zorz0004.media.play();
    console.log("Success:"+ my_media.play);
},

wtf: function(ev){
    console.log("Error: "+ ev);
},



addlisteners: function() {

//console.log("addlistener");
    document.querySelector(".playpause").addEventListener("click", zorz0004.pause); 
    document.querySelector(".stop").addEventListener("click", zorz0004.stop); 
    document.querySelector(".ff").addEventListener("click", zorz0004.ff); 
    document.querySelector(".rew").addEventListener("click", zorz0004.rew);
    document.querySelector(".plus").addEventListener("click",zorz0004.volumeUp);
    document.querySelector(".minus").addEventListener("click",zorz0004.volumeDown);
},

pause: function (){
    /* Media.MEDIA_NONE = 0;
       Media.MEDIA_STARTING = 1;
       Media.MEDIA_RUNNING = 2;
       Media.MEDIA_PAUSED = 3;
       Media.MEDIA_STOPPED = 4;
    */
    if(zorz0004.mediaStatus === 2 || zorz0004.mediaStatus === 1){
        zorz0004.media.pause();
    } else if(zorz0004.mediaStatus === 3 || zorz0004.mediaStatus === 4){
        zorz0004.media.setVolume(zorz0004.tracks[0].volume);
        zorz0004.media.play();
    } else{
        alert("Select a song first.");
    }
},

addinfo: function(){
    let item = document.querySelectorAll(".music-item");
    //console.log(item);
    item.forEach(mi => {
        //console.log(mi);
        mi.querySelector(".music-img").src = zorz0004.tracks[mi.id].image;
        mi.querySelector(".music-artist").textContent = zorz0004.tracks[mi.id].artist;
        mi.querySelector(".music-title").textContent = zorz0004.tracks[mi.id].title;

        mi.addEventListener("click", zorz0004.player);
    });
},

stop: function(){
    zorz0004.media.stop();
    zorz0004.media.release();
    document.getElementById("musicRange").value = "0";
    // zorz0004.actual = 0;
    zorz0004.stopped = 1;
    // zorz0004.media = null;

    if(document.getElementById("controlmenu").classList.contains("show")){
        document.getElementById("controlmenu").classList.remove("show");
        document.getElementById("controlmenu").classList.add("hide");
    }

    //Remove playing animation
    document.querySelectorAll(".playing").forEach(item =>{
        item.classList.remove("playing");
    });
},


ff: function(){
    zorz0004.media.getCurrentPosition((pos)=>{
        let dur = zorz0004.media.getDuration();
        // console.log('current position', pos);
        // console.log('duration', dur);
        pos += 10;
        if(pos < dur){
            zorz0004.media.seekTo( pos * 1000 );
            document.getElementById("musicRange").stepUp(10);
        }
    });
},

rew: function(){
    zorz0004.media.getCurrentPosition((pos)=>{
        pos -= 10;
        if(pos > 0){
            zorz0004.media.seekTo(pos * 1000);
            document.getElementById("musicRange").stepDown(10);
        } else{
            zorz0004.media.seekTo(0);
        }
    })
},

next: function(){
    if(zorz0004.mediaStatus != 1 && zorz0004.mediaStatus != 2 && zorz0004.mediaStatus != 3){
    //Play next song
   // if(zorz0004.mediaStatus === 4){
        let actid = zorz0004.actual;
        let el = {id: 0,
            artist: "",
            title: "",
            file: "",
            image: "",
            volume: 0};

        if (actid >= 5){
            // console.log(" if ");
            el = zorz0004.tracks[0];
        }else{
            // console.log("else");
            el = zorz0004.tracks[actid+1];
        }
        zorz0004.nextTrack = el;
        // console.log("element: "+ zorz0004.nextTrack.file);
        zorz0004.media.setVolume(zorz0004.tracks[actid].volume);
        zorz0004.actual = actid;

        //zorz0004.stop().apply;
        zorz0004.media.release();
        zorz0004.auto = 1;
        zorz0004.player.apply(zorz0004.nextTrack);
    }
},

volumeUp: function(){
    zorz0004.tracks[zorz0004.actual].volume += 0.1;
    if(zorz0004.tracks[zorz0004.actual].volume > 1){
        zorz0004.tracks[zorz0004.actual].volume = 1;
        zorz0004.media.setVolume(1);
    }else{
        zorz0004.media.setVolume(zorz0004.tracks[zorz0004.actual].volume + 0.1);
    }
    //console.log('current volume', zorz0004.tracks[zorz0004.actual].volume);
},

volumeDown: function(){
    zorz0004.tracks[zorz0004.actual].volume -= 0.1;
    if(zorz0004.tracks[zorz0004.actual].volume < 0.1){
        zorz0004.tracks[zorz0004.actual].volume = 0.0;
        zorz0004.media.setVolume(0);
    }else{
        zorz0004.media.setVolume(zorz0004.tracks[zorz0004.actual].volume - 0.1);
    }
    //console.log('current volume', zorz0004.tracks[zorz0004.actual].volume);
}


}
if (document.deviceready) {
    document.addEventListener("deviceready", zorz0004.init);
} else {
    document.addEventListener("DOMContentLoaded", zorz0004.init);
}


