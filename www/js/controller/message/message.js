/**
 * Created by AaronYuan on 11/13/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
//消息首页
var JDB;
(function (JDB) {
    'use strict';
    var Message = (function () {
        function Message($rootScope, $scope, CommonService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.CommonService = CommonService;
            $scope.showAddSheet = angular.bind(this, this.showAddSheet);
            $rootScope.$once('event:refresh-all-slide-view', function () {
                console.log('message refresh');
            });
        }
        Message.prototype.showAddSheet = function () {
            var self = this;
            this.CommonService.showActionSheet('message-add', [
                { text: '创建圈子' },
                { text: '添加好友' }
            ]).then(function (index) {
                self.sheetClickHandler(index);
            });
        };
        Message.prototype.sheetClickHandler = function (index) {
            switch (index) {
                case 0:
                    this.$rootScope.stateGo('jdb.group-create', { from: 'jdb.message' });
                    break;
                case 1:
                    this.$rootScope.stateGo('jdb.nearby', { from: 'jdb.message' });
                    break;
            }
        };
        return Message;
    })();
    Message.$inject = ['$rootScope', '$scope', 'CommonService'];
    JDB.CtrlModule.controller('MessageCtrl', Message);
})(JDB || (JDB = {}));
//# sourceMappingURL=message.js.map