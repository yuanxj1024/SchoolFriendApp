/**
 * Created by AaronYuan on 10/31/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
var JDB;
(function (JDB) {
    'use strict';
    //用户头像选择
    var userHeaderSheet = null;
    var Mine = (function () {
        function Mine($rootScope, $q, $resource, $ionicActionSheet, CommonService) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.$ionicActionSheet = $ionicActionSheet;
            this.CommonService = CommonService;
            this.mineResource = $resource(JDB.appHost + '/user/:action', {
                action: '@action'
            }, {
                saveData: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'perfinfo'
                    }
                },
                login: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: false,
                    //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    params: {
                        action: 'login'
                    }
                },
                smsCode: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: false,
                    params: {
                        action: 'verifycode'
                    }
                },
                register: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: false,
                    params: {
                        action: 'register'
                    }
                },
                getInvitateCode: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'makeinvitatecode'
                    }
                },
                createInvitateCode: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'makeinvitatecode'
                    }
                }
            });
        }
        Mine.prototype.saveUserData = function (args) {
            return this.$rootScope.requestHandler(this.mineResource.saveData, args, true);
        };
        Mine.prototype.login = function (args) {
            return this.$rootScope.requestHandler(this.mineResource.login, args, true);
        };
        Mine.prototype.logout = function () {
            window.localStorage.clear();
            this.$rootScope.User = null;
        };
        Mine.prototype.sendSMSCode = function (args) {
            return this.$rootScope.requestHandler(this.mineResource.smsCode, args, true);
        };
        Mine.prototype.register = function (args) {
            return this.$rootScope.requestHandler(this.mineResource.register, args, true);
        };
        Mine.prototype.changeUserHeader = function (callback) {
            if (userHeaderSheet) {
                return null;
            }
            userHeaderSheet = {};
            userHeaderSheet = this.$ionicActionSheet.show({
                buttons: [
                    { text: '选择' }
                ],
                cancelText: '取消',
                cancel: function () {
                    userHeaderSheet = null;
                },
                buttonClicked: function (index) {
                    //索引从零开始
                    callback && callback(index);
                    userHeaderSheet = null;
                    return true;
                }
            });
            return null;
        };
        //邀请码
        Mine.prototype.createInvitateCode = function (args) {
            return this.$rootScope.requestHandler(this.mineResource.invitateCode, args, true);
        };
        //上传头像
        Mine.prototype.uploadHeadImg = function (file, processFn) {
            return this.CommonService.uploadFile({
                url: '/user/perfinfo',
                fields: {
                    phone: this.$rootScope.User.phone
                },
                file: file,
                progressFn: processFn
            });
        };
        Mine.prototype.getInviteCode = function (args) {
            return this.$rootScope.requestHandler(this.mineResource.getInvitateCode, args, true);
        };
        Mine.prototype.createInviteCode = function (args) {
            return this.$rootScope.requestHandler(this.mineResource.createInvitateCode, args, true);
        };
        return Mine;
    })();
    Mine.$inject = ['$rootScope', '$q', '$resource', '$ionicActionSheet', 'CommonService'];
    JDB.ServiceModule.service('MineService', Mine);
})(JDB || (JDB = {}));
//# sourceMappingURL=mine.js.map