/**
 * Created by AaronYuan on 10/27/15.
 */
/// <reference path="../typescript/ionic/ionic.d.ts" />
/// <reference path="../typescript/angularjs/angular.d.ts" />
/// <reference path="../typescript/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../typescript/angularjs/angular-resource.d.ts" />
/// <reference path="service/rootScope-extend.ts" />
/// <reference path="service/auth.ts" />
/// <reference path="types/type-define.ts" />
//定义应用模块
var JDB;
(function (JDB) {
    'use strict';
    //后台数据地址
    JDB.appHost = 'http://172.17.231.1:8080/jdb/mobile';
    //静态资源域
    JDB.staticHost = JDB.appHost + '/image/showimage?picpath=';
    //版本号
    JDB.AppVersion = '0.2.1';
    //类型模块
    JDB.TypeModule = angular.module('JDB.types', ['ionic']);
    //控制器模块
    JDB.CtrlModule = angular.module('JDB.controllers', ['ionic', 'ionic-datepicker', 'ionic-timepicker', 'once', 'ngFileUpload']);
    //服务模块
    JDB.ServiceModule = angular.module('JDB.services', ['ngResource', 'ngFileUpload']);
    //自定义指令模块
    JDB.DirectiveModule = angular.module('JDB.directives', ['ionic', 'once']);
    //预加载模块
    JDB.ResolvesModule = {};
    //应用程序对象
    JDB.AppModule = angular.module('JDB', ['ionic', 'ionic-datepicker', 'ionic-timepicker', 'once', 'JDB.types', 'JDB.controllers', 'JDB.services', 'ngFileUpload']);
    //程序启动入口
    var AppStart = function ($rootScope, $q, $state, RootScopeExtendService, AuthService) {
        $rootScope.staticHost = JDB.staticHost;
        AuthService.verify();
        /*业务处理*/
        /*事件定义*/
        $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
            toState.fromState = fromState.name;
            toState.fromParams = JSON.stringify(fromParams);
            AuthService.verify();
        });
        $rootScope.$on('event:need-login', function () {
            AuthService.userLogout();
            AuthService.showLoginModal();
        });
    };
    AppStart.$inject = ['$rootScope', '$q', '$state', 'RootScopeExtendService', 'AuthService'];
    //启动应用程序
    JDB.AppModule.run(AppStart);
})(JDB || (JDB = {}));
//# sourceMappingURL=app.js.map