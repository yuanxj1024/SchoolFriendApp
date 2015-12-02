/**
 * Created by AaronYuan on 11/6/15.
 */
/**
 *
 * Created by AaronYuan on 11/4/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
/// <reference path="../../service/group/group.ts" />
//我的，列表页
// 我的圈子，我的话题
// 我参与的， 我发起的
var JDB;
(function (JDB) {
    'use strict';
    var GroupList = (function () {
        function GroupList($rootScope, $scope, $stateParams, CommonService, GroupService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.CommonService = CommonService;
            this.GroupService = GroupService;
            $scope.showDropMenu = angular.bind(CommonService, CommonService.showDropMenu);
            $scope.refresh = angular.bind(this, this.refresh);
            this.init();
        }
        GroupList.prototype.init = function () {
            this.$scope.currentPageIndex = 1;
            this.$scope.hasMoreData = true;
            this.$scope.dataList = [];
            this.renderView();
        };
        GroupList.prototype.renderView = function () {
            var action = this.$stateParams['action'];
            if (action == 'all') {
                this.$scope.viewTitle = '所有圈子';
            }
            else if (action == 'mine') {
                this.$scope.viewTitle = '我的圈子';
            }
        };
        GroupList.prototype.refresh = function () {
            var action = this.$stateParams['action'];
            if (action == 'all') {
                this.refreshAllGroup();
            }
            else if (action == 'mine') {
                this.refreshMineGroup();
            }
        };
        //我的圈子，初始化
        GroupList.prototype.refreshMineGroup = function () {
            var self = this;
            this.GroupService.mineGroupList({
                phone: this.$rootScope.localUser().phone,
                curPage: this.$scope.currentPageIndex++,
                pageSize: 10
            }).then(function (result) {
                if (result && result.code == 0) {
                    self.$scope.hasMoreData = Math.ceil(result.data.totalCount / 10) > self.$scope.currentPageIndex;
                    self.$scope.dataList = self.$scope.dataList.concat(result.data.resultList);
                }
                self.$scope.$broadcast('scroll.infiniteScrollComplete');
            }, function (err) {
                self.$scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };
        GroupList.prototype.refreshAllGroup = function () {
            var self = this;
            this.GroupService.groupList({
                phone: this.$rootScope.localUser().phone,
                curPage: this.$scope.currentPageIndex++,
                pageSize: 10
            }).then(function (result) {
                if (result && result.code == 0) {
                    self.$scope.hasMoreData = Math.ceil(result.data.totalCount / 10) > self.$scope.currentPageIndex;
                    self.$scope.dataList = self.$scope.dataList.concat(result.data.resultList);
                }
                self.$scope.$broadcast('scroll.infiniteScrollComplete');
            }, function (err) {
                self.$scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };
        return GroupList;
    })();
    GroupList.$inject = ['$rootScope', '$scope', '$stateParams', 'CommonService', 'GroupService'];
    JDB.CtrlModule.controller('GroupListCtrl', GroupList);
})(JDB || (JDB = {}));
//# sourceMappingURL=list.js.map