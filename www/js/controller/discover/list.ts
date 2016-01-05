/**
 * Created by AaronYuan on 11/28/15.
 */

/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />

module JDB {
    'use strict';

    declare var window;

    interface INearbyScope extends ng.IScope {

    }

    class List {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: INearbyScope,
            public CommonService: ICommonService,
            public $stateParams: ng.ui.IStateParamsService
        ){

        }
    }

    List.$inject = ['$rootScope', '$scope', 'CommonService', '$stateParams'];
    CtrlModule.controller('NearbyListCtrl', List);
}

