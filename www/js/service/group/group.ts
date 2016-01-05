/**
 * Created by AaronYuan on 11/14/15.
 */
//圈子

/// <reference path="../../app.ts" />
/// <reference path="../common.ts" />

module JDB {
    'use strict';

    declare var window;

    export interface IGroupService {
        //显示选择成员modal
        showChooseMemberModal(args: any): ng.IPromise<any>;

        //我的圈子列表
        mineGroupList(args: any): ng.IPromise<any>;
        //圈子列表
        groupList(args: any): ng.IPromise<any>;
        //圈子详情
        groupDetail(args: any): ng.IPromise<any>;
        //举报
        report(args: any):void;
        //圈子成员
        groupMembers(args: any): ng.IPromise<any>;
        ////修改昵称
        //rename(args: any): ng.IPromise<any>;
        //显示好友申请列表
        showNewFriends(args: any): void;
        //退出圈子
        quitGroup(args: any):ng.IPromise<any>;
        //解散圈子
        deleteGroup(args: any): ng.IPromise<any>;
        //加入圈子
        joinGroup(args: any):ng.IPromise<any>;
        //获取昵称
        getNickName(args: any): ng.IPromise<any>;
        //修改昵称
        updateNickName(args: any): ng.IPromise<any>;
        //打开圈子成员列表
        openGroupMembers(args: any): void;
    }

    interface IGroupResource extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        //用户列表
        userList(params:Object, data:Object,success?:Function,error?:Function);
        groupList(params:Object, data:Object,success?:Function,error?:Function);
        groupDetail(params:Object, data:Object,success?:Function,error?:Function);
        groupMembers(params:Object, data:Object,success?:Function,error?:Function);
        mineGroupList(params:Object, data:Object,success?:Function,error?:Function);
        //rename(params:Object, data:Object,success?:Function,error?:Function);
        quitGroup(params:Object, data:Object,success?:Function,error?:Function);
        deleteGroup(params:Object, data:Object,success?:Function,error?:Function);
        joinGroup(params:Object, data:Object,success?:Function,error?:Function);
        getNickName(params:Object, data:Object,success?:Function,error?:Function);
        updateNickName(params:Object, data:Object,success?:Function,error?:Function);
    }




    class Group implements IGroupService {
        private groupResource: IGroupResource;
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $q: ng.IQService,
            public $resource: ng.resource.IResourceService,
            public CommonService: ICommonService
        ){
            this.groupResource = <IGroupResource> $resource(appHost + '/circle/:action',{
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
                mineGroupList:{
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'querymycircles'
                    }
                },
                groupList:{
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'querycircles'
                    }
                },
                groupDetail:{
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'viewcircle'
                    }
                },
                groupMembers:{
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'querymembers'
                    }
                },
                //rename:{
                //    method: 'POST',
                //    isArray: false,
                //    needAccessToken: true,
                //    params:{
                //        action: 'nickname'
                //    }
                //},
                quitGroup:{
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'exit'
                    }
                },
                deleteGroup:{
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'delete'
                    }
                },
                joinGroup:{
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'join'
                    }
                },
                getNickName:{
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'viewnickname'
                    }
                },
                updateNickName:{
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'nickname'
                    }
                }
            });

        }

        showChooseMemberModal(args: any):ng.IPromise<any> {
            var scope:any = this.$rootScope.$new();
            scope.params = args;
            return this.$rootScope.createModal('/templates/group/choose-member-modal.html', scope);
        }

        mineGroupList(args:any): ng.IPromise<any>{
            return this.$rootScope.requestHandler(this.groupResource.mineGroupList, args);
        }

        //圈子列表
        groupList(args: any): ng.IPromise<any>{
            return this.$rootScope.requestHandler(this.groupResource.groupList, args);
        }
        //圈子详情
        groupDetail(args: any): ng.IPromise<any>{
            return this.$rootScope.requestHandler(this.groupResource.groupDetail, args);
        }
        //举报
        report(args: any):void{

        }
        //圈子成员
        groupMembers(args: any): ng.IPromise<any>{
            return this.$rootScope.requestHandler(this.groupResource.groupMembers, args);
        }
        //rename(args: any): ng.IPromise<any> {
        //    return this.$rootScope.requestHandler(this.groupResource.rename, args, true);
        //}

        showNewFriends(args: any){
            var scope:any = this.$rootScope.$new();
            scope.params = args;
            this.$rootScope.createModal('/templates/discover/new-friends.html',scope);
        }
        //退出圈子
        quitGroup(args: any):ng.IPromise<any> {
            var defer = this.$q.defer();
            this.$rootScope.requestHandler(this.groupResource.quitGroup,args, true).then(function(result){
                defer.resolve(result);
                window.plugins.toast.showShortCenter('成功退出圈子');
            },function(err){
                defer.reject(err);
                window.plugins.toast.showShortCenter('退出失败');
            });
            return defer.promise;
        }
        //解散圈子
        deleteGroup(args: any): ng.IPromise<any>{
            var defer = this.$q.defer();
            this.$rootScope.requestHandler(this.groupResource.deleteGroup,args, true).then(function(result){
                if(result && result.code == 0){
                    defer.resolve(result);
                    window.plugins.toast.showShortCenter('成功解散圈子');
                }else{
                    defer.reject(result);
                    window.plugins.toast.showShortCenter('圈子解散失败');
                }
            },function(err){
                defer.reject(err);
                window.plugins.toast.showShortCenter('圈子解散失败');
            });
            return defer.promise;
        }

        joinGroup(args: any):ng.IPromise<any>{
            var defer = this.$q.defer();
            this.$rootScope.requestHandler(this.groupResource.joinGroup,args, true).then(function(result){
                defer.resolve(result);
                window.plugins.toast.showShortCenter('成功加入圈子');
            },function(err){
                defer.reject(err);
                window.plugins.toast.showShortCenter('加入圈子失败');
            });
            return defer.promise;
        }

        //获取昵称
        getNickName(args: any): ng.IPromise<any>{
            return this.$rootScope.requestHandler(this.groupResource.getNickName, args);
        }
        //修改昵称
        updateNickName(args: any): ng.IPromise<any>{
            return this.$rootScope.requestHandler(this.groupResource.updateNickName, args, true);
        }
        //打开圈子成员列表
        openGroupMembers(args: any): void{
            var scope:any = this.$rootScope.$new();
            scope.params = args;
            this.$rootScope.createModal('/templates/group/group-member.html', scope);
        }

    }

    Group.$inject = ['$rootScope', '$q', '$resource', 'CommonService'];
    ServiceModule.service('GroupService', Group);
}


