/**
 * Created by AaronYuan on 11/3/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/mine/mine.ts" />
//用户基本信息
var JDB;
(function (JDB) {
    'use strict';
    var UserInfo = (function () {
        function UserInfo($rootScope, $scope, $state, $stateParams, MineService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.MineService = MineService;
            $scope.changeStep = angular.bind(this, this.changeStep);
            $scope.saveInfo = angular.bind(this, this.saveInfo);
            console.log($stateParams);
            $scope.step = 1;
            if ($stateParams['action'] == 'reg') {
                this.initForm();
            }
        }
        UserInfo.prototype.changeStep = function (val) {
            this.$scope.step = val;
        };
        //当时从注册也过来的时候，初始化表单
        UserInfo.prototype.initForm = function () {
            this.$scope.userForm = {
                userName: '',
                englishName: '',
                gender: '',
                weichat: '',
                email: '',
                school: '',
                subject: '',
                grade: '',
                companyName: '',
                jobTitle: '',
                remark: ''
            };
        };
        //校验
        UserInfo.prototype.validateForm = function () {
            var msg = '';
            if (!this.$scope.userForm.userName) {
                msg = '请输入姓名';
                this.$scope.step = 1;
            }
            else if (!this.$scope.userForm.englishName) {
                msg = '请输入英文名称';
                this.$scope.step = 1;
            }
            else if (!this.$scope.userForm.gender) {
                msg = '请选择性别';
                this.$scope.step = 1;
            }
            else if (!this.$scope.userForm.school) {
                msg = '请选择学校';
            }
            else if (!this.$scope.userForm.subject) {
                msg = '请输入院系';
            }
            else if (!this.$scope.userForm.grade) {
                msg = '请输入年纪';
            }
            if (msg) {
                window.plugins.toast.showShortCenter(msg);
            }
        };
        UserInfo.prototype.saveInfo = function ($valid) {
            var self = this;
            this.validateForm();
            console.log($valid);
            if (!$valid) {
                return null;
            }
            console.log(1);
            //TODO save
            this.MineService.saveUserData(this.$scope.userForm).then(function (result) {
                if (result && result.code == 0) {
                    window.plugins.toast.showShortCenter('数据保存成功!');
                    self.$state.go('');
                }
                else {
                    window.plugins.toast.showShortCenter('数据保存失败,稍后重试');
                }
            }, function (err) {
                window.plugins.toast.showShortCenter('数据提交失败');
            });
        };
        return UserInfo;
    })();
    UserInfo.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'MineService'];
    JDB.CtrlModule.controller('UserInfoCtrl', UserInfo);
})(JDB || (JDB = {}));
//# sourceMappingURL=user-info.js.map