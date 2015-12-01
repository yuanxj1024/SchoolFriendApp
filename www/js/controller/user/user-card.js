/**
 * Created by AaronYuan on 11/17/15.
 */
//个人名片
/// <reference path="../../app.ts" />
/// <reference path="../../service/user/user.ts" />
/// <reference path="../../service/common.ts" />
/// <reference path="../../service/public/friend.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var UserCard = (function () {
        function UserCard($rootScope, $scope, UserService, CommonService, $stateParams, FriendService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.UserService = UserService;
            this.CommonService = CommonService;
            this.$stateParams = $stateParams;
            this.FriendService = FriendService;
            $scope.showMore = angular.bind(this, this.showMore);
            $scope.showSearch = angular.bind(this, this.showSearch);
            $scope.sendMessage = angular.bind(this, this.sendMessage);
            $scope.sendRequest = angular.bind(this, this.sendRequest);
            if ($stateParams['phone']) {
                this.initForRequest();
            }
            else {
                this.init();
            }
        }
        UserCard.prototype.init = function () {
            var self = this;
            this.UserService.viewUserInfo({
                phone: this.$scope.params.phone
            }).then(function (result) {
                if (result && result.code == 0) {
                    self.$scope.model = result.data.alumnus || {};
                    self.$scope.model.userID = result.data.id;
                }
                else {
                    window.plugins.toast.showShortCenter('数据加载失败');
                    self.$scope.cancel();
                }
            }, function (err) {
                window.plugins.toast.showShortCenter('数据加载失败');
                self.$scope.cancel();
            });
        };
        UserCard.prototype.initForRequest = function () {
            this.$scope.requestText = '我是' + this.$stateParams['name'];
            console.log(this.$scope.requestText);
        };
        UserCard.prototype.showMore = function () {
            var self = this;
            this.CommonService.showActionSheet('user-card-more', [
                { text: '举报' },
                { text: '删除好友' }
            ]).then(function (index) {
                self.actionItemClick(index);
            });
        };
        UserCard.prototype.actionItemClick = function (index) {
            switch (index) {
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
        };
        UserCard.prototype.showSearch = function () {
            this.CommonService.showSearchModal();
        };
        UserCard.prototype.sendMessage = function () {
            this.$scope.cancel();
            this.$rootScope.stateGo('jdb.friend-request', {
                phone: this.$scope.model.phone,
                name: this.$scope.model.realName
            });
        };
        UserCard.prototype.sendRequest = function () {
            var self = this;
            this.FriendService.sendRequest({
                phone1: this.$rootScope.localUser().phone,
                phone2: this.$stateParams['phone'],
                message: this.$scope.requestText
            }).then(function (result) {
                if (result && result.code == 0) {
                    self.$rootScope.goBack();
                    window.plugins.toast.showShortCenter('申请发送成功');
                }
                else if (result.code == '111') {
                    self.$rootScope.goBack();
                    window.plugins.toast.showShortCenter('你们已经是好友关系');
                }
                else {
                    window.plugins.toast.showShortCenter('申请发送失败');
                }
            }, function () {
                window.plugins.toast.showShortCenter('申请发送失败');
            });
        };
        UserCard.prototype.deleteFriend = function () {
            this.FriendService.deleteFriend({
                phone1: this.$rootScope.localUser().phone,
                phone2: this.$scope.model.phone
            }).then(function (result) {
                if (result && result.code == 0) {
                    window.plugins.toast.showShortCenter('成功解除好友关系');
                }
                else if (result.code == 112) {
                    window.plugins.toast.showShortCenter('对方不是您的好友');
                }
                else {
                    window.plugins.toast.showShortCenter('删除好友失败');
                }
            }, function (err) {
                window.plugins.toast.showShortCenter('删除好友失败');
            });
        };
        return UserCard;
    })();
    UserCard.$inject = ['$rootScope', '$scope', 'UserService', 'CommonService', '$stateParams', 'FriendService'];
    JDB.CtrlModule.controller('UserCardCtrl', UserCard);
    JDB.CtrlModule.controller('FriendRequestCtrl', UserCard);
})(JDB || (JDB = {}));
//# sourceMappingURL=user-card.js.map