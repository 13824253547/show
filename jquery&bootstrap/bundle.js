window.onload = function () {
    !function (o) {
        var e = {};

        function t(i) {
            if (e[i]) return e[i].exports;
            var n = e[i] = {i: i, l: !1, exports: {}};
            return o[i].call(n.exports, n, n.exports, t), n.l = !0, n.exports
        }

        t.m = o, t.c = e, t.d = function (o, e, i) {
            t.o(o, e) || Object.defineProperty(o, e, {enumerable: !0, get: i})
        }, t.r = function (o) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(o, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(o, "__esModule", {value: !0})
        }, t.t = function (o, e) {
            if (1 & e && (o = t(o)), 8 & e) return o;
            if (4 & e && "object" == typeof o && o && o.__esModule) return o;
            var i = Object.create(null);
            if (t.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: o
            }), 2 & e && "string" != typeof o) for (var n in o) t.d(i, n, function (e) {
                return o[e]
            }.bind(null, n));
            return i
        }, t.n = function (o) {
            var e = o && o.__esModule ? function () {
                return o.default
            } : function () {
                return o
            };
            return t.d(e, "a", e), e
        }, t.o = function (o, e) {
            return Object.prototype.hasOwnProperty.call(o, e)
        }, t.p = "", t(t.s = 0)
    }([function (o, e, t) {
        t(1), t(2)
    }, function (o, e) {
        $(document).ready((function () {
            $(".advertisement > div").on("click", () => {
                $(".advertisement").remove()
            });
            let o = () => {
                let o = $(window).height();
                $(".body-right").css({height: o})
            };
            o(), $(window).on("resize", (function () {
                o()
            }));
            let e = $(".body-right");
            e.hover((function () {
                e.removeClass("reverse-width"), e.addClass("animation-width"), setTimeout((function () {
                    $(".float-top p").css({visibility: "visible"})
                }), 300)
            }), (function () {
                e.removeClass("animation-width"), e.addClass("reverse-width"), $(".float-top p").css({visibility: "hidden"})
            })), $("#weiXin").hover((function () {
                $(".out-div").css({display: "block"})
            }), (function () {
                $(".out-div").css({display: "none"})
            })), $("#app").hover((function () {
                $(".out-div2").css({display: "block"})
            }), (function () {
                $(".out-div2").css({display: "none"})
            })), $(".float-bottom>div:first-child").on("click", (function () {
                $("html,body").animate({scrollTop: $("#test").offset().top}, 700)
            }));
            let t = () => {
                $(document).scrollTop() >= 70 && $(window).width() >= 768 ? ($(".seo").css({
                    borderBottom: "1px solid #e0e0e0",
                    boxShadow: " 2px 2px 2px #e0e0e0",
                    height: "120px"
                }), $("#seo").css({
                    width: "80%",
                    height: "60px",
                    marginTop: "30px"
                }).addClass("jump"), $("#seo>div>button").css({height: "60px"}), $("#main_down").css({top: "55px"})) : $(document).scrollTop() < 70 && $(window).width() > 768 ? ($("#seo").removeClass("jump").css({
                    width: "70%",
                    height: "50px"
                }), $(".seo").css({
                    borderBottom: "none",
                    boxShadow: "none"
                }), $("#seo>div>button").css({height: "50px"}), $("#main_down").css({top: "49px"})) : $(document).scrollTop() >= 46 && $(window).width() < 768 ? ($("#seo>div>p").css({paddingLeft: "5px"}), $(".seo").css({
                    borderBottom: "1px solid #e0e0e0",
                    boxShadow: " 2px 2px 2px #e0e0e0",
                    height: "43px"
                }), $("#seo").css({
                    width: "100%",
                    height: "43px",
                    marginTop: "30px"
                }).addClass("jump"), $("#seo>div>button").css({height: "40px"}), $("#main_down").css({top: "40px"})) : $(document).scrollTop() < 46 && $(window).width() < 768 && ($("#seo").removeClass("jump").css({
                    width: "270px",
                    height: "36px",
                    marginTop: "10px"
                }), $("#seo>div>p").css({paddingLeft: "5px"}), $(".seo").css({
                    borderBottom: "none",
                    height: "50px",
                    boxShadow: "none"
                }), $("#seo>div>button").css({height: "34px"}), $("#main_down").css({top: "33px"}))
            };
            $(document).scroll((function () {
                t()
            })), window.onresize = function () {
                t()
            };
            let i = 0;
            $("#seo>div:first-child").on("click", (function () {
                var o;
                (o = o || window.event).stopPropagation ? o.stopPropagation() : o.cancelBubble = !0, 0 === i ? ($("#main_down").slideDown(600), i = 1) : ($("#main_down").slideUp(600), i = 0)
            })), $(document).on("click", (function () {
                1 === i && ($("#main_down").slideUp(600), i = 0)
            })), $("#main_down>ul>li").on("click", $("#seo"), (function () {
                let o = this.innerText;
                $("#seo>div:first-child >p").text(o)
            }));
            let n = () => {
                $(".box > div").hover((function () {
                    $(this).find("ul>li:first-child").css({color: "#00d7c6"}), $(this).addClass("shadow")
                }), (function () {
                    $(this).find("ul>li:first-child").css({color: "#61687c"}), $(this).removeClass("shadow")
                }))
            }, s = (o, e, t) => {
                let i = o[e].data, n = $("<div class='box'></div>"), s = $(t);
                for (let o = 0; o <= 2; o++) n.append("<div>\n                        <div><img src=" + i[o].imgUrl + "/></div>\n                        <ul>\n                            <li>" + i[o].name + "</li>\n                            <li><b>" + i[o].locale + "</b><b>" + i[o].time + "</b><b>" + i[o].Education + "</b></li>\n                            <li>" + i[o].wages + "</li>\n                        </ul>\n                    </div>");
                s.append(n)
            };
            $.ajax({
                url: "./sources/json/data.json", dataType: "json", success: function (o) {
                    let e = 0, t = o.length;
                    for (let t = 0; t <= 3; t++) s(o, t, ".postsShow"), e++;
                    $(".more>button").on("click", (function () {
                        if (e < t) if (e + 4 < t) {
                            for (let t = 0; t <= 3; t++) s(o, e, ".postsShow"), e++;
                            n()
                        } else {
                            for (let i = 0; i < t - e; i++) s(o, e, ".postsShow"), e++;
                            n()
                        } else alert("无更多职位！"), $(".more>button").remove()
                    })), n()
                }, error(o) {
                    console.log(o)
                }
            });
            $.ajax({
                url: "./sources/json/data2.json", dataType: "json", success: function (o) {
                    ((o, e) => {
                        let t = o.length;
                        for (let i = 0; i < t; i++) {
                            let t = o[i].titleOne, n = t.titleTwo.length,
                                s = $("<li> <b>" + t.first + "</b>\n                                <p>" + t.second + "</p>\n                                <p>" + t.third + "</p>\n                                <p>" + t.fourth + "</p>\n                                <p>" + t.Fifth + '</p>\n                                <i class="glyphicon glyphicon-menu-right"></i></li>'),
                                d = $('<div class="twoLevelMain">\n                                </div>'),
                                l = $('<div class="MainBody"><div><b>技术</b></div></div>');
                            for (let o = 0; o < n; o++) {
                                let e = t.titleTwo[o].titleThree.length,
                                    i = $("<div><div><b>" + t.titleTwo[o].first + "</b></div></div>"),
                                    n = $("<div></div>"),
                                    s = $("<div></div>"), d = $("<ul>");
                                for (let i = 0; i < e; i++) {
                                    let e = $("<li>" + t.titleTwo[o].titleThree[i] + "</li>");
                                    d.append(e)
                                }
                                n.append(d), s.append(i), s.append(n), l.append(s)
                            }
                            d.append(l), s.append(d), $(e).append(s)
                        }
                    })(o, "#poster_left>div>ul"), $("#poster_left>div:first-child>ul>li").on("mouseenter", $("#poster_left"), (function () {
                        $(this).find("p").css("color", "#FFFFFF"), $(this).find(".MainBody").css("display", "block")
                    })), $("#poster_left>div:first-child>ul>li").on("mouseleave", $("#poster_left"), (function () {
                        $(this).find("p").css("color", "rgba(0,0,0,0.5)"), $(this).find(".MainBody").css("display", "none")
                    }))
                }, error(o) {
                    console.log(o)
                }
            })
        }))
    }, function (o, e) {
    }]);
};