/**
 * Created by AaronYuan on 11/6/15.
 */
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

    interface IGroupListScope extends ng.IScope {
        //显示举报sheet
        showDropMenu: Function;

        viewTitle: string;

    }

    class GroupList {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IGroupListScope,
            public $stateParams: ng.ui.IStateParamsService,
            public CommonService: ICommonService
        ){
            $scope.showDropMenu = angular.bind(CommonService ,CommonService.showDropMenu);

            this.$scope.viewTitle = '所有圈子';

            this.renderView();
        }

        renderView(){
            var action = this.$stateParams['action'];
            if(action == 'all'){
                this.$scope.viewTitle = '所有圈子';
                this.refreshAllGroup();
            }else if(action == 'group'){
                this.$scope.viewTitle = '我的圈子';
                this.refreshMineGroup();
            }
        }

        //我的圈子，初始化
        refreshMineGroup(){

        }

        refreshAllGroup(){

        }



    }

    GroupList.$inject = ['$rootScope', '$scope', '$stateParams', 'CommonService'];
    CtrlModule.controller('GroupListCtrl', GroupList);
}
