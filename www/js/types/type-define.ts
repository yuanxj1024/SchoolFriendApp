/**
 * Created by AaronYuan on 10/28/15.
 */

// 类型定义文件
module JDB {
    'use strict';

    declare var window: any;

    var JDBTypes: any = {};

    JDBTypes.school = {
        0: '交大1',
        1: '交大2',
        2: '交大3',
        3: '交大4',
        4: '交大5',
        5: '交大6'
    };

    JDBTypes.schoolSheet = [
        {text: '交大1'},
        {text: '交大2'},
        {text: '交大3'},
        {text: '交大4'},
        {text: '交大5'},
        {text: '交大6'}
    ];

    window.JDBTypes = JDBTypes;




}