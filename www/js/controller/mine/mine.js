/**
 *
 * Created by AaronYuan on 10/31/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
//我的
var JDB;
(function (JDB) {
    'use strict';
    var Mine = (function () {
        function Mine($rootScope, $scope, $stateParams) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            console.log($stateParams);
            $scope.editTag = $stateParams['tag'];
            $scope.tagName = window.JDBTypes.InfoEditTags[$scope.editTag];
            if ($scope.editTag) {
                this.initForEdit();
            }
        }
        //编辑， 初始化
        Mine.prototype.initForEdit = function () {
        };
        return Mine;
    })();
    Mine.$inject = ['$rootScope', '$scope', '$stateParams'];
    JDB.CtrlModule.controller('MineCtrl', Mine);
})(JDB || (JDB = {}));
//# sourceMappingURL=mine.js.map