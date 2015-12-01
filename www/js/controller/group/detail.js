/**
 * Created by AaronYuan on 11/14/15.
 */
//圈子详情
/// <reference path="../../app.ts" />
/// <reference path="../../service/group/group.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var GroupDetail = (function () {
        function GroupDetail($rootScope, $scope, GroupService, $stateParams, currentDetail, CommonService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.GroupService = GroupService;
            this.$stateParams = $stateParams;
            this.currentDetail = currentDetail;
            this.CommonService = CommonService;
            $scope.report = angular.bind(this, this.report);
            $scope.openChooseMember = angular.bind(this, this.openChooseMember);
            $scope.showActionSheet = angular.bind(this, this.showActionSheet);
            $scope.quitGroup = angular.bind(this, this.quitGroup);
            $scope.showMembers = angular.bind(this, this.showMembers);
            $scope.modifyNickName = angular.bind(this, this.modifyNickName);
            if ($stateParams['id']) {
                $scope.model = currentDetail;
            }
            this.init();
            var self = this;
            $rootScope.$once('event:refresh-group-members', function () {
                self.refreshMember();
            });
        }
        GroupDetail.prototype.init = function () {
            this.$scope.memberCount = 0;
            this.refreshMember();
        };
        GroupDetail.prototype.refreshMember = function () {
            var self = this;
            this.GroupService.groupMembers({
                pageSize: 4,
                curPage: 1,
                circleid: this.$scope.model.circle.id
            }).then(function (result) {
                if (result && result.code == 0) {
                    self.$scope.members = result.data.resultList;
                    self.$scope.memberCount = result.data.totalCount || 0;
                }
                else {
                    self.$scope.members = [];
                }
            }, function (err) {
                self.$scope.members = [];
            });
        };
        GroupDetail.prototype.initForDetail = function () {
            var self = this;
            this.GroupService.groupDetail({
                cid: this.$stateParams['id'],
                phone: self.$rootScope.localUser().phone
            }).then(function (result) {
                if (result && result.code == 0) {
                    self.$scope.model = result.data;
                }
            }, function (err) {
            });
        };
        GroupDetail.prototype.report = function () {
            this.CommonService.showReport({
                typeName: '圈子',
                id: this.$scope.model.circle.id
            });
        };
        GroupDetail.prototype.openChooseMember = function (action) {
            var params = {
                'remove': {
                    viewTitle: '移除成员',
                    action: window.JDBTypes.ChooseMemberAction.remove
                },
                'admin': {
                    viewTitle: '设置管理员',
                    action: window.JDBTypes.ChooseMemberAction.admin
                },
                'add': {
                    viewTitle: '添加成员',
                    action: window.JDBTypes.ChooseMemberAction.add
                }
            };
            this.GroupService.showChooseMemberModal(params[action]);
        };
        GroupDetail.prototype.showActionSheet = function () {
            var self = this, btns = [
                { text: '加入圈子' }
            ];
            if (this.$rootScope.localUser().phone == this.currentDetail.circle.createUser.alumnus.phone) {
                btns.push({ text: '新朋友' });
            }
            this.CommonService.showActionSheet('group-detail-menu', btns).then(function (index) {
                if (index == 0) {
                    self.joinGroup();
                }
                else if (index == 1) {
                    self.friendRequest();
                }
            });
        };
        GroupDetail.prototype.joinGroup = function () {
            var self = this;
            this.GroupService.joinGroup({
                id: this.currentDetail.circle.id,
                phone: this.$rootScope.localUser().phone
            }).then(function () {
                self.refreshMember();
            });
        };
        GroupDetail.prototype.friendRequest = function () {
            this.GroupService.showNewFriends({
                groupID: this.$scope.model.circle.id
            });
        };
        GroupDetail.prototype.quitGroup = function () {
            //拥有者
            if (this.$rootScope.localUser().phone == this.currentDetail.circle.createUser.alumnus.phone) {
                this.CommonService.showConfirm('提示', '您确定要解散圈子吗').then(function (res) {
                    if (res) {
                        this.GroupService.deleteGroup({
                            phone: this.$rootScope.localUser().phone,
                            id: this.$scope.model.circle.id
                        });
                    }
                });
            }
            else {
                this.CommonService.showConfirm('提示', '您确定要退出圈子吗').then(function (res) {
                    if (res) {
                        this.GroupService.quitGroup({
                            phone: this.$rootScope.localUser().phone,
                            id: this.$scope.model.circle.id
                        });
                    }
                });
            }
        };
        GroupDetail.prototype.modifyNickName = function () {
            if (this.$scope.model.join == 0) {
                window.plugins.toast.showShortCenter('您还没有加入改圈子');
            }
            else {
                this.$rootScope.stateGo('jdb.group-rename', {
                    groupID: this.$scope.model.circle.id
                });
            }
        };
        GroupDetail.prototype.showMembers = function () {
            this.GroupService.openGroupMembers({
                groupID: this.$scope.model.circle.id
            });
        };
        return GroupDetail;
    })();
    JDB.ResolvesModule['GroupDetailCtrl'] = {
        currentDetail: ['$rootScope', '$q', '$stateParams', 'GroupService', function ($rootScope, $q, $stateParams, GroupService) {
            var defer = $q.defer(), id = $stateParams['id'] || 1;
            if (id) {
                GroupService.groupDetail({
                    phone: $rootScope.localUser().phone,
                    cid: id
                }).then(function (result) {
                    if (result && result.code == 0) {
                        defer.resolve(result.data);
                    }
                    else {
                        defer.reject(null);
                        window.plugins.toast.showShortCenter('数据加载失败');
                    }
                }, function (err) {
                    defer.reject(null);
                    window.plugins.toast.showShortCenter('数据加载失败');
                });
            }
            else {
                defer.reject(null);
            }
            return defer.promise;
        }]
    };
    GroupDetail.$inject = ['$rootScope', '$scope', 'GroupService', '$stateParams', 'currentDetail', 'CommonService'];
    JDB.CtrlModule.controller('GroupDetailCtrl', GroupDetail);
})(JDB || (JDB = {}));
//# sourceMappingURL=detail.js.map