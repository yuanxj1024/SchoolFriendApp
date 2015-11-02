/**
 *
 * Created by AaronYuan on 10/31/15.
 */
/// <reference path="../../app.ts" />
///邀请码
var JDB;
(function (JDB) {
    'use strict';
    var InviteCode = (function () {
        function InviteCode($rootScope, $scope) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            $scope.createNewCode = angular.bind(this, this.createNewCode);
            $scope.copyCode = angular.bind(this, this.copyCode);
            $scope.currentCode = this.getUID();
        }
        InviteCode.prototype.createNewCode = function () {
            this.$scope.currentCode = this.getUID();
        };
        InviteCode.prototype.copyCode = function () {
        };
        //生成随机字符串
        InviteCode.prototype.getUID = function () {
            return 'xxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16).toLocaleUpperCase();
            });
        };
        return InviteCode;
    })();
    InviteCode.$inject = ['$rootScope', '$scope'];
    JDB.CtrlModule.controller('InviteCodeCtrl', InviteCode);
})(JDB || (JDB = {}));
//# sourceMappingURL=invite-code.js.map