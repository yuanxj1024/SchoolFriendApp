/**
 * Created by AaronYuan on 11/14/15.
 */
//话题
/// <reference path="../../app.ts" />
/// <reference path="../../service/Common.ts" />
/// <reference path="../../service/user/user.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var Discover = (function () {
        function Discover($rootScope, $scope, CommonService, UserService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.CommonService = CommonService;
            this.UserService = UserService;
            $scope.openUserCard = angular.bind(this, this.openUserCard);
            //$scope.openUserCard(1);
            $rootScope.$once('event:refresh-all-slide-view', function () {
                console.log('discover refresh');
            });
        }
        Discover.prototype.openUserCard = function (item) {
            //this.UserService.openUserCard(1).then(function(res){
            //    console.log(123);
            //});
            this.CommonService.showUserCardModal({
                id: item
            }).then(function () {
            }, function (err) {
            });
        };
        return Discover;
    })();
    Discover.$inject = ['$rootScope', '$scope', 'CommonService', 'UserService'];
    JDB.CtrlModule.controller('DiscoverCtrl', Discover);
})(JDB || (JDB = {}));
//# sourceMappingURL=default.js.map