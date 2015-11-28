/**
 * Created by AaronYuan on 11/11/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
/// <reference path="../../service/activity/activity.ts" />
//添加活动
var JDB;
(function (JDB) {
    'use strict';
    var ActivityCreate = (function () {
        function ActivityCreate($rootScope, $scope, CommonService, ActivityService, $filter) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.CommonService = CommonService;
            this.ActivityService = ActivityService;
            this.$filter = $filter;
            $scope.showImageSheet = angular.bind(this, this.showImageSheet);
            $scope.save = angular.bind(this, this.save);
            this.init();
            this.initDatePicker();
        }
        ActivityCreate.prototype.init = function () {
            this.$scope.activityForm = {
                title: '',
                picPath: '',
                startTime: '',
                sTime: '',
                sDate: '',
                endTime: '',
                eTime: '',
                eDate: '',
                personLimit: '',
                city: '',
                address: '',
                activityDesc: '',
                joinFee: '',
                otherInfo: '',
                contactMan: '',
                contactPhone: '',
                contactEmail: ''
            };
        };
        ActivityCreate.prototype.initDatePicker = function () {
            var weekDaysList = ['日', '一', '二', '三', '四', '五', '六'], monthList = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'], self = this;
            var dateObj = {
                titleLabel: '选择日期',
                todayLabel: '今天',
                closeLabel: '关闭',
                setLabel: '选择',
                inputDate: new Date(),
                weekDaysList: weekDaysList,
                monthList: monthList,
                templateType: 'popup',
                from: new Date(2015, 1, 1),
                to: new Date(2030, 1, 1),
                callback: function (val) {
                    self.datePickerCallback(this.tag, val);
                },
                dateFormat: 'dd-MM-yyyy'
            }, timePickerObject = {
                inputEpochTime: ((new Date()).getHours() * 60 * 60),
                step: 15,
                format: 24,
                titleLabel: '24小时',
                setLabel: '选择',
                closeLabel: '关闭',
                //setButtonType: 'button-positive',  //Optional
                //closeButtonType: 'button-stable',  //Optional
                callback: function (val) {
                    self.datePickerCallback(this.tag, val);
                }
            };
            this.$scope.startDateObj = angular.extend({}, dateObj, {
                tag: 'startDate',
                titleLabel: '开始日期'
            });
            this.$scope.endDateObj = angular.extend({}, dateObj, {
                tag: 'endDate',
                titleLabel: '结束日期'
            });
            this.$scope.startTimeObj = angular.extend({}, timePickerObject, {
                tag: 'startTime',
                titleLabel: '开始时间'
            });
            this.$scope.endTimeObj = angular.extend({}, timePickerObject, {
                tag: 'endTime',
                titleLabel: '结束时间'
            });
        };
        ActivityCreate.prototype.datePickerCallback = function (tag, val) {
            switch (tag) {
                case 'startDate':
                    this.$scope.activityForm.sDate = this.$filter('date')(val, 'yyyy-MM-dd');
                    break;
                case 'endDate':
                    this.$scope.activityForm.eDate = this.$filter('date')(val, 'yyyy-MM-dd');
                    break;
                case 'startTime':
                    if (val) {
                        var selectedTime = new Date(val * 1000);
                        this.$scope.activityForm.sTime = (selectedTime.getUTCHours() < 10 ? '0' + selectedTime.getUTCHours() : selectedTime.getUTCHours()) + ':' + (selectedTime.getUTCMinutes() < 10 ? '0' + selectedTime.getUTCMinutes() : selectedTime.getUTCMinutes());
                    }
                    break;
                case 'endTime':
                    if (val) {
                        var selectedTime = new Date(val * 1000);
                        this.$scope.activityForm.eTime = (selectedTime.getUTCHours() < 10 ? '0' + selectedTime.getUTCHours() : selectedTime.getUTCHours()) + ':' + (selectedTime.getUTCMinutes() < 10 ? '0' + selectedTime.getUTCMinutes() : selectedTime.getUTCMinutes());
                    }
                    break;
            }
        };
        ActivityCreate.prototype.showImageSheet = function () {
            this.CommonService.showChooseImg().then(function (index) {
                console.log(index);
            });
        };
        ActivityCreate.prototype.validate = function (valid) {
            var msg = '';
            if (!valid) {
                msg = '请将信息填写完整';
            }
            else if (msg) {
                window.plugins.toast.showShortCenter(msg);
                return false;
            }
            return true;
        };
        ActivityCreate.prototype.save = function ($valid) {
            console.log($valid);
            if (this.validate($valid)) {
            }
        };
        return ActivityCreate;
    })();
    ActivityCreate.$inject = ['$rootScope', '$scope', 'CommonService', 'ActivityService', '$filter'];
    JDB.CtrlModule.controller('ActivityCreateCtrl', ActivityCreate);
})(JDB || (JDB = {}));
//# sourceMappingURL=create.js.map