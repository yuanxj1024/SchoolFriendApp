/**
 *
 * Created by AaronYuan on 10/31/15.
 */

/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
//我的

module JDB {
    'use strict';

    declare var window;

    interface IMineScope extends ng.IScope {
        //编辑标记
        editTag: number;
        tagName: string;
    }


    class Mine {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IMineScope,
            public $stateParams: ng.ui.IStateParamsService
        ){
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

    }

    Mine.$inject = ['$rootScope', '$scope', '$stateParams'];
    CtrlModule.controller('MineCtrl', Mine);
}
