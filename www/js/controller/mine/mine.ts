/**
 *
 * Created by AaronYuan on 10/31/15.
 */

/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
/// <reference path="../../service/mine/mine.ts" />
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
            public Upload: any
        ){
            $scope.logout = angular.bind(MineService, MineService.logout);
            $scope.upload = angular.bind(this ,this.upload);

            $scope.tempFile =  '/img/discover-user-head.png';

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
            this.$scope.tempFile = file;
            console.log(file);

            this.MineService.uploadHeadImg(file,function(evt){
                console.log(evt);
            }).then(function(res){
                console.log(res);
            },function(res){
                console.log(res);
            });
        }

    }

    Mine.$inject = ['$rootScope', '$scope', '$stateParams', 'MineService', '$state', 'CommonService', 'Upload'];
    CtrlModule.controller('MineCtrl', Mine);
}
