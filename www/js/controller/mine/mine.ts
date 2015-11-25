/**
 *
 * Created by AaronYuan on 10/31/15.
 */

/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
/// <reference path="../../service/mine/mine.ts" />
/// <reference path="../../service/auth.ts" />
//我的

module JDB {
    'use strict';

    declare var window;

    interface IMineScope extends ng.IScope {
        //编辑标记
        editTag: number;
        //编辑某个具体字段的标记
        tagName: string;
        //修改头像
        changeHeaderImg: Function;
        //退出
        logout: Function;
        //上传头像
        upload: Function;

        tempFile: any;
    }


    class Mine {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IMineScope,
            public $stateParams: ng.ui.IStateParamsService,
            public MineService: IMineService,
            public $state: ng.ui.IStateService,
            public CommonService: ICommonService,
            public Upload: any,
            public AuthService: IAuthService
        ){
            $scope.logout = angular.bind(MineService, MineService.logout);
            $scope.upload = angular.bind(this ,this.upload);

            $scope.tempFile = staticHost + this.$rootScope.User.headPicPath ;// '/img/discover-user-head.png';

            $scope.editTag = $stateParams['tag'];
            $scope.tagName = window.JDBTypes.InfoEditTags[$scope.editTag];

            if($scope.editTag){
                this.initForEdit();
            }
        }


        //编辑， 初始化
        initForEdit(){

        }

        changeHeaderImg():void {

        }

        upload(file) {
            var self = this;
            this.$scope.tempFile = file;
            this.CommonService.uploadFile({
                file: file,
                fields:{
                    phone: this.$rootScope.User.phone
                }
            }).then(function(result){
                if(result.data.code == 0){
                    self.MineService.saveUserData({
                        headPicPath: result.data.data,
                        phone: self.$rootScope.User.phone
                    }).then(function(result){
                        self.AuthService.setUser(result.data.alumnus);
                    });
                }
            }, function(err){
                window.plugins.toast.showShortCenter('头像上传失败');
            });
            //console.log(file);
            //
            //this.MineService.uploadHeadImg(file,function(evt){
            //    console.log(evt);
            //}).then(function(res){
            //    console.log(res);
            //},function(res){
            //    console.log(res);
            //});
        }

    }

    Mine.$inject = ['$rootScope', '$scope', '$stateParams', 'MineService', '$state', 'CommonService', 'Upload', 'AuthService'];
    CtrlModule.controller('MineCtrl', Mine);
}
