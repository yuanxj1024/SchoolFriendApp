/**
 * Created by AaronYuan on 11/28/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
var JDB;
(function (JDB) {
    'use strict';
    var List = (function () {
        function List($rootScope, $scope, CommonService, $stateParams) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.CommonService = CommonService;
            this.$stateParams = $stateParams;
        }
        return List;
    })();
    List.$inject = ['$rootScope', '$scope', 'CommonService', '$stateParams'];
    JDB.CtrlModule.controller('NearbyListCtrl', List);
})(JDB || (JDB = {}));
//# sourceMappingURL=list.js.map