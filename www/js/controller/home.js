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
        function Home($rootScope, $scope, TopicService, CommonService, AuthService, ReportService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.TopicService = TopicService;
            this.CommonService = CommonService;
            this.AuthService = AuthService;
            this.ReportService = ReportService;
            $scope.openReleaseTopic = angular.bind(TopicService, TopicService.releaseTopicModal);
            //$scope.openSearchModal = angular.bind(CommonService, CommonService.showSearchModal);
            $scope.openActionSheet = angular.bind(this, this.openActionSheet);
            $scope.openLogin = angular.bind(this, CommonService.showLoginModal);
            $scope.changeTopicType = angular.bind(this, this.changeTopicType);
            $scope.likeTopic = angular.bind(this, this.likeTopic);
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
            this.$rootScope.$once('event:refresh-home', function () {
                console.log('refresh home');
                //self.init();
                self.refresh();
            });
            this.init();
        }
        Home.prototype.init = function () {
            //最新
            this.$scope.topicType = 2 /* Newest */;
            this.$scope.currentPage = 1;
            this.$scope.staticHost = JDB.staticHost;
            this.refresh();
        };
        //刷新页面
        Home.prototype.refresh = function () {
            var arg = {}, self = this;
            this.TopicService.list({
                phone: this.$rootScope.User ? this.$rootScope.User.phone : 0,
                labelId: this.$scope.topicType || 2 /* Newest */,
                curPage: this.$scope.currentPage || 1
            }).then(function (res) {
                if (res) {
                    self.$scope.topicList = res.data.resultList;
                }
                console.log(res);
            }, function (err) {
                //self.$rootScope.loading();
                window.plugins.toast.showShortCenter('数据记载失败,请重新进入。');
            });
        };
        Home.prototype.openActionSheet = function (user) {
            var self = this;
            console.log(user);
            this.ReportService.setReportObject(user);
            this.CommonService.showDropMenu(null).then(function (index) {
                console.log(index);
                if (index == 0) {
                    self.CommonService.showReport();
                }
                else if (index == 2) {
                    self.TopicService.ignoreUser({
                        phone: self.$rootScope.User.phone,
                        tphone: user.alumnus.phone
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
    Home.$inject = ['$rootScope', '$scope', 'TopicService', 'CommonService', 'AuthService', 'ReportService'];
    JDB.CtrlModule.controller('HomeCtrl', Home);
})(JDB || (JDB = {}));
//# sourceMappingURL=home.js.map