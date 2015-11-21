/**
 * Created by AaronYuan on 11/3/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/auth.ts" />
/// <reference path="../../service/mine/mine.ts" />
/// <reference path="../../service/common.ts" />
//用户基本信息
var JDB;
(function (JDB) {
    'use strict';
    var UserInfo = (function () {
        function UserInfo($rootScope, $scope, $state, $stateParams, MineService, CommonService, AuthService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.MineService = MineService;
            this.CommonService = CommonService;
            this.AuthService = AuthService;
            $scope.changeStep = angular.bind(this, this.changeStep);
            $scope.saveInfo = angular.bind(this, this.saveInfo);
            $scope.chooseSchool = angular.bind(this, this.chooseSchool);
            $scope.chooseGender = angular.bind(this, this.chooseGender);
            $scope.selectSchool = angular.bind(this, this.selectSchool);
            //编辑单个属性， 标记跟标题
            $scope.editTag = $stateParams['tag'];
            $scope.tagName = window.JDBTypes.InfoEditTags[$scope.editTag];
            $scope.step = 1;
            $scope.schoolList = window.JDBTypes.schoolList;
            //if($stateParams['action'] == 'reg'){
            this.initForm();
            //}
        }
        UserInfo.prototype.changeStep = function (val) {
            this.$scope.step = val;
        };
        //当时从注册也过来的时候，初始化表单
        UserInfo.prototype.initForm = function () {
            this.$scope.userForm = angular.copy(this.$rootScope.User);
        };
        //校验
        UserInfo.prototype.validateForm = function () {
            var msg = '';
            if (!this.$scope.userForm.realName) {
                msg = '请输入姓名';
                this.$scope.step = 1;
                this.$rootScope.scrollTop();
            }
            else if (!this.$scope.userForm.enRealName) {
                msg = '请输入英文名称';
                this.$scope.step = 1;
                this.$rootScope.scrollTop();
            }
            else if (!this.$scope.userForm.sex) {
                msg = '请选择性别';
                this.$scope.step = 1;
                this.$rootScope.scrollTop();
            }
            else if (!this.$scope.userForm.school) {
                msg = '请选择学校';
            }
            else if (!this.$scope.userForm.department) {
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
            if (!$valid) {
                return null;
            }
            this.$scope.userForm.sex = this.$scope.userForm.sex == '女' ? 0 : 1;
            //this.$scope.userForm.phone = this.$rootScope.User.username;
            console.log(this.$scope.userForm);
            this.MineService.saveUserData(this.$scope.userForm).then(function (result) {
                if (result && result.code == 0) {
                    window.plugins.toast.showShortCenter('信息保存成功!');
                    self.AuthService.setUser(self.$scope.userForm);
                    self.$state.go('jdb.home');
                }
                else {
                    window.plugins.toast.showShortCenter('数据保存失败,稍后重试');
                }
            }, function (err) {
                window.plugins.toast.showShortCenter('数据提交失败');
            });
        };
        UserInfo.prototype.chooseSchool = function () {
            var self = this;
            this.CommonService.showSchoolList(function (index) {
                self.$scope.userForm.school = window.JDBTypes.school[index];
            });
        };
        UserInfo.prototype.chooseGender = function () {
            var self = this;
            this.CommonService.showActionSheet('性别', [
                { text: '女' },
                { text: '男' }
            ]).then(function (index) {
                self.$scope.userForm.sex = { 0: '女', 1: '男' }[index];
            });
        };
        UserInfo.prototype.selectSchool = function (school) {
            this.$scope.userForm.school = school;
            this.saveInfo(true);
        };
        return UserInfo;
    })();
    UserInfo.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'MineService', 'CommonService', 'AuthService'];
    JDB.CtrlModule.controller('UserInfoCtrl', UserInfo);
})(JDB || (JDB = {}));
//# sourceMappingURL=user-info.js.map