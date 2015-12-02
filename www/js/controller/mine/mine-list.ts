/**
 *
 * Created by AaronYuan on 11/4/15.
 */

/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
/// <reference path="../../service/activity/activity.ts" />

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

        currentPageIndex: number;

        hasMoreData: boolean;

        refresh: Function;

        dataList: Array<any>;

    }

    class MineList {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IMineListScope,
            public $stateParams: ng.ui.IStateParamsService,
            public CommonService: ICommonService,
            public ActivityService: IActivityService
        ){
            $scope.showDropMenu = angular.bind(CommonService ,CommonService.showDropMenu);
            $scope.refresh = angular.bind(this, this.refresh);

            $scope.currentPageIndex = 1;
            $scope.hasMoreData = true;
            $scope.dataList = [];
        }

        refresh(){
            var action = this.$stateParams['action'];
            if(action == 'group'){
                this.initForGroup();
            }else if(action == 'group'){
                this.initForTopic();
            }else if(action == 'release'){
                this.$scope.viewTitle = '我发布的';
                this.initForMineRelease();
            }else if(action == 'join'){
                this.$scope.viewTitle = '我参与的';
                this.initForMineJoined();
            }
        }

        //我的圈子，初始化
        initForGroup(){

        }

        //我的话题，初始化
        initForTopic(){

        }

        initForMineRelease(){
            var self = this;
            this.ActivityService.mineCreateList({
                phone: this.$rootScope.localUser().phone,
                curPage: this.$scope.currentPageIndex++,
                pageSize: 10
            }).then(function(result){
                if(result && result.code ==0){
                    self.$scope.hasMoreData = Math.ceil(result.data.totalCount/ 10) > self.$scope.currentPageIndex;
                    self.$scope.dataList = self.$scope.dataList.concat(result.data.resultList);
                }
                self.$scope.$broadcast('scroll.infiniteScrollComplete');
            }, function(err){
                self.$scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }

        initForMineJoined(){
            var self = this;
            this.ActivityService.mineJoinList({
                phone: this.$rootScope.localUser().phone,
                curPage: this.$scope.currentPageIndex++,
                pageSize: 10
            }).then(function(result){
                if(result && result.code ==0){
                    self.$scope.hasMoreData = Math.ceil(result.data.totalCount/ 10) > self.$scope.currentPageIndex;
                    self.$scope.dataList = self.$scope.dataList.concat(result.data.resultList);
                }
                self.$scope.$broadcast('scroll.infiniteScrollComplete');
            }, function(err){
                self.$scope.$broadcast('scroll.infiniteScrollComplete');
            });

        }

    }

    MineList.$inject = ['$rootScope', '$scope', '$stateParams', 'CommonService', 'ActivityService'];
    CtrlModule.controller('MineListCtrl', MineList);
}
