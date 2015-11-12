/**
 *
 * Created by AaronYuan on 11/12/15.
 */
/// <reference path="../../app.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var ActivityDetail = (function () {
        function ActivityDetail($rootScope, $scope, CommonService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.CommonService = CommonService;
            $scope.showMoreSheet = angular.bind(this, this.showMoreSheet);
        }
        ActivityDetail.prototype.showMoreSheet = function () {
            this.CommonService.showActionSheet('activity-more', [
                { text: '分享' },
                { text: '举报' },
                { text: '报名参加' },
                { text: '取消报名' }
            ]).then(function (index) {
                console.log(index);
            });
        };
        return ActivityDetail;
    })();
    ActivityDetail.$inject = ['$rootScope', '$scope', 'CommonService'];
    JDB.CtrlModule.controller('ActivityDetailCtrl', ActivityDetail);
})(JDB || (JDB = {}));
//# sourceMappingURL=detail.js.map