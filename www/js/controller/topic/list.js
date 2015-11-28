/**
 *
 * Created by AaronYuan on 11/7/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/topic/topic.ts" />
/// <reference path="../../service/common.ts" />
//话题列表
var JDB;
(function (JDB) {
    'use strict';
    var TopicList = (function () {
        function TopicList($rootScope, $scope, $stateParams, currentDetail, TopicService, CommonService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.currentDetail = currentDetail;
            this.TopicService = TopicService;
            this.CommonService = CommonService;
            $scope.changeTabs = angular.bind(this, this.changeTabs);
            $scope.closeTip = angular.bind(this, this.closeTip);
            $scope.showReplayModal = angular.bind(this, this.showReplayModal);
            $scope.likeTopic = angular.bind(TopicService, TopicService.likeTopic);
            $scope.topicTag = $stateParams['tag'] || 1;
            $scope.topicTitle = window.JDBTypes.TopicTypes[$scope.topicTag];
            $scope.tabIndex = 2;
            $scope.hasTip = true;
            if (currentDetail) {
                this.initDetail();
            }
            else {
                this.init();
            }
            var self = this;
            $rootScope.$once('event:refresh-detail', function (e, data) {
                self.refreshDetail(data);
            });
        }
        TopicList.prototype.init = function () {
            this.$scope.replyForm = {
                'topic.id': '',
                'commentUser.id': this.$rootScope.User.id,
                content: ''
            };
            this.$scope.topicList = [];
            this.$scope.currentPageIndex = 1;
            this.refresh();
        };
        TopicList.prototype.initDetail = function () {
            this.$scope.model = this.currentDetail;
        };
        TopicList.prototype.refresh = function () {
            var arg = {}, self = this;
            this.TopicService.list({
                phone: this.$rootScope.User ? this.$rootScope.User.phone : 0,
                curPage: this.$scope.currentPageIndex || 1,
                typeId: this.$scope.topicTag,
                labelId: this.$scope.tabIndex
            }).then(function (res) {
                if (res) {
                    self.$scope.topicList = res.data.resultList;
                }
            }, function (err) {
                window.plugins.toast.showShortCenter('数据记载失败,请重新进入。');
            });
        };
        TopicList.prototype.refreshDetail = function (detailID) {
            var self = this;
            this.TopicService.detail({
                id: detailID
            }).then(function (res) {
                if (res && res.data) {
                    self.$scope.model = res.data;
                }
            });
        };
        //最新，好友切换
        TopicList.prototype.changeTabs = function (index) {
            this.$scope.tabIndex = index;
            this.refresh();
        };
        TopicList.prototype.closeTip = function () {
            this.$scope.hasTip = false;
        };
        TopicList.prototype.showReplayModal = function (id) {
            if (id === void 0) { id = null; }
            this.CommonService.replyModal({
                topicID: this.currentDetail.topic.id,
                parentID: id,
                action: 'topic'
            });
        };
        return TopicList;
    })();
    JDB.ResolvesModule['TopicDetailCtrl'] = {
        currentDetail: ['$q', '$rootScope', '$stateParams', 'TopicService', function ($q, $rootScope, $stateParams, TopicService) {
            var defer = $q.defer(), id = $stateParams['detailID'];
            if (id) {
                TopicService.detail({
                    id: id
                }).then(function (res) {
                    if (res && res.data) {
                        defer.resolve(res.data);
                    }
                    else {
                        defer.resolve(res);
                    }
                }, function (err) {
                    window.plugins.toast.showShortCenter('话题详情加载失败');
                    defer.reject(null);
                });
            }
            else {
                defer.resolve(null);
            }
            return defer.promise;
        }]
    };
    TopicList.$inject = ['$rootScope', '$scope', '$stateParams', 'currentDetail', 'TopicService', 'CommonService'];
    JDB.CtrlModule.controller('TopListCtrl', TopicList);
    JDB.CtrlModule.controller('TopicDetailCtrl', TopicList);
    JDB.CtrlModule.controller('TopicReplyCtrl', TopicList);
})(JDB || (JDB = {}));
//# sourceMappingURL=list.js.map