/**
 *
 * Created by AaronYuan on 11/7/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/topic/topic.ts" />

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
    }

    class TopicList {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: ITopicListScope,
            public $stateParams: ng.ui.IStateParamsService,
            public currentDetail: any,
            public TopicService: ITopicService
        ){
            $scope.changeTabs = angular.bind(this, this.changeTabs);
            $scope.closeTip = angular.bind(this ,this.closeTip);
            $scope.showReplayModal = angular.bind(this, this.showReplayModal);
            $scope.likeTopic = angular.bind(TopicService, TopicService.likeTopic);


            $scope.topicTag = $stateParams['tag'] || 1;
            $scope.topicTitle = window.JDBTypes.TopicTypes[$scope.topicTag];
            $scope.tabIndex = 2;
            $scope.hasTip = true;

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

            this.refresh();
        }

        initDetail(){
            this.$scope.model = this.currentDetail;
        }


        refresh(){
            var arg = {},
                self = this;
            this.TopicService.list({
                phone: this.$rootScope.User ?this.$rootScope.User.phone : 0,
                curPage: this.$scope.currentPageIndex || 1,
                typeId: this.$scope.topicTag,
                labelId: this.$scope.tabIndex
            }).then(function(res){
                if(res){
                    self.$scope.topicList = res.data.resultList;
                }
            }, function(err){
                window.plugins.toast.showShortCenter('数据记载失败,请重新进入。');
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
            this.refresh();
        }

        closeTip(){
            this.$scope.hasTip = false;
        }

        showReplayModal(id = null){
            this.TopicService.replyModal({
                topicID:  this.currentDetail.topic.id,
                parentID: id
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

    TopicList.$inject = ['$rootScope', '$scope', '$stateParams', 'currentDetail', 'TopicService'];
    CtrlModule.controller('TopListCtrl', TopicList);
    CtrlModule.controller('TopicDetailCtrl', TopicList);

    CtrlModule.controller('TopicReplyCtrl', TopicList);

}
