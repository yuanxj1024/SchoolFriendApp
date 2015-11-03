/**
 * Created by AaronYuan on 10/27/15.
 */

/// <reference path="app.ts" />

//路由模块
module JDB {
    'use strict';

    //路由配置
    AppModule.config(function(
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider
    ){

        $stateProvider
            .state('jdb',{
                url: '/jdb',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            //首页
            .state('jdb.home',{
                url: '/home',
                views: {
                    'tab-main':{
                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl'
                    }
                }
            })
            //活动
            .state('jdb.activity',{
                url: '/activity',
                views: {
                    'tab-main':{
                        templateUrl: 'templates/activity/default.html'
                    }
                }
            })
            //发现
            .state('jdb.discover',{
                url: '/discover',
                views: {
                    'tab-main':{
                        templateUrl: 'templates/discover/default.html',
                    }
                }
            })
            //消息
            .state('jdb.message',{
                url: '/message',
                views: {
                    'tab-main':{
                        templateUrl: 'templates/message/default.html'
                    }
                }
            })
            //我的
            .state('jdb.mine',{
                url: '/mine',
                views: {
                    'tab-main':{
                        templateUrl: 'templates/mine/default.html'
                    }
                }
            })
            //个人信息
            .state('jdb.info',{
                url: '/mine/info',
                views: {
                    'tab-main':{
                        templateUrl: 'templates/mine/info.html'
                    }
                }
            })
            //邀请码
            .state('jdb.invite',{
                url: '/mine/invite',
                views: {
                    'tab-main':{
                        templateUrl: 'templates/mine/invite-code.html'
                    }
                }
            })
            .state('jdb.register',{
                url: '/register',
                views: {
                    'tab-main':{
                        templateUrl: 'templates/mine/register.html'
                    }
                }
            })
            //注册成功后完善信息
            .state('jdb.reginfo',{
                url: '/register/info',
                params:{
                    action: 'reg'
                },
                views: {
                    'tab-main':{
                        templateUrl: 'templates/mine/register-user-info.html'
                    }
                }
            })
        ;

        //默认转到首页
        $urlRouterProvider.otherwise('/jdb/register/info');

    });
}