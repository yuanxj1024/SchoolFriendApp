/**
 * Created by AaronYuan on 11/14/15.
 */
//圈子
/// <reference path="../../app.ts" />
/// <reference path="../common.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var Group = (function () {
        function Group($rootScope, $q, $resource, CommonService) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.CommonService = CommonService;
            this.groupResource = $resource(JDB.appHost + '/:action', {
                action: '@action'
            }, {
                userList: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'userList'
                    }
                }
            });
        }
        Group.prototype.showChooseMemberModal = function (args) {
            var scope = this.$rootScope.$new();
            scope.params = args;
            return this.$rootScope.createModal('/templates/group/choose-member-modal.html', scope);
        };
        return Group;
    })();
    Group.$inject = ['$rootScope', '$q', '$resource', 'CommonService'];
    JDB.ServiceModule.service('GroupService', Group);
})(JDB || (JDB = {}));
//# sourceMappingURL=group.js.map