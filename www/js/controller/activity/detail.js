/**
 *
 * Created by AaronYuan on 11/12/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/activity/activity.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var ActivityDetail = (function () {
        function ActivityDetail($rootScope, $scope, CommonService, ActivityService, $stateParams, currentDetail) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.CommonService = CommonService;
            this.ActivityService = ActivityService;
            this.$stateParams = $stateParams;
            this.currentDetail = currentDetail;
            $scope.showMoreSheet = angular.bind(this, this.showMoreSheet);
            $scope.join = angular.bind(this, this.join);
            $scope.cancelJoin = angular.bind(this, this.cancelJoin);
            $scope.reply = angular.bind(this, this.reply);
            $scope.model = currentDetail;
            this.init();
            var self = this;
            $rootScope.$once('event:refresh-activity-detail', function (e, data) {
                self.$scope.detailID = data.id;
                self.getDetail();
            });
        }
        ActivityDetail.prototype.init = function () {
            this.$scope.detailID = this.$stateParams['detailID'];
        };
        ActivityDetail.prototype.showMoreSheet = function () {
            var self = this;
            this.CommonService.showActionSheet('activity-more', [
                { text: '报名成员' },
                { text: '举报' },
                { text: '报名参加' },
                { text: '取消报名' }
            ]).then(function (index) {
                self.actionSheetHandler(index);
            });
        };
        ActivityDetail.prototype.join = function () {
            if (this.$scope.model.join == 1) {
                return;
            }
            var self = this;
            this.ActivityService.signUp({
                id: this.$scope.model.activity.id
            }).then(function () {
                self.$scope.model.join = 1;
            }, function () {
                self.$scope.model.isJoind = 0;
            });
        };
        ActivityDetail.prototype.cancelJoin = function () {
            if (this.$scope.model.join == 0) {
                return;
            }
            var self = this;
            this.ActivityService.cancelSignUp({
                id: this.$scope.model.activity.id
            }).then(function () {
                self.$scope.model.join = 0;
            }, function () {
                self.$scope.model.isJoind = 1;
            });
        };
        //右上角菜单回调
        ActivityDetail.prototype.actionSheetHandler = function (index) {
            switch (index) {
                case 0:
                    this.$rootScope.stateGo('jdb.activity-member', {
                        activityID: this.$scope.model.activity.id
                    });
                    break;
                case 1:
                    this.CommonService.showReport({
                        typeName: '活动',
                        id: this.$scope.model.activity.id
                    });
                    break;
                case 2:
                    this.join();
                    break;
                case 3:
                    this.cancelJoin();
                    break;
            }
        };
        ActivityDetail.prototype.reply = function (id) {
            if (id === void 0) { id = null; }
            this.CommonService.replyModal({
                activityID: this.$scope.model.activity.id,
                parentID: id,
                action: 'activity'
            });
        };
        ActivityDetail.prototype.getDetail = function () {
            var self = this;
            this.ActivityService.detail({
                phone: this.$rootScope.User.phone,
                id: this.$scope.detailID
            }).then(function (result) {
                if (result.code == 0) {
                    self.$scope.model = result.data;
                }
            });
        };
        return ActivityDetail;
    })();
    JDB.ResolvesModule['ActivityDetailCtrl'] = {
        currentDetail: ['$rootScope', '$q', '$stateParams', 'ActivityService', function ($rootScope, $q, $stateParams, ActivityService) {
            var defer = $q.defer(), id = $stateParams['detailID'] || 1;
            if (id) {
                ActivityService.detail({
                    phone: $rootScope.User.phone,
                    id: id
                }).then(function (result) {
                    if (result.code == 0) {
                        defer.resolve(result.data);
                    }
                    else {
                        defer.reject(null);
                        window.plugins.toast.showShortCenter('数据加载失败');
                    }
                }, function (err) {
                    defer.reject(null);
                });
            }
            return defer.promise;
        }]
    };
    ActivityDetail.$inject = ['$rootScope', '$scope', 'CommonService', 'ActivityService', '$stateParams', 'currentDetail'];
    JDB.CtrlModule.controller('ActivityDetailCtrl', ActivityDetail);
})(JDB || (JDB = {}));
//# sourceMappingURL=detail.js.map