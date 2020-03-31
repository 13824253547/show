$(document).ready(function () {
    //1.移除广告
    $(".advertisement > div").on("click", () => {
        $(".advertisement").remove();
    });
    //2.设置右边悬浮窗的高度
    //2.1获取屏幕可用区域的高度
    let resizenav = () => {
        //2.2设置右边悬浮窗的高度
        let h = $(window).height();
        $(".body-right").css({height: h});
    };
    resizenav();
    $(window).on("resize", function () {
        resizenav();
    });
    //3监视鼠标进出悬浮窗事件
    let bodyRight = $(".body-right");
    bodyRight.hover(function () {
        bodyRight.removeClass("reverse-width");
        bodyRight.addClass("animation-width");
        setTimeout(function () {
            $(".float-top p").css({visibility: "visible"});
        }, 300);
    }, function () {
        bodyRight.removeClass("animation-width");
        bodyRight.addClass("reverse-width");
        $(".float-top p").css({visibility: "hidden"});
    });
    //4.监视鼠标进出微信和app图标
    $("#weiXin").hover(function () {
        $(".out-div").css({display: "block"});
    }, function () {
        $(".out-div").css({display: "none"});
    });
    $("#app").hover(function () {
        $(".out-div2").css({display: "block"});
    }, function () {
        $(".out-div2").css({display: "none"});
    });
    //5.悬浮窗中向上箭头点击的滚动事件
    $(".float-bottom>div:first-child").on("click", function () {
        //5.1使用锚点平滑跳转
        $("html,body").animate({scrollTop: $("#test").offset().top}, 700);
    });
    //6.设置搜索框悬浮再顶端的样式
    let style = () => {
        if ($(document).scrollTop() >= 70 && $(window).width() >= 768) {
            $(".seo").css({
                borderBottom: "1px solid #e0e0e0",
                boxShadow: " 2px 2px 2px #e0e0e0",
                height: "120px"
            });
            $("#seo").css({
                width: "80%",
                height: "60px",
                marginTop: "30px"
            }).addClass("jump");
            $("#seo>div>button").css({
                height: "60px"
            });
            $("#main_down").css({
                top: "55px"
            });
        } else if ($(document).scrollTop() < 70 && $(window).width() > 768) {
            $("#seo").removeClass("jump").css({
                width: "70%",
                height: "50px"
            });
            $(".seo").css({
                borderBottom: "none",
                boxShadow: "none"
            });
            $("#seo>div>button").css({
                height: "50px"
            });
            $("#main_down").css({
                top: "49px"
            });
        } else if ($(document).scrollTop() >= 46 && $(window).width() < 768) {
            $("#seo>div>p").css({paddingLeft: "5px"});
            $(".seo").css({
                borderBottom: "1px solid #e0e0e0",
                boxShadow: " 2px 2px 2px #e0e0e0",
                height: "43px"
            });
            $("#seo").css({
                width: "100%",
                height: "43px",
                marginTop: "30px"
            }).addClass("jump");
            $("#seo>div>button").css({
                height: "40px"
            });
            $("#main_down").css({
                top: "40px"
            });
        } else if ($(document).scrollTop() < 46 && $(window).width() < 768) {
            $("#seo").removeClass("jump").css({
                width: "270px",
                height: "36px",
                marginTop: "10px"
            });
            $("#seo>div>p").css({paddingLeft: "5px"});
            $(".seo").css({
                borderBottom: "none",
                height: "50px",
                boxShadow: "none"
            });
            $("#seo>div>button").css({
                height: "34px"
            });
            $("#main_down").css({
                top: "33px"
            });
        }
    };
    $(document).scroll(function () {
        style();
    });
    window.onresize = function () {
        style();
    };
    //7.下拉框
    let divState = 0;
    let stopPropagation = (e) => {
        e = e || window.event;
        if (e.stopPropagation) { //W3C阻止冒泡方法
            e.stopPropagation();
        } else {
            e.cancelBubble = true; //IE阻止冒泡方法
        }
    };
    $("#seo>div:first-child").on("click", function () {
        stopPropagation();
        if (divState === 0) {
            $("#main_down").slideDown(600);
            divState = 1;
        } else {
            $("#main_down").slideUp(600);
            divState = 0;
        }
    });
    $(document).on("click", function () {
        if (divState === 1) {
            $("#main_down").slideUp(600);
            divState = 0;
        }
    });

    //8.下拉框的选中与p标签值的变换
    //8.1事件委托
    $("#main_down>ul>li").on('click', $("#seo"), function () {
        let p_text = this.innerText;
        $("#seo>div:first-child >p").text(p_text);
    });


    //9.使用数据文件驱动节点的创建
    let boxHover = () => {
        $(".box > div").hover(function () {
            $(this).find("ul>li:first-child").css({
                color: "#00d7c6",
            });
            $(this).addClass("shadow");
        }, function () {
            $(this).find("ul>li:first-child").css({
                color: "#61687c",
            });
            $(this).removeClass("shadow");
        });
    };
    let createNode = (data, index, target) => {
        let Data = data[index].data;
        let box = $("<div class='box'></div>");
        let Target = $(target);
        for (let i = 0; i <= 2; i++) {
            box.append("<div>\n" +
                "                        <div><img src=" + Data[i].imgUrl + "/></div>\n" +
                "                        <ul>\n" +
                "                            <li>" + Data[i].name + "</li>\n" +
                "                            <li><b>" + Data[i].locale + "</b>" +
                "<b>" + Data[i].time + "</b>" +
                "<b>" + Data[i].Education + "</b></li>\n" +
                "                            <li>" + Data[i].wages + "</li>\n" +
                "                        </ul>\n" +
                "                    </div>");
        }
        Target.append(box);
    };
    //9.1通过ajax读取本地数据
    let getBoxData = () => {
        $.ajax({
            url: "./sources/json/data.json",
            dataType: "json",
            success: function (data) {
                //9.2创建节点
                let n = 0;
                let max = data.length;
                for (let i = 0; i <= 3; i++) {
                    createNode(data, i, ".postsShow");
                    n++;
                }
                //9.2点击更多职位后继续加载文件中的内容
                $(".more>button").on("click", function () {
                    if (n < max) {
                        if (n + 4 < max) {//判断是否满足点击一次增加的量
                            for (let i = 0; i <= 3; i++) {
                                createNode(data, n, ".postsShow");
                                n++;
                            }
                            boxHover();
                        } else {
                            for (let i = 0; i < max - n; i++) {
                                createNode(data, n, ".postsShow");
                                n++;
                            }
                            boxHover();
                        }
                    } else {
                        alert("无更多职位！");
                        $(".more>button").remove();
                    }
                });
                //9.3添加方法
                boxHover();
            },
            error(e) {
                console.log(e);
            }
        });
    };
    getBoxData();
    //10创建职位分类
    let creatLi = (data, target) => {
        let max = data.length;
        for (let i = 0; i < max; i++) {
            let Data = data[i].titleOne;
            let divMax = Data.titleTwo.length;
            let li = $("<li>" +
                " <b>" + Data.first + "</b>\n" +
                "                                <p>" + Data.second + "</p>\n" +
                "                                <p>" + Data.third + "</p>\n" +
                "                                <p>" + Data.fourth + "</p>\n" +
                "                                <p>" + Data.Fifth + "</p>\n" +
                "                                <i class=\"glyphicon glyphicon-menu-right\"></i></li>");
            let twoLevelMain = $("<div class=\"twoLevelMain\">\n" +
                "                                </div>");
            let MainBody = $("<div class=\"MainBody\"><div><b>技术</b></div></div>");
            for (let j = 0; j < divMax; j++) {
                let liMax = Data.titleTwo[j].titleThree.length;
                let liDiv1 = $("<div><div><b>" + Data.titleTwo[j].first + "</b></div></div>");
                let liDiv2 = $("<div></div>");
                let div = $("<div></div>");
                let ul = $("<ul>");
                for (let k = 0; k < liMax; k++) {
                    let li = $("<li>" + Data.titleTwo[j].titleThree[k] + "</li>");
                    ul.append(li);
                }
                liDiv2.append(ul);
                div.append(liDiv1);
                div.append(liDiv2);
                MainBody.append(div);
            }
            twoLevelMain.append(MainBody);
            li.append(twoLevelMain);
            $(target).append(li);
        }
    };
    let getBLiData = () => {
        $.ajax({
            url: "./sources/json/data2.json",
            dataType: "json",
            success: function (data) {
                creatLi(data, "#poster_left>div>ul");
                $("#poster_left>div:first-child>ul>li").on('mouseenter', $("#poster_left"), function () {
                    $(this).find("p").css("color", "#FFFFFF");
                    $(this).find(".MainBody").css("display", "block");
                });
                $("#poster_left>div:first-child>ul>li").on('mouseleave', $("#poster_left"), function () {
                    $(this).find("p").css("color", "rgba(0,0,0,0.5)");
                    $(this).find(".MainBody").css("display", "none");
                });
            },
            error(e) {
                console.log(e);
            }
        });
    };
    getBLiData();
});