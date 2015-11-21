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
        Topic.prototype.list = function (arg) {
            arg = angular.extend({
                pageSize: 5,
                curPage: 1,
                labelId: 1
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
        return Topic;
    })();
    Topic.$inject = ['$rootScope', '$q', '$resource', '$ionicModal', 'CommonService'];
    JDB.ServiceModule.service('TopicService', Topic);
})(JDB || (JDB = {}));
//# sourceMappingURL=topic.js.map