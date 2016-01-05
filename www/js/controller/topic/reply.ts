/**
 * Created by AaronYuan on 11/24/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/topic/topic.ts" />
/// <reference path="../../service/activity/activity.ts" />

//话题列表

module JDB {
    'use strict';

    declare var window;

    class TopicList {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: any,
            public $stateParams: ng.ui.IStateParamsService,
            public TopicService: ITopicService,
            public ActivityService: IActivityService
        ){
            $scope.reply = angular.bind(this, this.reply);
            console.log($scope.params);
            this.init();
        }

        init(){
            this.$scope.replyForm = {
                content: '',
                phone: this.$rootScope.localUser().phone
            };
        }

        //回复，评论
        reply(){
            console.log(this.$scope.replyForm);
            switch (this.$scope.params['action']){
                case 'topic':
                    this.saveTopic();
                    break;
                case 'activity':
                    this.saveActivity();
                    break;
            }
        }

        saveTopic(){
            var self = this;
            this.$scope.replyForm = angular.bind({
                'topic.id': this.$scope.params.topicID,
                'commentUser.id': this.$rootScope.User.id,
                'parentTopicCmt.id': this.$scope.params.parentID,
            }, this.$scope.replyForm);

            this.TopicService.reply(this.$scope.replyForm).then(function(res){
                if(res && res.code == 0){
                    self.$scope.cancel();
                    window.plugins.toast.showShortCenter('回复成功');
                    self.$rootScope.$emit('event:refresh-detail', self.$scope.params.topicID);
                }else{
                    window.plugins.toast.showShortCenter('回复失败，稍后重试');
                }
            }, function(err){
                window.plugins.toast.showShortCenter('回复失败，稍后重试');
            });
        }

        saveActivity(){
            var self = this;
            this.$scope.replyForm = angular.extend({
                'activity.id': this.$scope.params.activityID,
                'commentUser.id': this.$rootScope.User.id,
                'parentAtvCmt.id': this.$scope.params.parentID,
            }, this.$scope.replyForm);

            this.ActivityService.reply(this.$scope.replyForm).then(function(res){
                if(res && res.code == 0){
                    self.$scope.cancel();
                    window.plugins.toast.showShortCenter('回复成功');
                    self.$rootScope.$emit('event:refresh-activity-detail',{
                        id: self.$scope.params.activityID
                    });
                }else{
                    window.plugins.toast.showShortCenter('回复失败，稍后重试');
                }
            }, function(err){
                window.plugins.toast.showShortCenter('回复失败，稍后重试');
            });
        }
    }

    TopicList.$inject = ['$rootScope', '$scope', '$stateParams', 'TopicService', 'ActivityService'];
    CtrlModule.controller('TopicReplyCtrl', TopicList);
}
