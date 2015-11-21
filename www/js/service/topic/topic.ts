/**
 * Created by AaronYuan on 10/29/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
//话题

module JDB {
    'use strict';

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
    }

    interface ITopicResource  extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        list(params:Object, data:Object,success?:Function,error?:Function);
        createTopic(params:Object, data:Object,success?:Function,error?:Function);
        topicCategory(params:Object, data:Object,success?:Function,error?:Function);
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
                        action: 'queryTopic'
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
                }
            });

        }
        //话题列表
        list(arg: any):ng.IPromise<any> {
            arg = angular.extend({
                pageSize: 5,
                curPage: 1,
                labelId: 1
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

    }

    Topic.$inject = ['$rootScope', '$q', '$resource', '$ionicModal', 'CommonService'];
    ServiceModule.service('TopicService', Topic);
}
