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
    }

    class Mine {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IMineScope,
            public $stateParams: ng.ui.IStateParamsService,
            public MineService: IMineService,
            public $state: ng.ui.IStateService
        ){
            console.log('mine');
            console.log($state);

            console.log($stateParams);

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

    }

    Mine.$inject = ['$rootScope', '$scope', '$stateParams', 'MineService', '$state'];
    CtrlModule.controller('MineCtrl', Mine);
}
