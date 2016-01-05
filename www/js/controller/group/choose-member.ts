/**
 * Created by AaronYuan on 11/14/15.
 */
//选择成员modal

/// <reference path="../../app.ts" />
/// <reference path="../../service/group/group.ts" />
/// <reference path="../../service/public/friend.ts" />

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

        //页数
        currentPageIndex: number;
        //数据列表
        dataList: Array<any>;
        //选中的列表
        selectedList: Array<any>;

        itemClicked: Function;

    }

    class ChooseMember {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IChooseMemberScope,
            public GroupService: IGroupService,
            public FriendService: IFriendService
        ){
            $scope.finishHandler = angular.bind(this, this.finishHandler);
            console.log('choose member modal');
            console.log($scope.params);


            this.init();

        }

        init(){
            switch (this.$scope.params.action){
                case window.JDBTypes.ChooseMemberAction.add:
                    this.initListForAddGroupMember();
                    break;
            }

        }


        //添加圈子成员
        initListForAddGroupMember(){
            var self = this;
            this.FriendService.list({
                phone: this.$rootScope.localUser().phone,
                curPage: this.$scope.currentPageIndex,
                pageSize: 10
            }).then(function (result) {
                if(result && result.code == 0){
                    self.$scope.dataList = result.data.resultList || [];
                }
            }, function(){

            });

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

        itemClicked(item){
            if(item.isSelected){
                item.isSelected = false;
                delete this.$scope.selectedList[item];
            }else{
                item.isSelected = true;
                this.$scope.selectedList[item] = item;
            }
        }

    }

    ChooseMember.$inject = ['$rootScope', '$scope', 'GroupService', 'FriendService'];
    CtrlModule.controller('ChooseMemberCtrl', ChooseMember);
}


