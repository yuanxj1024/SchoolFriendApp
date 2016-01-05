/**
 *
 * Created by AaronYuan on 11/3/15.
 */
/// <reference path="../app.ts" />
//自定义input 校验指令
var JDB;
(function (JDB) {
    'use strict';
    var InputValidate = (function () {
        function InputValidate() {
            var directive = {};
            directive.restrict = "A";
            directive.scope = {};
            directive.transclude = true;
            directive.template = '';
            directive.replace = true;
            directive.controller = function ($scope, $element, $attrs) {
                console.log('input validate');
                this.flip = function () {
                    //Some func
                };
            };
            directive.link = function ($scope, $element, $attrs) {
                console.log('link');
            };
            return directive;
        }
        return InputValidate;
    })();
    JDB.DirectiveModule.directive('inputValidate', [InputValidate]);
})(JDB || (JDB = {}));
//# sourceMappingURL=input-validate.js.map