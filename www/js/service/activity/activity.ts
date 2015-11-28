/**
 *
 * Created by AaronYuan on 11/26/15.
 */

/// <reference path="../../app.ts" />

module JDB {
    'use strict';

    declare var window;

    export interface IActivityService {
        //列表
        list(args: any): ng.IPromise<any>;
        //发布活动
        saveData(args: any): ng.IPromise<any>;
        detail(args: any): ng.IPromise<any>;
        //报名
        signUp(args: any): ng.IPromise<any>;
        //取消报名
        cancelSignUp(args: any): ng.IPromise<any>;
        //评论
        reply(args: any): ng.IPromise<any>;
        //参见活动的人员列表
        joinMemberList(args: any):ng.IPromise<any>;

    }

    //1 报名中 2 已满员 3 已截止 4 进行中 5 已结束
    export enum ActivityStatus {
        singUping = 1,
        full = 2,
        timeout = 3,
        starting = 4,
        finish = 5
    }

    interface IActivityResource extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        //用户列表
        list(params:Object, data:Object,success?:Function,error?:Function);
        saveData(params:Object, data:Object,success?:Function,error?:Function);
        detail(params:Object, data:Object,success?:Function,error?:Function);
        signUp(params:Object, data:Object,success?:Function,error?:Function);
        cancelSignUp(params:Object, data:Object,success?:Function,error?:Function);
        reply(params:Object, data:Object,success?:Function,error?:Function);
        joinMemberList(params:Object, data:Object,success?:Function,error?:Function);
    }



    class Activity {
        private resource:IActivityResource;
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $q: ng.IQService,
            public $resource: ng.resource.IResourceService
        ){

            this.resource = <IActivityResource> $resource(appHost + '/activity/:action', {
                action: '@action'
            },{
                list: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'queryactivity'
                    }
                },
                saveData: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'createactivity'
                    }
                },
                detail: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'viewactivity'
                    }
                },
                signUp: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'signup'
                    }
                },
                cancelSignUp: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'unsignup'
                    }
                },
                reply: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'createatvcmt'
                    }
                },
                joinMemberList: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'queryjoinusers'
                    }
                }
            });

        }

        list(args: any): ng.IPromise<any> {
            return this.$rootScope.requestHandler(this.resource.list, args);
        }

        saveData(args: any): ng.IPromise<any>{
            return this.$rootScope.requestHandler(this.resource.saveData, args, true);
        }

        detail(args: any): ng.IPromise<any> {
            return this.$rootScope.requestHandler(this.resource.detail, args, true);
        }

        signUp(args: any): ng.IPromise<any> {
            var defer = this.$q.defer();
            args = angular.extend({
                phone: this.$rootScope.User.phone
            }, args);
            this.$rootScope.requestHandler(this.resource.signUp, args, true).then(function(result){
                if(result && result.code == 0){
                    defer.resolve(result);
                    window.plugins.toast.showShortCenter('报名成功');
                }else {
                    defer.reject(null);
                    window.plugins.toast.showShortCenter('报名失败, 稍后重试');
                }
            }, function(res){
                defer.reject(null);
                window.plugins.toast.showShortCenter('报名失败, 稍后重试');
            });
            return defer.promise;
        }

        reply(args: any): ng.IPromise<any> {
            return this.$rootScope.requestHandler(this.resource.reply, args, true);
        }

        //取消报名
        cancelSignUp(args: any): ng.IPromise<any>{
            var defer = this.$q.defer();
            args = angular.extend({
                phone: this.$rootScope.User.phone
            }, args);
            this.$rootScope.requestHandler(this.resource.cancelSignUp, args, true).then(function(result){
                if(result && result.code == 0){
                    defer.resolve(result);
                    window.plugins.toast.showShortCenter('取消报名');
                }else {
                    defer.reject(null);
                    window.plugins.toast.showShortCenter('操作失败, 稍后重试');
                }
            }, function(res){
                defer.reject(null);
                window.plugins.toast.showShortCenter('操作失败, 稍后重试');
            });
            return defer.promise;
        }

        joinMemberList(args: any):ng.IPromise<any>{
            return this.$rootScope.requestHandler(this.resource.joinMemberList, args);
        }
    }
    Activity.$inject = ['$rootScope', '$q', '$resource'];
    ServiceModule.service('ActivityService', Activity);
}
