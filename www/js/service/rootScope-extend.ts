/**
 *
 * Created by AaronYuan on 11/2/15.
 */
/// <reference path="../app.ts" />
//对 $rootScope 扩展一些通用方法

module JDB {
    'use strict';

    export interface IRootScopeExtend {

    }

    //modal对象集合
    var modalList = {};

    class RootScopeExtend {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $q: ng.IQService,
            public $ionicModal: Ionic.IModal
        ){
            $rootScope.createModal = angular.bind(this, this.createmodal);
            $rootScope.RequestHandler = angular.bind(this, this.RequestHandler);

        }

        //创建模式窗口
        createmodal(url:string, scope:any): ng.IPromise<any> {
            var defer = this.$q.defer();
            var subScope = scope || <any>this.$rootScope.$new();
            if(modalList[url]) {
                defer.resolve({
                    modal: modalList[url],
                    scope: subScope
                });
            }else{
                modalList[url] = {};
                subScope.$on('modal.removed', function(){
                    modalList[url] = null;
                });
                subScope.cancel = function(){
                    if(modalList[url]){
                        modalList[url].remove();
                    }
                    modalList[url] = null;
                };

                this.$ionicModal.fromTemplateUrl(url,{
                    scope: subScope,
                    animation: 'slide-in-up'
                }).then(function(modal){
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
        }

        //通用请求处理函数
        //仅局限于Service层使用
        RequestHandler(requestFn, args, data): ng.IPromise<any> {
            //console.log(requestFn);
            var defer = this.$q.defer();
            requestFn(args, data, function(result){
                if(typeof result == 'string'){
                    result = JSON.parse(result);
                }
                defer.resolve(result);
            }, function(err){
                if(typeof err == 'string'){
                    err = JSON.parse(err);
                }
                defer.reject(err);
            });
            return defer.promise;
        }

    }


    RootScopeExtend.$inject = ['$rootScope', '$q', '$ionicModal'];
    ServiceModule.service('RootScopeExtendService', RootScopeExtend);

}


