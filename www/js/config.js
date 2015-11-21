/**
 * Created by AaronYuan on 10/27/15.
 */
/// <reference path="app.ts" />
var JDB;
(function (JDB) {
    'use strict';
    //请求拦截器定义
    var httpInterceptor = function ($rootScope, $q) {
        return {
            request: function (config) {
                var deferred = $q.defer();
                if (!config.hasOwnProperty('needAccessToken')) {
                    config.needAccessToken = false;
                }
                config.headers['x-access-token'] = $rootScope.getAccessToken();
                if (config.method == 'POST' && !config['file']) {
                    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                }
                if (config.needAccessToken) {
                    if (config.hasOwnProperty('needLogin') && config.needLogin) {
                        config.needLogin = true;
                    }
                }
                else {
                    config.needLogin = false;
                }
                if (!config.hasOwnProperty('cache')) {
                    if (config.needAccessToken && !$rootScope.accessToken) {
                        var tempConfig = angular.extend({
                            'accessToken': ''
                        }, config, {
                            data: {
                                message: '请登录'
                            },
                            tag: 1001,
                            needLogin: config.needLogin
                        });
                        deferred.reject(tempConfig);
                    }
                    else {
                        deferred.resolve(config);
                    }
                }
                else {
                    deferred.resolve(config);
                }
                return deferred.promise;
            },
            response: function (response) {
                var accessToken = response.headers('x-access-token');
                if (accessToken && accessToken != $rootScope.accessToken) {
                    $rootScope.setAccessToken(accessToken);
                }
                return response;
            },
            responseError: function (rejection) {
                switch (rejection.tag) {
                    case 1001:
                        $rootScope.$emit('event:need-login');
                        break;
                }
                return $q.reject(rejection);
            }
        };
    };
    httpInterceptor.$inject = ['$rootScope', '$q'];
    JDB.AppModule.config(function ($httpProvider, $provide, $resourceProvider, $ionicConfigProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
        $ionicConfigProvider.navBar.alignTitle('center');
        $ionicConfigProvider.backButton.text(' ');
        //$ionicConfigProvider.backButton.icon('ion-ios-arrow-left');
        //处理路由状态
        $provide.decorator('$state', ['$delegate', '$rootScope', function ($delegate, $rootScope) {
            $rootScope.$on('$stateChangeStart', function (event, state, params, fromState, fromParams) {
                $delegate.next = state;
                $delegate.toParams = params;
                $delegate.fromState = fromState.name;
                $delegate.fromParams = fromParams;
            });
            return $delegate;
        }]);
        //注入请求拦截处理模块
        $provide.factory('interceptor', httpInterceptor);
        $httpProvider.interceptors.push('interceptor');
        //优化事件处理
        $provide.decorator('$rootScope', ['$delegate', function ($delegate) {
            Object.defineProperty($delegate.constructor.prototype, '$once', {
                value: function (name, listener) {
                    var unsubscribe = $delegate.$on(name, listener);
                    this.$on('$destroy', unsubscribe);
                    return unsubscribe;
                },
                enumerable: false
            });
            return $delegate;
        }]);
    });
    JDB.AppModule.filter('trustHtml', function ($sce) {
        return function (input) {
            return $sce.trustAsHtml(input);
        };
    });
})(JDB || (JDB = {}));
//# sourceMappingURL=config.js.map