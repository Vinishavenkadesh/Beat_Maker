class Drumkit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.currentKick = "./sounds/clean-808-kick_A_minor.wav";
    this.currentSnare = "./sounds/snare-punch-acoustic-10.wav";
    this.currentHihat = "./sounds/acoustic-hi-hats-clean-hat.wav";
    this.playBtn = document.querySelector(".play");
    this.muteBtn = document.querySelectorAll(".mute");
    this.select = document.querySelectorAll("select");
    this.tempoSlider = document.querySelector(".tempo-slider");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    // console.log(activeBars)
    // console.log(step);
    this.index++;
  }
  start(){
    const interval = (60 / this.bpm) * 1000;
    if (this.isPlaying) {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  };
  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }
  changeSound(e) {
    const selectorName = e.target.name;
    const selectorValue = e.target.value;
    // console.log(selectorName)
    console.log(selectorValue)
    // if (selectorName === "kick-select") {
    //   selectorName.then(() => {
    //     this.kickAudio.scr = selectorValue;
    //     // Automatic playback started!
    //   }).catch(function(error) {
    //     console.log(error)
    //     // Automatic playback failed.
    //     // Show a UI element to let the user manually start playback.
    //   });
    // }
    // if(selectorName == "kick-select"){
    //   this.kickAudio.scr = selectorValue;
    // }
    switch (selectorName) {
      case "kick-select":
        this.kickAudio.scr = selectorValue;
        // console.log(this.kickAudio.scr);
        break;
      case "snare-select":
        this.snareAudio.scr = selectorValue;
        // console.log(this.snareAudio.scr);
        break;
      case "hihat-select":
        this.hihatAudio.scr = selectorValue;
        // console.log(this.hihatAudio.scr);
        break;
    }
  }
  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")){
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;

        case "1":
          this.snareAudio.volume = 0;
          break;

        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    }
    else{
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;

        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }
  changeTempo(e){
    const tempoText = document.querySelector(".tempo-nr")
    tempoText.innerText = e.target.value;
    }
  
  updateTempo(e){
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play")
    if(playBtn.classList.contains("active")){
      this.start();
    }
  }
}

const drumkit = new Drumkit();

drumkit.pads.forEach(pad => {
  pad.addEventListener("click", drumkit.activePad);
  pad.addEventListener("animationend", function () {
    pad.style.animation = "";
  });
});

drumkit.playBtn.addEventListener("click", function(){
  drumkit.updateBtn();
  drumkit.start();
});

drumkit.select.forEach(select=> {
  select.addEventListener("change", function(e) {
    drumkit.changeSound(e);
  });
});

drumkit.muteBtn.forEach((btn) => {
  btn.addEventListener("click", function(e) {
    drumkit.mute(e);
  });
});
drumkit.tempoSlider.addEventListener("input",function(e){
  drumkit.changeTempo(e);
})
drumkit.tempoSlider.addEventListener("change",function(e){
  drumkit.updateTempo(e);
})
