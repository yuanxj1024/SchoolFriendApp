/**
 * Created by AaronYuan on 10/29/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
//话题
var JDB;
(function (JDB) {
    'use strict';
    //数据缓存
    var dataCache = {};
    //话题类型
    (function (TopicType) {
        TopicType[TopicType["Hot"] = 1] = "Hot";
        TopicType[TopicType["Newest"] = 2] = "Newest";
        TopicType[TopicType["Friends"] = 3] = "Friends";
    })(JDB.TopicType || (JDB.TopicType = {}));
    var TopicType = JDB.TopicType;
    var Topic = (function () {
        function Topic($rootScope, $q, $resource, $ionicModal, CommonService) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.$ionicModal = $ionicModal;
            this.CommonService = CommonService;
            this.topicResource = $resource(JDB.appHost + '/topic/:action', {
                action: '@action'
            }, {
                list: {
                    method: 'GET',
                    needAccessToken: true,
                    isArray: false,
                    params: {
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
        Topic.prototype.list = function (arg) {
            arg = angular.extend({
                //phone: this.$rootScope.User.phone,
                pageSize: 5,
                curPage: 1,
                labelId: 2 /* Newest */
            }, arg);
            return this.$rootScope.requestHandler(this.topicResource.list, arg);
        };
        //发布话题
        Topic.prototype.releaseTopicModal = function () {
            this.$rootScope.createModal('/templates/topic/release-topic.html');
        };
        //创建话题
        Topic.prototype.createTopic = function (args) {
            return this.$rootScope.requestHandler(this.topicResource.createTopic, args, true);
        };
        //话题分类列表
        Topic.prototype.topicCategory = function (args) {
            var defer = this.$q.defer();
            if (dataCache.topicCategory) {
                defer.resolve(dataCache.topicCategory);
            }
            else {
                var p = this.$rootScope.requestHandler(this.topicResource.topicCategory, args);
                p.then(function (res) {
                    defer.resolve(res.data);
                    dataCache.topicCatelog = res.data;
                }, function (err) {
                    defer.reject([]);
                });
            }
            return defer.promise;
        };
        Topic.prototype.selectedCategory = function (item) {
            if (item) {
                dataCache.selectedCategory = item;
            }
            return dataCache.selectedCategory || { id: 0, name: '商机' };
        };
        Topic.prototype.likeTopic = function (args) {
            if (args.isLiked) {
                return null;
            }
            args.isLiked = true;
            return this.$rootScope.requestHandler(this.topicResource.likeTopic, {
                phone: this.$rootScope.User.phone,
                id: args.id
            }, true).then(function (res) {
                if (res && res.code == 0) {
                    args.isLiked = true;
                    args.lv += 1;
                }
                else {
                    args.isLiked = false;
                }
            });
        };
        Topic.prototype.detail = function (args) {
            args = angular.extend({
                phone: this.$rootScope.User.phone
            }, args);
            return this.$rootScope.requestHandler(this.topicResource.detail, args);
        };
        Topic.prototype.replyModal = function (args) {
            var scope = this.$rootScope.$new();
            scope.params = args;
            this.$rootScope.createModal('/templates/topic/reply-modal.html', scope);
        };
        Topic.prototype.reply = function (args) {
            return this.$rootScope.requestHandler(this.topicResource.reply, args, true);
        };
        Topic.prototype.ignoreUser = function (args) {
            this.$rootScope.requestHandler(this.topicResource.ignoreUser, args, true).then(function (result) {
                if (result && result.code == 0) {
                    window.plugins.toast.showShortCenter('操作成功');
                }
                else {
                    window.plugins.toast.showShortCenter('操作失败');
                }
            }, function (err) {
                window.plugins.toast.showShortCenter('操作失败');
            });
        };
        return Topic;
    })();
    Topic.$inject = ['$rootScope', '$q', '$resource', '$ionicModal', 'CommonService'];
    JDB.ServiceModule.service('TopicService', Topic);
})(JDB || (JDB = {}));
//# sourceMappingURL=topic.js.map