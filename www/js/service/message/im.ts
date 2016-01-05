/**
 * Created by AaronYuan on 12/3/15.
 */
/// <reference path="../../app.ts" />

module JDB{
    'use strict';

    declare var window, Easemob;

    var imkeeper = null;

    export interface IIMService{
        //发送消息
        sendMessage(options:any):ng.IPromise<any>;
        //获取好友列表
        getFriendList():ng.IPromise<any>;
        //发送添加好友请求
        addFriendRequest(args: any):void;
    }

    class IM {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $q: ng.IQService
        ){

            this.initIMconfig();

            var self = this;
            $rootScope.$on('event:login-success', function(){
                self.init();
                self.open();
            });

            $rootScope.$on('event:logout', function(){
                //imkeeper && imkeeper.close();
            });
        }

        initIMconfig(){
            Easemob.im.config = {
                xmppURL: 'wss://im-api.easemob.com/ws/',
                apiURL: '',
                appkey: appKey,
                https : true
            };

            imkeeper = new Easemob.im.Connection();
            console.log('init config');
            console.log(imkeeper);
        }

        init(){

            imkeeper.init({
                //登陆时
                onOpened: function(){
                    console.log('环信登陆成功');
                    imkeeper.setPresence();
                },
                onPresence: this._onPresence,
                onTextMessage:this._onTextMessage
            });
        }

        open(){
            imkeeper.open({
                user : '2',
                pwd : 'e2a6a1ace352668000aed191a817d143',
                appKey : appKey
            });
        }

        sendMessage(options: any): ng.IPromise<any> {
            var defer = this.$q.defer();

            imkeeper.sendTextMessage(options);

            return defer.promise;
        }

        _onTextMessage(message){
            console.log(message);
            if(message.type == 'groupchat'){

            }else{

            }
        }
        _onPresence(message){
            console.log(message);
        }
        //获取好友列表
        getFriendList(args:any):ng.IPromise<any> {
            var defer = this.$q.defer();

            imkeeper.getRoster({
                success: function(list){
                    console.log(list);
                }
            });

            return defer.promise;
        }

        addFriendRequest(args: any): void{
            imkeeper.subscribe({
                to : args.to,
                message :args.message
            });
        }

    }

    IM.$inject = ['$rootScope', '$q'];
    ServiceModule.service('IMService', IM);
}
