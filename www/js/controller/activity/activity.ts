/**
 * Created by AaronYuan on 10/29/15.
 */
/// <reference path="../../app.ts" />

//活动
module JDB {
    'use strict';

    interface IActivityScope extends ng.IScope{
        //选择地区
        chooseLocation: Function;
        //是否显示选择地区
        isShowLocation: boolean;
        //选择当前城市
        locationSelected: Function;

    }

    class Activity {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IActivityScope,
            public $ionicBackdrop: Ionic.IBackdrop,
            public $timeout: ng.ITimeoutService
        ){
            $scope.chooseLocation = angular.bind(this, this.chooseLocation);
            $scope.locationSelected = angular.bind(this, this.locationSelected);

            $scope.isShowLocation = false;
        }


        chooseLocation(){
            var self = this;
            this.$scope.isShowLocation = !this.$scope.isShowLocation;
            //if(this.$scope.isShowLocation){
            //    this.$ionicBackdrop.retain();
            //}else{
            //    self.$ionicBackdrop.release();
            //}
        }

        locationSelected(item){
            console.log(item);
        }


    }

    Activity.$inject = ['$rootScope', '$scope', '$ionicBackdrop', '$timeout'];
    CtrlModule.controller('ActivityCtrl', Activity);
}

