/**
 * Created by AaronYuan on 10/29/15.
 */
/// <reference path="../../app.ts" />

//活动
module JDB {
    'use strict';

    interface IActivityScope extends ng.IScope{

    }

    class Activity {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IActivityScope
        ){

        }
    }

    Activity.$inject = ['$rootScope', '$scope'];
    CtrlModule.controller('ActivityCtrl', Activity);
}

