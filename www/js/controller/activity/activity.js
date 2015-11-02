/**
 * Created by AaronYuan on 10/29/15.
 */
/// <reference path="../../app.ts" />
//活动
var JDB;
(function (JDB) {
    'use strict';
    var Activity = (function () {
        function Activity($rootScope, $scope) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
        }
        return Activity;
    })();
    Activity.$inject = ['$rootScope', '$scope'];
    JDB.CtrlModule.controller('ActivityCtrl', Activity);
})(JDB || (JDB = {}));
//# sourceMappingURL=activity.js.map