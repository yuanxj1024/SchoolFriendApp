/**
 * Created by AaronYuan on 10/29/15.
 */
/// <reference path="../../app.ts" />
//话题

module JDB {
    'use strict';

    var topicModal = null;

    export interface ITopicService {
        //话题列表
        list(args:any): ng.IPromise<any>;

        //打开发布话题modal
        releaseTopicModal():void;
    }

    interface ITopicResource  extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        list(params:Object, data:Object,success?:Function,error?:Function);
    }

    class Topic implements ITopicService {
        private topicResource: ITopicResource;
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $q: ng.IQService,
            public $resource: ng.resource.IResourceService,
            public $ionicModal: Ionic.IModal
        ){
            this.topicResource = <ITopicResource> $resource('',{
                action: '@action'
            },{
                list:{
                    method: 'GET',
                    needAccessToken: true,
                    isArray: false,
                    params:{
                        action: 'list'
                    }
                }
            });

        }

        list(arg: any):ng.IPromise<any> {
            var defer = this.$q.defer();
            defer.resolve();
            return defer.promise;
        }

        releaseTopicModal(){
            if(topicModal){
                return null;
            }
            topicModal = <Ionic.IModal>{};

            var subScope = <any>this.$rootScope.$new();

            subScope.$on('modal.removed', function(){
                topicModal = null;
            });
            subScope.cancel = function(){
                topicModal.remove();
                topicModal = null;
            };

            this.$ionicModal.fromTemplateUrl('/templates/topic/release-topic.html',{
                scope: subScope,
                animation: 'slide-in-up'
            }).then(function(modal){
                topicModal = modal;
                modal.show();
            });

        }

    }

    Topic.$inject = ['$rootScope', '$q', '$resource', '$ionicModal'];
    ServiceModule.service('TopicService', Topic);
}
