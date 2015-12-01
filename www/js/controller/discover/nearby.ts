/**
 * Created by AaronYuan on 11/13/15.
 */

//附近的人

/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
/// <reference path="../../service/group/group.ts" />
/// <reference path="../../service/public/friend.ts" />
/// <reference path="../../service/user/user.ts" />

module JDB {
    'use strict';

    declare var window;

    interface INearbyScope extends ng.IScope {
        //标题
        viewTitle: string;
        //成员
        members: Array<any>;
        currentPageIndex: number;
        //后退
        back: Function;
        //圈子编号
        params: any;
    }

    class Nearby {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: INearbyScope,
            public CommonService: ICommonService,
            public $stateParams: ng.ui.IStateParamsService,
            public GroupService: IGroupService,
            public FriendService: IFriendService,
            public UserService: IUserService
        ){

            $scope.viewTitle = '附近的人';

            this.init();

            console.log($scope.params);
            //if($stateParams['groupID']){
            if($scope.params && $scope.params.groupID){
                //$scope.viewTitle = '圈子成员';
                this.initForGroupMembers();
            }else{
                this.initForNearby();
            }
        }

        init(){
            this.$scope.currentPageIndex = 1;
        }

        initForNearby(){
            var self = this;
            this.UserService.friendList({
                curPage: this.$scope.currentPageIndex,
                pageSize: 10,
                phone: this.$rootScope.localUser().phone
            }).then(function(result){
                if(result && result.code == 0){
                    self.$scope.members = result.data || [];
                }
            }, function(err){
            });

        }

        initForGroupMembers(){
            var self = this;
            this.GroupService.groupMembers({
                pageSize: 10,
                curPage:1,
                circleid: this.$scope.params.groupID
            }).then(function(result){
                if(result && result.code == 0){
                    self.$scope.members =  result.data.resultList;
                }
            });
        }
    }

    Nearby.$inject = ['$rootScope', '$scope', 'CommonService', '$stateParams', 'GroupService', 'FriendService' ,'UserService'];
    CtrlModule.controller('NearbyCtrl', Nearby);
    CtrlModule.controller('GroupMemberCtrl', Nearby);
}


