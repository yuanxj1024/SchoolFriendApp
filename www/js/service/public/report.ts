/**
 * Created by AaronYuan on 11/21/15.
 */

/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
//举报

module JDB {
    'use strict';

    declare var window;
    var currentReportUser:any = null;

    export interface IReportService {
        //举报
        report(args: any, cb:any): void;
        setReportObject(userID: number):void;
        getReportObject():any;

    }

    interface IReportResource  extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        report(params:Object, data:Object, success?:Function, error?:Function);
    }

    class Report implements IReportService{
        private resource: IReportResource;
        constructor(
            public $rootScope: IJDBRootScopeService,
            public $q: ng.IQService,
            public $resource: ng.resource.IResourceService,
            public CommonService: ICommonService
        ){
            this.resource = <IReportResource> $resource(appHost + '/inform/:action',{
                action: '@action'
            },{
                report: {
                    method: 'POST',
                    needAccessToken: true,
                    isArray: false,
                    params:{
                        action: 'createinform'
                    }
                }
            });
        }

        report(args: any, callback:any): void{
            this.$rootScope.requestHandler(this.resource.report, args, true).then(function(res){
                if(res.code == 0){
                    window.plugins.toast.showShortCenter('举报成功');
                    callback && callback();
                }else{
                    window.plugins.toast.showShortCenter('提交数据失败，请稍后重试');
                }
            }, function(err){
                window.plugins.toast.showShortCenter('提交数据失败，请稍后重试');
            });
        }

        setReportObject(userID: number){
            currentReportUser = userID;
        }
        getReportObject(){
            return currentReportUser;
        }

    }

    Report.$inject = ['$rootScope', '$q', '$resource', 'CommonService'];
    ServiceModule.service('ReportService', Report);
}
