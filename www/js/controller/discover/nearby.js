/**
 * Created by AaronYuan on 11/13/15.
 */
//附近的人
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
/// <reference path="../../service/group/group.ts" />
/// <reference path="../../service/public/friend.ts" />
/// <reference path="../../service/user/user.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var Nearby = (function () {
        function Nearby($rootScope, $scope, CommonService, $stateParams, GroupService, FriendService, UserService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.CommonService = CommonService;
            this.$stateParams = $stateParams;
            this.GroupService = GroupService;
            this.FriendService = FriendService;
            this.UserService = UserService;
            $scope.viewTitle = '附近的人';
            this.init();
            console.log($scope.params);
            //if($stateParams['groupID']){
            if ($scope.params && $scope.params.groupID) {
                //$scope.viewTitle = '圈子成员';
                this.initForGroupMembers();
            }
            else {
                this.initForNearby();
            }
        }
        Nearby.prototype.init = function () {
            this.$scope.currentPageIndex = 1;
        };
        Nearby.prototype.initForNearby = function () {
            var self = this;
            this.UserService.friendList({
                curPage: this.$scope.currentPageIndex,
                pageSize: 10,
                phone: this.$rootScope.localUser().phone
            }).then(function (result) {
                if (result && result.code == 0) {
                    self.$scope.members = result.data || [];
                }
            }, function (err) {
            });
        };
        Nearby.prototype.initForGroupMembers = function () {
            var self = this;
            this.GroupService.groupMembers({
                pageSize: 10,
                curPage: 1,
                circleid: this.$scope.params.groupID
            }).then(function (result) {
                if (result && result.code == 0) {
                    self.$scope.members = result.data.resultList;
                }
            });
        };
        return Nearby;
    })();
    Nearby.$inject = ['$rootScope', '$scope', 'CommonService', '$stateParams', 'GroupService', 'FriendService', 'UserService'];
    JDB.CtrlModule.controller('NearbyCtrl', Nearby);
    JDB.CtrlModule.controller('GroupMemberCtrl', Nearby);
})(JDB || (JDB = {}));
//# sourceMappingURL=nearby.js.map