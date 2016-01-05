/**
 * Created by AaronYuan on 11/6/15.
 */
/**
 *
 * Created by AaronYuan on 11/4/15.
 */

/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
/// <reference path="../../service/group/group.ts" />

//我的，列表页
// 我的圈子，我的话题
// 我参与的， 我发起的

module JDB {
    'use strict';

    interface IGroupListScope extends ng.IScope {
        //显示举报sheet
        showDropMenu: Function;

        viewTitle: string;

        fromState: string;

        currentPageIndex: number;

        dataList: Array<any>;

        refresh: Function;

        hasMoreData: boolean;
    }

    class GroupList {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IGroupListScope,
            public $stateParams: ng.ui.IStateParamsService,
            public CommonService: ICommonService,
            public GroupService: IGroupService
        ){
            $scope.showDropMenu = angular.bind(CommonService ,CommonService.showDropMenu);
            $scope.refresh = angular.bind(this, this.refresh);

            this.init();
        }
        init(){
            this.$scope.currentPageIndex = 1;

            this.$scope.hasMoreData = true;
            this.$scope.dataList = [];

            this.renderView();
        }

        renderView(){
            var action = this.$stateParams['action'];
            if(action == 'all'){
                this.$scope.viewTitle = '所有圈子';
            }else if(action == 'mine'){
                this.$scope.viewTitle = '我的圈子';
            }
        }

        refresh(){
            var action = this.$stateParams['action'];
            if(action == 'all'){
                this.refreshAllGroup();
            }else if(action == 'mine'){
                this.refreshMineGroup();
            }
        }

        //我的圈子，初始化
        refreshMineGroup(){
            var self = this;

            this.GroupService.mineGroupList({
                phone: this.$rootScope.localUser().phone,
                curPage: this.$scope.currentPageIndex++,
                pageSize: 10
            }).then(function (result) {
                if(result && result.code == 0){
                    self.$scope.hasMoreData = Math.ceil(result.data.totalCount/ 10) > self.$scope.currentPageIndex;
                    self.$scope.dataList = self.$scope.dataList.concat(result.data.resultList);
                }
                self.$scope.$broadcast('scroll.infiniteScrollComplete');
            }, function(err){
                self.$scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }

        refreshAllGroup(){
            var self = this;

            this.GroupService.groupList({
                phone: this.$rootScope.localUser().phone,
                curPage: this.$scope.currentPageIndex++,
                pageSize: 10
            }).then(function(result){
                if(result && result.code == 0){
                    self.$scope.hasMoreData = Math.ceil(result.data.totalCount/ 10) > self.$scope.currentPageIndex;
                    self.$scope.dataList = self.$scope.dataList.concat(result.data.resultList);
                }
                self.$scope.$broadcast('scroll.infiniteScrollComplete');
            }, function(err){
                self.$scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }


    }

    GroupList.$inject = ['$rootScope', '$scope', '$stateParams', 'CommonService','GroupService'];
    CtrlModule.controller('GroupListCtrl', GroupList);
}
