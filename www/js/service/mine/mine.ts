/**
 * Created by AaronYuan on 10/31/15.
 */

/// <reference path="../../app.ts" />

module JDB {
    'use strict';

    export interface IMineService {
        //保存用户信息
        saveUserData(args: any): ng.IPromise<any>;

        //登陆
        login(args: any): ng.IPromise<any>;

        //退出登陆
        logout():void;

        //发送验证码
        sendSMSCode(args:any): ng.IPromise<any>;

        register(args:any): ng.IPromise<any>;

    }

    interface IMineResource  extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        //用户详情
        saveData(params:Object, data:Object,success?:Function,error?:Function);
        //登陆
        login(params:Object, data:Object,success?:Function,error?:Function);
        //发送验证码
        smsCode(params:Object, data:Object,success?:Function,error?:Function);
        //注册
        register(params:Object, data:Object,success?:Function,error?:Function);

    }

    class Mine implements IMineService {
        private mineResource: IMineResource;
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $q: ng.IQService,
            public $resource: ng.resource.IResourceService
        ){

            this.mineResource = <IMineResource> $resource(appHost + '/:action', {
                action: '@action'
            },{
                saveData:{
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'save'
                    }
                },
                login: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'login'
                    }
                },
                smsCode: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: false,
                    //needLogin: false,
                    params:{
                        action: ''
                    }
                },
                register: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: false,
                    //needLogin: false,
                    params:{
                        action: ''
                    }
                }
            });
        }

        saveUserData(args:any): ng.IPromise<any> {
            return this.$rootScope.requestHandler(this.mineResource.saveData, args, null);
        }

        login(args: any): ng.IPromise<any> {
            return this.$rootScope.requestHandler(this.mineResource.login, args, null);
        }

        logout(){
            window.localStorage.clear();
            this.$rootScope.User = null;
        }

        sendSMSCode(): ng.IPromise<any> {
            return this.$rootScope.requestHandler(this.mineResource.smsCode,null,null);
        }

        register(args){
            return this.$rootScope.requestHandler(this.mineResource.register, args, null);
        }


    }

    Mine.$inject = ['$rootScope', '$q', '$resource'];
    ServiceModule.service('MineService', Mine);


}