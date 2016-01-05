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

        ////打开成员选贼页面
        openChooseMember: Function;
        //参数
        params: any;

        //圈子详情
        model: any;
        //举报
        report: Function;
        //圈子成员
        members: Array<any>;
        memberCount: number;

        //右上角菜单
        showActionSheet: Function;
        //新朋友
        friendRequest: Function;
        //退出圈子
        quitGroup: Function;
        //修改圈子内昵称
        modifyNickName: Function;
        //查看圈子成员
        showMembers: Function;
    }


    class GroupDetail {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IGroupDetailScope,
            public GroupService: IGroupService,
            public $stateParams: ng.ui.IStateParamsService,
            public currentDetail: any,
            public CommonService: ICommonService
        ){
            $scope.report = angular.bind(this, this.report);
            $scope.openChooseMember = angular.bind(this, this.openChooseMember);
            $scope.showActionSheet = angular.bind(this, this.showActionSheet);
            $scope.quitGroup = angular.bind(this ,this.quitGroup);
            $scope.showMembers = angular.bind(this, this.showMembers);
            $scope.modifyNickName = angular.bind(this,this.modifyNickName);

            if($stateParams['id']){
                $scope.model = currentDetail;
            }

            this.init();

            var self = this;
            $rootScope.$once('event:refresh-group-members', function(){
                self.refreshMember();
            });
        }

        init(){
            this.$scope.memberCount = 0;
            this.refreshMember();
        }

        refreshMember(){
            var self = this;
            this.GroupService.groupMembers({
                pageSize: 4,
                curPage:1,
                circleid: this.$scope.model.circle.id
            }).then(function(result){
                if(result && result.code == 0){
                    self.$scope.members = result.data.resultList;
                    self.$scope.memberCount = result.data.totalCount || 0;
                }else{
                    self.$scope.members = [];
                }
            },function(err){
                self.$scope.members = [];
            });
        }

        initForDetail(){
            var self = this;
            this.GroupService.groupDetail({
                cid: this.$stateParams['id'],
                phone: self.$rootScope.localUser().phone
            }).then(function(result){
                if(result && result.code == 0){
                    self.$scope.model = result.data;
                }
            }, function(err){

            });
        }

        report(){
            this.CommonService.showReport({
                typeName: '圈子',
                id: this.$scope.model.circle.id
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

        showActionSheet(){
            var self = this,
                btns = [
                    {text:'加入圈子'}
                ];
            if(this.$rootScope.localUser().phone == this.currentDetail.circle.createUser.alumnus.phone){
                btns.push({text:'新朋友'});
            }

            this.CommonService.showActionSheet('group-detail-menu',btns).then(function(index){
                if(index == 0){
                    self.joinGroup();
                }else if(index == 1){
                    self.friendRequest();
                }
            });
        }

        joinGroup(){
            var self = this;
            this.GroupService.joinGroup({
                id: this.currentDetail.circle.id,
                phone: this.$rootScope.localUser().phone
            }).then(function(){
                self.refreshMember();
            });
        }


        friendRequest(){
            this.GroupService.showNewFriends({
                groupID: this.$scope.model.circle.id
            });
        }

        quitGroup(){
            //拥有者
            if(this.$rootScope.localUser().phone == this.currentDetail.circle.createUser.alumnus.phone){
                this.CommonService.showConfirm('提示','您确定要解散圈子吗').then(function(res){
                    if(res){
                        this.GroupService.deleteGroup({
                            phone: this.$rootScope.localUser().phone,
                            id: this.$scope.model.circle.id
                        });
                    }
                });
            }else{
                this.CommonService.showConfirm('提示', '您确定要退出圈子吗').then(function(res){
                    if(res){
                        this.GroupService.quitGroup({
                            phone: this.$rootScope.localUser().phone,
                            id: this.$scope.model.circle.id
                        });
                    }
                });
            }
        }

        modifyNickName(){
            if(this.$scope.model.join == 0){
                window.plugins.toast.showShortCenter('您还没有加入改圈子');
            }else{
                this.$rootScope.stateGo('jdb.group-rename',{
                    groupID: this.$scope.model.circle.id
                });
            }
        }

        showMembers(){
            this.GroupService.openGroupMembers({
                groupID: this.$scope.model.circle.id
            });
        }

    }

    ResolvesModule['GroupDetailCtrl'] = {
        currentDetail: ['$rootScope','$q', '$stateParams','GroupService', function($rootScope,$q, $stateParams, GroupService){
            var defer = $q.defer(),
                id = $stateParams['id'] || 1;
            if(id){
                GroupService.groupDetail({
                    phone: $rootScope.localUser().phone,
                    cid: id
                }).then(function(result){
                    if(result && result.code == 0){
                        defer.resolve(result.data);
                    }else{
                        defer.reject(null);
                        window.plugins.toast.showShortCenter('数据加载失败');
                    }
                }, function(err){
                    defer.reject(null);
                    window.plugins.toast.showShortCenter('数据加载失败');
                });
            }else{
                defer.reject(null);
            }

            return defer.promise;
        }]
    };



    GroupDetail.$inject = ['$rootScope', '$scope', 'GroupService', '$stateParams', 'currentDetail', 'CommonService'];
    CtrlModule.controller('GroupDetailCtrl', GroupDetail);
}
