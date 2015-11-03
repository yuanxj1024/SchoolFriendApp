/**
 * Created by AaronYuan on 10/27/15.
 */
/// <reference path="../app.ts" />
/// <reference path="../service/common.ts" />
//校验模块
var JDB;
(function (JDB) {
    'use strict';
    var userKey = 'authUser', loginModal = null;
    var Auth = (function () {
        function Auth($rootScope, $resource, $q, $ionicModal, CommonService) {
            this.$rootScope = $rootScope;
            this.$resource = $resource;
            this.$q = $q;
            this.$ionicModal = $ionicModal;
            this.CommonService = CommonService;
            this.authResource = $resource(JDB.appHost + '/user/:action', {
                action: '@action'
            }, {
                info: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: false,
                    params: {
                        action: 'info'
                    }
                }
            });
        }
        Auth.prototype.verify = function () {
            var temp;
            if (!this.$rootScope.User) {
                temp = window.localStorage.getItem(userKey);
            }
            if (temp && typeof temp == 'string') {
                this.$rootScope.User = JSON.parse(temp);
            }
            if (this.$rootScope.User) {
                return true;
            }
            //this.CommonService.showLoginModal();
            return false;
        };
        Auth.prototype.setUser = function (user) {
            if (user === void 0) { user = null; }
            if (user) {
                this.$rootScope.User = user;
                window.localStorage.setItem(userKey, JSON.stringify(user));
            }
        };
        Auth.prototype.getUser = function (args) {
            var defer = this.$q.defer();
            this.authResource.info(args, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                defer.resolve(result);
            }, function (err) {
                defer.reject(err);
            });
            return defer.promise;
        };
        Auth.prototype.showLoginModal = function () {
            if (loginModal) {
                return null;
            }
            loginModal = {};
            var subScope = this.$rootScope.$new();
            subScope.$on('modal.removed', function () {
                loginModal = null;
            });
            subScope.cancel = function () {
                loginModal.remove();
                loginModal = null;
            };
            this.$ionicModal.fromTemplateUrl('', {
                scope: subScope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                loginModal = modal;
            });
        };
        return Auth;
    })();
    Auth.$inject = ['$rootScope', '$resource', '$q', '$ionicModal', 'CommonService'];
    JDB.ServiceModule.service('AuthService', Auth);
})(JDB || (JDB = {}));
//# sourceMappingURL=auth.js.map