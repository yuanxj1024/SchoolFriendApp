/**
 *
 * Created by AaronYuan on 11/3/15.
 */
/// <reference path="../app.ts" />
//自定义input 校验指令

module JDB {
    'use strict';

    class InputValidate {
        constructor(){
            var directive: ng.IDirective = {};
            directive.restrict = "A";
            directive.scope = {};
            directive.transclude = true;
            directive.template = '';
            directive.replace = true;
            directive.controller = function ($scope:ng.IScope, $element:any, $attrs:ng.IAttributes) {
                console.log('input validate');
                this.flip = function () {
                    //Some func
                };
            };
            directive.link = function ($scope:ng.IScope, $element:any, $attrs:ng.IAttributes) {
                console.log('link');
            };



            return directive;

        }
    }

    DirectiveModule.directive('inputValidate', [InputValidate]);

}
