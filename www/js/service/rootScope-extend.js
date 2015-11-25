/**
 *
 * Created by AaronYuan on 11/2/15.
 */
/// <reference path="../app.ts" />
/// <reference path="../service/common.ts" />
//对 $rootScope 扩展一些通用方法
var JDB;
(function (JDB) {
    'use strict';
    //modal对象集合
    var modalList = {};
    var RootScopeExtend = (function () {
        function RootScopeExtend($rootScope, $q, $ionicModal, $state, $ionicLoading, $ionicScrollDelegate, CommonService, $stateParams, $injector) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$ionicModal = $ionicModal;
            this.$state = $state;
            this.$ionicLoading = $ionicLoading;
            this.$ionicScrollDelegate = $ionicScrollDelegate;
            this.CommonService = CommonService;
            this.$stateParams = $stateParams;
            this.$injector = $injector;
            $rootScope.createModal = angular.bind(this, this.createmodal);
            $rootScope.requestHandler = angular.bind(this, this.requestHandler);
            $rootScope.stateGo = angular.bind(this, this.stateGo);
            $rootScope.goBack = angular.bind(this, this.goBack);
            $rootScope.scrollTop = angular.bind(this, this.scrollTop);
            $rootScope.openSearchModal = angular.bind(CommonService, CommonService.showSearchModal);
            $rootScope.showDropMenu = angular.bind(this, this.showDropMenu);
            $rootScope.loading = angular.bind(this, this.loading);
            $rootScope.back = angular.bind(this, this.back);
            $rootScope.setAccessToken = angular.bind(this, this.setAccessToken);
            $rootScope.getAccessToken = angular.bind(this, this.getAccessToken);
            $rootScope.runResolve = angular.bind(this, this.runResolve);
        }
        //创建模式窗口
        RootScopeExtend.prototype.createmodal = function (url, scope) {
            var defer = this.$q.defer();
            var subScope = scope || this.$rootScope.$new();
            if (modalList[url]) {
                defer.resolve({
                    modal: modalList[url],
                    scope: subScope
                });
            }
            else {
                modalList[url] = {};
                subScope.$on('modal.removed', function () {
                    modalList[url] = null;
                });
                subScope.cancel = function () {
                    if (modalList[url]) {
                        modalList[url].remove();
                    }
                    modalList[url] = null;
                };
                this.$ionicModal.fromTemplateUrl(url, {
                    scope: subScope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    modalList[url] = modal;
                    modal.show();
                    defer.resolve({
                        modal: modal,
                        scope: subScope
                    });
                });
            }
            return defer.promise;
        };
        //通用请求处理函数
        //仅局限于Service层使用
        RootScopeExtend.prototype.requestHandler = function (requestFn, args, isPost) {
            if (isPost === void 0) { isPost = false; }
            var self = this;
            this.loading();
            var defer = this.$q.defer();
            function successFn(result) {
                self.loading(false);
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                defer.resolve(result);
            }
            function errFn(err) {
                self.loading(false);
                if (typeof err == 'string') {
                    err = JSON.parse(err);
                }
                defer.reject(err);
            }
            if (isPost) {
                var para = this.param(args);
                requestFn({}, para, successFn, errFn);
            }
            else {
                requestFn(args, successFn, errFn);
            }
            return defer.promise;
        };
        //路由跳转
        RootScopeExtend.prototype.stateGo = function (name, args) {
            if (args === void 0) { args = {}; }
            this.$state.go(name, args);
        };
        //返回前一路由
        RootScopeExtend.prototype.goBack = function (name, params) {
            if (name === void 0) { name = ''; }
            if (params === void 0) { params = {}; }
            name = this.$stateParams['from'] || name;
            this.$state.go(name, params);
        };
        RootScopeExtend.prototype.back = function () {
            var current = this.$state.current;
            this.$state.go(current['fromState'] || 'jdb.home', JSON.parse(current['fromParams'] || {}));
        };
        //显示加载层
        RootScopeExtend.prototype.loading = function (isShow) {
            if (isShow === void 0) { isShow = true; }
            if (isShow) {
                this.$ionicLoading.show();
            }
            else {
                this.$ionicLoading.hide();
            }
        };
        RootScopeExtend.prototype.scrollTop = function () {
            this.$ionicScrollDelegate.scrollTop();
        };
        RootScopeExtend.prototype.showDropMenu = function (id) {
            this.CommonService.showDropMenu(id);
        };
        //设置AK
        RootScopeExtend.prototype.setAccessToken = function (key) {
            this.$rootScope.accessToken = key;
            if (key == null) {
                localStorage.removeItem('accessToken');
            }
            else {
                localStorage.setItem('accessToken', key);
            }
        };
        RootScopeExtend.prototype.getAccessToken = function () {
            this.$rootScope.accessToken = localStorage.getItem('accessToken');
            return this.$rootScope.accessToken;
        };
        //类似Jquery 的$.param
        RootScopeExtend.prototype.param = function (obj) {
            var result = [], add = function (value, key) {
                if (obj.hasOwnProperty(key)) {
                    value = angular.isFunction(value) ? value() : (value == null ? '' : value);
                    result[result.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
                }
            };
            angular.forEach(obj, add);
            return result.join('&').replace(/%20/g, '+');
        };
        //运行依赖
        RootScopeExtend.prototype.runResolve = function (ctrlName) {
            if (!JDB.ResolvesModule.hasOwnProperty(ctrlName)) {
                return;
            }
            var promise = {}, self = this;
            angular.forEach(JDB.ResolvesModule[ctrlName], function (res, key) {
                promise[ctrlName] = self.$injector.invoke(res);
            });
            return self.$q.all(promise);
        };
        return RootScopeExtend;
    })();
    RootScopeExtend.$inject = ['$rootScope', '$q', '$ionicModal', '$state', '$ionicLoading', '$ionicScrollDelegate', 'CommonService', '$stateParams', '$injector'];
    JDB.ServiceModule.service('RootScopeExtendService', RootScopeExtend);
})(JDB || (JDB = {}));
//# sourceMappingURL=rootScope-extend.js.map