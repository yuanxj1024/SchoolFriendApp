/**
 * Created by AaronYuan on 11/21/15.
 */
//举报
/// <reference path="../../app.ts" />
/// <reference path="../../service/public/report.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var category = [
        '色情',
        '欺诈',
        '侮辱诋毁',
        '广告骚扰',
        '政治',
        '非交大校友'
    ];
    var Report = (function () {
        function Report($rootScope, $scope, ReportService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.ReportService = ReportService;
            $scope.save = angular.bind(this, this.save);
            $scope.categoryItemClicked = angular.bind(this, this.categoryItemClicked);
            $scope.reportCategory = category;
            $scope.reportForm = {
                content: ''
            };
            this.$scope.selectedCategory = category[0];
        }
        Report.prototype.save = function () {
            this.ReportService.report({
                phone: this.$rootScope.User.phone,
                reason: this.$scope.selectedCategory,
                otherInfo: this.$scope.reportForm.content,
                assoId: this.ReportService.getReportObject()
            }, function () {
                this.$scope.cancel();
            }.bind(this));
        };
        Report.prototype.categoryItemClicked = function (item) {
            this.$scope.selectedCategory = item;
        };
        return Report;
    })();
    Report.$inject = ['$rootScope', '$scope', 'ReportService'];
    JDB.CtrlModule.controller('ReportCtrl', Report);
})(JDB || (JDB = {}));
//# sourceMappingURL=report.js.map