$(function () {
    $("#listM").mCustomScrollbar();

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
        window.number = parseInt($(this).parents(".listMusic").find(".number").text());
        $(this).toggleClass("a_play1");
        $(this).parents(".listMusic").find(".list-check").toggleClass("gif");
        $(this).parents(".listMusic").find(".list-check i").toggleClass("check_box");
        $(this).parents(".listMusic").siblings().find(".song >  .son >.a_play").removeClass("a_play1");
        $(this).parents(".listMusic").siblings().find(".list-check").removeClass("gif");
        $(this).parents(".listMusic").siblings().find(".list-check i").removeClass("check_box");
        if ($(this).attr("class").indexOf("a_play1") != -1) {
            $("#footer-in >.play").addClass("play1");
        } else {
            $("#footer-in >.play").removeClass("play1");
        }
    });

    $("#footer-in >.play").on("click", function () {
        $(this).toggleClass("play1");
        var num1 = number + 1;
        var $a = $("#mCSB_1_container>li:nth-child(" + num1 + ")>.song >  .son >.a_play");
        var $check = $("#mCSB_1_container>li:nth-child(" + num1 + ")>.list-check");
        var $check_box = $("#mCSB_1_container>li:nth-child(" + num1 + ")>.list-check i");
        if ($("#footer-in >.play").attr("class").indexOf("play1") != -1) {
            $a.addClass("a_play1");
            $check.addClass("gif");
            $check_box.addClass("check_box");
        } else {
            $a.removeClass("a_play1");
            $check.removeClass("gif");
            $check_box.removeClass("check_box");
        }
    });

    $("#footer-in >.only").on("click", function () {
        $(this).toggleClass("only1");
    });
    getPlay();

    function getPlay() {
        var $listM = $("#mCSB_1_container");
        var $Li;
        $.ajax({
            url: "./source/music.json",
            dataType: "json",
            success: function (data) {
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
        return $li;
    }
});