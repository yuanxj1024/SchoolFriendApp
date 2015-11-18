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
module JDB {
    'use strict';

    //后台数据地址
    export var appHost: string = 'http://192.168.253.1:8080/jdb/mobile';
    //版本号
    export var AppVersion: string = '0.2.1';
    //类型模块
    export var TypeModule: ng.IModule = angular.module('JDB.types', ['ionic']);
    //控制器模块
    export var CtrlModule: ng.IModule = angular.module('JDB.controllers', ['ionic','once']);
    //服务模块
    export var ServiceModule: ng.IModule = angular.module('JDB.services', ['ngResource']);
    //自定义指令模块
    export var DirectiveModule: ng.IModule = angular.module('JDB.directives', ['ionic','once']);
    //预加载模块
    export var RecolveModule: any = {};

    //应用程序对象
    export var AppModule: ng.IModule = angular.module('JDB', ['ionic','once', 'JDB.types', 'JDB.controllers', 'JDB.services']);

    //根作用域
    export interface IJDBRootScopeService extends ng.IRootScopeService {
        //授权校验码
        accessToken: string;
        setAccessToken: Function;
        //当前用户
        User: IUser;
        //通用请求处理函数
        requestHandler:Function;

        //创建模式窗口
        createModal: Function;
        //路由跳转
        stateGo: Function;
        //返回上一个路由
        goBack: Function;
        //显示加载层
        loading: Function;
        //屏幕滚动到底部
        scrollTop: Function;
        //打开搜索页面
        openSearchModal: Function;
        //打开举报对话框
        showDropMenu: Function;
        //返回上一个路由
        back: Function;
        //单次事件绑定
        $once: Function;
        ///类似Jquery的$.param

    }

    //程序启动入口
    var AppStart = function(
        $rootScope: IJDBRootScopeService,
        $q: ng.IQService,
        $state: ng.ui.IStateService,
        RootScopeExtendService: IRootScopeExtend,
        AuthService: IAuthService
    ){

        /*业务处理*/


        /*事件定义*/
        $rootScope.$on('$stateChangeStart', function(e,toState,toParams,fromState,fromParams){
            toState.fromState = fromState.name;
            toState.fromParams = JSON.stringify(fromParams);
        });

        $rootScope.$on('event:need-login', function(){
            AuthService.userLogout();
            AuthService.showLoginModal();
        });

    };

    AppStart.$inject = ['$rootScope','$q', '$state', 'RootScopeExtendService' ,'AuthService'];

    //启动应用程序
    AppModule.run(AppStart);
}
