/**
 * Created by AaronYuan on 11/17/15.
 */

//个人名片
/// <reference path="../../app.ts" />
/// <reference path="../../service/user/user.ts" />
/// <reference path="../../service/common.ts" />

module JDB {
    'use strict';

    declare var window;

    interface IUserCardScope extends ng.IScope {

        cancel: Function;


        //右上角更多按钮
        showMore: Function;


        showSearch: Function;

    }

    class UserCard {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IUserCardScope,
            public UserService: IUserService,
            public CommonService: ICommonService,
            public $stateParams: ng.ui.IStateParamsService
        ){
            $scope.showMore = angular.bind(this, this.showMore);
            $scope.showSearch = angular.bind(this, this.showSearch);

            console.log($stateParams);
        }

        showMore(){
            this.CommonService.showActionSheet('user-card-more', [
                {text: '举报'},
                {text: '删除好友'}
            ]).then(function(index){
                console.log('user more'+ index);
            });
        }

        showSearch() {
            this.CommonService.showSearchModal();

        }


    }

    UserCard.$inject = ['$rootScope', '$scope', 'UserService', 'CommonService', '$stateParams'];
    CtrlModule.controller('UserCardCtrl', UserCard);
}
