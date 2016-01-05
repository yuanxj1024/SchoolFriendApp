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

        refresh: Function;

        hasMoreData: boolean;
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

            $scope.refresh = angular.bind(this, this.refresh);

            $scope.viewTitle = '附近的人';

            this.init();

            console.log($scope.params);
            //if($stateParams['groupID']){
            //this.refresh();
        }

        init(){
            this.$scope.currentPageIndex = 1;
            this.$scope.members = [];
            this.$scope.hasMoreData = true;
        }

        refresh(){
            if(this.$scope.params && this.$scope.params.groupID){
                //$scope.viewTitle = '圈子成员';
                this.initForGroupMembers();
            }else{
                this.initForNearby();
            }
        }

        initForNearby(){
            var self = this;
            console.log('abc');
            this.UserService.friendList({
                curPage: this.$scope.currentPageIndex++,
                pageSize: 10,
                phone: this.$rootScope.localUser().phone
            }).then(function(result){
                if(result && result.code == 0){
                    //TODO
                    self.$scope.hasMoreData = Math.ceil(result.data.totalCount/ 10) > self.$scope.currentPageIndex;
                    self.$scope.members = self.$scope.members.concat(result.data || []);
                }
                self.$scope.$broadcast('scroll.infiniteScrollComplete');
            }, function(err){
                self.$scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }

        initForGroupMembers(){
            var self = this;
            this.GroupService.groupMembers({
                pageSize: 10,
                curPage: this.$scope.currentPageIndex++,
                circleid: this.$scope.params.groupID
            }).then(function(result){
                if(result && result.code == 0){
                    //TODO
                    self.$scope.hasMoreData = Math.ceil(result.data.totalCount/ 10) > self.$scope.currentPageIndex;
                    self.$scope.members = self.$scope.members.concat(result.data.resultList);
                }
                self.$scope.$broadcast('scroll.infiniteScrollComplete');
            }, function(){
                self.$scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }
    }

    Nearby.$inject = ['$rootScope', '$scope', 'CommonService', '$stateParams', 'GroupService', 'FriendService' ,'UserService'];
    CtrlModule.controller('NearbyCtrl', Nearby);
    CtrlModule.controller('GroupMemberCtrl', Nearby);
}


