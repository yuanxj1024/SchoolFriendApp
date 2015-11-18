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
        function LoginReg($rootScope, $scope, MineService, AuthService, $interval, $state) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.MineService = MineService;
            this.AuthService = AuthService;
            this.$interval = $interval;
            this.$state = $state;
            //登陆
            $scope.login = angular.bind(this, this.login);
            //注册
            $scope.register = angular.bind(this, this.register);
            $scope.sendCode = angular.bind(this, this.sendCode);
            //重置密码
            $scope.changeResetStep = angular.bind(this, this.changeResetStep);
            $scope.resetBack = angular.bind(this, this.resetBack);
            $scope.resetPwd = angular.bind(this, this.resetPwd);
            $scope.btnSendText = '获取验证码';
            $scope.resetStep = 1;
            this.initForm();
        }
        LoginReg.prototype.initForm = function () {
            this.$scope.loginForm = {
                username: '',
                password: ''
            };
            this.$scope.regForm = {
                username: '',
                password: '',
                inviteCode: '',
                code: ''
            };
        };
        LoginReg.prototype.login = function ($valid) {
            var self = this;
            if (!$valid || !this.validateLogin()) {
                return;
            }
            this.MineService.login(this.$scope.loginForm).then(function (res) {
                if (res && res.code == 0) {
                    self.AuthService.setUser(res.data.alumnus);
                    window.plugins.toast.showExShortCenter('登陆成功');
                    self.$scope.cancel();
                    self.$rootScope.$emit('event:refresh-home');
                }
                else {
                    window.plugins.toast.showExShortCenter(res.error);
                }
            }, function (err) {
                window.plugins.toast.showExShortCenter('登陆失败');
            });
        };
        //校验登陆表单
        LoginReg.prototype.validateLogin = function () {
            var msg = '', regPhone = /^[\d]{11}$/, phone = this.$scope.loginForm.username, pwd = this.$scope.loginForm.password;
            if (!phone || !regPhone.test(phone)) {
                msg = '请输入正确的手机号码';
            }
            else if (!pwd || pwd.length < 6) {
                msg = "请输入密码";
            }
            if (msg) {
                window.plugins.toast.showShortCenter(msg);
                return false;
            }
            return true;
        };
        LoginReg.prototype.register = function ($valid) {
            this.validateReg();
            if (!$valid) {
                return null;
            }
            //TODO save
            this.MineService.register(this.$scope.regForm).then(function (result) {
                if (result && result.code == 0) {
                    window.plugins.toast.showShortCenter('注册成功');
                }
            }, function (err) {
                window.plugins.toast.showShortCenter('注册失败，请稍后重试');
            });
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
            var self = this, time = 9;
            self.$scope.btnSendText = '发送中';
            var timeID = self.$interval(function () {
                self.$scope.btnSendText = '重新发送(' + time + ')';
                if (time-- <= 0) {
                    self.$interval.cancel(timeID);
                    self.$scope.isSendCode = false;
                    self.$scope.btnSendText = '重新发送';
                }
            }, 1000);
            this.MineService.sendSMSCode(args).then(function (result) {
                if (result.code == 0) {
                    window.plugins.toast.showShortCenter('验证码发送成功');
                }
                else {
                    window.plugins.toast.showShortCenter(result.message || '电话格式不正确');
                }
            }, function (err) {
                window.plugins.toast.showShortCenter('发送失败，稍后重试');
            });
        };
        LoginReg.prototype.changeResetStep = function (val) {
            this.$scope.resetStep = val;
        };
        LoginReg.prototype.resetPwd = function ($valid) {
            if (!$valid) {
                return null;
            }
            //TODO save new pwd
        };
        LoginReg.prototype.resetBack = function () {
            this.$scope.resetStep = 1;
            this.$rootScope.stateGo('jdb.mine');
        };
        return LoginReg;
    })();
    LoginReg.$inject = ['$rootScope', '$scope', 'MineService', 'AuthService', '$interval', '$state'];
    JDB.CtrlModule.controller('LoginRegCtrl', LoginReg);
})(JDB || (JDB = {}));
//# sourceMappingURL=login-reg.js.map