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
        function Common($rootScope, $ionicModal, $ionicActionSheet, $q, $ionicPopup, Upload) {
            this.$rootScope = $rootScope;
            this.$ionicModal = $ionicModal;
            this.$ionicActionSheet = $ionicActionSheet;
            this.$q = $q;
            this.$ionicPopup = $ionicPopup;
            this.Upload = Upload;
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
            var defer = this.$q.defer();
            if (reportSheet) {
                defer.resolve();
                return defer.promise;
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
                    reportSheet = null;
                    defer.resolve(index);
                    return true;
                }
            });
            return defer.promise;
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
                { text: '相册' }
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
        Common.prototype.showConfirm = function (title, tpl) {
            var defer = this.$q.defer();
            var confirmPopup = this.$ionicPopup.confirm({
                title: title || '提示',
                template: tpl || '',
                cancelText: '取消',
                okText: '确定'
            });
            confirmPopup.then(function (res) {
                defer.resolve(res);
            });
            return defer.promise;
        };
        Common.prototype.showAlert = function (title, tpl) {
            var defer = this.$q.defer();
            var alertPopup = this.$ionicPopup.alert({
                title: title,
                template: tpl,
                okText: '确定'
            });
            alertPopup.then(function (res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
            return defer.promise;
        };
        //上传文件
        Common.prototype.uploadFile = function (args) {
            var defer = this.$q.defer();
            this.Upload.upload(angular.extend({
                url: JDB.appHost + (args.url || '/image/upload'),
                file: args.file
            }, args.fields)).then(function (res) {
                defer.resolve(res);
            }, function (res) {
                window.plugins.toast.showShortCenter('上传失败，请稍后重试');
                defer.reject(res);
            }, function (evt) {
                args.progressFn && args.progressFn(evt);
            });
            return defer.promise;
        };
        Common.prototype.showReport = function (args) {
            var scope = this.$rootScope.$new();
            scope.typeName = args.typeName || '';
            scope.id = args.id || 0;
            this.$rootScope.createModal('/templates/part/report-modal.html', scope);
        };
        //显示评论界面
        Common.prototype.replyModal = function (args) {
            var scope = this.$rootScope.$new();
            scope.params = args;
            this.$rootScope.createModal('/templates/topic/reply-modal.html', scope);
        };
        return Common;
    })();
    Common.$inject = ['$rootScope', '$ionicModal', '$ionicActionSheet', '$q', '$ionicPopup', 'Upload'];
    JDB.ServiceModule.service('CommonService', Common);
})(JDB || (JDB = {}));
//# sourceMappingURL=common.js.map