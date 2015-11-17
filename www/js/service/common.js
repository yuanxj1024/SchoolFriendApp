/**
 * Created by AaronYuan on 10/29/15.
 */
/// <reference path="../app.ts" />
// 公共服务
var JDB;
(function (JDB) {
    'use strict';
    //搜索页实例
    var searchModal = null, reportSheet = null, schoolSheet = null;
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
        Common.prototype.showDropMenu = function (args) {
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
        //打开学校列表
        Common.prototype.showSchoolList = function (callback) {
            if (schoolSheet) {
                return null;
            }
            schoolSheet = {};
            schoolSheet = this.$ionicActionSheet.show({
                buttons: window.JDBTypes.schoolSheet,
                cancelText: '取消',
                cancel: function () {
                    schoolSheet = null;
                },
                buttonClicked: function (index) {
                    //索引从零开始
                    console.log(index);
                    callback && callback(index);
                    schoolSheet = null;
                    return true;
                }
            });
        };
        //话题分类
        Common.prototype.showTopicCategroy = function () {
            this.$rootScope.createModal('/templates/topic/choose-category.html');
        };
        //打开选择图片sheet
        Common.prototype.showChooseImg = function () {
            return this.showActionSheet('chooseImg', [
                { text: '拍照' }
            ]);
        };
        //通用打开ActionSheet
        Common.prototype.showActionSheet = function (name, buttons) {
            var defer = this.$q.defer(), self = this;
            if (this[name]) {
                return null;
            }
            this[name] = {};
            self[name] = this.$ionicActionSheet.show({
                buttons: buttons,
                cancelText: '取消',
                cancel: function () {
                    self[name] = null;
                    defer.reject();
                },
                buttonClicked: function (index) {
                    console.log(index);
                    self[name] = null;
                    defer.resolve(index);
                    return true;
                }
            });
            return defer.promise;
        };
        //打开个人名片
        Common.prototype.showUserCardModal = function (args) {
            var scope = this.$rootScope.$new();
            scope.params = args;
            return this.$rootScope.createModal('/templates/discover/user-card-modal.html', scope);
        };
        return Common;
    })();
    Common.$inject = ['$rootScope', '$ionicModal', '$ionicActionSheet', '$q'];
    JDB.ServiceModule.service('CommonService', Common);
})(JDB || (JDB = {}));
//# sourceMappingURL=common.js.map