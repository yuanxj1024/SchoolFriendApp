/**
 * Created by AaronYuan on 10/27/15.
 */

/// <reference path="app.ts" />

//路由模块
module JDB {
    'use strict';

    //路由配置
    AppModule.config(function(
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider
    ){

        $stateProvider
            .state('jdb',{
                url: '/jdb',
                abstract: true,
                templateUrl: 'templates/tabs.html',
                controller: 'TabCtrl'
            })
            //首页
            .state('jdb.home',{
                url: '/home',
                views: {
                    'tab-main':{
                        templateUrl: 'templates/home.html',
                        controller: 'TabCtrl'
                    }
                }
            })
            //活动
            //.state('jdb.activity',{
            //    url: '/activity',
            //    views: {
            //        'tab-main':{
            //            templateUrl: 'templates/activity/default.html'
            //        }
            //    }
            //})
            //发布活动
            .state('jdb.activity-add',{
                url: '/activity/add',
                views: {
                    'tab-main':{
                        templateUrl: 'templates/activity/create.html'
                    }
                }
            })
            //发布活动
            .state('jdb.activity-member',{
                url: '/activity/member',
                params: {
                    //表示查看当前活动的参加人员
                    activityID: ''
                },
                views: {
                    'tab-main':{
                        templateUrl: 'templates/activity/member.html'
                    }
                }
            })
            //活动 - 详情
            .state('jdb.activity-detail',{
                url: '/activity/detail',
                params: {
                    detailID: ''
                },
                views: {
                    'tab-main':{
                        templateUrl: 'templates/activity/detail.html',
                        controller: 'ActivityDetailCtrl',
                        resolve: ResolvesModule['ActivityDetailCtrl']
                    }
                }
            })
            //发现
            //.state('jdb.discover',{
            //    url: '/discover',
            //    views: {
            //        'tab-main':{
            //            templateUrl: 'templates/discover/default.html',
            //        }
            //    }
            //})
            //个人名片
            .state('jdb.usercard',{
                url: '/usercard',
                params: {
                    id: '',
                    from: ''
                },
                views: {
                    'tab-main':{
                        templateUrl: 'templates/discover/user-card.html',
                    }
                }
            })
            .state('jdb.friend-request',{
                url: '/usercard/request',
                views: {
                    'tab-main':{
                        templateUrl: 'templates/discover/friend-request.html',
                    }
                }
            })
            //新朋友
            .state('jdb.new-friends',{
                url: '/newFriends',
                views: {
                    'tab-main':{
                        templateUrl: 'templates/discover/new-friends.html',
                    }
                }
            })
            //消息
            //.state('jdb.message',{
            //    url: '/message',
            //    views: {
            //        'tab-main':{
            //            templateUrl: 'templates/message/default.html'
            //        }
            //    }
            //})
            //消息
            .state('jdb.chat',{
                url: '/message/chat',
                views: {
                    'tab-main':{
                        templateUrl: 'templates/message/chat-box.html'
                    }
                }
            })
            ////我的
            //.state('jdb.mine',{
            //    url: '/mine',
            //    params:{
            //    },
            //    views: {
            //        'tab-main':{
            //            templateUrl: 'templates/mine/default.html'
            //        }
            //    }
            //})
            //个人信息
            .state('jdb.info',{
                url: '/mine/info',
                views: {
                    'tab-main':{
                        templateUrl: 'templates/mine/info.html'
                    }
                }
            })
            .state('jdb.infoedit',{
                url: '/mine/edit',
                params: {
                    tag: ''
                },
                views: {
                    'tab-main':{
                        templateUrl: 'templates/mine/info-edit.html'
                    }
                }
            })
            //我的圈子
            .state('jdb.minegroup',{
                url: '/mine/group',
                params:{
                    action: 'group',
                    from: 'jdb.home'
                },
                views: {
                    'tab-main':{
                        templateUrl: 'templates/group/list.html'
                        //templateUrl: 'templates/mine/mine-group.html'
                    }
                }
            })
            //我的话题
            .state('jdb.minetopic',{
                url: '/mine/topic',
                params: {
                    action: 'topic'
                },
                views: {
                    'tab-main':{
                        templateUrl: 'templates/mine/mine-topic.html'
                    }
                }
            })
            //我发布的
            .state('jdb.minerelease',{
                url: '/mine/release',
                params: {
                    action: 'release'
                },
                views: {
                    'tab-main':{
                        templateUrl: 'templates/mine/mine-release-join.html'
                    }
                }
            })
            //我参加的
            .state('jdb.minejoin',{
                url: '/mine/join',
                params: {
                    action: 'join'
                },
                views: {
                    'tab-main':{
                        templateUrl: 'templates/mine/mine-release-join.html'
                    }
                }
            })
            //修改手机
            .state('jdb.modifyphone',{
                url: '/mine/modifyphone',
                views: {
                    'tab-main':{
                        templateUrl: 'templates/mine/modify-phone.html'
                    }
                }
            })
            //邀请码
            .state('jdb.invite',{
                url: '/mine/invite',
                views: {
                    'tab-main':{
                        templateUrl: 'templates/mine/invite-code.html'
                    }
                }
            })
            .state('jdb.register',{
                url: '/register',
                views: {
                    'tab-main':{
                        templateUrl: 'templates/mine/register.html'
                    }
                }
            })
            //充值密码
            .state('jdb.resetpwd',{
                url: '/resetpwd',
                params: {
                    action: 'resetpwd'
                },
                views: {
                    'tab-main':{
                        templateUrl: 'templates/mine/reset-pwd.html'
                    }
                }
            })
            //注册成功后完善信息
            .state('jdb.reginfo',{
                url: '/register/info',
                params:{
                    action: 'reg'
                },
                views: {
                    'tab-main':{
                        templateUrl: 'templates/mine/register-user-info.html'
                    }
                }
            })
            //圈子
            .state('jdb.group',{
                url: '/group',
                params:{
                    action: 'all',
                    from: ''
                },
                views: {
                    'tab-main':{
                        templateUrl: 'templates/group/list.html'
                    }
                }
            })
            //圈子 - 创建
            .state('jdb.group-create',{
                url: '/group/create',
                params: {
                    from: ''
                },
                views: {
                    'tab-main':{
                        templateUrl: 'templates/group/create.html'
                    }
                }
            })
            //圈子 - 邀请成员
            .state('jdb.group-add-member',{
                url: '/group/addMember',
                views: {
                    'tab-main':{
                        templateUrl: 'templates/group/add-member.html'
                    }
                }
            })
            //圈子 - 详情
            .state('jdb.group-detail',{
                url: '/group/detail',
                params: {
                    id: '',
                    from: ''
                },
                views: {
                    'tab-main':{
                        templateUrl: 'templates/group/detail.html'
                    }
                }
            })
            //圈子 - 管理
            .state('jdb.group-manage',{
                url: '/group/manage',
                views: {
                    'tab-main':{
                        templateUrl: 'templates/group/manage.html'
                    }
                }
            })
            //附近的人
            .state('jdb.nearby',{
                url: '/nearby',
                params:{
                    from: ''
                },
                views: {
                    'tab-main':{
                        templateUrl: 'templates/discover/nearby.html'
                    }
                }
            })
            //话题
            .state('jdb.topic',{
                url: '/topic',
                params:{
                    tag: ''
                },
                views: {
                    'tab-main':{
                        templateUrl: 'templates/topic/default.html',
                        controller: 'TopListCtrl',
                        resolve: ResolvesModule['TopicDetailCtrl'],
                    }
                }
            })
            //话题 - 详情
            .state('jdb.topic-detial',{
                url: '/topic/detial',
                params:{
                    detailID: ''

                },
                views: {
                    'tab-main':{
                        templateUrl: 'templates/topic/detail.html',
                        resolve: ResolvesModule['TopicDetailCtrl'],
                        controller: 'TopicDetailCtrl'
                    }
                }
            })
            //通讯录
            .state('jdb.contact',{
                url: '/contact',
                params:{
                    from: ''
                },
                views: {
                    'tab-main':{
                        templateUrl: 'templates/discover/contacts.html'
                    }
                }
            })
        ;

        //默认转到首页
        $urlRouterProvider.otherwise('/jdb/home');

    });
}