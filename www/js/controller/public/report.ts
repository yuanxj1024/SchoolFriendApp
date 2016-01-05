/**
 * Created by AaronYuan on 11/21/15.
 */
//举报
/// <reference path="../../app.ts" />
/// <reference path="../../service/public/report.ts" />
module JDB {
    'use strict';

    declare var window;

    interface IReportScope extends ng.IScope {
        //保存数据
        save: Function;
        //关闭
        cancel: Function;

        reportCategory: Array<any>;

        categoryItemClicked: Function;

        selectedCategory: any;

        //reportContent: string;
        reportForm: any;
        //类型
        typeName:string;
        //被举报编号
        id:number;
    }

    var category = [
        '色情',
        '欺诈',
        '侮辱诋毁',
        '广告骚扰',
        '政治',
        '非交大校友'
    ];

    class Report {
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $scope: IReportScope,
            public ReportService: IReportService
        ){
            $scope.save = angular.bind(this, this.save);
            $scope.categoryItemClicked = angular.bind(this, this.categoryItemClicked);

            $scope.reportCategory = category;
            $scope.reportForm = {
                content: ''
            };

            this.$scope.selectedCategory = category[0];
        }

        save(){
            this.ReportService.report({
                phone: this.$rootScope.localUser().phone,
                reason: this.$scope.selectedCategory,
                otherInfo:this.$scope.reportForm.content,
                assoId: this.$scope.id,
                'type': this.$scope.typeName
            },function(){
                this.$scope.cancel();
            }.bind(this));
        }

         categoryItemClicked(item){
             this.$scope.selectedCategory = item;
         }
    }

    Report.$inject = ['$rootScope', '$scope', 'ReportService'];
    CtrlModule.controller('ReportCtrl', Report);
}

