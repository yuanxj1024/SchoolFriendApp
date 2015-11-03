/**
 * Created by AaronYuan on 11/3/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/mine/mine.ts" />
/// <reference path="../../service/common.ts" />
//用户基本信息

module JDB {
    'use strict';

    declare var window: any;

    interface IUserInfoScope extends ng.IScope {
        //当前步骤
        step: number;

        //修改步骤
        changeStep: Function;

        //用户信息表单
        userForm: any;
        //保存
        saveInfo: Function;
        //选择学校
        chooseSchool: Function;
    }

    class UserInfo {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IUserInfoScope,
            public $state: ng.ui.IStateService,
            public $stateParams: ng.ui.IStateParamsService,
            public MineService: IMineService,
            public CommonService: ICommonService
        ){
            $scope.changeStep = angular.bind(this, this.changeStep);
            $scope.saveInfo = angular.bind(this, this.saveInfo);
            $scope.chooseSchool = angular.bind(this,this.chooseSchool);

            console.log($stateParams);
            $scope.step = 1;
            if($stateParams['action'] == 'reg'){
                this.initForm();
            }
        }

        changeStep(val: number): void {
            this.$scope.step = val;
        }
        //当时从注册也过来的时候，初始化表单
        initForm(){
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
        }

        //校验
        validateForm(){
            var msg = '';
            if(!this.$scope.userForm.userName){
                msg = '请输入姓名';
                this.$scope.step = 1;
                this.$rootScope.scrollTop();
            } else if(!this.$scope.userForm.englishName){
                msg = '请输入英文名称';
                this.$scope.step = 1;
                this.$rootScope.scrollTop();
            } else if(!this.$scope.userForm.gender){
                msg = '请选择性别';
                this.$scope.step = 1;
                this.$rootScope.scrollTop();
            } else if(!this.$scope.userForm.school){
                msg = '请选择学校';
            } else if(!this.$scope.userForm.subject){
                msg ='请输入院系';
            } else if(!this.$scope.userForm.grade){
                msg = '请输入年纪';
            }

            if(msg){
                window.plugins.toast.showShortCenter(msg);
            }
        }

        saveInfo($valid: boolean): void{
            var self = this;
            this.validateForm();
            if(!$valid){
                return null;
            }
            //TODO save
            this.MineService.saveUserData(this.$scope.userForm).then(function(result){
                if(result && result.code == 0){
                    window.plugins.toast.showShortCenter('数据保存成功!');
                    self.$state.go('');
                }else {
                    window.plugins.toast.showShortCenter('数据保存失败,稍后重试');
                }
            }, function(err){
                window.plugins.toast.showShortCenter('数据提交失败');
            });
        }

        chooseSchool(){
            var self = this;
            this.CommonService.showSchoolList(function(index){
                 self.$scope.userForm.school = window.JDBTypes.school[index];
            });
        }


    }

    UserInfo.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'MineService', 'CommonService'];
    CtrlModule.controller('UserInfoCtrl', UserInfo);
}
