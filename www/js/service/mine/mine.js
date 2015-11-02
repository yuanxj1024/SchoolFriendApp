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
                saveDate: {
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
                }
            });
        }
        Mine.prototype.saveUserData = function (args) {
            return this.$rootScope.RequestHandler(this.mineResource.saveData, args, null);
        };
        Mine.prototype.login = function (args) {
            return this.$rootScope.RequestHandler(this.mineResource.login, args, null);
        };
        Mine.prototype.logout = function () {
            window.localStorage.clear();
            this.$rootScope.User = null;
        };
        Mine.prototype.sendSMSCode = function () {
            return this.$rootScope.RequestHandler(this.mineResource.smsCode, null, null);
        };
        Mine.prototype.test = function (args) {
            var defer = this.$q.defer();
            this.mineResource.smsCode(args, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                defer.resolve(result);
            }, function (err) {
                defer.reject(err);
            });
            return defer.promise;
        };
        return Mine;
    })();
    Mine.$inject = ['$rootScope', '$q', '$resource'];
    JDB.ServiceModule.service('MineService', Mine);
})(JDB || (JDB = {}));
//# sourceMappingURL=mine.js.map