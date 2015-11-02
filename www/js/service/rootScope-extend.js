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
        function RootScopeExtend($rootScope, $q, $ionicModal) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$ionicModal = $ionicModal;
            $rootScope.createModal = angular.bind(this, this.createmodal);
            $rootScope.RequestHandler = angular.bind(this, this.RequestHandler);
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
        RootScopeExtend.prototype.RequestHandler = function (requestFn, args, data) {
            //console.log(requestFn);
            var defer = this.$q.defer();
            requestFn(args, data, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                defer.resolve(result);
            }, function (err) {
                if (typeof err == 'string') {
                    err = JSON.parse(err);
                }
                defer.reject(err);
            });
            return defer.promise;
        };
        return RootScopeExtend;
    })();
    RootScopeExtend.$inject = ['$rootScope', '$q', '$ionicModal'];
    JDB.ServiceModule.service('RootScopeExtendService', RootScopeExtend);
})(JDB || (JDB = {}));
//# sourceMappingURL=rootScope-extend.js.map