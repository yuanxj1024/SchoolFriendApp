/**
 * Created by AaronYuan on 11/14/15.
 */
// 发现
/// <reference path="../../app.ts" />
/// <reference path="../../service/Common.ts" />
/// <reference path="../../service/user/user.ts" />
/// <reference path="../../service/discover/discover.ts" />

module JDB {
    'use strict';

    declare var window;

    interface IDiscoverScope extends ng.IScope {
        currentPageIndex: number;
        model: any;
        bannerSlide:any;
        slideClick: Function;
    }

    class Discover {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IDiscoverScope,
            public CommonService: ICommonService,
            public UserService: IUserService,
            public DiscoverService: IDiscoverService,
            public $ionicSlideBoxDelegate: any,
            public $timeout: any
        ){
            $scope.slideClick = angular.bind(this,this.slideClick);


            $scope.bannerSlide = $ionicSlideBoxDelegate.$getByHandle('discover-slider');

            var self = this;

            $rootScope.$once('event:refresh-all-slide-view',function(){
                self.init();
            });

            self.init();
        }

        init(){
            this.$scope.currentPageIndex = 1;

            this.refresh();
        }

        refreshSlideView(){
            var self = this;
            self.$timeout(function(){
                self.$scope.bannerSlide.update();
            },500);

        }

        refresh(){
            var self = this;

            this.DiscoverService.index({
                phone: this.$rootScope.localUser().phone,
                focusSize: 6,
                circleSize: 4,
                userSize: 5
            }).then(function(result){
                if(result && result.code == 0){
                    self.$scope.model = result.data;
                    self.refreshSlideView();
                }
            });
        }

        slideClick(item){
            this.$rootScope.stateGo('jdb.activity-detail',{
                detailID: item.id
            })
        }


    }

    Discover.$inject = ['$rootScope','$scope', 'CommonService', 'UserService', 'DiscoverService', '$ionicSlideBoxDelegate', '$timeout'];
    CtrlModule.controller('DiscoverCtrl', Discover);
}
