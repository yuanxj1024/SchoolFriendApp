/**
 * Created by AaronYuan on 11/30/15.
 */

/// <reference path="../../app.ts" />

module JDB {
    'use strict';

    export interface IFriendService {
        //好友列表
        list(args: any): ng.IPromise<any>;

        sendRequest(args: any): ng.IPromise<any>;
        //删除好友
        deleteFriend(args: any): ng.IPromise<any>;

    }

    interface IFriendResource extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        //用户列表
        list(params:Object, data:Object, success?:Function, error?:Function);
        sendRequest(params:Object, data:Object, success?:Function, error?:Function);
        deleteFriend(params:Object, data:Object, success?:Function, error?:Function);
    }


    class Friend{
        private resource: IFriendResource;
        constructor(
            public $rootScope:IJDBRootScopeService,
            public $q: ng.IQService,
            public $resource: ng.resource.IResourceService
        ){
            this.resource = <IFriendResource> $resource(appHost +'/friend/:action',{
                action: '@action'
            }, {
                list:{
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'queryfriend'
                    }
                },
                sendRequest:{
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'addfriend'
                    }
                },
                deleteFriend:{
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'release'
                    }
                }
            });
        }

        list(args:any){
            return this.$rootScope.requestHandler(this.resource.list, args);
        }

        sendRequest(args: any): ng.IPromise<any>{
            return this.$rootScope.requestHandler(this.resource.sendRequest, args, true);
        }
        //删除好友
        deleteFriend(args: any): ng.IPromise<any> {
            return this.$rootScope.requestHandler(this.resource.deleteFriend, args, true);
        }
    }

    Friend.$inject = ['$rootScope', '$q', '$resource'];
    ServiceModule.service('FriendService', Friend);
}

