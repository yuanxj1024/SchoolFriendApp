/**
 * Created by AaronYuan on 11/13/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />

//消息首页
module JDB {
    'use strict';

    declare  var window;

    interface IMessageScope extends ng.IScope {
        //右上角添加按钮
        showAddSheet: Function;
    }

    class Message {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IMessageScope,
            public CommonService: ICommonService
        ){
            $scope.showAddSheet = angular.bind(this, this.showAddSheet);


            $rootScope.$once('event:refresh-all-slide-view',function(){
                console.log('message refresh');
            });
        }

        showAddSheet() {
            var self = this;
            this.CommonService.showActionSheet('message-add', [
                { text: '创建圈子'},
                { text: '添加好友'}
            ]).then(function(index){
                self.sheetClickHandler(index);
            });
        }

        sheetClickHandler(index){
            switch (index){
                case 0:
                    this.$rootScope.stateGo('jdb.group-create',{from: 'jdb.message'});
                    break;
                case 1:
                    this.$rootScope.stateGo('jdb.nearby',{from: 'jdb.message'});
                    break;
            }
        }

    }

    Message.$inject = ['$rootScope', '$scope', 'CommonService'];
    CtrlModule.controller('MessageCtrl', Message);
}

