/**
 *
 * Created by AaronYuan on 11/2/15.
 */
/// <reference path="../app.ts" />
//对 $rootScope 扩展一些通用方法
var JDB;
(function (JDB) {
    'use strict';
    //modal对象集合
    var modalList = {};
    var RootScopeExtend = (function () {
        function RootScopeExtend($rootScope, $q, $ionicModal, $state, $ionicLoading, $ionicScrollDelegate) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$ionicModal = $ionicModal;
            this.$state = $state;
            this.$ionicLoading = $ionicLoading;
            this.$ionicScrollDelegate = $ionicScrollDelegate;
            $rootScope.createModal = angular.bind(this, this.createmodal);
            $rootScope.requestHandler = angular.bind(this, this.requestHandler);
            $rootScope.stateGo = angular.bind(this, this.stateGo);
            $rootScope.scrollTop = angular.bind(this, this.scrollTop);
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
            console.log(modalList);
            return defer.promise;
        };
        //通用请求处理函数
        //仅局限于Service层使用
        RootScopeExtend.prototype.requestHandler = function (requestFn, args, data) {
            var self = this;
            this.loading();
            var defer = this.$q.defer();
            requestFn(args, data, function (result) {
                self.loading(false);
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                defer.resolve(result);
            }, function (err) {
                self.loading(false);
                if (typeof err == 'string') {
                    err = JSON.parse(err);
                }
                defer.reject(err);
            });
            return defer.promise;
        };
        //路由跳转
        RootScopeExtend.prototype.stateGo = function (name) {
            this.$state.go(name);
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
        return RootScopeExtend;
    })();
    RootScopeExtend.$inject = ['$rootScope', '$q', '$ionicModal', '$state', '$ionicLoading', '$ionicScrollDelegate'];
    JDB.ServiceModule.service('RootScopeExtendService', RootScopeExtend);
})(JDB || (JDB = {}));
//# sourceMappingURL=rootScope-extend.js.map