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
            public $rootScope: any,
            public $stateParams: any
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
            });
            $rootScope.$once('event:refresh-all-slide-view',function(){
                $timeout(function(){
                    $scope.slideView.update();
                },1000);
            });

            var self = this;
            if($stateParams['index']){
                $timeout(function(){
                    self.changeSlide($stateParams['index']);
                },800);
            }
        }
        slideHasChanged(index){
            this.$scope.selectedIndex = index;
        }

        changeSlide(index){
            this.$scope.selectedIndex = index;
            var view = this.$ionicSlideBoxDelegate.$getByHandle('main-slide')._instances[0];
            if(view){
                view.slide(index);
                //this.$scope.slideView.slide(index);
                //this.$scope.slideView.update();
                view.update();
            }
        }
    }


   Tab.$inject = ['$ionicSlideBoxDelegate', '$scope', '$timeout', '$rootScope', '$stateParams'];
    CtrlModule.controller('TabCtrl',Tab);
}
