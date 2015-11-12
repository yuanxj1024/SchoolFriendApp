/**
 * Created by AaronYuan on 11/11/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
//添加活动
var JDB;
(function (JDB) {
    'use strict';
    var ActivityCreate = (function () {
        function ActivityCreate($rootScope, $scope, CommonService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.CommonService = CommonService;
            $scope.showImageSheet = angular.bind(this, this.showImageSheet);
        }
        ActivityCreate.prototype.showImageSheet = function () {
            this.CommonService.showChooseImg().then(function (index) {
                console.log(index);
            });
        };
        return ActivityCreate;
    })();
    ActivityCreate.$inject = ['$rootScope', '$scope', 'CommonService'];
    JDB.CtrlModule.controller('ActivityCreateCtrl', ActivityCreate);
})(JDB || (JDB = {}));
//# sourceMappingURL=create.js.map