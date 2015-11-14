/**
 *
 * Created by AaronYuan on 10/27/15.
 */
/// <reference path="../app.ts" />
/// <reference path="../service/topic/topic.ts" />
/// <reference path="../service/common.ts" />
/// <reference path="../service/auth.ts" />

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

    }


    class Home {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IHomeScope,
            public TopicService: ITopicService,
            public CommonService: ICommonService,
            public AuthService: IAuthService
        ){
            console.log('home');
            $scope.openReleaseTopic = angular.bind(TopicService, TopicService.releaseTopicModal);
            //$scope.openSearchModal = angular.bind(CommonService, CommonService.showSearchModal);
            $scope.openActionSheet = angular.bind(this ,this.openActionSheet);
            $scope.openLogin = angular.bind(this,CommonService.showLoginModal);

            //$scope.openReleaseTopic();
            window.plugins.toast.showShortCenter('测试信息');

            var self = this;

            $rootScope.$on('$stateChangeStart', function(e,data){
                if(data.name == 'jdb.home'){
                    self.AuthService.verify();
                }
            });
        }

        //刷新页面
        refresh(){

        }

        openActionSheet(id: number){
            this.CommonService.showDropMenu(id);
        }


    }

    Home.$inject = ['$rootScope', '$scope', 'TopicService', 'CommonService', 'AuthService'];
    CtrlModule.controller('HomeCtrl', Home);
}
