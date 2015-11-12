/**
 *
 * Created by AaronYuan on 11/7/15.
 */
/// <reference path="../../app.ts" />

//话题列表

module JDB {
    'use strict';

    declare var window;

    interface ITopicListScope extends ng.IScope {
        //话题类型
        topicTag: number;

        topicTitle: string;
        //当前页码
        currentPageIndex: number;
        // 全部，好友
        tabIndex: number;
        //切换tab
        changeTabs: Function;

        //是否有顶部黄色提示
        hasTip: boolean;

        //关闭顶部黄色提示
        closeTip: Function;
    }

    class TopicList {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: ITopicListScope,
            public $stateParams: ng.ui.IStateParamsService
        ){
            $scope.changeTabs = angular.bind(this, this.changeTabs);
            $scope.closeTip = angular.bind(this ,this.closeTip);


            console.log($stateParams);
            $scope.topicTag = $stateParams['tag'] || 1;
            $scope.topicTitle = window.JDBTypes.TopicTypes[$scope.topicTag];
            $scope.tabIndex = 1;
            $scope.hasTip = true;
        }

        refresh(){

        }

        changeTabs(index: number){
            this.$scope.tabIndex = index;
            this.refresh();
        }

        closeTip(){
            this.$scope.hasTip = false;
        }



    }

    TopicList.$inject = ['$rootScope', '$scope', '$stateParams'];
    CtrlModule.controller('TopListCtrl', TopicList);

}
