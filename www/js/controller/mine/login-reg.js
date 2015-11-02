/**
 *
 * Created by AaronYuan on 11/2/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/mine/mine.ts" />
/// <reference path="../../service/auth.ts" />
//登陆，注册逻辑
var JDB;
(function (JDB) {
    'use strict';
    var LoginReg = (function () {
        function LoginReg($rootScope, $scope, MineService, AuthService, $interval) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.MineService = MineService;
            this.AuthService = AuthService;
            this.$interval = $interval;
            $scope.login = angular.bind(this, this.login);
            $scope.register = angular.bind(this, this.register);
            $scope.sendCode = angular.bind(this, this.sendCode);
            $scope.btnSendText = '获取验证码';
            this.initForm();
        }
        LoginReg.prototype.initForm = function () {
            this.$scope.loginForm = {
                phone: '',
                pwd: ''
            };
            this.$scope.regForm = {
                phone: '',
                pwd: '',
                inviteCode: '',
                code: ''
            };
        };
        LoginReg.prototype.login = function ($valid) {
            console.log($valid);
            this.validateLogin();
            if (!$valid) {
                return;
            }
            this.$scope.loginForm.id = 1;
            this.AuthService.setUser(this.$scope.loginForm);
            window.plugins.toast.showExShortCenter('登陆成功');
            this.$scope.cancel();
        };
        //校验登陆表单
        LoginReg.prototype.validateLogin = function () {
            var msg = '', regPhone = /^[\d]{11}$/, phone = this.$scope.loginForm.phone, pwd = this.$scope.loginForm.pwd;
            if (!phone || !regPhone.test(phone)) {
                msg = '请输入正确的手机号码';
            }
            else if (!pwd || pwd.length < 6) {
                msg = "请输入密码";
            }
            if (msg) {
                window.plugins.toast.showShortCenter(msg);
            }
        };
        LoginReg.prototype.register = function ($valid) {
            this.validateReg();
            if (!$valid) {
                return null;
            }
            //TODO save
        };
        LoginReg.prototype.validateReg = function () {
            var msg;
            if (!this.$scope.regForm.phone) {
                msg = '请输入手机号码';
            }
            else if (!this.$scope.regForm.pwd) {
                msg = '请输入密码';
            }
            else if (!this.$scope.regForm.inviteCode) {
                msg = '请输入邀请码';
            }
            else if (!this.$scope.regForm.code) {
                msg = '请输入手机验证码';
            }
            if (msg) {
                window.plugins.toast.showShortCenter(msg);
            }
        };
        LoginReg.prototype.sendCode = function () {
            if (this.$scope.isSendCode) {
                return;
            }
            var self = this;
            this.$scope.isSendCode = true;
            this.sendSMSCode({});
        };
        LoginReg.prototype.sendSMSCode = function (args) {
            var self = this, time = 59;
            self.$scope.btnSendText = '发送中';
            var timeID = self.$interval(function () {
                self.$scope.btnSendText = '重新发送(' + time + ')';
                if (time-- <= 0) {
                    self.$interval.cancel(timeID);
                    self.$scope.btnSendText = '重新发送';
                }
            }, 1000);
            this.MineService.test(args).then(function (result) {
                if (result.code == 0) {
                    window.plugins.toast.showShortCenter('验证码发送成功');
                }
                else {
                    self.$scope.isSendCode = false;
                    window.plugins.toast.showShortCenter(result.message || '电话格式不正确');
                }
            }, function (err) {
                console.log(123);
                console.log(err);
                self.$scope.isSendCode = false;
                window.plugins.toast.showShortCenter('发送失败，稍后重试');
            });
        };
        return LoginReg;
    })();
    LoginReg.$inject = ['$rootScope', '$scope', 'MineService', 'AuthService', '$interval'];
    JDB.CtrlModule.controller('LoginRegCtrl', LoginReg);
})(JDB || (JDB = {}));
//# sourceMappingURL=login-reg.js.map