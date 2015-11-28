/**
 *
 * Created by AaronYuan on 11/27/15.
 */
/// <reference path="../app.ts" />

module JDB{
    'use strict';

    class Tab{
        constructor(
            public $ionicSlideBoxDelegate: any,
            public $scope: any,
            public $timeout: any,
            public $rootScope: any
        ){
            $scope.slideView = $ionicSlideBoxDelegate.$getByHandle('main-slide');
            $scope.slideHasChanged = angular.bind(this, this.slideHasChanged);
            $scope.changeSlide = angular.bind(this, this.changeSlide);
            $scope.selectedIndex = 0;

            $scope.$on('$ionicView.beforeEnter', function() {
                $scope.slideView.update();
            });

            $rootScope.$once('event:change-slide-veiw', function(e, index){
                $scope.changeSlide(index);
            })
        }
        slideHasChanged(index){
            this.$scope.selectedIndex = index;
        }

        changeSlide(index){
            this.$scope.selectedIndex = index;
            this.$scope.slideView.slide(index);
            this.$scope.slideView.update();
        }
    }


   Tab.$inject = ['$ionicSlideBoxDelegate', '$scope', '$timeout', '$rootScope'];
    CtrlModule.controller('TabCtrl',Tab);
}
