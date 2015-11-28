/**
 *
 * Created by AaronYuan on 11/27/15.
 */
/// <reference path="../app.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var Tab = (function () {
        function Tab($ionicSlideBoxDelegate, $scope, $timeout, $rootScope) {
            this.$ionicSlideBoxDelegate = $ionicSlideBoxDelegate;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$rootScope = $rootScope;
            $scope.slideView = $ionicSlideBoxDelegate.$getByHandle('main-slide');
            $scope.slideHasChanged = angular.bind(this, this.slideHasChanged);
            $scope.changeSlide = angular.bind(this, this.changeSlide);
            $scope.selectedIndex = 0;
            $scope.$on('$ionicView.beforeEnter', function () {
                $scope.slideView.update();
            });
            $rootScope.$once('event:change-slide-veiw', function (e, index) {
                $scope.changeSlide(index);
            });
        }
        Tab.prototype.slideHasChanged = function (index) {
            this.$scope.selectedIndex = index;
        };
        Tab.prototype.changeSlide = function (index) {
            this.$scope.selectedIndex = index;
            this.$scope.slideView.slide(index);
            this.$scope.slideView.update();
        };
        return Tab;
    })();
    Tab.$inject = ['$ionicSlideBoxDelegate', '$scope', '$timeout', '$rootScope'];
    JDB.CtrlModule.controller('TabCtrl', Tab);
})(JDB || (JDB = {}));
//# sourceMappingURL=tab.js.map