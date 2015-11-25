/**
 *
 * Created by AaronYuan on 10/27/15.
 */
/// <reference path="../app.ts" />
/// <reference path="../service/topic/topic.ts" />
/// <reference path="../service/common.ts" />
/// <reference path="../service/auth.ts" />
/// <reference path="../service/public/report.ts" />

module JDB {
    'use strict';

    declare var window;

    interface IHomeScope extends ng.IScope{
        //打开发布话题
        openReleaseTopic: Function;

        //打开搜索页面
        openSearchModal: Function;

        //打开举报操作弹出层
        openActionSheet: Function;

        //打开登陆框
        openLogin: Function;

        //话题列表
        topicList: Array<any>;

        //话题列表类型 最新 = 1，好友=2
        topicType: number;
        //当前页码
        currentPage: number;

        staticHost: string;

        changeTopicType: Function;

        likeTopic: Function;
    }


    class Home {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IHomeScope,
            public TopicService: ITopicService,
            public CommonService: ICommonService,
            public AuthService: IAuthService,
            public ReportService: IReportService
        ){
            $scope.openReleaseTopic = angular.bind(TopicService, TopicService.releaseTopicModal);
            //$scope.openSearchModal = angular.bind(CommonService, CommonService.showSearchModal);
            $scope.openActionSheet = angular.bind(this ,this.openActionSheet);
            $scope.openLogin = angular.bind(this,CommonService.showLoginModal);
            $scope.changeTopicType = angular.bind(this, this.changeTopicType);
            $scope.likeTopic = angular.bind(this, this.likeTopic);

            //$scope.openReleaseTopic();
            window.plugins.toast.showShortCenter('测试信息');

            var self = this;

            //$rootScope.$on('$stateChangeSuccess', function(e,data){
            //    console.log(data);
            //    if(data.name == 'jdb.home'){
            //        self.AuthService.verify();
            //    }
            //});

            //self.AuthService.verify();

            this.$rootScope.$once('event:refresh-home', function(){
                console.log('refresh home');
                //self.init();
                self.refresh();
            });

            this.init();

        }
        init(){
            //最新
            this.$scope.topicType = TopicType.Newest;
            this.$scope.currentPage = 1;
            this.$scope.staticHost = staticHost;

            this.refresh();
        }

        //刷新页面
        refresh(){
            var arg = {},
                self = this;
            this.TopicService.list({
                phone: this.$rootScope.User ?this.$rootScope.User.phone : 0,
                labelId: this.$scope.topicType || TopicType.Newest,
                curPage: this.$scope.currentPage || 1
            }).then(function(res){
                if(res){
                    self.$scope.topicList = res.data.resultList;
                }
                console.log(res);
            }, function(err){
                //self.$rootScope.loading();
                window.plugins.toast.showShortCenter('数据记载失败,请重新进入。');
            });
        }

        openActionSheet(user){
            var self = this;
            console.log(user);
            this.ReportService.setReportObject(user);
            this.CommonService.showDropMenu(null).then(function(index){
                console.log(index);
                if(index == 0){
                    self.CommonService.showReport();
                }else if(index == 2){
                    self.TopicService.ignoreUser({
                        phone: self.$rootScope.User.phone,
                        tphone: user.alumnus.phone
                    });
                }
            }.bind(this));
        }

        changeTopicType(t){
            this.$scope.topicType = t;
            this.refresh();
        }

        likeTopic(item){
            if(!item.isLiked){
                this.TopicService.likeTopic(item);
            }
        }


    }

    Home.$inject = ['$rootScope', '$scope', 'TopicService', 'CommonService', 'AuthService', 'ReportService'];
    CtrlModule.controller('HomeCtrl', Home);
}
