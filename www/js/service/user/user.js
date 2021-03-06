/**
 * Created by AaronYuan on 11/17/15.
 */
//用户
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var User = (function () {
        function User($rootScope, $q, $resource, CommonService) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.CommonService = CommonService;
            this.userResource = $resource(JDB.appHost + '/user/:action', {
                action: '@action'
            }, {
                list: {
                    method: 'GET',
                    needAccessToken: true,
                    isArray: false,
                    params: {
                        action: 'list'
                    }
                },
                getUser: {
                    method: 'GET',
                    needAccessToken: true,
                    isArray: false,
                    params: {
                        action: 'list'
                    }
                },
                nearby: {
                    method: 'GET',
                    needAccessToken: true,
                    isArray: false,
                    params: {
                        action: 'querynearusers'
                    }
                },
                viewUserInfo: {
                    method: 'POST',
                    needAccessToken: true,
                    isArray: false,
                    params: {
                        action: 'viewuser'
                    }
                }
            });
        }
        //获取单个用户
        User.prototype.getUser = function (args) {
            return this.$rootScope.requestHandler(this.userResource.getUser, args);
        };
        User.prototype.openUserCard = function (args) {
            var defer = this.$q.defer(), self = this;
            this.$rootScope.loading(true);
            this.getUser(args).then(function (data) {
                if (data) {
                    self.CommonService.showUserCardModal(data).then(function (res) {
                        defer.resolve(data);
                        self.$rootScope.loading(false);
                    }, function (err) {
                        defer.reject(err);
                        self.$rootScope.loading(false);
                        window.plugins.toast.showShortCenter('用户名片加载失败。');
                    });
                }
                else {
                    defer.reject(data);
                    self.$rootScope.loading(false);
                    window.plugins.toast.showShortCenter('用户名片加载失败。');
                }
            }, function (err) {
                defer.reject(err);
                self.$rootScope.loading(false);
                window.plugins.toast.showShortCenter('用户名片加载失败。');
            });
            return defer.promise;
        };
        //附近的好友
        User.prototype.friendList = function (args) {
            return this.$rootScope.requestHandler(this.userResource.nearby, args);
        };
        User.prototype.viewUserInfo = function (args) {
            return this.$rootScope.requestHandler(this.userResource.viewUserInfo, args, true);
        };
        return User;
    })();
    User.$inject = ['$rootScope', '$q', '$resource', 'CommonService'];
    JDB.ServiceModule.service('UserService', User);
})(JDB || (JDB = {}));
//# sourceMappingURL=user.js.map