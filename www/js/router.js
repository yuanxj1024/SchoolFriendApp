/**
 * Created by AaronYuan on 10/27/15.
 */
/// <reference path="app.ts" />
//路由模块
var JDB;
(function (JDB) {
    'use strict';
    //路由配置
    JDB.AppModule.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('jdb', {
            url: '/jdb',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        }).state('jdb.home', {
            url: '/home',
            views: {
                'tab-main': {
                    templateUrl: 'templates/home.html',
                    controller: 'HomeCtrl'
                }
            }
        }).state('jdb.activity', {
            url: '/activity',
            views: {
                'tab-main': {
                    templateUrl: 'templates/activity/default.html'
                }
            }
        }).state('jdb.discover', {
            url: '/discover',
            views: {
                'tab-main': {
                    templateUrl: 'templates/discover/default.html'
                }
            }
        }).state('jdb.message', {
            url: '/message',
            views: {
                'tab-main': {
                    templateUrl: 'templates/message/default.html'
                }
            }
        }).state('jdb.mine', {
            url: '/mine',
            views: {
                'tab-main': {
                    templateUrl: 'templates/mine/default.html'
                }
            }
        }).state('jdb.info', {
            url: '/mine/info',
            views: {
                'tab-main': {
                    templateUrl: 'templates/mine/info.html'
                }
            }
        }).state('jdb.invite', {
            url: '/mine/invite',
            views: {
                'tab-main': {
                    templateUrl: 'templates/mine/invite-code.html'
                }
            }
        }).state('jdb.register', {
            url: '/register',
            views: {
                'tab-main': {
                    templateUrl: 'templates/mine/register.html'
                }
            }
        }).state('jdb.reginfo', {
            url: '/register/info',
            params: {
                action: 'reg'
            },
            views: {
                'tab-main': {
                    templateUrl: 'templates/mine/register-user-info.html'
                }
            }
        });
        //默认转到首页
        $urlRouterProvider.otherwise('/jdb/register/info');
    });
})(JDB || (JDB = {}));
//# sourceMappingURL=router.js.map