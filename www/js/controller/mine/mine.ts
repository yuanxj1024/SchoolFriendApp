/**
 *
 * Created by AaronYuan on 10/31/15.
 */

/// <reference path="../../app.ts" />
//我的

module JDB {
    'use strict';

    interface IMineScope extends ng.IScope {

    }


    class Mine {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public  $scope: IMineScope
        ){

        }


    }

    Mine.$inject = ['$rootScope', '$scope'];
    CtrlModule.controller('MineCtrl', Mine);
}
