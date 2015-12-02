/**
 * Created by AaronYuan on 11/14/15.
 */
//圈子
/// <reference path="../../app.ts" />
/// <reference path="../common.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var Group = (function () {
        function Group($rootScope, $q, $resource, CommonService) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.CommonService = CommonService;
            this.groupResource = $resource(JDB.appHost + '/circle/:action', {
                action: '@action'
            }, {
                userList: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'userList'
                    }
                },
                mineGroupList: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'querymycircles'
                    }
                },
                groupList: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'querycircles'
                    }
                },
                groupDetail: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'viewcircle'
                    }
                },
                groupMembers: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'querymembers'
                    }
                },
                //rename:{
                //    method: 'POST',
                //    isArray: false,
                //    needAccessToken: true,
                //    params:{
                //        action: 'nickname'
                //    }
                //},
                quitGroup: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'exit'
                    }
                },
                deleteGroup: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'delete'
                    }
                },
                joinGroup: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'join'
                    }
                },
                getNickName: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'viewnickname'
                    }
                },
                updateNickName: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'nickname'
                    }
                }
            });
        }
        Group.prototype.showChooseMemberModal = function (args) {
            var scope = this.$rootScope.$new();
            scope.params = args;
            return this.$rootScope.createModal('/templates/group/choose-member-modal.html', scope);
        };
        Group.prototype.mineGroupList = function (args) {
            return this.$rootScope.requestHandler(this.groupResource.mineGroupList, args);
        };
        //圈子列表
        Group.prototype.groupList = function (args) {
            return this.$rootScope.requestHandler(this.groupResource.groupList, args);
        };
        //圈子详情
        Group.prototype.groupDetail = function (args) {
            return this.$rootScope.requestHandler(this.groupResource.groupDetail, args);
        };
        //举报
        Group.prototype.report = function (args) {
        };
        //圈子成员
        Group.prototype.groupMembers = function (args) {
            return this.$rootScope.requestHandler(this.groupResource.groupMembers, args);
        };
        //rename(args: any): ng.IPromise<any> {
        //    return this.$rootScope.requestHandler(this.groupResource.rename, args, true);
        //}
        Group.prototype.showNewFriends = function (args) {
            var scope = this.$rootScope.$new();
            scope.params = args;
            this.$rootScope.createModal('/templates/discover/new-friends.html', scope);
        };
        //退出圈子
        Group.prototype.quitGroup = function (args) {
            var defer = this.$q.defer();
            this.$rootScope.requestHandler(this.groupResource.quitGroup, args, true).then(function (result) {
                defer.resolve(result);
                window.plugins.toast.showShortCenter('成功退出圈子');
            }, function (err) {
                defer.reject(err);
                window.plugins.toast.showShortCenter('退出失败');
            });
            return defer.promise;
        };
        //解散圈子
        Group.prototype.deleteGroup = function (args) {
            var defer = this.$q.defer();
            this.$rootScope.requestHandler(this.groupResource.deleteGroup, args, true).then(function (result) {
                if (result && result.code == 0) {
                    defer.resolve(result);
                    window.plugins.toast.showShortCenter('成功解散圈子');
                }
                else {
                    defer.reject(result);
                    window.plugins.toast.showShortCenter('圈子解散失败');
                }
            }, function (err) {
                defer.reject(err);
                window.plugins.toast.showShortCenter('圈子解散失败');
            });
            return defer.promise;
        };
        Group.prototype.joinGroup = function (args) {
            var defer = this.$q.defer();
            this.$rootScope.requestHandler(this.groupResource.joinGroup, args, true).then(function (result) {
                defer.resolve(result);
                window.plugins.toast.showShortCenter('成功加入圈子');
            }, function (err) {
                defer.reject(err);
                window.plugins.toast.showShortCenter('加入圈子失败');
            });
            return defer.promise;
        };
        //获取昵称
        Group.prototype.getNickName = function (args) {
            return this.$rootScope.requestHandler(this.groupResource.getNickName, args);
        };
        //修改昵称
        Group.prototype.updateNickName = function (args) {
            return this.$rootScope.requestHandler(this.groupResource.updateNickName, args, true);
        };
        //打开圈子成员列表
        Group.prototype.openGroupMembers = function (args) {
            var scope = this.$rootScope.$new();
            scope.params = args;
            this.$rootScope.createModal('/templates/group/group-member.html', scope);
        };
        return Group;
    })();
    Group.$inject = ['$rootScope', '$q', '$resource', 'CommonService'];
    JDB.ServiceModule.service('GroupService', Group);
})(JDB || (JDB = {}));
//# sourceMappingURL=group.js.map