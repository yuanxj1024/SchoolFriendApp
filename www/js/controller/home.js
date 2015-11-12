/**
 *
 * Created by AaronYuan on 10/27/15.
 */
/// <reference path="../app.ts" />
/// <reference path="../service/topic/topic.ts" />
/// <reference path="../service/common.ts" />
/// <reference path="../service/auth.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var Home = (function () {
        function Home($rootScope, $scope, TopicService, CommonService, AuthService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.TopicService = TopicService;
            this.CommonService = CommonService;
            this.AuthService = AuthService;
            console.log('home');
            $scope.openReleaseTopic = angular.bind(TopicService, TopicService.releaseTopicModal);
            //$scope.openSearchModal = angular.bind(CommonService, CommonService.showSearchModal);
            $scope.openActionSheet = angular.bind(this, this.openActionSheet);
            $scope.openLogin = angular.bind(this, CommonService.showLoginModal);
            //$scope.openReleaseTopic();
            window.plugins.toast.showShortCenter('测试信息');
            var self = this;
            $rootScope.$on('$stateChangeStart', function (e, data) {
                if (data.name == 'jdb.home') {
                    self.AuthService.verify();
                }
            });
        }
        //刷新页面
        Home.prototype.refresh = function () {
        };
        Home.prototype.openActionSheet = function (id) {
            this.CommonService.showReport(id);
        };
        return Home;
    })();
    Home.$inject = ['$rootScope', '$scope', 'TopicService', 'CommonService', 'AuthService'];
    JDB.CtrlModule.controller('HomeCtrl', Home);
})(JDB || (JDB = {}));
//# sourceMappingURL=home.js.map