/**
 * Created by AaronYuan on 11/17/15.
 */
//个人名片
/// <reference path="../../app.ts" />
/// <reference path="../../service/user/user.ts" />
/// <reference path="../../service/common.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var UserCard = (function () {
        function UserCard($rootScope, $scope, UserService, CommonService, $stateParams) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.UserService = UserService;
            this.CommonService = CommonService;
            this.$stateParams = $stateParams;
            $scope.showMore = angular.bind(this, this.showMore);
            $scope.showSearch = angular.bind(this, this.showSearch);
            console.log($stateParams);
        }
        UserCard.prototype.showMore = function () {
            this.CommonService.showActionSheet('user-card-more', [
                { text: '举报' },
                { text: '删除好友' }
            ]).then(function (index) {
                console.log('user more' + index);
            });
        };
        UserCard.prototype.showSearch = function () {
            this.CommonService.showSearchModal();
        };
        return UserCard;
    })();
    UserCard.$inject = ['$rootScope', '$scope', 'UserService', 'CommonService', '$stateParams'];
    JDB.CtrlModule.controller('UserCardCtrl', UserCard);
})(JDB || (JDB = {}));
//# sourceMappingURL=user-card.js.map