/**
 * Created by AaronYuan on 11/28/15.
 */

/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />

module JDB {
    'use strict';

    export interface IDiscoverService {
        //首页列表
        index(args: any): ng.IPromise<any>;

        groupList(args: any): ng.IPromise<any>;

        friendList(args: any): ng.IPromise<any>;

    }

    interface IDiscoverResource  extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        index(params:Object, data:Object,success?:Function,error?:Function);
        groupList(params:Object, data:Object,success?:Function,error?:Function);
        friendList(params:Object, data:Object,success?:Function,error?:Function);
        createGroup(params:Object, data:Object,success?:Function,error?:Function);
    }


    class Discover implements IDiscoverService {
        private resource: IDiscoverResource;
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $q: ng.IQService,
            public $resource: ng.resource.IResourceService
        ){
            this.resource = <IDiscoverResource> $resource( appHost + '/discover/:action',{
                action: '@action'
            },{
                index:{
                    method: 'GET',
                    needAccessToken: true,
                    isArray: false,
                    params:{
                        action: 'recommend'
                    }
                },
                groupList:{
                    method: 'GET',
                    needAccessToken: true,
                    isArray: false,
                    params:{
                        action: 'list'
                    }
                },
                friendList:{
                    method: 'GET',
                    needAccessToken: true,
                    isArray: false,
                    params:{
                        action: 'list'
                    }
                },
                createGroup:{
                    method: 'GET',
                    needAccessToken: true,
                    isArray: false,
                    params:{
                        action: 'list'
                    }
                }
            });


        }

        index(args: any): ng.IPromise<any>{
            return this.$rootScope.requestHandler(this.resource.index, args);
        }

        groupList(args: any): ng.IPromise<any>{
            return this.$rootScope.requestHandler(this.resource.groupList, args);
        }
        friendList(args: any): ng.IPromise<any>{
            return this.$rootScope.requestHandler(this.resource.friendList, args);
        }

    }

    Discover.$inject = ['$rootScope', '$q','$resource'];
    ServiceModule.service('DiscoverService', Discover);
}
