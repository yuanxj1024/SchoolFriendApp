/**
 *
 * Created by AaronYuan on 11/2/15.
 */
/// <reference path="../app.ts" />
/// <reference path="../service/common.ts" />
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
            public $ionicModal: Ionic.IModal,
            public $state: ng.ui.IStateService,
            public $ionicLoading: Ionic.ILoading,
            public $ionicScrollDelegate: Ionic.IScrollDelegate,
            public CommonService: ICommonService,
            public $stateParams: ng.ui.IStateParamsService
        ){
            $rootScope.createModal = angular.bind(this, this.createmodal);
            $rootScope.requestHandler = angular.bind(this, this.requestHandler);
            $rootScope.stateGo = angular.bind(this, this.stateGo);
            $rootScope.goBack = angular.bind(this, this.goBack);
            $rootScope.scrollTop = angular.bind(this, this.scrollTop);
            $rootScope.openSearchModal = angular.bind(CommonService, CommonService.showSearchModal);
            $rootScope.showDropMenu = angular.bind(this, this.showDropMenu);
            $rootScope.loading = angular.bind(this, this.loading);
            $rootScope.back = angular.bind(this ,this.back);

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
        requestHandler(requestFn, args, data): ng.IPromise<any> {
            var self = this;
            this.loading();
            var defer = this.$q.defer();
            requestFn(args, data, function(result){
                self.loading(false);
                if(typeof result == 'string'){
                    result = JSON.parse(result);
                }
                defer.resolve(result);
            }, function(err){
                self.loading(false);
                if(typeof err == 'string'){
                    err = JSON.parse(err);
                }
                defer.reject(err);
            });
            return defer.promise;
        }

        //路由跳转
        stateGo(name: string,args:any={}): void {
            this.$state.go(name, args);
        }

        //返回前一路由
        goBack(name:string='', params:any = {}){
            name = this.$stateParams['from'] || name;
            //console.log(this.$stateParams);
            this.$state.go(name, params);
        }

        back(){
            var current = this.$state.current;
            this.$state.go(current['fromState'] || 'jdb.home', JSON.parse(current['fromParams']||{}));
        }


        //显示加载层
        loading(isShow:boolean = true):void {
            if(isShow){
                this.$ionicLoading.show();
            }else{
                this.$ionicLoading.hide();
            }
        }

        scrollTop(){
            this.$ionicScrollDelegate.scrollTop();
        }

        showDropMenu(id: number){
            this.CommonService.showDropMenu(id);
        }
    }


    RootScopeExtend.$inject = ['$rootScope', '$q', '$ionicModal', '$state', '$ionicLoading', '$ionicScrollDelegate', 'CommonService', '$stateParams'];
    ServiceModule.service('RootScopeExtendService', RootScopeExtend);
}


