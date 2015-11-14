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
        function GroupDetail($rootScope, $scope, GroupService, $stateParams) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.GroupService = GroupService;
            this.$stateParams = $stateParams;
            $scope.openChooseMember = angular.bind(this, this.openChooseMember);
            console.log($stateParams);
        }
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
        return GroupDetail;
    })();
    GroupDetail.$inject = ['$rootScope', '$scope', 'GroupService', '$stateParams'];
    JDB.CtrlModule.controller('GroupDetailCtrl', GroupDetail);
    JDB.CtrlModule.controller('GroupManageCtrl', GroupDetail);
})(JDB || (JDB = {}));
//# sourceMappingURL=detail.js.map