/**
 * Created by AaronYuan on 11/14/15.
 */
// 发现
/// <reference path="../../app.ts" />
/// <reference path="../../service/Common.ts" />
/// <reference path="../../service/user/user.ts" />
/// <reference path="../../service/discover/discover.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var Discover = (function () {
        function Discover($rootScope, $scope, CommonService, UserService, DiscoverService, $ionicSlideBoxDelegate, $timeout) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.CommonService = CommonService;
            this.UserService = UserService;
            this.DiscoverService = DiscoverService;
            this.$ionicSlideBoxDelegate = $ionicSlideBoxDelegate;
            this.$timeout = $timeout;
            $scope.slideClick = angular.bind(this, this.slideClick);
            $scope.bannerSlide = $ionicSlideBoxDelegate.$getByHandle('discover-slider');
            var self = this;
            $rootScope.$once('event:refresh-all-slide-view', function () {
                self.init();
            });
            self.init();
        }
        Discover.prototype.init = function () {
            this.$scope.currentPageIndex = 1;
            this.refresh();
        };
        Discover.prototype.refreshSlideView = function () {
            var self = this;
            self.$timeout(function () {
                self.$scope.bannerSlide.update();
            }, 500);
        };
        Discover.prototype.refresh = function () {
            var self = this;
            this.DiscoverService.index({
                phone: this.$rootScope.localUser().phone,
                focusSize: 6,
                circleSize: 4,
                userSize: 5
            }).then(function (result) {
                if (result && result.code == 0) {
                    self.$scope.model = result.data;
                    self.refreshSlideView();
                }
            });
        };
        Discover.prototype.slideClick = function (item) {
            this.$rootScope.stateGo('jdb.activity-detail', {
                detailID: item.id
            });
        };
        return Discover;
    })();
    Discover.$inject = ['$rootScope', '$scope', 'CommonService', 'UserService', 'DiscoverService', '$ionicSlideBoxDelegate', '$timeout'];
    JDB.CtrlModule.controller('DiscoverCtrl', Discover);
})(JDB || (JDB = {}));
//# sourceMappingURL=default.js.map