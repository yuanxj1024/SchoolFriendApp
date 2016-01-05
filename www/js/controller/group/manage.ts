/**
 *
 * Created by AaronYuan on 11/30/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
/// <reference path="../../service/group/group.ts" />

//圈子管理
module JDB {
    'use strict';

    declare var window;

    interface IManageScope extends ng.IScope {
        //打开成员选择页面
        openChooseMember: Function;

        groupForm: any;
        //保存圈子名称
        saveInfo: Function;
        //参数
        params:any;

    }


    class Manage {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IManageScope,
            public CommonService: ICommonService,
            public GroupService: IGroupService,
            public $stateParams: ng.ui.IStateParamsService
        ){
            $scope.openChooseMember = angular.bind(this, this.openChooseMember);
            $scope.saveInfo = angular.bind(this, this.saveInfo);


            console.log($scope.params);

            if($stateParams['groupID']){
                this.initForRename();
            }
        }

        initForRename(){
            var self = this;
            this.$scope.groupForm = {
                name: ''
            };
            this.GroupService.getNickName({
                cid: this.$stateParams['groupID'],
                phone: this.$rootScope.localUser().phone
            }).then(function(result){
                if(result && result.code == 0){
                    self.$scope.groupForm.name = '';
                }
            });
        }

        saveInfo(){
            if(!this.$scope.groupForm.name){
                window.plugins.toast.showShortCenter('请填写圈子昵称');
                return ;
            }

            var self = this;

            this.GroupService.updateNickName({
                cid: this.$stateParams['groupID'],
                nickName: this.$scope.groupForm.name,
                phone: this.$rootScope.localUser().phone
            }).then(function(result){
                if(result && result.code == 0){
                    window.plugins.toast.showShortCenter('圈子昵称修改成功');
                    self.$rootScope.goBack();
                }else{
                    window.plugins.toast.showShortCenter('圈子昵称修改失败');
                }
            }, function(err){
                window.plugins.toast.showShortCenter('圈子昵称修改失败');
            });
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

    Manage.$inject = ['$rootScope', '$scope','CommonService', 'GroupService','$stateParams'];
    CtrlModule.controller('GroupManageCtrl', Manage);
}
