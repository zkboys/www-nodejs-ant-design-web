import React from 'react';
import { Menu, Icon, Tooltip } from 'antd';
import FAIcon from '../framework/faicon/FAIcon';
import {Link} from 'react-router'
import Home from '../page/home/Home'
import MyForm from '../page/myform/MyForm'
import Dashboard from '../page/dashboard/Dashboard'
import MyTime from '../page/mytime/MyTime'
import ValidationDemo from '../page/validation-demo/ValidationDemo'
import Settings from '../framework/system/Settings'

/*
 * 左侧菜单与路由公用的数据
 * current：true/false 是否是当前菜单
 * path：对应地址
 * component：对应渲染的组件
 * */
export let menusRouts = [
    {text: '表单校验', icon: 'fa-arrow-right', path: '/validation0', component: ValidationDemo},
    {text: '仪表盘22222', icon: 'fa-arrow-right', path: '/dashboard0', component: Dashboard},
    {
        text: '用户管理', icon: 'fa-th-list',
        children: [
            {text: '仪表盘', icon: 'fa-arrow-right', path: '/dashboard3', component: Dashboard},
            {text: '我的表单', icon: 'fa-arrow-right', path: '/myForm3', component: MyForm},
            {text: '用户查询', icon: 'fa-arrow-right', path: '/myTime3', component: MyTime}
        ]
    },
    {
        text: '我的', icon: 'fa-user',
        children: [
            {text: '我的邮件', icon: 'fa-arrow-right', path: '/dashboard4', component: Dashboard},
            {text: '我的提醒', icon: 'fa-arrow-right', path: '/myForm4', component: MyForm},
            {text: '个人设置', icon: 'fa-arrow-right', path: '/myTime4', component: MyTime}
        ]
    },
    {
        text: '主面板', icon: 'fa-tachometer',
        children: [
            {text: '表单校验', icon: 'fa-arrow-right', path: '/validation', component: ValidationDemo},
            {text: '仪表盘', icon: 'fa-arrow-right', path: '/dashboard1', component: Dashboard},
            {
                text: '二级级导航', icon: 'fa-th-list',
                children: [
                    {text: '我的表单', icon: 'fa-arrow-right', path: '/myForm1', component: MyForm},
                    {text: '我的时间', icon: 'fa-arrow-right', path: '/myTime1', component: MyTime},
                    {
                        text: '三级导航', icon: 'fa-th-list',
                        children: [
                            {text: '我的表单444', icon: 'fa-arrow-right', path: '/myForm14', component: MyForm},
                            {text: '我的时间444', icon: 'fa-arrow-right', path: '/myTime14', component: MyTime}
                        ]
                    }
                ]
            }
        ]
    },
    {
        text: '商务查询', icon: 'fa-binoculars',
        children: [
            {text: '仪表盘222', icon: 'fa-arrow-right', path: '/dashboard2', component: Dashboard},
            {
                text: '二级导航222', icon: 'fa-th-list',
                children: [
                    {text: '我的表单', icon: 'fa-arrow-right', path: '/myForm2', component: MyForm},
                    {text: '我的时间', icon: 'fa-arrow-right', path: '/myTime2', component: MyTime}
                ]
            }
        ]
    }
];

export let otherRoutes = [
    {path: '/home', component: Home}
];
