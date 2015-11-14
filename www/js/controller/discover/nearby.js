/**
 * Created by AaronYuan on 11/13/15.
 */
//附近的人
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var Nearby = (function () {
        function Nearby($rootScope, $scope, CommonService, $stateParams) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.CommonService = CommonService;
            this.$stateParams = $stateParams;
            console.log($stateParams);
        }
        return Nearby;
    })();
    Nearby.$inject = ['$rootScope', '$scope', 'CommonService', '$stateParams'];
    JDB.CtrlModule.controller('NearbyCtrl', Nearby);
})(JDB || (JDB = {}));
//# sourceMappingURL=nearby.js.map