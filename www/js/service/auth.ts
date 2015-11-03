/**
 * Created by AaronYuan on 10/27/15.
 */

/// <reference path="../app.ts" />
/// <reference path="../service/common.ts" />

//校验模块
module JDB {
    'use strict';

    export interface IUser {
        id: number;
        name: string;
    }

    export interface IAuthService {
        //读取缓存，检查用户是否登录
        verify(): boolean;
        //设置缓存的用户
        setUser(user: IUser):void;
        //数据库读取用户
        getUser(args:Object):ng.IPromise<IUser>;

        //显示登录页面
        showLoginModal():void;
    }

    var userKey: string = 'authUser',
        loginModal:Ionic.IModal  = null;


    interface IAuthResource  extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        //获取用户信息
        info(params:Object, data:Object,success?:Function,error?:Function);
    }

    class Auth implements IAuthService {
        private authResource: IAuthResource;
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $resource: ng.resource.IResourceService,
            public $q: ng.IQService,
            public $ionicModal: Ionic.IModal,
            public CommonService: ICommonService

        ){

            this.authResource = <IAuthResource>$resource(appHost + '/user/:action', {
                action: '@action'
            },{
                info: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: false,
                    params:{
                        action: 'info'
                    }
                }
            });

        }

        verify(): boolean{
            var temp :string;
            if(!this.$rootScope.User){
                temp = window.localStorage.getItem(userKey);
            }
            if(temp && typeof temp == 'string'){
                this.$rootScope.User = JSON.parse(temp);
            }
            if(this.$rootScope.User){
                return true;
            }
            //this.CommonService.showLoginModal();
            return false;
        }


        setUser(user:IUser = null) {
            if(user){
                this.$rootScope.User = user;
                window.localStorage.setItem(userKey, JSON.stringify(user));
            }
        }

        getUser(args):ng.IPromise<IUser> {
            var defer = this.$q.defer();
            this.authResource.info(args,null, function(result){
                if(typeof result == 'string'){
                    result = JSON.parse(result);
                }
                defer.resolve(result);
            }, function(err){
                defer.reject(err);
            });
            return defer.promise;
        }

        showLoginModal(){
            if(loginModal){
                return null;
            }
            loginModal = <Ionic.IModal>{};

            var subScope = <any>this.$rootScope.$new();

            subScope.$on('modal.removed', function(){
                loginModal = null;
            });
            subScope.cancel = function(){
                loginModal.remove();
                loginModal = null;
            };

            this.$ionicModal.fromTemplateUrl('',{
                scope: subScope,
                animation: 'slide-in-up'
            }).then(function(modal){
                loginModal = modal;
            });

        }


    }

    Auth.$inject = ['$rootScope', '$resource', '$q', '$ionicModal', 'CommonService'];
    ServiceModule.service('AuthService', Auth);
}

