/**
 *
 * Created by AaronYuan on 11/30/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
/// <reference path="../../service/group/group.ts" />
//圈子管理
var JDB;
(function (JDB) {
    'use strict';
    var Manage = (function () {
        function Manage($rootScope, $scope, CommonService, GroupService, $stateParams) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.CommonService = CommonService;
            this.GroupService = GroupService;
            this.$stateParams = $stateParams;
            $scope.openChooseMember = angular.bind(this, this.openChooseMember);
            $scope.saveInfo = angular.bind(this, this.saveInfo);
            console.log($scope.params);
            if ($stateParams['groupID']) {
                this.initForRename();
            }
        }
        Manage.prototype.initForRename = function () {
            var self = this;
            this.$scope.groupForm = {
                name: ''
            };
            this.GroupService.getNickName({
                cid: this.$stateParams['groupID'],
                phone: this.$rootScope.localUser().phone
            }).then(function (result) {
                if (result && result.code == 0) {
                    self.$scope.groupForm.name = '';
                }
            });
        };
        Manage.prototype.saveInfo = function () {
            if (!this.$scope.groupForm.name) {
                window.plugins.toast.showShortCenter('请填写圈子昵称');
                return;
            }
            var self = this;
            this.GroupService.updateNickName({
                cid: this.$stateParams['groupID'],
                nickName: this.$scope.groupForm.name,
                phone: this.$rootScope.localUser().phone
            }).then(function (result) {
                if (result && result.code == 0) {
                    window.plugins.toast.showShortCenter('圈子昵称修改成功');
                    self.$rootScope.goBack();
                }
                else {
                    window.plugins.toast.showShortCenter('圈子昵称修改失败');
                }
            }, function (err) {
                window.plugins.toast.showShortCenter('圈子昵称修改失败');
            });
        };
        Manage.prototype.openChooseMember = function (action) {
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
        return Manage;
    })();
    Manage.$inject = ['$rootScope', '$scope', 'CommonService', 'GroupService', '$stateParams'];
    JDB.CtrlModule.controller('GroupManageCtrl', Manage);
})(JDB || (JDB = {}));
//# sourceMappingURL=manage.js.map