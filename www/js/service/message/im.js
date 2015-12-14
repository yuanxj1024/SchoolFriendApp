/**
 * Created by AaronYuan on 12/3/15.
 */
/// <reference path="../../app.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var imkeeper = null;
    var IM = (function () {
        function IM($rootScope, $q) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.initIMconfig();
            var self = this;
            $rootScope.$on('event:login-success', function () {
                self.init();
                self.open();
            });
            $rootScope.$on('event:logout', function () {
                //imkeeper && imkeeper.close();
            });
        }
        IM.prototype.initIMconfig = function () {
            Easemob.im.config = {
                xmppURL: 'wss://im-api.easemob.com/ws/',
                apiURL: '',
                appkey: JDB.appKey,
                https: true
            };
            imkeeper = new Easemob.im.Connection();
            console.log('init config');
            console.log(imkeeper);
        };
        IM.prototype.init = function () {
            imkeeper.init({
                //登陆时
                onOpened: function () {
                    console.log('环信登陆成功');
                    imkeeper.setPresence();
                },
                onPresence: this._onPresence,
                onTextMessage: this._onTextMessage
            });
        };
        IM.prototype.open = function () {
            imkeeper.open({
                user: '2',
                pwd: 'e2a6a1ace352668000aed191a817d143',
                appKey: JDB.appKey
            });
        };
        IM.prototype.sendMessage = function (options) {
            var defer = this.$q.defer();
            imkeeper.sendTextMessage(options);
            return defer.promise;
        };
        IM.prototype._onTextMessage = function (message) {
            console.log(message);
            if (message.type == 'groupchat') {
            }
            else {
            }
        };
        IM.prototype._onPresence = function (message) {
            console.log(message);
        };
        //获取好友列表
        IM.prototype.getFriendList = function (args) {
            var defer = this.$q.defer();
            imkeeper.getRoster({
                success: function (list) {
                    console.log(list);
                }
            });
            return defer.promise;
        };
        IM.prototype.addFriendRequest = function (args) {
            imkeeper.subscribe({
                to: args.to,
                message: args.message
            });
        };
        return IM;
    })();
    IM.$inject = ['$rootScope', '$q'];
    JDB.ServiceModule.service('IMService', IM);
})(JDB || (JDB = {}));
//# sourceMappingURL=im.js.map