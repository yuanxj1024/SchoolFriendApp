/**
 * Created by AaronYuan on 10/28/15.
 */

// 类型定义文件
module JDB {
    'use strict';

    declare var window: any;

    var JDBTypes: any = {};


    ///学校编号跟名称
    JDBTypes.school = {
        0: '交大1',
        1: '交大2',
        2: '交大3',
        3: '交大4',
        4: '交大5',
        5: '交大6'
    };

    //用于ActionSheet的数据
    JDBTypes.schoolSheet = [
        {text: '交大1'},
        {text: '交大2'},
        {text: '交大3'},
        {text: '交大4'},
        {text: '交大5'},
        {text: '交大6'}
    ];

    JDBTypes.schoolList = [
         '交大1',
         '交大2',
         '交大3',
         '交大4',
         '交大5',
         '交大6'
    ];

    //个人信息编辑时的tag说明
    JDBTypes.InfoEditTags = {
        1: '姓名',
        2: '英文名称',
        3: '性别',
        4: '微信',
        5: '邮箱',
        6: '学校',
        7: '院系',
        8: '年级',
        9: '公司',
        10: '职位',
        11: '备注'
    };

    //话题类型
    JDBTypes.TopicTypes = {
        1: '商机',
        2: '招聘',
        3: '校企',
        4: '杂谈',
        5: '资讯'
    };

    JDBTypes.ChooseMemberAction = {
        //移除成员
        'remove': 1,
        //设置管理员
        admin: 2,
        //添加成员
        add: 3
    };



    window.JDBTypes = JDBTypes;
}