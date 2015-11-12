/**
 * Created by AaronYuan on 10/29/15.
 */
/// <reference path="../../app.ts" />
//活动
var JDB;
(function (JDB) {
    'use strict';
    var Activity = (function () {
        function Activity($rootScope, $scope, $ionicBackdrop, $timeout) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$ionicBackdrop = $ionicBackdrop;
            this.$timeout = $timeout;
            $scope.chooseLocation = angular.bind(this, this.chooseLocation);
            $scope.locationSelected = angular.bind(this, this.locationSelected);
            $scope.isShowLocation = false;
        }
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
    Activity.$inject = ['$rootScope', '$scope', '$ionicBackdrop', '$timeout'];
    JDB.CtrlModule.controller('ActivityCtrl', Activity);
})(JDB || (JDB = {}));
//# sourceMappingURL=activity.js.map