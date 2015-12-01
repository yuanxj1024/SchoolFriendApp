/**
 * Created by AaronYuan on 10/29/15.
 */

/// <reference path="../app.ts" />

// 公共服务
module JDB {
    'use strict';

    declare var window;

    //搜索页实例
    var searchModal = null,
        reportSheet = null,
        schoolSheet = null;


    export interface ICommonService {
        //显示搜索页
        showSearchModal:Function;

        //菜单
        showDropMenu(args: any): ng.IPromise<any>;

        //显示登录页面
        showLoginModal(): void;

        //学校选择
        showSchoolList(callback: any): void;

        //话题分类选择
        showTopicCategroy(): void;

        //图片选择
        showChooseImg(): ng.IPromise<any>;

        //通用打开ActionSheet
        showActionSheet(name: string ,buttons:Array<any>): ng.IPromise<any>;

        //打开个人名片
        showUserCardModal(args: any): ng.IPromise<any>;
        //上传文件
        uploadFile(args: IUploadFileArgs): ng.IPromise<any>;

        //显示举报内容
        showReport: Function;
        //打开评论
        replyModal(args:any): void;
        showConfirm(title:string, tpl:string):ng.IPromise<any>;
        showAlert(title:string, tpl:string): ng.IPromise<any>;

    }


    //上传文件参数
    export interface IUploadFileArgs {
        url?: string;
        progressFn?: any;
        fields?: any;
        file: any;
    }



    class Common implements ICommonService{
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $ionicModal: Ionic.IModal,
            public $ionicActionSheet: Ionic.IActionSheet,
            public $q: ng.IQService,
            public $ionicPopup: Ionic.IPopup,
            public Upload: any
        ){

        }


        showSearchModal(){
            if(searchModal){
                return null;
            }
            searchModal = <Ionic.IModal>{};

            var subScope = <any>this.$rootScope.$new();

            subScope.$on('modal.removed', function(){
                searchModal = null;
            });
            subScope.cancel = function(){
                searchModal.remove();
                searchModal = null;
            };

            this.$ionicModal.fromTemplateUrl('/templates/search-modal.html',{
                scope: subScope,
                animation: 'slide-in-up'
            }).then(function(modal){
                searchModal = modal;
                modal.show();
            });
        }

        showDropMenu(args: any):ng.IPromise<any> {
            var defer =  this.$q.defer();
            if(reportSheet){
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
                cancel: function() {
                    reportSheet = null;
                },
                buttonClicked: function(index) {
                    //索引从零开始
                    reportSheet = null;
                    defer.resolve(index);
                    return true;
                }
            });
            return defer.promise;
        }

        showLoginModal():void {
            this.$rootScope.createModal('/templates/mine/login.html');
        }

        //打开学校列表
        showSchoolList(callback:any){
            if(schoolSheet){
                return null;
            }
            schoolSheet = {};

            schoolSheet = this.$ionicActionSheet.show({
                buttons: window.JDBTypes.schoolSheet,
                cancelText: '取消',
                cancel: function() {
                    schoolSheet = null;
                },
                buttonClicked: function(index) {
                    //索引从零开始
                    console.log(index);
                    callback && callback(index);
                    schoolSheet = null;
                    return true;
                }
            });
        }
        //话题分类
        showTopicCategroy(): void {
            this.$rootScope.createModal('/templates/topic/choose-category.html');
        }

        //打开选择图片sheet
        showChooseImg(){
            return this.showActionSheet('chooseImg',[
                    { text: '相册' }
                ]);
        }

        //通用打开ActionSheet
        showActionSheet(name: string ,buttons:Array<any>): ng.IPromise<any> {
            var defer = this.$q.defer(),
                self = this;
            if(this[name]){
                return null;
            }
            this[name] = {};
            self[name] = this.$ionicActionSheet.show({
                buttons: buttons,
                cancelText: '取消',
                cancel: function() {
                    self[name] = null;
                    defer.reject();
                },
                buttonClicked: function(index) {
                    console.log(index);
                    self[name] = null;
                    defer.resolve(index);
                    return true;
                }
            });
            return defer.promise;
        }

        //打开个人名片
        showUserCardModal(args:any){
            var scope:any = this.$rootScope.$new();
            scope.params = args;
            return this.$rootScope.createModal('/templates/discover/user-card-modal.html', scope);
        }


        showConfirm(title:string, tpl:string):ng.IPromise<any> {
            var defer = this.$q.defer();
            var confirmPopup = this.$ionicPopup.confirm({
                title: title|| '提示',
                template: tpl|| ''
            });
            confirmPopup.then(function(res) {
                defer.resolve(res);
            });
            return defer.promise;
        }
        showAlert(title:string, tpl:string): ng.IPromise<any>{
            var defer = this.$q.defer();
            var alertPopup = this.$ionicPopup.alert({
                title: title,
                template:tpl
            });
            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
            return defer.promise;
        }
        //上传文件
        uploadFile(args: IUploadFileArgs): ng.IPromise<any> {
            var defer = this.$q.defer();
            this.Upload.upload( angular.extend({
                url: appHost + (args.url || '/image/upload'),
                file: args.file
            },args.fields)).then(function(res){
                defer.resolve(res);
            },function(res){
                window.plugins.toast.showShortCenter('上传失败，请稍后重试');
                defer.reject(res);
            },function(evt){
                args.progressFn && args.progressFn(evt);
            });
            return defer.promise;
        }

        showReport(args: any){
            var scope:any = this.$rootScope.$new();
            scope.typeName =  args.typeName||'';
            scope.id = args.id|| 0;
            this.$rootScope.createModal('/templates/part/report-modal.html', scope);
        }


        //显示评论界面
        replyModal(args:any): void{
            var scope:any = this.$rootScope.$new();
            scope.params = args;
            this.$rootScope.createModal('/templates/topic/reply-modal.html', scope);
        }
    }

    Common.$inject = ['$rootScope', '$ionicModal', '$ionicActionSheet', '$q', '$ionicPopup', 'Upload'];
    ServiceModule.service('CommonService', Common);

}
