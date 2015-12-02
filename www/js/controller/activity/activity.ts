/**
 * Created by AaronYuan on 10/29/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/activity/activity.ts" />

//活动
module JDB {
    'use strict';

    interface IActivityScope extends ng.IScope{
        //选择地区
        chooseLocation: Function;
        //是否显示选择地区
        isShowLocation: boolean;
        //选择当前城市
        locationSelected: Function;
        //当前页码
        currentPageIndex: number;
        //话题列表
        dataList: Array<any>;
        hasMoreData: boolean;
        refresh: Function;
    }

    class Activity {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IActivityScope,
            public $ionicBackdrop: Ionic.IBackdrop,
            public $timeout: ng.ITimeoutService,
            public ActivityService: IActivityService,
            public $stateParams: ng.ui.IStateParamsService
        ){
            $scope.chooseLocation = angular.bind(this, this.chooseLocation);
            $scope.locationSelected = angular.bind(this, this.locationSelected);
            $scope.refresh = angular.bind(this ,this.refresh);

            $scope.isShowLocation = false;

            if($stateParams['activityID']) {
                this.initForJoinMember();
            }else {
                this.init();
            }

            var self = this;
            $rootScope.$once('event:refresh-all-slide-view',function(){
                console.log('activity refresh');
                self.init();
            });

            $rootScope.$once('event:refresh-activity-list',function(){
                self.init();
            });
        }

        init(){
            this.$scope.dataList = [];
            this.$scope.currentPageIndex = 1;
            this.$scope.hasMoreData = true;

            //this.refresh();
        }

        initForJoinMember(){
            console.log(this.$stateParams);
            var self = this;
            this.ActivityService.joinMemberList({
                id: self.$stateParams['activityID']
            }).then(function(result){
                if(result && result.data){
                    self.$scope.dataList = result.data;
                }
            }, function(err){
            });

        }
        refresh(args:any ={}){
            var self = this;
            args = angular.extend({
                curPage: self.$scope.currentPageIndex++,
                pageSize: 8,
                phone: this.$rootScope.localUser().phone
            }, args);
            this.ActivityService.list(args).then(function(result){
                if(result && result.code == 0){
                    self.$scope.dataList = self.$scope.dataList.concat(result.data.resultList);
                    self.$scope.hasMoreData = Math.ceil(result.data.totalCount/ 10) > self.$scope.currentPageIndex;
                    self.$scope.$broadcast('scroll.infiniteScrollComplete');
                }else{
                    self.$scope.$broadcast('scroll.infiniteScrollComplete');
                }
            });

        }

        chooseLocation(){
            var self = this;
            this.$scope.isShowLocation = !this.$scope.isShowLocation;
        }

        locationSelected(item){
            console.log(item);
        }
    }

    Activity.$inject = ['$rootScope', '$scope', '$ionicBackdrop', '$timeout', 'ActivityService', '$stateParams'];
    CtrlModule.controller('ActivityCtrl', Activity);

    CtrlModule.controller('ActivityJoinMemberCtrl', Activity);
}

