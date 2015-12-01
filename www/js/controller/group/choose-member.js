/**
 * Created by AaronYuan on 11/14/15.
 */
//选择成员modal
/// <reference path="../../app.ts" />
/// <reference path="../../service/group/group.ts" />
/// <reference path="../../service/public/friend.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var ChooseMember = (function () {
        function ChooseMember($rootScope, $scope, GroupService, FriendService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.GroupService = GroupService;
            this.FriendService = FriendService;
            $scope.finishHandler = angular.bind(this, this.finishHandler);
            console.log('choose member modal');
            console.log($scope.params);
            this.init();
        }
        ChooseMember.prototype.init = function () {
            switch (this.$scope.params.action) {
                case window.JDBTypes.ChooseMemberAction.add:
                    this.initListForAddGroupMember();
                    break;
            }
        };
        //添加圈子成员
        ChooseMember.prototype.initListForAddGroupMember = function () {
            var self = this;
            this.FriendService.list({
                phone: this.$rootScope.localUser().phone,
                curPage: this.$scope.currentPageIndex,
                pageSize: 10
            }).then(function (result) {
                if (result && result.code == 0) {
                    self.$scope.dataList = result.data.resultList || [];
                }
            }, function () {
            });
        };
        ChooseMember.prototype.finishHandler = function () {
            switch (this.$scope.params.action) {
                case window.JDBTypes.ChooseMemberAction.remove:
                    console.log('remove member');
                    break;
                case window.JDBTypes.ChooseMemberAction.admin:
                    console.log('set admin');
                    break;
                case window.JDBTypes.ChooseMemberAction.add:
                    console.log('add member');
                    break;
            }
        };
        ChooseMember.prototype.itemClicked = function (item) {
            if (item.isSelected) {
                item.isSelected = false;
                delete this.$scope.selectedList[item];
            }
            else {
                item.isSelected = true;
                this.$scope.selectedList[item] = item;
            }
        };
        return ChooseMember;
    })();
    ChooseMember.$inject = ['$rootScope', '$scope', 'GroupService', 'FriendService'];
    JDB.CtrlModule.controller('ChooseMemberCtrl', ChooseMember);
})(JDB || (JDB = {}));
//# sourceMappingURL=choose-member.js.map