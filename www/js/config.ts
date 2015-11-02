/**
 * Created by AaronYuan on 10/27/15.
 */

/// <reference path="app.ts" />

module JDB {
    'use strict';


    //请求中需要包含的参数
    interface IJDBRequestConfig extends ng.IRequestConfig{
        //是否要key
        needAccessToken?: boolean;
        //是否需要登录
        needLogin?: boolean;
    }

    interface IJDBHttpPromiseCallbackArg<T> extends ng.IHttpPromiseCallbackArg<T> {
        needAccessToken?: boolean;
        needLogin?: boolean;
        //参数配置
        config?: IJDBRequestConfig;
        //错误码
        tag: number;
    }


    //扩展路由状态
    interface IJDBStateDelegate extends ng.ui.IState {
        //前一个路由
        next: ng.ui.IState;
        //参数
        toParams: ng.ui.IStateOptions;
    }

    //请求拦截器定义
    var httpInterceptor = function(
        $rootScope: IJDBRootScopeService,
        $q: ng.IQService
    ): any {
        return {
            request: function(config: IJDBRequestConfig): ng.IPromise<IJDBRequestConfig> {
                var deferred: ng.IDeferred<IJDBRequestConfig> = $q.defer();

                if(!config.hasOwnProperty('needAccessToken')){
                    config.needAccessToken = false;
                }
                config.headers['x-access-token'] = $rootScope.accessToken;
                //$rootScope.accessToken = 'xxx';

                //if(config.needAccessToken){
                //    if(config.hasOwnProperty('needLogin') && config.needLogin){
                //        config.needLogin = true;
                //    }
                //}else{
                //    config.needLogin = false;
                //}
                //
                //if(!config.hasOwnProperty('cache')){
                //    if($rootScope.accessToken){
                //        config.params = angular.extend({
                //            'accessToken': $rootScope.accessToken
                //        }, config);
                //
                //        deferred.resolve(config);
                //    }else if(config.needAccessToken && !$rootScope.accessToken){
                //        var tempConfig = angular.extend({
                //            'accessToken':''
                //        }, config, {
                //            data: {
                //                message: '请登录'
                //            },
                //            tag: 1001,
                //            needLogin: config.needLogin
                //        });
                //        deferred.reject(config);
                //    }
                //}else{
                    deferred.resolve(config);
                //}
                return deferred.promise;
            },

            response: function(response: IJDBHttpPromiseCallbackArg<any>): IJDBHttpPromiseCallbackArg<any> {
                var accessToken = response.headers('x-access-token')|| '1234567890';
                if(accessToken && accessToken!= $rootScope.accessToken){
                    $rootScope.accessToken = accessToken;
                }
                return response;
            },

            responseError: function(rejection: IJDBHttpPromiseCallbackArg<any>): any{
                switch (rejection.tag){
                    case 1001:
                        console.log(rejection);
                        break;
                }
                return $q.reject(rejection);
            }

        };
    };

    httpInterceptor.$inject = ['$rootScope', '$q'];

    AppModule.config(function(
        $httpProvider: ng.IHttpProvider,
        $provide: ng.auto.IProvideService,
        $resourceProvider: any
    ){
        $resourceProvider.defaults.stripTrailingSlashes = false;

        //处理路由状态
        $provide.decorator('$state', ['$delegate', '$rootScope', function($delegate:IJDBStateDelegate, $rootScope: IJDBRootScopeService){
            $rootScope.$on('$stateChangeStart', function(event:any, state:ng.ui.IState, params:any) {
                $delegate.next = state;
                $delegate.toParams = params;
            });
            return $delegate;
        }]);

        //注入请求拦截处理模块
        $provide.factory('interceptor', httpInterceptor);
        $httpProvider.interceptors.push('interceptor');

        //优化事件处理
        $provide.decorator('$rootScope', ['$delegate', function($delegate:any) {
            Object.defineProperty($delegate.constructor.prototype, '$once', {
                value: function(name:string, listener:any) {
                    var unsubscribe = $delegate.$on(name, listener);
                    this.$on('$destroy', unsubscribe);
                    return unsubscribe;
                },
                enumerable: false
            });
            return $delegate;
        }]);

    });

    AppModule.filter('trustHtml', function($sce){
        return function(input){
            return $sce.trustAsHtml(input);
        };
    });
}