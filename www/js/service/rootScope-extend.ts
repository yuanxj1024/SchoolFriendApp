/**
 *
 * Created by AaronYuan on 11/2/15.
 */
/// <reference path="../app.ts" />
/// <reference path="../service/common.ts" />
//对 $rootScope 扩展一些通用方法

module JDB {
    'use strict';

    declare var window;

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
            public $stateParams: ng.ui.IStateParamsService,
            public $injector: ng.auto.IInjectorService,
            public $window: any,
            public $ionicHistory:any
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
            $rootScope.setAccessToken = angular.bind(this, this.setAccessToken);
            $rootScope.getAccessToken = angular.bind(this, this.getAccessToken);
            $rootScope.runResolve = angular.bind(this, this.runResolve);
            $rootScope.localUser = angular.bind(this, this.localUser);
            $rootScope.goHoveView = angular.bind(this, this.goHoveView);
            $rootScope.openUserCard = angular.bind(this, this.openUserCard);
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
            return defer.promise;
        }

        //通用请求处理函数
        //仅局限于Service层使用
        requestHandler(requestFn, args,isPost:boolean = false): ng.IPromise<any> {
            var self = this;
            this.loading();
            var defer = this.$q.defer();

            function successFn (result){
                self.loading(false);
                if(typeof result == 'string'){
                    result = JSON.parse(result);
                }
                defer.resolve(result);
            }
            function errFn(err){
                self.loading(false);
                if(typeof err == 'string'){
                    err = JSON.parse(err);
                }
                defer.reject(err);
            }
            if(isPost){
                var para = this.param(args);
                requestFn({},para,successFn,errFn);
            }else {
                requestFn(args,successFn,errFn);
            }
            return defer.promise;
        }

        //路由跳转
        stateGo(name: string,args:any={}): void {
            this.$state.go(name, args);
        }

        //返回前一路由
        goBack(name, params){
            //name = this.$stateParams['from'] || name;
            //this.$state.go(name, params);
            //this.$window.history.go(-1);
            this.$ionicHistory.goBack();
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

        //设置AK
        setAccessToken(key: string){
            this.$rootScope.accessToken = key;
            if(key == null){
                localStorage.removeItem('accessToken');
            }else{
                localStorage.setItem('accessToken', key);
            }
        }

        getAccessToken(){
            this.$rootScope.accessToken = localStorage.getItem('accessToken');
            return this.$rootScope.accessToken;
        }

        //类似Jquery 的$.param
        param(obj: any): string{
            var result = [],
                add = function(value,key){
                    if(obj.hasOwnProperty(key)){
                        value = angular.isFunction(value)? value(): (value == null? '': value);
                        result[result.length] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
                    }
                };
            angular.forEach(obj, add);
            return result.join('&').replace(/%20/g, '+');
        }
        //运行依赖
        runResolve(ctrlName:string){
            if(!JDB.ResolvesModule.hasOwnProperty(ctrlName)){
                return ;
            }
            var promise:any = {}, self = this;
            angular.forEach(ResolvesModule[ctrlName], function(res,key){
                promise[ctrlName] = self.$injector.invoke(res);
            });
            return self.$q.all(promise);
        }

        localUser(){
            var user = window.localStorage.getItem(userKey);
            if(user && typeof user == 'string'){
                user =  JSON.parse(user);
            }
            if(user){
                this.$rootScope.User = user;
            }
            return user || {};
        }

        //首页slide-veiw切换
        goHoveView(index: number){
            this.$rootScope.$emit('event:change-slide-veiw',index);
        }


        //打开个人明信片
        openUserCard(phone:string): void{
            this.CommonService.showUserCardModal({
                phone: phone
            });
        }

    }

    RootScopeExtend.$inject = ['$rootScope', '$q', '$ionicModal', '$state', '$ionicLoading', '$ionicScrollDelegate', 'CommonService', '$stateParams', '$injector', '$window', '$ionicHistory'];
    ServiceModule.service('RootScopeExtendService', RootScopeExtend);
}


