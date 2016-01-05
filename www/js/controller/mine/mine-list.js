/**
 *
 * Created by AaronYuan on 11/4/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
/// <reference path="../../service/activity/activity.ts" />
//我的，列表页
// 我的圈子，我的话题
// 我参与的， 我发起的
var JDB;
(function (JDB) {
    'use strict';
    var MineList = (function () {
        function MineList($rootScope, $scope, $stateParams, CommonService, ActivityService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.CommonService = CommonService;
            this.ActivityService = ActivityService;
            $scope.showDropMenu = angular.bind(CommonService, CommonService.showDropMenu);
            $scope.refresh = angular.bind(this, this.refresh);
            $scope.currentPageIndex = 1;
            $scope.hasMoreData = true;
            $scope.dataList = [];
        }
        MineList.prototype.refresh = function () {
            var action = this.$stateParams['action'];
            if (action == 'group') {
                this.initForGroup();
            }
            else if (action == 'group') {
                this.initForTopic();
            }
            else if (action == 'release') {
                this.$scope.viewTitle = '我发布的';
                this.initForMineRelease();
            }
            else if (action == 'join') {
                this.$scope.viewTitle = '我参与的';
                this.initForMineJoined();
            }
        };
        //我的圈子，初始化
        MineList.prototype.initForGroup = function () {
        };
        //我的话题，初始化
        MineList.prototype.initForTopic = function () {
        };
        MineList.prototype.initForMineRelease = function () {
            var self = this;
            this.ActivityService.mineCreateList({
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
        MineList.prototype.initForMineJoined = function () {
            var self = this;
            this.ActivityService.mineJoinList({
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
        return MineList;
    })();
    MineList.$inject = ['$rootScope', '$scope', '$stateParams', 'CommonService', 'ActivityService'];
    JDB.CtrlModule.controller('MineListCtrl', MineList);
})(JDB || (JDB = {}));
//# sourceMappingURL=mine-list.js.map