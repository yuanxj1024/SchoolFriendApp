/**
 *
 * Created by AaronYuan on 11/4/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
//我的，列表页
// 我的圈子，我的话题
// 我参与的， 我发起的
var JDB;
(function (JDB) {
    'use strict';
    var MineList = (function () {
        function MineList($rootScope, $scope, $stateParams, CommonService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.CommonService = CommonService;
            $scope.showDropMenu = angular.bind(CommonService, CommonService.showDropMenu);
            this.renderView();
        }
        MineList.prototype.renderView = function () {
            var action = this.$stateParams['action'];
            if (action == 'group') {
                this.initForGroup();
            }
            else if (action == 'group') {
                this.initForTopic();
            }
            else if (action == 'release') {
                this.$scope.viewTitle = '我发布的';
            }
            else if (action == 'join') {
                this.$scope.viewTitle = '我参与的';
            }
        };
        //我的圈子，初始化
        MineList.prototype.initForGroup = function () {
        };
        //我的话题，初始化
        MineList.prototype.initForTopic = function () {
        };
        return MineList;
    })();
    MineList.$inject = ['$rootScope', '$scope', '$stateParams', 'CommonService'];
    JDB.CtrlModule.controller('MineListCtrl', MineList);
})(JDB || (JDB = {}));
//# sourceMappingURL=mine-list.js.map