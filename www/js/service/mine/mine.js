/**
 * Created by AaronYuan on 10/31/15.
 */
/// <reference path="../../app.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var Mine = (function () {
        function Mine($rootScope, $q, $resource) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.mineResource = $resource(JDB.appHost + '/:action', {
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
                    needAccessToken: true,
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
            return this.$rootScope.requestHandler(this.mineResource.saveData, args, null);
        };
        Mine.prototype.login = function (args) {
            return this.$rootScope.requestHandler(this.mineResource.login, args, null);
        };
        Mine.prototype.logout = function () {
            window.localStorage.clear();
            this.$rootScope.User = null;
        };
        Mine.prototype.sendSMSCode = function () {
            return this.$rootScope.requestHandler(this.mineResource.smsCode, null, null);
        };
        Mine.prototype.register = function (args) {
            return this.$rootScope.requestHandler(this.mineResource.register, args, null);
        };
        return Mine;
    })();
    Mine.$inject = ['$rootScope', '$q', '$resource'];
    JDB.ServiceModule.service('MineService', Mine);
})(JDB || (JDB = {}));
//# sourceMappingURL=mine.js.map