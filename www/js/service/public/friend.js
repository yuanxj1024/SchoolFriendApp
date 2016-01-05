/**
 * Created by AaronYuan on 11/30/15.
 */
/// <reference path="../../app.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var Friend = (function () {
        function Friend($rootScope, $q, $resource) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.resource = $resource(JDB.appHost + '/friend/:action', {
                action: '@action'
            }, {
                list: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'queryfriend'
                    }
                },
                sendRequest: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'addfriend'
                    }
                },
                deleteFriend: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'release'
                    }
                }
            });
        }
        Friend.prototype.list = function (args) {
            return this.$rootScope.requestHandler(this.resource.list, args);
        };
        Friend.prototype.sendRequest = function (args) {
            return this.$rootScope.requestHandler(this.resource.sendRequest, args, true);
        };
        //删除好友
        Friend.prototype.deleteFriend = function (args) {
            return this.$rootScope.requestHandler(this.resource.deleteFriend, args, true);
        };
        return Friend;
    })();
    Friend.$inject = ['$rootScope', '$q', '$resource'];
    JDB.ServiceModule.service('FriendService', Friend);
})(JDB || (JDB = {}));
//# sourceMappingURL=friend.js.map