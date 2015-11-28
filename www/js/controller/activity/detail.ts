/**
 *
 * Created by AaronYuan on 11/12/15.
 */

/// <reference path="../../app.ts" />
/// <reference path="../../service/activity/activity.ts" />

module JDB {
    'use strict';

    declare var window;

    interface IActivityDetailScope extends ng.IScope {
        //显示更多sheet
        showMoreSheet: Function;

        //当前的详细ID
        detailID: number;
        //当前详细内容对象
        model: any;
        //报名
        signUp: Function;
        //参见活动
        join: Function;
        //取消报名
        cancelJoin: Function;
        //评论
        reply: Function;
        //获取详情
        getDetail: Function;

    }

    class ActivityDetail {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IActivityDetailScope,
            public CommonService: ICommonService,
            public ActivityService: IActivityService,
            public $stateParams: any,
            public currentDetail: any
        ){
            $scope.showMoreSheet = angular.bind(this, this.showMoreSheet);
            $scope.join = angular.bind(this, this.join);
            $scope.cancelJoin = angular.bind(this,this.cancelJoin);
            $scope.reply = angular.bind(this, this.reply);

            $scope.model = currentDetail;

            this.init();


            var self = this;
            $rootScope.$once('event:refresh-activity-detail', function(e, data){
                self.$scope.detailID = data.id;
                self.getDetail();
            });
        }

        init(){
            this.$scope.detailID = this.$stateParams['detailID'];

        }




        showMoreSheet(){
            var self = this;
            this.CommonService.showActionSheet('activity-more', [
                {text: '报名成员'},
                {text: '举报'},
                {text: '报名参加'},
                {text: '取消报名'}
            ]).then(function(index){
                self.actionSheetHandler(index);
            });
        }

        join(){
            if(this.$scope.model.join == 1){
                return ;
            }
            var self = this;
            this.ActivityService.signUp({
                id: this.$scope.model.activity.id
            }).then(function(){
                self.$scope.model.join = 1;
            },function(){
                self.$scope.model.isJoind = 0;
            });
        }
        cancelJoin(){
            if(this.$scope.model.join == 0){
                return ;
            }
            var self = this;
            this.ActivityService.cancelSignUp({
                id: this.$scope.model.activity.id
            }).then(function(){
                self.$scope.model.join = 0;
            },function(){
                self.$scope.model.isJoind = 1;
            });
        }

        //右上角菜单回调
        actionSheetHandler(index){
            switch (index){
                case 0:
                    this.$rootScope.stateGo('jdb.activity-member',{
                        activityID: this.$scope.model.activity.id
                    });
                    break;
                case 1:
                    this.CommonService.showReport({
                        typeName: '活动',
                        id: this.$scope.model.activity.id
                    });
                    break;
                case 2:
                    this.join();
                    break;
                case 3:
                    this.cancelJoin();
                    break;
            }

        }

        reply(id: number = null){
            this.CommonService.replyModal({
                activityID: this.$scope.model.activity.id,
                parentID: id,
                action: 'activity'
            });
        }

        getDetail(){
            var self = this;
            this.ActivityService.detail({
                phone: this.$rootScope.User.phone,
                id: this.$scope.detailID
            }).then(function(result){
                if(result.code == 0){
                    self.$scope.model = result.data;
                }
            });
        }

    }

    ResolvesModule['ActivityDetailCtrl'] = {
        currentDetail: ['$rootScope', '$q', '$stateParams', 'ActivityService', function($rootScope, $q, $stateParams, ActivityService){
            var defer = $q.defer(),
                id = $stateParams['detailID'] || 1;
            if(id){
                ActivityService.detail({
                    phone: $rootScope.User.phone,
                    id: id
                }).then(function(result){
                    if(result.code == 0){
                        defer.resolve(result.data);
                    }else{
                        defer.reject(null);
                        window.plugins.toast.showShortCenter('数据加载失败');
                    }
                },function(err){
                    defer.reject(null);
                });
            }

            return defer.promise;
        }]
    };


    ActivityDetail.$inject = ['$rootScope', '$scope', 'CommonService', 'ActivityService', '$stateParams', 'currentDetail'];
    CtrlModule.controller('ActivityDetailCtrl', ActivityDetail);
}


