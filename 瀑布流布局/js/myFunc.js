function scroll() {
    if (window.pageXOffset !== null) {
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    } else if (document.compatMode === "CSS1Compat") {
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }
    return {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
    }
}

function Get(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}

function client() {
    if (window.innerWidth) { // IE9+ 和 最新的浏览器
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else if (document.compatMode === 'CSS1Compat') {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }
}

function animate(obj, target, step) {//缓动动画
    // 1. 清除定时器
    clearInterval(obj.timer);

    // 2. 设置定时器
    obj.timer = setInterval(function () {
        // 2.1.0 判断方向
        var dir = obj.offsetLeft <= target ? step : -step;

        // 2.2.1 开始动画
        obj.style.left = obj.offsetLeft + dir + 'px';
        if (Math.abs(obj.offsetLeft - target) < step) {
            // 2.2.2 清除定时器
            clearInterval(obj.timer);
            // 2.2.3 纠正偏差
            obj.style.left = target + 'px';
        }
    }, 10);
}

function Client() {
    if (window.innerWidth) {
        return{
            width:window.innerWidth,//一般以此为基准
            height:window.innerHeight
        }
            }
    if (window.document.compatMode === "CSS1Compat"){
        return {
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }
    }
    return {
        width:document.body.clientWidth,//但body只包括body内的内容，不包括其他html元素，比document小
        height:document.body.clientHeight
    }
}