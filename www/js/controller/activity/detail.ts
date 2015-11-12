/**
 *
 * Created by AaronYuan on 11/12/15.
 */

/// <reference path="../../app.ts" />

module JDB {
    'use strict';

    interface IActivityDetailScope extends ng.IScope {
        //显示更多sheet
        showMoreSheet: Function;
    }

    class ActivityDetail {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IActivityDetailScope,
            public CommonService: ICommonService
        ){
            $scope.showMoreSheet = angular.bind(this, this.showMoreSheet);


        }

        showMoreSheet(){
            this.CommonService.showActionSheet('activity-more', [
                {text: '分享'},
                {text: '举报'},
                {text: '报名参加'},
                {text: '取消报名'}
            ]).then(function(index){
                console.log(index)
            });
        }

    }

    ActivityDetail.$inject = ['$rootScope', '$scope', 'CommonService'];
    CtrlModule.controller('ActivityDetailCtrl', ActivityDetail);
}


