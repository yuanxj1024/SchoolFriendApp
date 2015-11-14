/**
 * Created by AaronYuan on 11/14/15.
 */
//圈子

/// <reference path="../../app.ts" />
/// <reference path="../common.ts" />

module JDB {
    'use strict';

    export interface IGroupService {

        //显示选择成员modal
        showChooseMemberModal(args: any): ng.IPromise<any>;

    }

    interface IGroupResource extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        //用户列表
        userList(params:Object, data:Object,success?:Function,error?:Function);
    }



    class Group implements IGroupService {
        private groupResource: IGroupResource;
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $q: ng.IQService,
            public $resource: ng.resource.IResourceService,
            public CommonService: ICommonService
        ){
            this.groupResource = <IGroupResource> $resource(appHost + '/:action',{
                action: '@action'
            },{
                userList:{
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'userList'
                    }
                },

            });



        }

        showChooseMemberModal(args: any):ng.IPromise<any> {
            var scope:any = this.$rootScope.$new();
            scope.params = args;
            return this.$rootScope.createModal('/templates/group/choose-member-modal.html', scope);
        }




    }

    Group.$inject = ['$rootScope', '$q', '$resource', 'CommonService'];
    ServiceModule.service('GroupService', Group);
}


