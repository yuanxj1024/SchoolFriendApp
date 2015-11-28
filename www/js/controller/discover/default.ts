/**
 * Created by AaronYuan on 11/14/15.
 */
//话题

/// <reference path="../../app.ts" />
/// <reference path="../../service/Common.ts" />
/// <reference path="../../service/user/user.ts" />
module JDB {
    'use strict';

    declare var window;

    interface IDiscoverScope extends ng.IScope {
        //打开个人名片
        openUserCard: Function;

    }

    class Discover {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IDiscoverScope,
            public CommonService: ICommonService,
            public UserService: IUserService
        ){
            $scope.openUserCard = angular.bind(this, this.openUserCard);

            //$scope.openUserCard(1);
            $rootScope.$once('event:refresh-all-slide-view',function(){
                console.log('discover refresh');
            });
        }

        openUserCard(item){
            //this.UserService.openUserCard(1).then(function(res){
            //    console.log(123);
            //});

            this.CommonService.showUserCardModal({
                id: item
            }).then(function(){

            },function(err){

            });
        }

    }

    Discover.$inject = ['$rootScope','$scope', 'CommonService', 'UserService'];
    CtrlModule.controller('DiscoverCtrl', Discover);
}
