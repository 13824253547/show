(function (window) {
    function Progress($progress_bar, $progress_line, $progress_dot) {
        return new Progress.prototype.init($progress_bar, $progress_line, $progress_dot);
    }

    Progress.prototype = {
        constructor: Progress,
        isMove:false,
        init: function ($progress_bar, $progress_line, $progress_dot) {
            this.$progress_bar = $progress_bar;
            this.$progress_line = $progress_line;
            this.$progress_dot = $progress_dot;
        },
        progressClick: function (callback) {
            $this = this;
            this.$progress_bar.on("click", function () {
                var inX = $(this).offset().left;
                var e = event || window.event;
                var progressX = e.pageX;
                var X = parseInt(progressX - inX) + "px";
                $this.$progress_line.css("width", X);
                var V = ((progressX - inX)/$this.$progress_bar.width());
                callback(V);
            });
        },
        progressMove: function (callback) {
            $this = this;
            this.$progress_bar.mousedown(function () {
                console.log($this.isMove,"mousedown");
                $this.isMove = true;
                console.log($this.isMove,"mousedown");
                var inX = $(this).offset().left;
                $(document).mousemove(function (event) {
                    var e = event || window.event;
                    var progressX = e.pageX;
                    X = progressX - inX;
                    if (progressX - inX > parseInt($this.$progress_bar.width())) {
                        X = parseInt($this.$progress_bar.width());
                    }
                    var V = ((progressX - inX)/$this.$progress_bar.width());
                    callback(V,X);
                });
            });
            $(document).mouseup(function () {
                $(document).off("mousemove");//移除指定事件；
                //console.log($this.isMove,"mouseup");
                $this.isMove = false;
               // console.log($this.isMove,"mouseup");
            });
        },
        setProgress: function (value) {
            $this = this;
          //  console.log($this.isMove,"setProgress");
            if ($this.isMove){
                return;
            }
            if (isNaN(value)){
                return;
            }else {
                console.log(1);
                if (value > 100){
                    return;
                }else if (value < 0) {
                    value = 0;
                }else {
                    value = value;
                }
            }
            $this.$progress_line.css("width",value + "%");
        }
    };

    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;
})(window);