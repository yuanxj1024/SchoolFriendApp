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
    JDB.appHost = 'http://www.baidu.com';
    //版本号
    JDB.AppVersion = '0.2.1';
    //类型模块
    JDB.TypeModule = angular.module('JDB.types', ['ionic']);
    //控制器模块
    JDB.CtrlModule = angular.module('JDB.controllers', ['ionic', 'once']);
    //服务模块
    JDB.ServiceModule = angular.module('JDB.services', ['ngResource']);
    //自定义指令模块
    JDB.DirectiveModule = angular.module('JDB.directives', ['ionic', 'once']);
    //预加载模块
    JDB.RecolveModule = {};
    //应用程序对象
    JDB.AppModule = angular.module('JDB', ['ionic', 'once', 'JDB.types', 'JDB.controllers', 'JDB.services']);
    //程序启动入口
    var AppStart = function ($rootScope, $q, $state, RootScopeExtendService) {
        /*业务处理*/
        ////通用请求处理函数
        ////仅局限于Service层使用
        //$rootScope.RequestHandler = function(requestFn, args, data){
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
        $rootScope.$on('$stateChangeStart', function (e, data) {
        });
    };
    AppStart.$inject = ['$rootScope', '$q', '$state', 'RootScopeExtendService'];
    //启动应用程序
    JDB.AppModule.run(AppStart);
})(JDB || (JDB = {}));
//# sourceMappingURL=app.js.map