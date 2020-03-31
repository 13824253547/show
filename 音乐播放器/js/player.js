(function (window) {
    function Player($audio) {
        return new Player.prototype.init($audio);
    }

    Player.prototype = {
        constructor: Player,
        musicList: [],
        init: function ($audio) {
            this.$audio = $audio;
            this.audio = $audio.get(0);
        },
        currentIndex: -1,
        playMusic: function (index, music) {
            if (this.currentIndex === index) {//也可以使用player.prototype.currentIndex
                if (this.audio.paused) {
                    this.audio.play();
                } else {
                    this.audio.pause();
                }
            } else {
                this.$audio.attr("src", music.link_url);
                this.audio.play();
                this.currentIndex = index;
            }
        },
        prevIndex: function () {
            var index = this.currentIndex - 1;
            if (index < 0) {
                index = this.musicList.length - 1;
            }
            console.log(index);
            return index;
        },
        nextIndex: function () {
            var index = this.currentIndex + 1;
            if (index > this.musicList.length - 1) {
                index = 0;
            }
            console.log(index);
            return index;
        },
        changeMusic: function (index) {
            this.musicList.splice(index, 1);
            if (index < this.currentIndex) {
                this.currentIndex = this.currentIndex - 1;
            }
        },
        musicTimeUpdate: function (callBack) {
            var $this = this;
            this.$audio.on("timeupdate", function () {
                var durationTime = $this.audio.duration;
                var musicCurrentTime = $this.audio.currentTime;
                var time = $this.initTime(musicCurrentTime, durationTime);
                callBack(musicCurrentTime, durationTime, time);
            });
        },
        initTime: function (musicCurrentTime, durationTime) {
            var durationMin = parseInt(durationTime / 60);
            var durationSec = parseInt(durationTime % 60);
            var currentMin = parseInt(musicCurrentTime / 60);
            var currentSec = parseInt(musicCurrentTime % 60);
            if (durationMin < 10) {
                durationMin = "0" + durationMin;
            }
            if (durationSec < 10) {
                durationSec = "0" + durationSec;
            }
            if (currentMin < 10) {
                currentMin = "0" + currentMin;
            }
            if (currentSec < 10) {
                currentSec = "0" + currentSec;
            }
            return currentMin + ":" + currentSec + "/" + durationMin + ":" + durationSec;
        },
        doMusic: function (value) {
            if (isNaN(value)){
                return;
            }
            if (value > 1 || value < 0){
                return;
            }
            $("audio").get(0).play();
            $("audio").get(0).currentTime = $("audio").get(0).duration * value ;
        },
        doVoice:function (value) {
            if (isNaN(value)){
                return;
            }else {
                if (value > 1){
                    return;
                }else if (value < 0) {
                    value = 0;
                    $("audio").get(0).volume = value;
                }else {
                    $("audio").get(0).volume = value;
                }
            }
        }
    };

    Player.prototype.init.prototype = Player.prototype;
    window.Player = Player;
})(window);