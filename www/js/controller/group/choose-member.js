/**
 * Created by AaronYuan on 11/14/15.
 */
//选择成员modal
/// <reference path="../../app.ts" />
/// <reference path="../../service/group/group.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var ChooseMember = (function () {
        function ChooseMember($rootScope, $scope, GroupService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.GroupService = GroupService;
            $scope.finishHandler = angular.bind(this, this.finishHandler);
            console.log('choose member modal');
            console.log($scope.params);
        }
        ChooseMember.prototype.finishHandler = function () {
            switch (this.$scope.params.action) {
                case window.JDBTypes.ChooseMemberAction.remove:
                    console.log('remove member');
                    break;
                case window.JDBTypes.ChooseMemberAction.admin:
                    console.log('set admin');
                    break;
                case window.JDBTypes.ChooseMemberAction.add:
                    console.log('add member');
                    break;
            }
        };
        return ChooseMember;
    })();
    ChooseMember.$inject = ['$rootScope', '$scope', 'GroupService'];
    JDB.CtrlModule.controller('ChooseMemberCtrl', ChooseMember);
})(JDB || (JDB = {}));
//# sourceMappingURL=choose-member.js.map