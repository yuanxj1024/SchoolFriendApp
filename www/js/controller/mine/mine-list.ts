/**
 *
 * Created by AaronYuan on 11/4/15.
 */

/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />

//我的，列表页
// 我的圈子，我的话题
// 我参与的， 我发起的

module JDB {
    'use strict';

    interface IMineListScope extends ng.IScope {
        //显示举报sheet
        showDropMenu: Function;

        // 发起，参与
        viewTitle: string;


    }

    class MineList {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IMineListScope,
            public $stateParams: ng.ui.IStateParamsService,
            public CommonService: ICommonService
        ){
            $scope.showDropMenu = angular.bind(CommonService ,CommonService.showDropMenu);

            this.renderView();

        }

        renderView(){
            var action = this.$stateParams['action'];
            if(action == 'group'){
                this.initForGroup();
            }else if(action == 'group'){
                this.initForTopic();
            }else if(action == 'release'){
                this.$scope.viewTitle = '我发布的';
            }else if(action == 'join'){
                this.$scope.viewTitle = '我参与的';
            }
        }

        //我的圈子，初始化
        initForGroup(){

        }

        //我的话题，初始化
        initForTopic(){

        }

    }

    MineList.$inject = ['$rootScope', '$scope', '$stateParams', 'CommonService'];
    CtrlModule.controller('MineListCtrl', MineList);
}
