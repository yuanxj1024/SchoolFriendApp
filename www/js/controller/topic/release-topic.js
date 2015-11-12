/**
 * Created by AaronYuan on 11/10/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/topic/topic.ts" />
//发布话题
var JDB;
(function (JDB) {
    'use strict';
    var ReleaseTopic = (function () {
        function ReleaseTopic($rootScope, $scope, CommonService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.CommonService = CommonService;
            $scope.chooseCategory = angular.bind(this, this.chooseCategory);
            $scope.chooseImage = angular.bind(this, this.chooseImage);
        }
        ReleaseTopic.prototype.chooseCategory = function () {
            this.CommonService.showTopicCategroy();
        };
        ReleaseTopic.prototype.chooseImage = function () {
            this.CommonService.showChooseImg().then(function (index) {
                console.log('choose image:' + index);
            });
        };
        return ReleaseTopic;
    })();
    ReleaseTopic.$inject = ['$rootScope', '$scope', 'CommonService'];
    JDB.CtrlModule.controller('ReleaseTopicCtrl', ReleaseTopic);
})(JDB || (JDB = {}));
//# sourceMappingURL=release-topic.js.map