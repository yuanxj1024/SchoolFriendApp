/**
 * Created by AaronYuan on 11/24/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/topic/topic.ts" />
//话题列表
var JDB;
(function (JDB) {
    'use strict';
    var TopicList = (function () {
        function TopicList($rootScope, $scope, $stateParams, TopicService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.TopicService = TopicService;
            $scope.reply = angular.bind(this, this.reply);
            console.log($scope.params);
            this.init();
        }
        TopicList.prototype.init = function () {
            this.$scope.replyForm = {
                'topic.id': this.$scope.params.topicID,
                'commentUser.id': this.$rootScope.User.id,
                'parentTopicCmt.id': this.$scope.params.parentID,
                content: '',
                phone: this.$rootScope.User.phone
            };
        };
        //回复，评论
        TopicList.prototype.reply = function () {
            console.log(this.$scope.replyForm);
            var self = this;
            this.TopicService.reply(this.$scope.replyForm).then(function (res) {
                if (res && res.code == 0) {
                    self.$scope.cancel();
                    window.plugins.toast.showShortCenter('回复成功');
                    self.$rootScope.$emit('event:refresh-detail', self.$scope.params.topicID);
                }
                else {
                    window.plugins.toast.showShortCenter('回复失败，稍后重试');
                }
            }, function (err) {
                window.plugins.toast.showShortCenter('回复失败，稍后重试');
            });
        };
        return TopicList;
    })();
    TopicList.$inject = ['$rootScope', '$scope', '$stateParams', 'TopicService'];
    //CtrlModule.controller('TopListCtrl', TopicList);
    //CtrlModule.controller('TopicDetailCtrl', TopicList);
    JDB.CtrlModule.controller('TopicReplyCtrl', TopicList);
})(JDB || (JDB = {}));
//# sourceMappingURL=reply.js.map