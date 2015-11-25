/**
 * Created by AaronYuan on 11/24/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/topic/topic.ts" />

//话题列表

module JDB {
    'use strict';

    declare var window;

    class TopicList {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: any,
            public $stateParams: ng.ui.IStateParamsService,
            public TopicService: ITopicService
        ){
            $scope.reply = angular.bind(this, this.reply);
            console.log($scope.params);
            this.init();
        }

        init(){
            this.$scope.replyForm = {
                'topic.id': this.$scope.params.topicID,
                'commentUser.id': this.$rootScope.User.id,
                'parentTopicCmt.id': this.$scope.params.parentID,
                content: '',
                phone: this.$rootScope.User.phone
            };
        }

        //回复，评论
        reply(){
            console.log(this.$scope.replyForm);
            var self = this;
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
    }

    TopicList.$inject = ['$rootScope', '$scope', '$stateParams', 'TopicService'];
    //CtrlModule.controller('TopListCtrl', TopicList);
    //CtrlModule.controller('TopicDetailCtrl', TopicList);

    CtrlModule.controller('TopicReplyCtrl', TopicList);

}
