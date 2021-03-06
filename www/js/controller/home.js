/**
 *
 * Created by AaronYuan on 10/27/15.
 */
/// <reference path="../app.ts" />
/// <reference path="../service/topic/topic.ts" />
/// <reference path="../service/common.ts" />
/// <reference path="../service/auth.ts" />
/// <reference path="../service/public/report.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var Home = (function () {
        function Home($rootScope, $scope, TopicService, CommonService, AuthService, ReportService, $timeout) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.TopicService = TopicService;
            this.CommonService = CommonService;
            this.AuthService = AuthService;
            this.ReportService = ReportService;
            this.$timeout = $timeout;
            $scope.openReleaseTopic = angular.bind(TopicService, TopicService.releaseTopicModal);
            //$scope.openSearchModal = angular.bind(CommonService, CommonService.showSearchModal);
            $scope.openActionSheet = angular.bind(this, this.openActionSheet);
            $scope.openLogin = angular.bind(this, CommonService.showLoginModal);
            $scope.changeTopicType = angular.bind(this, this.changeTopicType);
            $scope.likeTopic = angular.bind(this, this.likeTopic);
            $scope.refresh = angular.bind(this, this.refresh);
            //$scope.openReleaseTopic();
            window.plugins.toast.showShortCenter('测试信息');
            var self = this;
            //$rootScope.$on('$stateChangeSuccess', function(e,data){
            //    console.log(data);
            //    if(data.name == 'jdb.home'){
            //        self.AuthService.verify();
            //    }
            //});
            //self.AuthService.verify();
            self.init();
            this.$rootScope.$once('event:refresh-all-slide-view', function () {
                console.log('refresh home');
                self.$scope.hasMoreData = true;
                self.refresh();
            });
        }
        Home.prototype.init = function () {
            //最新
            this.$scope.topicType = 2 /* Newest */;
            this.$scope.currentPage = 1;
            this.$scope.staticHost = JDB.staticHost;
            this.$scope.topicList = [];
            this.$scope.hasMoreData = true;
            //this.refresh();
        };
        //刷新页面
        Home.prototype.refresh = function () {
            var arg = {}, self = this;
            this.TopicService.list({
                phone: this.$rootScope.User ? this.$rootScope.User.phone : 0,
                labelId: this.$scope.topicType || 2 /* Newest */,
                curPage: this.$scope.currentPage++,
                pageSize: 10
            }).then(function (res) {
                if (res && res.code == 0) {
                    self.$scope.hasMoreData = Math.ceil(res.data.totalCount / 10) > self.$scope.currentPage;
                    self.$scope.topicList = self.$scope.topicList.concat(res.data.resultList || []);
                }
                self.$scope.$broadcast('scroll.infiniteScrollComplete');
            }, function (err) {
                self.$scope.hasMoreData = false;
                console.log(123);
                //window.plugins.toast.showShortCenter('数据加载失败,请重新进入');
                self.$scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };
        Home.prototype.openActionSheet = function (topic) {
            var self = this;
            //this.ReportService.setReportObject(topic);
            this.CommonService.showDropMenu(null).then(function (index) {
                console.log(index);
                if (index == 0) {
                    self.CommonService.showReport({
                        typeName: '话题',
                        id: topic.id
                    });
                }
                else if (index == 2) {
                    self.TopicService.ignoreUser({
                        phone: self.$rootScope.localUser().phone,
                        tphone: topic.alumnus.phone
                    });
                }
            }.bind(this));
        };
        Home.prototype.changeTopicType = function (t) {
            this.$scope.topicType = t;
            this.refresh();
        };
        Home.prototype.likeTopic = function (item) {
            if (!item.isLiked) {
                this.TopicService.likeTopic(item);
            }
        };
        return Home;
    })();
    Home.$inject = ['$rootScope', '$scope', 'TopicService', 'CommonService', 'AuthService', 'ReportService', '$timeout'];
    JDB.CtrlModule.controller('HomeCtrl', Home);
})(JDB || (JDB = {}));
//# sourceMappingURL=home.js.map