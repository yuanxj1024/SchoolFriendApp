/**
 *
 * Created by AaronYuan on 10/31/15.
 */
/// <reference path="../../app.ts" />
//我的
var JDB;
(function (JDB) {
    'use strict';
    var Mine = (function () {
        function Mine($rootScope, $scope) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
        }
        return Mine;
    })();
    Mine.$inject = ['$rootScope', '$scope'];
    JDB.CtrlModule.controller('MineCtrl', Mine);
})(JDB || (JDB = {}));
//# sourceMappingURL=mine.js.map