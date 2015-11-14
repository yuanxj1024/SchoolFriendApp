/**
 * Created by AaronYuan on 10/27/15.
 */
/// <reference path="app.ts" />
//路由模块
var JDB;
(function (JDB) {
    'use strict';
    //路由配置
    JDB.AppModule.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('jdb', {
            url: '/jdb',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        }).state('jdb.home', {
            url: '/home',
            views: {
                'tab-main': {
                    templateUrl: 'templates/home.html',
                    controller: 'HomeCtrl'
                }
            }
        }).state('jdb.activity', {
            url: '/activity',
            views: {
                'tab-main': {
                    templateUrl: 'templates/activity/default.html'
                }
            }
        }).state('jdb.activity-add', {
            url: '/activity/add',
            views: {
                'tab-main': {
                    templateUrl: 'templates/activity/create.html'
                }
            }
        }).state('jdb.activity-member', {
            url: '/activity/member',
            params: {
                id: ''
            },
            views: {
                'tab-main': {
                    templateUrl: 'templates/activity/member.html'
                }
            }
        }).state('jdb.activity-detail', {
            url: '/activity/detail',
            params: {
                id: ''
            },
            views: {
                'tab-main': {
                    templateUrl: 'templates/activity/detail.html'
                }
            }
        }).state('jdb.discover', {
            url: '/discover',
            views: {
                'tab-main': {
                    templateUrl: 'templates/discover/default.html'
                }
            }
        }).state('jdb.new-friends', {
            url: '/newFriends',
            views: {
                'tab-main': {
                    templateUrl: 'templates/discover/new-friends.html'
                }
            }
        }).state('jdb.message', {
            url: '/message',
            views: {
                'tab-main': {
                    templateUrl: 'templates/message/default.html'
                }
            }
        }).state('jdb.chat', {
            url: '/message/chat',
            views: {
                'tab-main': {
                    templateUrl: 'templates/message/chat-box.html'
                }
            }
        }).state('jdb.mine', {
            url: '/mine',
            views: {
                'tab-main': {
                    templateUrl: 'templates/mine/default.html'
                }
            }
        }).state('jdb.info', {
            url: '/mine/info',
            views: {
                'tab-main': {
                    templateUrl: 'templates/mine/info.html'
                }
            }
        }).state('jdb.infoedit', {
            url: '/mine/edit',
            params: {
                tag: ''
            },
            views: {
                'tab-main': {
                    templateUrl: 'templates/mine/info-edit.html'
                }
            }
        }).state('jdb.minegroup', {
            url: '/mine/group',
            params: {
                action: 'group'
            },
            views: {
                'tab-main': {
                    templateUrl: 'templates/group/list.html'
                }
            }
        }).state('jdb.minetopic', {
            url: '/mine/topic',
            params: {
                action: 'topic'
            },
            views: {
                'tab-main': {
                    templateUrl: 'templates/mine/mine-topic.html'
                }
            }
        }).state('jdb.minerelease', {
            url: '/mine/release',
            params: {
                action: 'release'
            },
            views: {
                'tab-main': {
                    templateUrl: 'templates/mine/mine-release-join.html'
                }
            }
        }).state('jdb.minejoin', {
            url: '/mine/join',
            params: {
                action: 'join'
            },
            views: {
                'tab-main': {
                    templateUrl: 'templates/mine/mine-release-join.html'
                }
            }
        }).state('jdb.modifyphone', {
            url: '/mine/modifyphone',
            views: {
                'tab-main': {
                    templateUrl: 'templates/mine/modify-phone.html'
                }
            }
        }).state('jdb.invite', {
            url: '/mine/invite',
            views: {
                'tab-main': {
                    templateUrl: 'templates/mine/invite-code.html'
                }
            }
        }).state('jdb.register', {
            url: '/register',
            views: {
                'tab-main': {
                    templateUrl: 'templates/mine/register.html'
                }
            }
        }).state('jdb.resetpwd', {
            url: '/resetpwd',
            params: {
                action: 'resetpwd'
            },
            views: {
                'tab-main': {
                    templateUrl: 'templates/mine/reset-pwd.html'
                }
            }
        }).state('jdb.reginfo', {
            url: '/register/info',
            params: {
                action: 'reg'
            },
            views: {
                'tab-main': {
                    templateUrl: 'templates/mine/register-user-info.html'
                }
            }
        }).state('jdb.group', {
            url: '/group',
            params: {
                action: 'all',
                from: ''
            },
            views: {
                'tab-main': {
                    templateUrl: 'templates/group/list.html'
                }
            }
        }).state('jdb.group-create', {
            url: '/group/create',
            params: {
                from: ''
            },
            views: {
                'tab-main': {
                    templateUrl: 'templates/group/create.html'
                }
            }
        }).state('jdb.group-add-member', {
            url: '/group/addMember',
            views: {
                'tab-main': {
                    templateUrl: 'templates/group/add-member.html'
                }
            }
        }).state('jdb.group-detail', {
            url: '/group/detail',
            params: {
                id: '',
                from: ''
            },
            views: {
                'tab-main': {
                    templateUrl: 'templates/group/detail.html'
                }
            }
        }).state('jdb.group-manage', {
            url: '/group/manage',
            views: {
                'tab-main': {
                    templateUrl: 'templates/group/manage.html'
                }
            }
        }).state('jdb.nearby', {
            url: '/nearby',
            params: {
                from: ''
            },
            views: {
                'tab-main': {
                    templateUrl: 'templates/discover/nearby.html'
                }
            }
        }).state('jdb.topic', {
            url: '/topic',
            params: {
                tag: ''
            },
            views: {
                'tab-main': {
                    templateUrl: 'templates/topic/default.html'
                }
            }
        }).state('jdb.contact', {
            url: '/contact',
            params: {
                from: ''
            },
            views: {
                'tab-main': {
                    templateUrl: 'templates/discover/contacts.html'
                }
            }
        });
        //默认转到首页
        $urlRouterProvider.otherwise('/jdb/home');
    });
})(JDB || (JDB = {}));
//# sourceMappingURL=router.js.map