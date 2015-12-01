/**
 * Created by AaronYuan on 11/28/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var Discover = (function () {
        function Discover($rootScope, $q, $resource) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.resource = $resource(JDB.appHost + '/discover/:action', {
                action: '@action'
            }, {
                index: {
                    method: 'GET',
                    needAccessToken: true,
                    isArray: false,
                    params: {
                        action: 'recommend'
                    }
                },
                groupList: {
                    method: 'GET',
                    needAccessToken: true,
                    isArray: false,
                    params: {
                        action: 'list'
                    }
                },
                friendList: {
                    method: 'GET',
                    needAccessToken: true,
                    isArray: false,
                    params: {
                        action: 'list'
                    }
                },
                createGroup: {
                    method: 'GET',
                    needAccessToken: true,
                    isArray: false,
                    params: {
                        action: 'list'
                    }
                }
            });
        }
        Discover.prototype.index = function (args) {
            return this.$rootScope.requestHandler(this.resource.index, args);
        };
        Discover.prototype.groupList = function (args) {
            return this.$rootScope.requestHandler(this.resource.groupList, args);
        };
        Discover.prototype.friendList = function (args) {
            return this.$rootScope.requestHandler(this.resource.friendList, args);
        };
        return Discover;
    })();
    Discover.$inject = ['$rootScope', '$q', '$resource'];
    JDB.ServiceModule.service('DiscoverService', Discover);
})(JDB || (JDB = {}));
//# sourceMappingURL=discover.js.map