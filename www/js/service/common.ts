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

        //举报
        showDropMenu(args: any): void;

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

    }

    class Common implements ICommonService{
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $ionicModal: Ionic.IModal,
            public $ionicActionSheet: Ionic.IActionSheet,
            public $q: ng.IQService
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

        showDropMenu(args: any){
            if(reportSheet){
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
                cancel: function() {
                    reportSheet = null;
                },
                buttonClicked: function(index) {
                    //索引从零开始
                    console.log(index);
                    reportSheet = null;
                    return true;
                }
            });
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
                    { text: '拍照' }
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

    }

    Common.$inject = ['$rootScope', '$ionicModal', '$ionicActionSheet', '$q'];
    ServiceModule.service('CommonService', Common);

}
