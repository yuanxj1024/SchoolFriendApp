/**
 * Created by AaronYuan on 10/29/15.
 */
/// <reference path="../app.ts" />
// 公共服务
var JDB;
(function (JDB) {
    'use strict';
    //搜索页实例
    var searchModal = null, reportSheet = null, loginModal = null;
    var Common = (function () {
        function Common($rootScope, $ionicModal, $ionicActionSheet, $q) {
            this.$rootScope = $rootScope;
            this.$ionicModal = $ionicModal;
            this.$ionicActionSheet = $ionicActionSheet;
            this.$q = $q;
        }
        Common.prototype.showSearchModal = function () {
            if (searchModal) {
                return null;
            }
            searchModal = {};
            var subScope = this.$rootScope.$new();
            subScope.$on('modal.removed', function () {
                searchModal = null;
            });
            subScope.cancel = function () {
                searchModal.remove();
                searchModal = null;
            };
            this.$ionicModal.fromTemplateUrl('/templates/search-modal.html', {
                scope: subScope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                searchModal = modal;
                modal.show();
            });
        };
        Common.prototype.showReport = function (args) {
            if (reportSheet) {
                return null;
            }
            reportSheet = {};
            reportSheet = this.$ionicActionSheet.show({
                buttons: [
                    { text: '<b>举报</b>' },
                    { text: '删除好友' },
                    { text: '不看TA的话题' }
                ],
                cancelText: '取消',
                cancel: function () {
                    reportSheet = null;
                },
                buttonClicked: function (index) {
                    //索引从零开始
                    console.log(index);
                    reportSheet = null;
                    return true;
                }
            });
        };
        Common.prototype.showLoginModal = function () {
            this.$rootScope.createModal('/templates/mine/login.html');
        };
        Common.prototype.showSchoolList = function () {
        };
        return Common;
    })();
    Common.$inject = ['$rootScope', '$ionicModal', '$ionicActionSheet', '$q'];
    JDB.ServiceModule.service('CommonService', Common);
})(JDB || (JDB = {}));
//# sourceMappingURL=common.js.map