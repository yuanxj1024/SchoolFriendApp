/**
 * Created by AaronYuan on 11/21/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
//举报
var JDB;
(function (JDB) {
    'use strict';
    var currentReportUser = null;
    var Report = (function () {
        function Report($rootScope, $q, $resource, CommonService) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.CommonService = CommonService;
            this.resource = $resource(JDB.appHost + '/inform/:action', {
                action: '@action'
            }, {
                report: {
                    method: 'POST',
                    needAccessToken: true,
                    isArray: false,
                    params: {
                        action: 'createinform'
                    }
                }
            });
        }
        Report.prototype.report = function (args, callback) {
            this.$rootScope.requestHandler(this.resource.report, args, true).then(function (res) {
                if (res.code == 0) {
                    window.plugins.toast.showShortCenter('举报成功');
                    callback && callback();
                }
                else {
                    window.plugins.toast.showShortCenter('提交数据失败，请稍后重试');
                }
            }, function (err) {
                window.plugins.toast.showShortCenter('提交数据失败，请稍后重试');
            });
        };
        return Report;
    })();
    Report.$inject = ['$rootScope', '$q', '$resource', 'CommonService'];
    JDB.ServiceModule.service('ReportService', Report);
})(JDB || (JDB = {}));
//# sourceMappingURL=report.js.map