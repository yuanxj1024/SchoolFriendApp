/**
 *
 * Created by AaronYuan on 10/31/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
/// <reference path="../../service/mine/mine.ts" />
//我的
var JDB;
(function (JDB) {
    'use strict';
    var Mine = (function () {
        function Mine($rootScope, $scope, $stateParams, MineService, $state, CommonService, Upload) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.MineService = MineService;
            this.$state = $state;
            this.CommonService = CommonService;
            this.Upload = Upload;
            $scope.logout = angular.bind(MineService, MineService.logout);
            $scope.upload = angular.bind(this, this.upload);
            $scope.tempFile = '/img/discover-user-head.png';
            $scope.editTag = $stateParams['tag'];
            $scope.tagName = window.JDBTypes.InfoEditTags[$scope.editTag];
            if ($scope.editTag) {
                this.initForEdit();
            }
        }
        //编辑， 初始化
        Mine.prototype.initForEdit = function () {
        };
        Mine.prototype.changeHeaderImg = function () {
        };
        Mine.prototype.upload = function (file) {
            this.$scope.tempFile = file;
            console.log(file);
            this.MineService.uploadHeadImg(file, function (evt) {
                console.log(evt);
            }).then(function (res) {
                console.log(res);
            }, function (res) {
                console.log(res);
            });
        };
        return Mine;
    })();
    Mine.$inject = ['$rootScope', '$scope', '$stateParams', 'MineService', '$state', 'CommonService', 'Upload'];
    JDB.CtrlModule.controller('MineCtrl', Mine);
})(JDB || (JDB = {}));
//# sourceMappingURL=mine.js.map