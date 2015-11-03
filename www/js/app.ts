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
    export var appHost: string = 'http://www.baidu.com';
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
        //当前用户
        User: IUser;
        //通用请求处理函数
        requestHandler:Function;
        //创建模式窗口
        createModal: Function;
        //路由跳转
        stateGo: Function;
        //显示加载层
        loading: Function;

    }

    //程序启动入口
    var AppStart = function(
        $rootScope: IJDBRootScopeService,
        $q: ng.IQService,
        $state: ng.ui.IStateService,
        RootScopeExtendService: IRootScopeExtend
    ){


        /*业务处理*/


        ////通用请求处理函数
        ////仅局限于Service层使用
        //$rootScope.requestHandler = function(requestFn, args, data){
        //    var defer = this.$q.defer();
        //    requestFn(args, data, function(result){
        //        if(typeof result == 'string'){
        //            result = JSON.parse(result);
        //        }
        //        defer.resolve(result);
        //    }, function(err){
        //        if(typeof err == 'string'){
        //            err = JSON.parse(err);
        //        }
        //        defer.reject(err);
        //    });
        //    return defer.promise;
        //};




        /*事件定义*/
        $rootScope.$on('$stateChangeStart', function(e,data){
        });



    };

    AppStart.$inject = ['$rootScope','$q', '$state', 'RootScopeExtendService'];

    //启动应用程序
    AppModule.run(AppStart);
}
