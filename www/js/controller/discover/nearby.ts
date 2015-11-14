/**
 * Created by AaronYuan on 11/13/15.
 */

//附近的人

/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />

module JDB {
    'use strict';

    declare var window;

    interface INearbyScope extends ng.IScope {

    }

    class Nearby {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: INearbyScope,
            public CommonService: ICommonService,
            public $stateParams: ng.ui.IStateParamsService
        ){
            console.log($stateParams);

        }
    }

    Nearby.$inject = ['$rootScope', '$scope', 'CommonService', '$stateParams'];
    CtrlModule.controller('NearbyCtrl', Nearby);
}


