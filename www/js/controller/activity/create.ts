/**
 * Created by AaronYuan on 11/11/15.
 */

/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />

//添加活动

module JDB {
    'use strict';

    declare var window;

    interface IActivityCreateScope extends ng.IScope {
        //显示选择图片sheet
        showImageSheet: Function;

    }

    class ActivityCreate {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IActivityCreateScope,
            public CommonService: ICommonService
        ){
            $scope.showImageSheet = angular.bind(this, this.showImageSheet);

        }

        showImageSheet() {
            this.CommonService.showChooseImg().then(function(index){
                console.log(index);
            });

        }


    }

    ActivityCreate.$inject = ['$rootScope', '$scope', 'CommonService'];
    CtrlModule.controller('ActivityCreateCtrl', ActivityCreate);
}
