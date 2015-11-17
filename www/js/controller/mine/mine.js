/**
 *
 * Created by AaronYuan on 10/31/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
/// <reference path="../../service/mine/mine.ts" />
//我的
var JDB;
(function (JDB) {
    'use strict';
    var Mine = (function () {
        function Mine($rootScope, $scope, $stateParams, MineService, $state) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.MineService = MineService;
            this.$state = $state;
            console.log('mine');
            console.log($state);
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
        Mine.prototype.changeHeaderImg = function () {
        };
        return Mine;
    })();
    Mine.$inject = ['$rootScope', '$scope', '$stateParams', 'MineService', '$state'];
    JDB.CtrlModule.controller('MineCtrl', Mine);
})(JDB || (JDB = {}));
//# sourceMappingURL=mine.js.map