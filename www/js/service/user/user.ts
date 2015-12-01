/**
 * Created by AaronYuan on 11/17/15.
 */
//用户
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />

module JDB {
    'use strict';

    declare var window;

    export interface IUserService {
        //获取单个用户
        getUser(args: any): ng.IPromise<any>;
        //打开个人名片窗口
        openUserCard(args:any): ng.IPromise<any>;
        //附近的好友
        friendList(args: any): ng.IPromise<any>;
        //查看信息
        viewUserInfo(args:any): ng.IPromise<any>;


    }

    interface IUserResource  extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        //用户列表
        list(params:Object, data:Object,success?:Function,error?:Function);
        //获取单个用户信息
        getUser(params:Object, data:Object,success?:Function,error?:Function);
        nearby(params:Object, data:Object,success?:Function,error?:Function);
        viewUserInfo(params:Object, data:Object,success?:Function,error?:Function);
    }

    class User implements IUserService {
        private userResource: IUserResource;
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $q: ng.IQService,
            public $resource: ng.resource.IResourceService,
            public CommonService: ICommonService
        ){
            this.userResource = <IUserResource> $resource(appHost + '/user/:action', {
                action: '@action'
            }, {
                list: {
                    method: 'GET',
                    needAccessToken: true,
                    isArray: false,
                    params:{
                        action: 'list'
                    }
                },
                getUser: {
                    method: 'GET',
                    needAccessToken: true,
                    isArray: false,
                    params:{
                        action: 'list'
                    }
                },
                nearby: {
                    method: 'GET',
                    needAccessToken: true,
                    isArray: false,
                    params:{
                        action: 'querynearusers'
                    }
                },
                viewUserInfo: {
                    method: 'POST',
                    needAccessToken: true,
                    isArray: false,
                    params:{
                        action: 'viewuser'
                    }
                }
            });
        }

        //获取单个用户
        getUser(args: any): ng.IPromise<any> {
            return this.$rootScope.requestHandler(this.userResource.getUser, args);
        }

        openUserCard(args:any): ng.IPromise<any>{
            var defer = this.$q.defer(),
                self = this;

            this.$rootScope.loading(true);
            this.getUser(args).then(function(data){
                if(data){
                    self.CommonService.showUserCardModal(data).then(function(res){
                        defer.resolve(data);
                        self.$rootScope.loading(false);
                    }, function(err){
                        defer.reject(err);
                        self.$rootScope.loading(false);
                        window.plugins.toast.showShortCenter('用户名片加载失败。');
                    });
                }else{
                    defer.reject(data);
                    self.$rootScope.loading(false);
                    window.plugins.toast.showShortCenter('用户名片加载失败。');
                }

            }, function(err){
                defer.reject(err);
                self.$rootScope.loading(false);
                window.plugins.toast.showShortCenter('用户名片加载失败。');
            });
            return defer.promise;
        }

        //附近的好友
        friendList(args: any): ng.IPromise<any>{
            return this.$rootScope.requestHandler(this.userResource.nearby, args);
        }

        viewUserInfo(args:any): ng.IPromise<any>{
            return this.$rootScope.requestHandler(this.userResource.viewUserInfo, args, true);

        }


    }


    User.$inject = ['$rootScope', '$q', '$resource', 'CommonService'];
    ServiceModule.service('UserService', User);

}
