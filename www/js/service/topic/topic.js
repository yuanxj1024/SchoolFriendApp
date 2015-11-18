/**
 * Created by AaronYuan on 10/29/15.
 */
/// <reference path="../../app.ts" />
//话题
var JDB;
(function (JDB) {
    'use strict';
    var topicModal = null;
    var Topic = (function () {
        function Topic($rootScope, $q, $resource, $ionicModal) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.$ionicModal = $ionicModal;
            this.topicResource = $resource(JDB.appHost + '/:action', {
                action: '@action'
            }, {
                list: {
                    method: 'GET',
                    needAccessToken: true,
                    isArray: false,
                    params: {
                        action: 'list'
                    }
                }
            });
        }
        Topic.prototype.list = function (arg) {
            return this.$rootScope.requestHandler(this.topicResource.list, arg);
        };
        Topic.prototype.releaseTopicModal = function () {
            if (topicModal) {
                return null;
            }
            topicModal = {};
            var subScope = this.$rootScope.$new();
            subScope.$on('modal.removed', function () {
                topicModal = null;
            });
            subScope.cancel = function () {
                topicModal.remove();
                topicModal = null;
            };
            this.$ionicModal.fromTemplateUrl('/templates/topic/release-topic.html', {
                scope: subScope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                topicModal = modal;
                modal.show();
            });
        };
        return Topic;
    })();
    Topic.$inject = ['$rootScope', '$q', '$resource', '$ionicModal'];
    JDB.ServiceModule.service('TopicService', Topic);
})(JDB || (JDB = {}));
//# sourceMappingURL=topic.js.map