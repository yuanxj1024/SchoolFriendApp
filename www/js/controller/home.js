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
            //$scope.openReleaseTopic();
            window.plugins.toast.showShortCenter('测试信息');
            var self = this;
            //$rootScope.$on('$stateChangeSuccess', function(e,data){
            //    console.log(data);
            //    if(data.name == 'jdb.home'){
            //        self.AuthService.verify();
            //    }
            //});
            self.AuthService.verify();
            this.refresh();
            this.$rootScope.$once('event:refresh-home', function () {
                console.log('refresh home');
            });
        }
        Home.prototype.init = function () {
            this.$scope.topicType = 1;
            this.$scope.currentPage = 1;
        };
        //刷新页面
        Home.prototype.refresh = function () {
            var arg = {}, self = this;
            this.TopicService.list({
                labelId: this.$scope.topicType
            }).then(function (res) {
                console.log(res);
            }, function (err) {
                //self.$rootScope.loading();
                window.plugins.toast.showShortCenter('数据记载失败,请重新进入。');
            });
        };
        Home.prototype.openActionSheet = function (id) {
            var self = this;
            this.ReportService.setReportObject(id);
            this.CommonService.showDropMenu(id).then(function (index) {
                console.log(index);
                if (index == 0) {
                    self.CommonService.showReport();
                }
            }.bind(this));
        };
        Home.prototype.changeTopicType = function (t) {
            this.$scope.topicType = t;
            this.refresh();
        };
        return Home;
    })();
    Home.$inject = ['$rootScope', '$scope', 'TopicService', 'CommonService', 'AuthService', 'ReportService'];
    JDB.CtrlModule.controller('HomeCtrl', Home);
})(JDB || (JDB = {}));
//# sourceMappingURL=home.js.map