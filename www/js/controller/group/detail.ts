/**
 * Created by AaronYuan on 11/14/15.
 */
//圈子详情
/// <reference path="../../app.ts" />
/// <reference path="../../service/group/group.ts" />

module JDB {
    'use strict';

    declare var window;

    interface IGroupDetailScope extends ng.IScope {

        //打开成员选贼页面
        openChooseMember: Function;
        //参数
        params: any;
    }


    class GroupDetail {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IGroupDetailScope,
            public GroupService: IGroupService,
            public $stateParams: ng.ui.IStateParamsService
        ){
            $scope.openChooseMember = angular.bind(this, this.openChooseMember);
            console.log($stateParams);
        }


        openChooseMember(action: string){
            var params = {
                'remove': {
                    viewTitle: '移除成员',
                    action: window.JDBTypes.ChooseMemberAction.remove
                },
                'admin': {
                    viewTitle: '设置管理员',
                    action: window.JDBTypes.ChooseMemberAction.admin
                },
                'add': {
                    viewTitle: '添加成员',
                    action: window.JDBTypes.ChooseMemberAction.add
                }
            };
            this.GroupService.showChooseMemberModal(params[action]);
        }




    }

    GroupDetail.$inject = ['$rootScope', '$scope', 'GroupService', '$stateParams'];
    CtrlModule.controller('GroupDetailCtrl', GroupDetail);

    CtrlModule.controller('GroupManageCtrl', GroupDetail);


}


