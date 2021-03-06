/**
 *
 * Created by AaronYuan on 10/31/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/mine/mine.ts" />

///邀请码
module JDB {
    'use strict';

    interface IInviteScope extends ng.IScope {
        //生成新的邀请码
        createNewCode: Function;

        //复制邀请码
        copyCode: Function;

        currentCode: string;

    }

    class InviteCode {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IInviteScope,
            public MineService: IMineService
        ) {
            $scope.createNewCode = angular.bind(this, this.createNewCode);
            $scope.copyCode = angular.bind(this ,this.copyCode);

            //$scope.currentCode = this.getUID();

            this.createNewCode();
        }

        createNewCode() {
            //this.$scope.currentCode = this.getUID();
            var self = this;
            this.MineService.getInviteCode({
                username: this.$rootScope.localUser().phone
            }).then(function(result){
                if(result && result.code ==0){
                    self.$scope.currentCode = result.data.code;
                }
            });
        }

        copyCode() {

        }
        //生成随机字符串
        getUID() {
            return 'xxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16).toLocaleUpperCase();
            });
        }


    }

    InviteCode.$inject = ['$rootScope', '$scope', 'MineService'];
    CtrlModule.controller('InviteCodeCtrl', InviteCode);

}
