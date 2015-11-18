/**
 * Created by AaronYuan on 10/31/15.
 */
/// <reference path="../../app.ts" />
var JDB;
(function (JDB) {
    'use strict';
    //用户头像选择
    var userHeaderSheet = null;
    var Mine = (function () {
        function Mine($rootScope, $q, $resource, $ionicActionSheet) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.$ionicActionSheet = $ionicActionSheet;
            this.mineResource = $resource(JDB.appHost + '/user/:action', {
                action: '@action'
            }, {
                saveData: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'save'
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
                    //needLogin: false,
                    params: {
                        action: ''
                    }
                },
                register: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: false,
                    //needLogin: false,
                    params: {
                        action: ''
                    }
                }
            });
        }
        Mine.prototype.saveUserData = function (args) {
            return this.$rootScope.requestHandler(this.mineResource.saveData, args);
        };
        Mine.prototype.login = function (args) {
            //var defer = this.$q.defer();
            //this.mineResource.login(args,function(res){
            //    console.log(res);
            //    defer.resolve(res);
            //}, function(err){
            //    console.log(err);
            //    defer.reject(err);
            //});
            //return defer.promise;
            return this.$rootScope.requestHandler(this.mineResource.login, args, true);
        };
        Mine.prototype.logout = function () {
            window.localStorage.clear();
            this.$rootScope.User = null;
        };
        Mine.prototype.sendSMSCode = function () {
            return this.$rootScope.requestHandler(this.mineResource.smsCode, null);
        };
        Mine.prototype.register = function (args) {
            return this.$rootScope.requestHandler(this.mineResource.register, args);
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
        return Mine;
    })();
    Mine.$inject = ['$rootScope', '$q', '$resource', '$ionicActionSheet'];
    JDB.ServiceModule.service('MineService', Mine);
})(JDB || (JDB = {}));
//# sourceMappingURL=mine.js.map