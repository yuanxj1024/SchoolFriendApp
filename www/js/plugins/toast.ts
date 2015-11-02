/**
 *
 * Created by AaronYuan on 11/2/15.
 */

module JDB {
    'use strict';

    interface IPoint {
        top:number;
        left:number;
    }

    declare var window:any;

    var tipDom :HTMLElement = null,
        msgDom: HTMLElement = null,
        timeTag = null;

    var timeValue = {
        'ex_short':500,
        'short': 1000,
        'long': 3000
    };

    class Toast {
        constructor() {

        }
        show(message, duration, position) {
            this._createDialog(message, position || 'center');
            if(tipDom.style.display == 'block'){
                clearTimeout(timeTag);
                this._close(duration||'short');
                return null;
            }
            tipDom.style.display = "block";
            this._close(duration||'short');
        }
        showExShortTop(message) {
            this.show(message, "ex_short", "top");
        }
        showExShortCenter(message) {
            this.show(message, "ex_short", "center");
        }
        showExShortBottom(message) {
            this.show(message, "ex_short", "bottom");
        }
        showShortTop(message) {
            this.show(message, "short", "top");
        }
        showShortCenter(message) {
            this.show(message, "short", "center");
        }
        showShortBottom(message) {
            this.show(message, "short", "bottom");
        }
        showLongTop(message) {
            this.show(message, "long", "top");
        }
        showLongCenter(message) {
            this.show(message, "long", "center");
        }
        showLongBottom(message) {
            this.show(message, "long", "bottom");
        }

        _createDialog(message, position):any {
            if(!tipDom){
                tipDom = document.createElement('div');
                tipDom.classList.add('toastWrap');
                tipDom.style.display = 'none';
                msgDom =document.createElement('span');
                tipDom.appendChild(msgDom);
                document.body.appendChild(tipDom);
            }
            msgDom.innerHTML = message;
            var p = this._initPostion(position);
            if(p.top > -1){
                tipDom.style.top = p.top + 'px';
            }

            if(p.left > -1){
                tipDom.style.left = p.left + 'px';
            }

        }
        _close(duration){
            timeTag = setTimeout(function(){
                tipDom.style.display = 'none';
            },timeValue[duration]);
        }

        _replace(data:any): string {
            return '';
        }
        _initPostion(pos:string): IPoint {
            var height = window.innerHeight,
                point: IPoint = {top:-1, left:-1},
                width = window.innerWidth;

            switch (pos) {
                case 'top':
                    point.top = 0;
                    break;
                case 'bottom':
                    point.top = height- 30;
                    break;
                case 'center':
                default:
                    point.top = height/2 -15;
                    //point.left = width/2;
                    break;
            }
            return point;
        }
    }

    window.plugins = window.plugins ||{};
    window.plugins.toast = new Toast();
}
