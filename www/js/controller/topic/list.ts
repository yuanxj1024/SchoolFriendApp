/**
 *
 * Created by AaronYuan on 11/7/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/topic/topic.ts" />
/// <reference path="../../service/common.ts" />

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

        hasMoreData: boolean;
        // 全部，好友
        tabIndex: number;
        //切换tab
        changeTabs: Function;

        //是否有顶部黄色提示
        hasTip: boolean;

        //关闭顶部黄色提示
        closeTip: Function;
        //当前详细内容对象
        model: any;
        //回复
        showReplayModal: Function;

        replyForm: any;
        //评论时的参数
        params: any;
        //列表
        topicList: Array<any>;

        likeTopic: Function;

        refresh: Function;
    }

    class TopicList {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: ITopicListScope,
            public $stateParams: ng.ui.IStateParamsService,
            public currentDetail: any,
            public TopicService: ITopicService,
            public CommonService: ICommonService
        ){
            $scope.changeTabs = angular.bind(this, this.changeTabs);
            $scope.closeTip = angular.bind(this ,this.closeTip);
            $scope.showReplayModal = angular.bind(this, this.showReplayModal);
            $scope.likeTopic = angular.bind(TopicService, TopicService.likeTopic);
            $scope.refresh = angular.bind(this, this.refresh);


            $scope.topicTag = $stateParams['tag'] || 1;
            $scope.topicTitle = window.JDBTypes.TopicTypes[$scope.topicTag];
            $scope.tabIndex = 2;
            $scope.hasTip = !true;
            $scope.hasMoreData = true;

            if(currentDetail){
                this.initDetail();
            }else{
                this.init();
            }

            var self = this;
            $rootScope.$once('event:refresh-detail',function(e,data){
                self.refreshDetail(data);
            });
        }

        init(){
            this.$scope.replyForm = {
                'topic.id': '',
                'commentUser.id': this.$rootScope.User.id,
                content: ''
            };
            this.$scope.topicList = [];
            this.$scope.currentPageIndex =1;

            //this.refresh();
        }

        initDetail(){
            this.$scope.model = this.currentDetail;
        }


        refresh(){
            var arg = {},
                self = this;
            this.TopicService.list({
                phone: this.$rootScope.User ?this.$rootScope.User.phone : 0,
                curPage: this.$scope.currentPageIndex++,
                typeId: this.$scope.topicTag,
                labelId: this.$scope.tabIndex,
                pageSize: 10
            }).then(function(res){
                if(res && res.code == 0){
                    self.$scope.hasMoreData = Math.ceil(res.data.totalCount/ 10) > self.$scope.currentPageIndex;
                    self.$scope.topicList = res.data.resultList;
                }
                self.$scope.$broadcast('scroll.infiniteScrollComplete');
            }, function(err){
                self.$scope.$broadcast('scroll.infiniteScrollComplete');
                //window.plugins.toast.showShortCenter('数据加载失败,请重新进入');
            });
        }
        refreshDetail(detailID: number){
            var self = this;
            this.TopicService.detail({
                id: detailID
            }).then(function(res){
                if(res && res.data){
                    self.$scope.model = res.data;
                }
            });
        }

        //最新，好友切换
        changeTabs(index: number){
            this.$scope.tabIndex = index;
            this.$scope.currentPageIndex = 1;
            this.refresh();
        }

        closeTip(){
            this.$scope.hasTip = false;
        }

        showReplayModal(id = null){
            this.CommonService.replyModal({
                topicID:  this.currentDetail.topic.id,
                parentID: id,
                action: 'topic'
            });
        }

    }


    ResolvesModule['TopicDetailCtrl'] = {
        currentDetail: ['$q','$rootScope','$stateParams', 'TopicService', function($q, $rootScope, $stateParams, TopicService){
            var defer = $q.defer(),
                id = $stateParams['detailID'] ;

            if(id) {

                TopicService.detail({
                    id: id
                }).then(function (res) {
                    if (res && res.data) {
                        defer.resolve(res.data);
                    } else {
                        defer.resolve(res);
                    }
                }, function (err) {
                    window.plugins.toast.showShortCenter('话题详情加载失败');
                    defer.reject(null);
                });
            }else{
                defer.resolve(null);
            }
            return defer.promise;
        }]
    };

    TopicList.$inject = ['$rootScope', '$scope', '$stateParams', 'currentDetail', 'TopicService', 'CommonService'];
    CtrlModule.controller('TopListCtrl', TopicList);
    CtrlModule.controller('TopicDetailCtrl', TopicList);

    CtrlModule.controller('TopicReplyCtrl', TopicList);

}
