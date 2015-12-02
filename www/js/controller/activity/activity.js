/**
 * Created by AaronYuan on 10/29/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/activity/activity.ts" />
//活动
var JDB;
(function (JDB) {
    'use strict';
    var Activity = (function () {
        function Activity($rootScope, $scope, $ionicBackdrop, $timeout, ActivityService, $stateParams) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$ionicBackdrop = $ionicBackdrop;
            this.$timeout = $timeout;
            this.ActivityService = ActivityService;
            this.$stateParams = $stateParams;
            $scope.chooseLocation = angular.bind(this, this.chooseLocation);
            $scope.locationSelected = angular.bind(this, this.locationSelected);
            $scope.refresh = angular.bind(this, this.refresh);
            $scope.isShowLocation = false;
            if ($stateParams['activityID']) {
                this.initForJoinMember();
            }
            else {
                this.init();
            }
            var self = this;
            $rootScope.$once('event:refresh-all-slide-view', function () {
                console.log('activity refresh');
                self.init();
            });
            $rootScope.$once('event:refresh-activity-list', function () {
                self.init();
            });
        }
        Activity.prototype.init = function () {
            this.$scope.dataList = [];
            this.$scope.currentPageIndex = 1;
            this.$scope.hasMoreData = true;
            //this.refresh();
        };
        Activity.prototype.initForJoinMember = function () {
            console.log(this.$stateParams);
            var self = this;
            this.ActivityService.joinMemberList({
                id: self.$stateParams['activityID']
            }).then(function (result) {
                if (result && result.data) {
                    self.$scope.dataList = result.data;
                }
            }, function (err) {
            });
        };
        Activity.prototype.refresh = function (args) {
            if (args === void 0) { args = {}; }
            var self = this;
            args = angular.extend({
                curPage: self.$scope.currentPageIndex++,
                pageSize: 8,
                phone: this.$rootScope.localUser().phone
            }, args);
            this.ActivityService.list(args).then(function (result) {
                if (result && result.code == 0) {
                    self.$scope.dataList = self.$scope.dataList.concat(result.data.resultList);
                    self.$scope.hasMoreData = Math.ceil(result.data.totalCount / 10) > self.$scope.currentPageIndex;
                    self.$scope.$broadcast('scroll.infiniteScrollComplete');
                }
                else {
                    self.$scope.$broadcast('scroll.infiniteScrollComplete');
                }
            });
        };
        Activity.prototype.chooseLocation = function () {
            var self = this;
            this.$scope.isShowLocation = !this.$scope.isShowLocation;
        };
        Activity.prototype.locationSelected = function (item) {
            console.log(item);
        };
        return Activity;
    })();
    Activity.$inject = ['$rootScope', '$scope', '$ionicBackdrop', '$timeout', 'ActivityService', '$stateParams'];
    JDB.CtrlModule.controller('ActivityCtrl', Activity);
    JDB.CtrlModule.controller('ActivityJoinMemberCtrl', Activity);
})(JDB || (JDB = {}));
//# sourceMappingURL=activity.js.map