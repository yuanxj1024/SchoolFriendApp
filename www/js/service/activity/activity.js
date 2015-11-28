/**
 *
 * Created by AaronYuan on 11/26/15.
 */
/// <reference path="../../app.ts" />
var JDB;
(function (JDB) {
    'use strict';
    //1 报名中 2 已满员 3 已截止 4 进行中 5 已结束
    (function (ActivityStatus) {
        ActivityStatus[ActivityStatus["singUping"] = 1] = "singUping";
        ActivityStatus[ActivityStatus["full"] = 2] = "full";
        ActivityStatus[ActivityStatus["timeout"] = 3] = "timeout";
        ActivityStatus[ActivityStatus["starting"] = 4] = "starting";
        ActivityStatus[ActivityStatus["finish"] = 5] = "finish";
    })(JDB.ActivityStatus || (JDB.ActivityStatus = {}));
    var ActivityStatus = JDB.ActivityStatus;
    var Activity = (function () {
        function Activity($rootScope, $q, $resource) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.resource = $resource(JDB.appHost + '/activity/:action', {
                action: '@action'
            }, {
                list: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'queryactivity'
                    }
                },
                saveData: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'createactivity'
                    }
                },
                detail: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'viewactivity'
                    }
                },
                signUp: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'signup'
                    }
                },
                cancelSignUp: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'unsignup'
                    }
                },
                reply: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'createatvcmt'
                    }
                },
                joinMemberList: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'queryjoinusers'
                    }
                }
            });
        }
        Activity.prototype.list = function (args) {
            return this.$rootScope.requestHandler(this.resource.list, args);
        };
        Activity.prototype.saveData = function (args) {
            return this.$rootScope.requestHandler(this.resource.saveData, args, true);
        };
        Activity.prototype.detail = function (args) {
            return this.$rootScope.requestHandler(this.resource.detail, args, true);
        };
        Activity.prototype.signUp = function (args) {
            var defer = this.$q.defer();
            args = angular.extend({
                phone: this.$rootScope.User.phone
            }, args);
            this.$rootScope.requestHandler(this.resource.signUp, args, true).then(function (result) {
                if (result && result.code == 0) {
                    defer.resolve(result);
                    window.plugins.toast.showShortCenter('报名成功');
                }
                else {
                    defer.reject(null);
                    window.plugins.toast.showShortCenter('报名失败, 稍后重试');
                }
            }, function (res) {
                defer.reject(null);
                window.plugins.toast.showShortCenter('报名失败, 稍后重试');
            });
            return defer.promise;
        };
        Activity.prototype.reply = function (args) {
            return this.$rootScope.requestHandler(this.resource.reply, args, true);
        };
        //取消报名
        Activity.prototype.cancelSignUp = function (args) {
            var defer = this.$q.defer();
            args = angular.extend({
                phone: this.$rootScope.User.phone
            }, args);
            this.$rootScope.requestHandler(this.resource.cancelSignUp, args, true).then(function (result) {
                if (result && result.code == 0) {
                    defer.resolve(result);
                    window.plugins.toast.showShortCenter('取消报名');
                }
                else {
                    defer.reject(null);
                    window.plugins.toast.showShortCenter('操作失败, 稍后重试');
                }
            }, function (res) {
                defer.reject(null);
                window.plugins.toast.showShortCenter('操作失败, 稍后重试');
            });
            return defer.promise;
        };
        Activity.prototype.joinMemberList = function (args) {
            return this.$rootScope.requestHandler(this.resource.joinMemberList, args);
        };
        return Activity;
    })();
    Activity.$inject = ['$rootScope', '$q', '$resource'];
    JDB.ServiceModule.service('ActivityService', Activity);
})(JDB || (JDB = {}));
//# sourceMappingURL=activity.js.map