/**
 * Created by AaronYuan on 11/11/15.
 */

/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
/// <reference path="../../service/activity/activity.ts" />

//添加活动

module JDB {
    'use strict';

    declare var window;

    interface IActivityCreateScope extends ng.IScope {
        //显示选择图片sheet
        showImageSheet: Function;

        activityForm: any;

        save: Function;

        startDateObj: any;
        startTimeObj: any;
        endDateObj: any;
        endTimeObj: any;

    }

    class ActivityCreate {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IActivityCreateScope,
            public CommonService: ICommonService,
            public ActivityService: IActivityService,
            public $filter: ng.IFilterService
        ){
            $scope.showImageSheet = angular.bind(this, this.showImageSheet);
            $scope.save = angular.bind(this, this.save);

            this.init();
            this.initDatePicker();
        }

        init(){
            this.$scope.activityForm ={
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
                otherInfo:'',
                contactMan: '',
                contactPhone:'',
                contactEmail: '',
            };


        }

        initDatePicker(){
            var weekDaysList = ['日','一','二','三','四','五','六'],
                monthList = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
                self = this;


            var dateObj = {
                    titleLabel: '选择日期',  //Optional
                    todayLabel: '今天',  //Optional
                    closeLabel: '关闭',  //Optional
                    setLabel: '选择',  //Optional
                    inputDate: new Date(),  //Optional
                    weekDaysList: weekDaysList, //Optional
                    monthList: monthList, //Optional
                    templateType: 'popup', //Optional
                    from: new Date(2015,1,1), //Optional
                    to: new Date(2030, 1, 1),  //Optional
                    callback: function (val) {  //Mandatory
                        self.datePickerCallback(this.tag, val);
                    },
                    dateFormat: 'dd-MM-yyyy', //Optional
                },
                timePickerObject = {
                    inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
                    step: 15,  //Optional
                    format:24,  //Optional
                    titleLabel: '24小时',  //Optional
                    setLabel: '选择',  //Optional
                    closeLabel: '关闭',  //Optional
                    //setButtonType: 'button-positive',  //Optional
                    //closeButtonType: 'button-stable',  //Optional
                    callback: function (val) {    //Mandatory
                        self.datePickerCallback(this.tag, val);
                    }
                };

            this.$scope.startDateObj = angular.extend({},dateObj,{
                tag: 'startDate',
                titleLabel: '开始日期',  //Optional

            });
            this.$scope.endDateObj = angular.extend({},dateObj,{
                tag: 'endDate',
                titleLabel: '结束日期',  //Optional
            });

            this.$scope.startTimeObj = angular.extend({},timePickerObject,{
                tag: 'startTime',
                titleLabel: '开始时间'
            });
            this.$scope.endTimeObj = angular.extend({},timePickerObject,{
                tag: 'endTime',
                titleLabel: '结束时间'
            });

        }

        datePickerCallback(tag,val){
            switch (tag){
                case 'startDate':
                    this.$scope.activityForm.sDate = this.$filter('date')(val,'yyyy-MM-dd');
                    break;
                case 'endDate':
                    this.$scope.activityForm.eDate = this.$filter('date')(val,'yyyy-MM-dd');
                    break;
                case 'startTime':
                    if(val){
                        var selectedTime = new Date(val * 1000);
                        this.$scope.activityForm.sTime = (selectedTime.getUTCHours() <10 ? '0'+ selectedTime.getUTCHours(): selectedTime.getUTCHours()) + ':'+ (selectedTime.getUTCMinutes() < 10? '0'+selectedTime.getUTCMinutes(): selectedTime.getUTCMinutes());
                    }
                    break;
                case 'endTime':
                    if(val){
                        var selectedTime = new Date(val * 1000);
                        this.$scope.activityForm.eTime = (selectedTime.getUTCHours() <10 ? '0'+ selectedTime.getUTCHours(): selectedTime.getUTCHours() )+ ':'+  (selectedTime.getUTCMinutes() < 10? '0'+selectedTime.getUTCMinutes(): selectedTime.getUTCMinutes());
                    }
                    break;
            }
        }


        showImageSheet() {
            this.CommonService.showChooseImg().then(function(index){
                console.log(index);
            });
        }

        validate(valid){
            var msg = '';

            if(!valid){
                msg = '请将信息填写完整';
            }
            else if(msg){
                window.plugins.toast.showShortCenter(msg);
                return false;
            }
            return true;
        }

        save($valid){
            console.log($valid);

            if(this.validate($valid)){

            }
        }


    }

    ActivityCreate.$inject = ['$rootScope', '$scope', 'CommonService', 'ActivityService', '$filter'];
    CtrlModule.controller('ActivityCreateCtrl', ActivityCreate);
}
