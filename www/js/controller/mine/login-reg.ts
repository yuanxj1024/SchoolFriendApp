/**
 *
 * Created by AaronYuan on 11/2/15.
 */

/// <reference path="../../app.ts" />
/// <reference path="../../service/mine/mine.ts" />
/// <reference path="../../service/auth.ts" />

//登陆，注册逻辑

module JDB {
    'use strict';

    declare var window;

    interface ILoginRegScope extends ng.IScope {
        //登陆
        login: Function;
        //登陆表单
        loginForm: any;
        //注册表单
        regForm: any;
        //关闭当前modal
        cancel: Function;
        //当前modal对象
        modal: any;

        //注册
        register: Function;
        //是否发送验证码
        isSendCode: boolean;
        btnSendText: string;
        //发送验证码
        sendCode: Function;

    }

    class LoginReg {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: ILoginRegScope,
            public MineService: IMineService,
            public AuthService: IAuthService,
            public $interval: ng.IIntervalService,
            public $state: ng.ui.IStateService
        ){
            $scope.login = angular.bind(this, this.login);


            $scope.register = angular.bind(this, this.register);
            $scope.sendCode = angular.bind(this, this.sendCode);

            $scope.btnSendText = '获取验证码';


            this.initForm();

        }

        initForm(){
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
        }

        login($valid){
            console.log($valid);
            this.validateLogin();
            if(!$valid){
                return ;
            }
            this.$scope.loginForm.id = 1;
            this.AuthService.setUser(this.$scope.loginForm);

            window.plugins.toast.showExShortCenter('登陆成功');
            this.$scope.cancel();
        }
        //校验登陆表单
        validateLogin(){
            var msg =  '',
                regPhone = /^[\d]{11}$/,
                phone = this.$scope.loginForm.phone,
                pwd = this. $scope.loginForm.pwd;
            if(!phone || !regPhone.test(phone)) {
                msg = '请输入正确的手机号码';
            }else if(!pwd || pwd.length < 6){
                msg = "请输入密码";
            }
            if(msg){
                window.plugins.toast.showShortCenter(msg);
            }
        }

        register($valid):void {
            this.validateReg();
            if(!$valid){
                return null;
            }
            //TODO save

            this.MineService.register(this.$scope.regForm).then(function(result){
                if(result && result.code == 0){
                    window.plugins.toast.showShortCenter('注册成功');
                    //TODO 跳转到完善信息页面
                }
            }, function(err){
                window.plugins.toast.showShortCenter('注册失败，请稍后重试');
            });
        }

        validateReg() {
            var msg;
            if(!this.$scope.regForm.phone){
                msg = '请输入手机号码';
            } else if(!this.$scope.regForm.pwd){
                msg = '请输入密码';
            } else if(!this.$scope.regForm.inviteCode){
                msg = '请输入邀请码';
            } else if(!this.$scope.regForm.code) {
                msg = '请输入手机验证码'
            }

            if(msg){
                window.plugins.toast.showShortCenter(msg);
            }
        }

        sendCode(){
            if(this.$scope.isSendCode){
                return ;
            }

            var self = this;

            this.$scope.isSendCode = true;
            this.sendSMSCode({});
        }

        sendSMSCode(args: any){
            var self = this,
                time = 9;
            self.$scope.btnSendText = '发送中';
            var timeID = self.$interval(function(){
                self.$scope.btnSendText = '重新发送(' + time + ')';
                if(time-- <=0){
                    self.$interval.cancel(timeID);
                    self.$scope.isSendCode = false;
                    self.$scope.btnSendText = '重新发送';
                }
            }, 1000);

            this.MineService.test(args).then(function(result){
                if(result.code ==0){
                    window.plugins.toast.showShortCenter('验证码发送成功');
                }else{
                    self.$scope.isSendCode = false;
                    window.plugins.toast.showShortCenter(result.message|| '电话格式不正确');
                }
            }, function(err){
                self.$scope.isSendCode = false;
                window.plugins.toast.showShortCenter('发送失败，稍后重试');
            });
        }



    }

    LoginReg.$inject = ['$rootScope', '$scope', 'MineService', 'AuthService', '$interval', '$state'];
    CtrlModule.controller('LoginRegCtrl', LoginReg);
}

