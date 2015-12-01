/**
 * Created by AaronYuan on 11/17/15.
 */

//个人名片
/// <reference path="../../app.ts" />
/// <reference path="../../service/user/user.ts" />
/// <reference path="../../service/common.ts" />
/// <reference path="../../service/public/friend.ts" />

module JDB {
    'use strict';

    declare var window;

    interface IUserCardScope extends ng.IScope {
        cancel: Function;
        //当前用户的手机
        //phone: string;
        params: any;
        //当前对象
        model: any;
        //右上角更多按钮
        showMore: Function;
        showSearch: Function;
        //发消息
        sendMessage: Function;

        //发送好友申请
        sendRequest: Function;
        //好友请求消息
        requestText: string;
    }

    class UserCard {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IUserCardScope,
            public UserService: IUserService,
            public CommonService: ICommonService,
            public $stateParams: ng.ui.IStateParamsService,
            public FriendService: IFriendService
        ){
            $scope.showMore = angular.bind(this, this.showMore);
            $scope.showSearch = angular.bind(this, this.showSearch);
            $scope.sendMessage = angular.bind(this, this.sendMessage);
            $scope.sendRequest = angular.bind(this, this.sendRequest);

            if($stateParams['phone']){
                this.initForRequest();
            }else{
                this.init();
            }
        }

        init(){
            var self = this;
            this.UserService.viewUserInfo({
                phone: this.$scope.params.phone
            }).then(function(result){
                if(result && result.code ==0){
                    self.$scope.model = result.data.alumnus || {};
                    self.$scope.model.userID = result.data.id;
                }else{
                    window.plugins.toast.showShortCenter('数据加载失败');
                    self.$scope.cancel();
                }
            }, function(err){
                window.plugins.toast.showShortCenter('数据加载失败');
                self.$scope.cancel();
            });
        }

        initForRequest(){
            this.$scope.requestText = '我是'+ this.$stateParams['name'];
            console.log(this.$scope.requestText);
        }

        showMore(){
            var self = this;
            this.CommonService.showActionSheet('user-card-more', [
                {text: '举报'},
                {text: '删除好友'}
            ]).then(function(index){
                self.actionItemClick(index);
            });
        }

        actionItemClick(index){
            switch (index){
                case 0:
                    this.CommonService.showReport({
                        typeName: '用户',
                        id: this.$scope.model.userID
                    });
                    break;
                case 1:
                    this.deleteFriend();
                    break;
            }
        }

        showSearch() {
            this.CommonService.showSearchModal();

        }

        sendMessage(){
            this.$scope.cancel();
            this.$rootScope.stateGo('jdb.friend-request',{
                phone: this.$scope.model.phone,
                name: this.$scope.model.realName
            });
        }

        sendRequest(){
            var self = this;
            this.FriendService.sendRequest({
                phone1: this.$rootScope.localUser().phone,
                phone2: this.$stateParams['phone'],
                message: this.$scope.requestText
            }).then(function(result){
                if(result && result.code == 0){
                    self.$rootScope.goBack();
                    window.plugins.toast.showShortCenter('申请发送成功');
                }else if(result.code == '111'){
                    self.$rootScope.goBack();
                    window.plugins.toast.showShortCenter('你们已经是好友关系');
                }
                else{
                    window.plugins.toast.showShortCenter('申请发送失败');
                }
            },function(){
                window.plugins.toast.showShortCenter('申请发送失败');
            });
        }

        deleteFriend(){
            this.FriendService.deleteFriend({
                phone1: this.$rootScope.localUser().phone,
                phone2: this.$scope.model.phone
            }).then(function(result){
                if(result && result.code == 0){
                    window.plugins.toast.showShortCenter('成功解除好友关系');
                }else if(result.code == 112){
                    window.plugins.toast.showShortCenter('对方不是您的好友');
                }else{
                    window.plugins.toast.showShortCenter('删除好友失败');
                }
            }, function(err){
                window.plugins.toast.showShortCenter('删除好友失败');
            });
        }

    }

    UserCard.$inject = ['$rootScope', '$scope', 'UserService', 'CommonService', '$stateParams', 'FriendService'];
    CtrlModule.controller('UserCardCtrl', UserCard);
    CtrlModule.controller('FriendRequestCtrl', UserCard);
}
