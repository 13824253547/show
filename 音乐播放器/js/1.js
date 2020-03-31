$(function () {
    $("#listM").mCustomScrollbar();
    listen();
    getPlay();

    var $audio = $("audio");
    var player = new Player($audio);
    var $progress_bar = $(".progress_bar");
    var $progress_line = $(".progress_line");
    var $progress_dot = $(".progress_dot");
    var $progress = new Progress($progress_bar, $progress_line, $progress_dot);
    var $volume_bar = $(".volume_bar");
    var $volume_line = $(".volume_line");
    var $volume_dot = $(".volume_dot");
    var $volume = new Progress($volume_bar, $volume_line, $volume_dot);

    $progress.progressClick(function (value) {
        player.doMusic(value);
    });

    $progress.progressMove(function (value, X) {
        player.doMusic(value);
        $(".progress_line").css("width", X);
    });

    $volume.progressClick(function (value) {
        player.doVoice(value * ($(".progress_bar").width() / $(".volume_bar").width()));
        var X = parseInt($(".progress_bar").width()) * value;
        if (X > 58) {
            X = 58;
        }
        $(".volume_line").css("width", X);
    });

    $volume.progressMove(function (value) {
        player.doVoice(value * ($(".progress_bar").width() / $(".volume_bar").width()));
        var X = parseInt($(".progress_bar").width()) * value;
        if (X > 58) {
            X = 58;
        }
        $(".volume_line").css("width", X);
    });


    function listen() {
        $("body").delegate(".listMusic", "mouseenter", function () {
            $(this).find("a").stop().fadeIn(100);
            $(this).find("span").stop().fadeOut(100);
        });

        $("body").delegate(".listMusic", "mouseleave", function () {
            $(this).find("a").stop().fadeOut(100);
            $(this).find("span").stop().fadeIn(100);
        });

        $("body").delegate(".listMenu > .list-check", "click", function () {
            $(this).toggleClass("checked");
        });

        $("body").delegate(".listMusic > .song >  .son >.a_play", "click", function () {
            var $item = $(this).parents(".listMusic");
            $(this).toggleClass("a_play1");
            $(this).parents(".listMusic").find(".number").toggleClass("number2");
            $item.siblings().find(".song >  .son >.a_play").removeClass("a_play1");
            $item.siblings().find(".number").removeClass("number2");
            if ($(this).attr("class").indexOf("a_play1") != -1) {
                $("#footer-in >.play").addClass("play1");
            } else {
                $("#footer-in >.play").removeClass("play1");
            }
            player.playMusic($item.get(0).index, $item.get(0).music);
            initMusic(player.musicList[$item.get(0).index]);
        });

        $("body").delegate(".listMenu > .time a", "click", function () {
            var $item = $(this).parents(".listMusic");
            if ($item.get(0).index == player.currentIndex) {
                $(".next").trigger("click");
            }
            $(this).parents(".listMusic").remove();
            player.changeMusic($item.get(0).index);
            $(".listMusic").each(function (index, ele) {
                ele.index = index;
                $(ele).find(".number").text(index + 1);
            });
        });

        $("#footer-in >.play").on("click", function () {
            if (player.currentIndex == -1) {
                $(".listMusic").eq(0).find(".a_play").trigger("click");
            } else {
                $(".listMusic").eq(player.currentIndex).find(".a_play").trigger("click");
            }
        });

        $(".prev").on("click", function () {
            $(".listMusic").eq(player.prevIndex()).find(".a_play").trigger("click");
        });

        $(".next").on("click", function () {
            $(".listMusic").eq(player.nextIndex()).find(".a_play").trigger("click");
        });

        $("#footer-in >.only").on("click", function () {
            $(this).toggleClass("only1");
        });

        $("audio").on("timeupdate", function () {
            player.musicTimeUpdate(function (musicCurrentTime, durationTime, time) {
                $(".progress_time").text(time);
                var value = (musicCurrentTime / durationTime) * 100;
                $progress.setProgress(value);
            });
        });
        $(".volume_size").click(function () {
            $(".volume_size").toggleClass("volume_size0");
            if ($(".volume_size").attr("class").indexOf("volume_size0") != -1) {
                $("audio").get(0).volume = 0;
            } else {
                $("audio").get(0).volume = 1;
            }
        });
    }

    function getPlay() {
        var $listM = $("#mCSB_1_container");
        var $Li;
        $.ajax({
            url: "./source/music.json",
            dataType: "json",
            success: function (data) {
                initMusic(data[0]);
                player.musicList = data;
                $.each(data, function (index, music) {
                    $Li = creatLi(index, music);
                    $listM.append($Li);
                });
            },
            error(e) {
                console.log(e);
            }
        });
    }

    function creatLi(index, music) {
        var $li = $(" <li class=\"listMenu listMusic\">\n" +
            "                        <div class=\"list-check\"><i></i></div>\n" +
            "                        <div class=\"number\">" + (index + 1) + "\n" +
            "                        </div>\n" +
            "                        <div class=\"song\">" + music.name + "\n" +
            "                            <div class=\"son\">\n" +
            "                                <a href=\"javascript:\" class=\"a_play\" title=\"播放\"></a>\n" +
            "                                <a href=\"javascript:\" title=\"添加\"></a>\n" +
            "                                <a href=\"javascript:\" title=\"下载\"></a>\n" +
            "                                <a href=\"javascript:\" title=\"分享\"></a>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                        <div class=\"singer\">" + music.singer + "</div>\n" +
            "                        <div class=\"time\"><span>" + music.time + "</span><a href=\"javascript:\" title=\"删除\"></a></div>\n" +
            "                    </li>");
        $li.get(0).index = index;
        $li.get(0).music = music;
        return $li;
    }

    function initMusic(music) {
        $song_img = $(".song_info a img");
        $song_name = $("#song");
        $singer_name = $("#singer");
        $singer_album = $("#album");
        $progress_singer = $(".progress_singer");
        $progress_time = $(".progress_time");
        $song_img.attr("src", music.cover);
        $song_name.text(music.name);
        $singer_name.text(music.singer);
        $singer_album.text(music.album);
        $progress_singer.text(music.album + " / " + music.singer);
        $progress_time.text("00:00/" + music.time);
        $maskBg = $(".maskBg");
        $maskBg.css("background", "url('" + music.cover + "')");
    }

});