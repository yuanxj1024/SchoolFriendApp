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
        }
        Activity.prototype.init = function () {
            this.$scope.dataList = [];
            this.$scope.currentPageIndex = 1;
            this.refresh();
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
                curPage: self.$scope.currentPageIndex,
                pageSize: 5,
                phone: this.$rootScope.localUser().phone
            }, args);
            this.ActivityService.list(args).then(function (result) {
                console.log(result);
                if (result) {
                    self.$scope.dataList = result.data;
                }
            });
        };
        Activity.prototype.chooseLocation = function () {
            var self = this;
            this.$scope.isShowLocation = !this.$scope.isShowLocation;
            //if(this.$scope.isShowLocation){
            //    this.$ionicBackdrop.retain();
            //}else{
            //    self.$ionicBackdrop.release();
            //}
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