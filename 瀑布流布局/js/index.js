window.onload = function () {
    function Get(id) {
        return typeof id === "string" ? document.getElementById(id) : null;
    }

    function getMinIndex(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === val) {
                return i;
            }
        }
    }

    function checkWillLoadImg() {
        var allbox = Get("main").children;
        var lastBox = allbox[allbox.length - 1];
        var lastBoxTop = lastBox.offsetTop + lastBox.offsetHeight * 0.5;
        var scrollTop = scroll().top;
        var screenW = document.documentElement.clientHeight || document.body.clientWidth;
        return lastBoxTop <= screenW + scrollTop;
    }

    function waterFull(parent, child) {
        var allBox = Get(parent).children;
        var childW = allBox[0].offsetWidth;
        var list = parseInt(document.documentElement.clientWidth / childW);
        Get(parent).style.width = list * childW + "px";
        var heightArr = [], boxHeight = 0, minHeight = 0, minIndex;
        for (var i = 0; i < allBox.length; i++) {
            boxHeight = allBox[i].offsetHeight;
            if (i < list) {
                heightArr.push(boxHeight);
                allBox[i].style = "";
            } else {
                minHeight = _.min(heightArr);
                minIndex = getMinIndex(heightArr, minHeight);
                allBox[i].style.position = "absolute";
                allBox[i].style.left = minIndex * childW + "px";
                allBox[i].style.top = minHeight + "px";
            }
            heightArr[minIndex] += boxHeight;
        }
    }

    waterFull("main", "box");

    var timer1 = null;
   window.onscroll = function () {
        if (checkWillLoadImg()) {
            var dataArr = [
                {"src": "img01.jpg"},
                {"src": "img03.jpg"},
                {"src": "img05.jpg"},
                {"src": "img07.jpg"},
                {"src": "img09.jpg"},
                {"src": "img10.jpg"},
                {"src": "img11.jpg"},
                {"src": "img02.jpg"},
                {"src": "img04.jpg"},
                {"src": "img08.jpg"},
                {"src": "img13.jpg"},
                {"src": "img12.jpg"},
                {"src": "img14.jpg"},
            ];
            for (var i = 0; i < dataArr.length; i++) {
                var newBox = document.createElement("div");
                newBox.className = "box";
                Get("main").appendChild(newBox);

                var newPic = document.createElement("div");
                newPic.className = "pic";
                newBox.appendChild(newPic);

                var newImg = document.createElement("img");
                newImg.src = "images/" + dataArr[i].src;
                newPic.appendChild(newImg);
            }
            clearTimeout(timer1);
            //进行节流，减低频率，提高系统效率
            timer1 = setTimeout(function () {
                waterFull("main", "box");
                console.log(1);
            }, 200);
        }
    };

   var timer2 = null;
    window.onresize = function () {
        clearTimeout(timer2);
        timer2 = setTimeout(function () {
            waterFull("main", "box");
            console.log(2);
        }, 200);

    }
};