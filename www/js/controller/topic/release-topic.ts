/**
 * Created by AaronYuan on 11/10/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/topic/topic.ts" />

//发布话题

module JDB {
    'use strict';

    declare var window;

    interface IReleaseTopicScope extends ng.IScope {
        //选择分类
        chooseCategory: Function;

        //选择图片
        chooseImage: Function;

    }

    class ReleaseTopic {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IReleaseTopicScope,
            public CommonService: ICommonService
        ){
            $scope.chooseCategory = angular.bind(this,this.chooseCategory);
            $scope.chooseImage = angular.bind(this, this.chooseImage);

        }

        chooseCategory() {
            this.CommonService.showTopicCategroy();
        }

        chooseImage(){
            this.CommonService.showChooseImg().then(function(index){
                console.log('choose image:' + index);
            });
        }


    }

    ReleaseTopic.$inject = ['$rootScope', '$scope', 'CommonService'];
    CtrlModule.controller('ReleaseTopicCtrl', ReleaseTopic);
}
