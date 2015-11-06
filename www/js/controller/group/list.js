/**
 * Created by AaronYuan on 11/6/15.
 */
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
    var GroupList = (function () {
        function GroupList($rootScope, $scope, $stateParams, CommonService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.CommonService = CommonService;
            $scope.showReport = angular.bind(CommonService, CommonService.showReport);
            this.renderView();
        }
        GroupList.prototype.renderView = function () {
            var action = this.$stateParams['action'];
            if (action == 'all') {
                this.$scope.viewTitle = '所有圈子';
                this.refreshAllGroup();
            }
            else if (action == 'group') {
                this.$scope.viewTitle = '我的圈子';
                this.refreshMineGroup();
            }
        };
        //我的圈子，初始化
        GroupList.prototype.refreshMineGroup = function () {
        };
        GroupList.prototype.refreshAllGroup = function () {
        };
        return GroupList;
    })();
    GroupList.$inject = ['$rootScope', '$scope', '$stateParams', 'CommonService'];
    JDB.CtrlModule.controller('GroupListCtrl', GroupList);
})(JDB || (JDB = {}));
//# sourceMappingURL=list.js.map