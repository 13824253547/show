window.onload = function () {
    //1.获取屏幕高度用来设置蒙版的高度
    const height = document.body.clientHeight || window.screen.availHeight;
    const mask = document.getElementById("mask");
    mask.style.height = height + "px";

    //2.监听title中的点击,切换模块和设置样式
    const title = document.getElementById("title");
    const titleChild = title.getElementsByTagName("div");
    for (let i = 0; i < 3; i++) {
        let child = null;
        let name = null;
        titleChild[i].onclick = function () {
            for (let i = 0; i < 3; i++) {
                child = titleChild[i].getElementsByTagName("p")[0];
                child.classList.remove("active");
                name = child.getAttribute("name");

                document.getElementById(name).style.display = "none";
            }
            child = this.getElementsByTagName("p")[0];
            child.classList.add("active");
            name = child.getAttribute("name");
            document.getElementById(name).style.display = "flex";
        }
    }

    //3.设置输入框获得焦点后，父级边框及兄弟元素改变颜色
    let name = ["iphone", "password"];
    let iconName = ["icon-iphone", "icon-pwd"];
    for (let i = 2; i <= 3; i++) {
        let Input = document.getElementsByTagName("input")[i - 1];
        let borderChange = document.getElementById(name[i - 2]);
        let Icon = document.getElementById(iconName[i - 2]);
        Input.onfocus = function () {
            borderChange.style.border = "solid 1px #6B6ECE";
            Icon.classList.add("changeColor");
        };

        Input.onblur = function () {
            borderChange.style.border = "solid 1px #e8e0e0";
            Icon.classList.remove("changeColor");
        };
    }
    //4.拖动滑块,完成验证
    let verification = document.getElementById("verification");
    let SlideBlock = document.getElementsByClassName("verification_first")[0];

    SlideBlock.onmousedown = function () {
        let [mouseX, BlockX, BlockWidth, X, verificationWidth] = [0, 0, 0, 0, 0];
        console.log(SlideBlock.style.marginLeft);
        if (SlideBlock.style.marginLeft !== verification.offsetWidth - SlideBlock.offsetWidth + 'px') {//保证验证完成后用户无法再操作滑块
            document.onmousemove = function () {
                e = event || window.event;
                mouseX = e.clientX;
                BlockX = verification.offsetLeft + verification.offsetParent.offsetLeft;
                BlockWidth = SlideBlock.offsetWidth;
                verificationWidth = verification.offsetWidth;
                X = mouseX - BlockX - BlockWidth;
                if (X < verificationWidth - BlockWidth && X > 0) {
                    SlideBlock.style.marginLeft = X + "px"
                } else if (X >= verificationWidth - BlockWidth) {
                    SlideBlock.style.marginLeft = verificationWidth - BlockWidth + "px";
                } else {
                    SlideBlock.style.marginLeft = 0 + "px"
                }
            };

            document.onmouseup = function (e) {
                e = event || window.event;
                mouseX = e.clientX;
                BlockX = verification.offsetLeft + verification.offsetParent.offsetLeft;
                BlockWidth = SlideBlock.offsetWidth;
                verificationWidth = verification.offsetWidth;
                X = mouseX - BlockX - BlockWidth;
                if (X >= verificationWidth - BlockWidth) {
                    let verification_second = document.getElementsByClassName("verification_second")[0];
                    let verification_p = verification_second.getElementsByTagName("p")[0];
                    verification_p.innerText = "验证中";
                    setTimeout(function () {
                        verification_p.innerText = "验证通过";
                        SlideBlock.style.borderColor = "#6B6ECE";
                        let child = SlideBlock.getElementsByTagName("i")[0];
                        SlideBlock.removeChild(child);
                        $("#verification>.verification_first").append("<i data-icon='&#xea10;'></i>");
                        let child2 = SlideBlock.getElementsByTagName("i")[0];
                        child2.classList.add("changeColor");
                        child2.classList.add("animation");
                        setTimeout(function () {
                            child2.classList.remove("animation");
                        }, 500)//移除动画，防止模块切换时再次触发动画
                    }, 1000);
                } else {
                    SlideBlock.style.marginLeft = 0 + "px"
                }
                document.onmousemove = null;
                document.onmousedown = null;
                document.onmouseup = null;
            }
        } else {
            alert("验证已完成！");
        }
    };


    let stopPropagation = (e) => {
        e = e || window.event;
        if (e.stopPropagation) { //W3C阻止冒泡方法
            e.stopPropagation();
        } else {
            e.cancelBubble = true; //IE阻止冒泡方法
        }
    };

    //5.电话簿点击后下拉与上滑动画
    let arrowParent = document.getElementsByClassName("arrowParent")[0];
    let arrow = document.getElementById("arrow");
    let iphone = document.getElementById("iphone");
    let div = iphone.getElementsByTagName("div")[0];
    arrowParent.onclick = function () {
        let arrowName = arrow.getAttribute("name");
        stopPropagation();
        if (arrowName === "arrow" || arrowName == null) {
            div.classList.remove("animation-up");
            arrow.classList.remove("animation-rotate360");
            arrow.classList.add("animation-rotate180");
            arrow.classList.add("changeColor");
            div.classList.add("animation-down");
            arrow.setAttribute("name", "arrow2");
        } else {
            div.classList.remove("animation-down");
            arrow.classList.remove("animation-rotate180");
            arrow.classList.remove("changeColor");
            arrow.classList.add("animation-rotate360");
            div.classList.add("animation-up");
            arrow.setAttribute("name", "arrow");
        }

        document.onclick = function () {
            let arrowName = arrow.getAttribute("name");
            div.classList.remove("animation-down");
            arrow.classList.remove("animation-rotate180");
            arrow.classList.remove("animation-rotate360");
            div.classList.remove("animation-up");
            arrow.classList.remove("changeColor");
            arrow.setAttribute("name", "arrow");
        };
    };
    //6.电话簿的中电话号码的点击事件
    let ul = div.getElementsByTagName("ul")[0];
    ul.addEventListener("click", function (e) {//事件委托
        if (e.target && e.target.nodeName.toLowerCase() === "li" || e.target && e.target.nodeName.toLowerCase() === "span") {  // 检查事件源e.target是否为Li  
            let li = e.target && e.target.nodeName.toLowerCase() === "li" ? e.target : e.target.parentElement;
            let data = li.getAttribute("data-val");
            let em = arrowParent.getElementsByTagName("em")[0];
            let input = arrowParent.getElementsByTagName("input")[0];
            em.innerText = data;
            input.value = data.toString();
        }
    });

    //7.登录按钮点击之后触发的验证事件
    let logon = document.getElementById("logon");
    let submit = logon.getElementsByTagName("button")[0];
    submit.onclick = function () {
        let iphoneValue1 = document.getElementById("iphoneValue1").value;
        let iphoneValue2 = document.getElementById("iphoneValue2").value;
        let passwordValue = document.getElementById("passwordValue").value;
        console.log(passwordValue);
        if (iphoneValue2 === "null" || iphoneValue2 === "") {
            alert("请输入手机号！");
            return false;
        } else if (!(/^1[3456789]\d{9}$/.test(iphoneValue2))) {
            alert("手机号码有误，请重填！");
            return false;
        } else if (passwordValue === null || passwordValue === "") {
            alert("请输入密码！");
        } else if (SlideBlock.style.marginLeft !== verification.offsetWidth - SlideBlock.offsetWidth + 'px') {
            alert("请拉动滑块完成验证！");
        } else {
            alert("手机号码为：" + iphoneValue1 + iphoneValue2)
        }
    };

};