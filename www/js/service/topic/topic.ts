/**
 * Created by AaronYuan on 10/29/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
//话题

module JDB {
    'use strict';

    declare var window;
    //数据缓存
    var dataCache:any = {};

    export interface ITopicService {
        //话题列表
        list(args:any): ng.IPromise<any>;
        //打开发布话题modal
        releaseTopicModal():void;
        //创建话题
        createTopic(args: any): ng.IPromise<any>;
        //获取话题分类
        topicCategory(args: any): ng.IPromise<any>;
        //设置发布时选中的话题分类
        selectedCategory(args:any):any;
        //点赞
        likeTopic(args: any): ng.IPromise<any>;
        //详细页
        detail(args: any): ng.IPromise<any>;
        //
        //replyModal(args:any): void;
        //回复
        reply(args: any): ng.IPromise<any>;

        //屏蔽用户
        ignoreUser(args: any): void;

    }

    //话题类型
    export enum TopicType {
        Hot = 1,
        Newest = 2,
        Friends = 3
    }

    interface ITopicResource  extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        list(params:Object, data:Object,success?:Function,error?:Function);
        createTopic(params:Object, data:Object,success?:Function,error?:Function);
        topicCategory(params:Object, data:Object,success?:Function,error?:Function);
        likeTopic(params:Object, data:Object,success?:Function,error?:Function);
        detail(params:Object, data:Object,success?:Function,error?:Function);
        reply(params:Object, data:Object,success?:Function,error?:Function);
        ignoreUser(params:Object, data:Object,success?:Function,error?:Function);
    }

    class Topic implements ITopicService {
        private topicResource: ITopicResource;
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $q: ng.IQService,
            public $resource: ng.resource.IResourceService,
            public $ionicModal: Ionic.IModal,
            public CommonService: ICommonService
        ){
            this.topicResource = <ITopicResource> $resource(appHost + '/topic/:action',{
                action: '@action'
            },{
                list:{
                    method: 'GET',
                    needAccessToken: true,
                    isArray: false,
                    params:{
                        action: 'query'
                    }
                },
                createTopic: {
                    method: 'POST',
                    needAccessToken: true,
                    isArray: false,
                    params: {
                        action: 'createtopic'
                    }
                },
                topicCategory: {
                    method: 'GET',
                    needAccessToken: true,
                    isArray: false,
                    params: {
                        action: 'querytopictype'
                    }
                },
                likeTopic: {
                    method: 'POST',
                    needAccessToken: true,
                    isArray: false,
                    params: {
                        action: 'lv'
                    }
                },
                detail: {
                    method: 'GET',
                    needAccessToken: true,
                    isArray: false,
                    params: {
                        action: 'view'
                    }
                },
                reply: {
                    method: 'POST',
                    needAccessToken: true,
                    isArray: false,
                    params: {
                        action: 'createtopiccmt'
                    }
                },
                ignoreUser: {
                    method: 'POST',
                    needAccessToken: true,
                    isArray: false,
                    params: {
                        action: 'shield'
                    }
                }
            });

        }
        //话题列表
        list(arg: any):ng.IPromise<any> {
            arg = angular.extend({
                //phone: this.$rootScope.User.phone,
                pageSize: 5,
                curPage: 1,
                labelId: TopicType.Newest
            }, arg);
            return this.$rootScope.requestHandler(this.topicResource.list, arg);
        }
        //发布话题
        releaseTopicModal(){
            this.$rootScope.createModal('/templates/topic/release-topic.html');
        }
        //创建话题
        createTopic(args: any): ng.IPromise<any>{
            return this.$rootScope.requestHandler(this.topicResource.createTopic, args, true);
        }
        //话题分类列表
        topicCategory(args: any): ng.IPromise<any>{
            var defer = this.$q.defer();
            if(dataCache.topicCategory){
                defer.resolve(dataCache.topicCategory);
            }else{
                var p = this.$rootScope.requestHandler(this.topicResource.topicCategory, args);
                p.then(function(res){
                    defer.resolve(res.data);
                    dataCache.topicCatelog = res.data;
                },function(err){
                    defer.reject([]);
                });
            }
            return defer.promise;
        }

        selectedCategory(item:any):any {
            if(item){
                dataCache.selectedCategory = item;
            }
            return dataCache.selectedCategory || {id: 0, name: '商机'};
        }

        likeTopic(args:any): ng.IPromise<any> {
            if(args.isLiked){
                return null;
            }
            args.isLiked = true;
            return this.$rootScope.requestHandler(this.topicResource.likeTopic, {
                phone: this.$rootScope.User.phone,
                id: args.id
            }, true).then(function(res){
                if(res && res.code == 0){
                    args.isLiked = true;
                    args.lv += 1;
                }else{
                    args.isLiked = false;
                }
            });
        }

        detail(args: any): ng.IPromise<any> {
            args = angular.extend({
                phone: this.$rootScope.User.phone
            }, args);
            return this.$rootScope.requestHandler(this.topicResource.detail,args);
        }

        //replyModal(args:any): void{
        //    var scope:any = this.$rootScope.$new();
        //    scope.params = args;
        //    this.$rootScope.createModal('/templates/topic/reply-modal.html', scope);
        //
        //}

        reply(args: any): ng.IPromise<any>{
            return this.$rootScope.requestHandler(this.topicResource.reply, args, true);
        }

        ignoreUser(args: any): void{
            this.$rootScope.requestHandler(this.topicResource.ignoreUser, args, true).then(function(result){
                if(result && result.code == 0){
                    window.plugins.toast.showShortCenter('操作成功');
                }else{
                    window.plugins.toast.showShortCenter('操作失败');
                }
            }, function(err){
                window.plugins.toast.showShortCenter('操作失败');
            });
        }

    }

    Topic.$inject = ['$rootScope', '$q', '$resource', '$ionicModal', 'CommonService'];
    ServiceModule.service('TopicService', Topic);
}
