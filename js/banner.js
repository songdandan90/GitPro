;(function (win, $) {
    var banner = function (obj) {
        this.bannerBox = $(obj);
        this.listBox = this.bannerBox.find('.list');
        this.list = this.bannerBox.find('.list li');
        this.prevBtn = this.bannerBox.find('.prev');
        this.nextBtn = this.bannerBox.find('.next');
        this.pages = this.bannerBox.find('.banner-pages span');
        this.index = 0;
        this.len = this.list.length;
        this.timer = null;
        this.isClicked = false;
        this.cloneOneToLast = this.list.eq(0).clone();
        this.cloneOneToLast.appendTo(this.listBox);
        this.nextBtnClickEvent();
        this.prevBtnClickEvent();
        this.pagesClickEvent();
        this.bannerBoxHoverEvent();
        this.autoPlay();
    };
    $.extend(true, banner.prototype, {
        runByIndex: function () {
            var _this = this;
            this.pages.removeClass('on');
            if (this.index == this.len || this.index == 0) {
                this.pages.eq(0).addClass('on')
            } else {
                this.pages.eq(this.index).addClass('on');
            }
            this.listBox.animate({left: -this.index * 100 + '%'}, 500, function () {
                _this.isClicked = false;
            });
        },
        autoPlay: function () {
            var _this = this;
            _this.stopRun();
            _this.timer = setInterval(function () {
                _this.nextRun();
            }, 3000);
        },
        stopRun: function () {
            if (this.timer) {
                win.clearInterval(this.timer);
            }
        },
        nextRun: function () {
            if (this.index > this.len - 1) {
                this.index = 0;
                this.listBox.css('left', -this.index * 100 + '%');
            }
            this.index++;
            this.runByIndex();
        },
        prevRun: function () {
            if (this.index < 1) {
                this.index = this.len;
                this.listBox.css('left', -this.index * 100 + '%');
            }
            this.index--;
            this.runByIndex();
        },
        bannerBoxHoverEvent: function () {
            var _this = this;
            _this.bannerBox.hover(function () {
                _this.stopRun();
            }, function () {
                _this.autoPlay();
            });
        },
        pagesClickEvent: function () {
            var _this = this;
            _this.pages.click(function () {
                if (!_this.isClicked) {
                    _this.index = $(this).index();
                    _this.runByIndex();
                }
            });
        },
        prevBtnClickEvent: function () {
            var _this = this;
            _this.prevBtn.click(function () {
                if (!_this.isClicked) {
                    _this.isClicked = true;
                    _this.prevRun();
                }
            });
        },
        nextBtnClickEvent: function () {
            var _this = this;
            _this.nextBtn.click(function () {
                if (!_this.isClicked) {
                    _this.isClicked = true;
                    _this.nextRun();
                }
            });
        }
    });
    banner.init = function (obj) {
        for (var i = 0, len = obj.length; i < len; i++) {
            new this(obj[i]);
        }
    };
    win.MySelfBanner = banner;
})(window, jQuery);


MySelfBanner.init($('.banner-box'));