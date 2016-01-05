/**
 * Created by AaronYuan on 11/10/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/topic/topic.ts" />
//发布话题
var JDB;
(function (JDB) {
    'use strict';
    var ReleaseTopic = (function () {
        function ReleaseTopic($rootScope, $scope, CommonService, TopicService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.CommonService = CommonService;
            this.TopicService = TopicService;
            $scope.chooseCategory = angular.bind(this, this.chooseCategory);
            $scope.chooseImage = angular.bind(this, this.chooseImage);
            $scope.currentCategory = angular.bind(TopicService, TopicService.selectedCategory);
            $scope.upload = angular.bind(this, this.upload);
            $scope.removeImg = angular.bind(this, this.removeImg);
            $scope.categoryItemClicked = angular.bind(this, this.categoryItemClicked);
            $scope.save = angular.bind(this, this.save);
            this.init();
        }
        ReleaseTopic.prototype.init = function () {
            var self = this;
            this.$scope.uploadImgs = [];
            this.TopicService.topicCategory({}).then(function (res) {
                self.$scope.categoryList = res.resultList;
                self.TopicService.selectedCategory(res.resultList[0]);
            });
            this.$scope.topicForm = {
                picPath: [],
                content: '',
                'topicType.id': '',
                phone: this.$rootScope.User.phone
            };
        };
        //校验
        ReleaseTopic.prototype.validate = function () {
            var msg = '';
            if (!this.$scope.topicForm.content) {
                msg = '请输入话题内容';
            }
            if (msg) {
                window.plugins.toast.showShortCenter(msg);
                return false;
            }
            return true;
        };
        ReleaseTopic.prototype.save = function () {
            //var self = this;
            if (!this.validate()) {
                return;
            }
            var self = this;
            this.$scope.topicForm['topicType.id'] = this.$scope.currentCategory().id;
            this.$scope.topicForm.picPath = this.$scope.topicForm.picPath.join(',');
            this.TopicService.createTopic(this.$scope.topicForm).then(function (res) {
                if (res.code == 0) {
                    window.plugins.toast.showShortCenter('发布成功!');
                    this.$scope.cancel();
                    self.$rootScope.$emit('event:refresh-home');
                }
                else {
                    window.plugins.toast.showShortCenter(res.error || '数据保存失败，请稍后重试');
                }
            }.bind(this), function (res) {
                window.plugins.toast.showShortCenter('数据保存失败，请稍后重试');
            });
        };
        ReleaseTopic.prototype.chooseCategory = function () {
            this.CommonService.showTopicCategroy();
        };
        ReleaseTopic.prototype.chooseImage = function () {
            this.CommonService.showChooseImg().then(function (index) {
                //console.log('choose image:' + index);
            });
        };
        ReleaseTopic.prototype.upload = function (file) {
            var self = this;
            if (file) {
                this.$scope.uploadImgs.push(file);
            }
            this.CommonService.uploadFile({
                file: file
            }).then(function (res) {
                if (res.data.code == '0') {
                    self.$scope.topicForm.picPath.push(res.data.data);
                }
                else {
                    window.plugins.toast.showShortCenter('上传失败，请重试!');
                    self.removeImg(file);
                }
            }, function (err) {
                self.removeImg(file);
            });
        };
        ReleaseTopic.prototype.removeImg = function (item) {
            var list = [];
            angular.forEach(this.$scope.uploadImgs, function (i) {
                if (item.name != i.name) {
                    list.push(i);
                }
            });
            this.$scope.uploadImgs = list;
        };
        ReleaseTopic.prototype.categoryItemClicked = function (item) {
            this.TopicService.selectedCategory(item);
            this.$scope.cancel();
        };
        return ReleaseTopic;
    })();
    ReleaseTopic.$inject = ['$rootScope', '$scope', 'CommonService', 'TopicService'];
    JDB.CtrlModule.controller('ReleaseTopicCtrl', ReleaseTopic);
})(JDB || (JDB = {}));
//# sourceMappingURL=release-topic.js.map