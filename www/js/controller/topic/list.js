/**
 *
 * Created by AaronYuan on 11/7/15.
 */
/// <reference path="../../app.ts" />
//话题列表
var JDB;
(function (JDB) {
    'use strict';
    var TopicList = (function () {
        function TopicList($rootScope, $scope, $stateParams) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            $scope.changeTabs = angular.bind(this, this.changeTabs);
            $scope.closeTip = angular.bind(this, this.closeTip);
            console.log($stateParams);
            $scope.topicTag = $stateParams['tag'] || 1;
            $scope.topicTitle = window.JDBTypes.TopicTypes[$scope.topicTag];
            $scope.tabIndex = 1;
            $scope.hasTip = true;
        }
        TopicList.prototype.refresh = function () {
        };
        TopicList.prototype.changeTabs = function (index) {
            this.$scope.tabIndex = index;
            this.refresh();
        };
        TopicList.prototype.closeTip = function () {
            this.$scope.hasTip = false;
        };
        return TopicList;
    })();
    TopicList.$inject = ['$rootScope', '$scope', '$stateParams'];
    JDB.CtrlModule.controller('TopListCtrl', TopicList);
})(JDB || (JDB = {}));
//# sourceMappingURL=list.js.map