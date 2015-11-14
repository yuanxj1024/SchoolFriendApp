/**
 * Created by AaronYuan on 11/14/15.
 */
//选择成员modal

/// <reference path="../../app.ts" />
/// <reference path="../../service/group/group.ts" />

module JDB {
    'use strict';

    declare var window;

    interface IChooseMemberScope extends ng.IScope {
        //动作
        action:string ;
        //参数
        params: any;

        //完成按钮点击
        finishHandler:Function;

    }

    class ChooseMember {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IChooseMemberScope,
            public GroupService: IGroupService
        ){
            $scope.finishHandler = angular.bind(this, this.finishHandler);
            console.log('choose member modal');
            console.log($scope.params);

        }

        finishHandler(){
            switch (this.$scope.params.action){
                case window.JDBTypes.ChooseMemberAction.remove:
                    console.log('remove member');
                    break;
                case  window.JDBTypes.ChooseMemberAction.admin:
                    console.log('set admin');
                    break;
                case  window.JDBTypes.ChooseMemberAction.add:
                    console.log('add member');
                    break;
            }
        }

    }

    ChooseMember.$inject = ['$rootScope', '$scope', 'GroupService'];
    CtrlModule.controller('ChooseMemberCtrl', ChooseMember);
}


