/**
 *
 * Created by AaronYuan on 11/2/15.
 */
var JDB;
(function (JDB) {
    'use strict';
    var tipDom = null, msgDom = null, timeTag = null;
    var timeValue = {
        'ex_short': 500,
        'short': 1000,
        'long': 3000
    };
    var Toast = (function () {
        function Toast() {
        }
        Toast.prototype.show = function (message, duration, position) {
            this._createDialog(message, position || 'center');
            if (tipDom.style.display == 'block') {
                clearTimeout(timeTag);
                this._close(duration || 'short');
                return null;
            }
            tipDom.style.display = "block";
            this._close(duration || 'short');
        };
        Toast.prototype.showExShortTop = function (message) {
            this.show(message, "ex_short", "top");
        };
        Toast.prototype.showExShortCenter = function (message) {
            this.show(message, "ex_short", "center");
        };
        Toast.prototype.showExShortBottom = function (message) {
            this.show(message, "ex_short", "bottom");
        };
        Toast.prototype.showShortTop = function (message) {
            this.show(message, "short", "top");
        };
        Toast.prototype.showShortCenter = function (message) {
            this.show(message, "short", "center");
        };
        Toast.prototype.showShortBottom = function (message) {
            this.show(message, "short", "bottom");
        };
        Toast.prototype.showLongTop = function (message) {
            this.show(message, "long", "top");
        };
        Toast.prototype.showLongCenter = function (message) {
            this.show(message, "long", "center");
        };
        Toast.prototype.showLongBottom = function (message) {
            this.show(message, "long", "bottom");
        };
        Toast.prototype._createDialog = function (message, position) {
            if (!tipDom) {
                tipDom = document.createElement('div');
                tipDom.classList.add('toastWrap');
                tipDom.style.display = 'none';
                msgDom = document.createElement('span');
                tipDom.appendChild(msgDom);
                document.body.appendChild(tipDom);
            }
            msgDom.innerHTML = message;
            var p = this._initPostion(position);
            if (p.top > -1) {
                tipDom.style.top = p.top + 'px';
            }
            if (p.left > -1) {
                tipDom.style.left = p.left + 'px';
            }
        };
        Toast.prototype._close = function (duration) {
            timeTag = setTimeout(function () {
                tipDom.style.display = 'none';
            }, timeValue[duration]);
        };
        Toast.prototype._replace = function (data) {
            return '';
        };
        Toast.prototype._initPostion = function (pos) {
            var height = window.innerHeight, point = { top: -1, left: -1 }, width = window.innerWidth;
            switch (pos) {
                case 'top':
                    point.top = 0;
                    break;
                case 'bottom':
                    point.top = height - 30;
                    break;
                case 'center':
                default:
                    point.top = height / 2 - 15;
                    break;
            }
            return point;
        };
        return Toast;
    })();
    window.plugins = window.plugins || {};
    window.plugins.toast = new Toast();
})(JDB || (JDB = {}));
//# sourceMappingURL=toast.js.map