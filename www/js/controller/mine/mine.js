/**
 *
 * Created by AaronYuan on 10/31/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
/// <reference path="../../service/mine/mine.ts" />
/// <reference path="../../service/auth.ts" />
//我的
var JDB;
(function (JDB) {
    'use strict';
    var Mine = (function () {
        function Mine($rootScope, $scope, $stateParams, MineService, $state, CommonService, Upload, AuthService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.MineService = MineService;
            this.$state = $state;
            this.CommonService = CommonService;
            this.Upload = Upload;
            this.AuthService = AuthService;
            $scope.logout = angular.bind(MineService, MineService.logout);
            $scope.upload = angular.bind(this, this.upload);
            $scope.tempFile = JDB.staticHost + this.$rootScope.localUser().headPicPath; // '/img/discover-user-head.png';
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
            var self = this;
            this.$scope.tempFile = file;
            this.CommonService.uploadFile({
                file: file,
                fields: {
                    phone: this.$rootScope.User.phone
                }
            }).then(function (result) {
                if (result.data.code == 0) {
                    self.MineService.saveUserData({
                        headPicPath: result.data.data,
                        phone: self.$rootScope.User.phone
                    }).then(function (result) {
                        self.AuthService.setUser(result.data.alumnus);
                    });
                }
            }, function (err) {
                window.plugins.toast.showShortCenter('头像上传失败');
            });
        };
        Mine.prototype.logout = function () {
        };
        return Mine;
    })();
    Mine.$inject = ['$rootScope', '$scope', '$stateParams', 'MineService', '$state', 'CommonService', 'Upload', 'AuthService'];
    JDB.CtrlModule.controller('MineCtrl', Mine);
})(JDB || (JDB = {}));
//# sourceMappingURL=mine.js.map