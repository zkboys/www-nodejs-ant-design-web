/*
* 系统菜单
* 登陆的时候，根据用户，权限，获取到菜单，存到localStorage中，然后再跳转，这个文件从localStorage中获取，并返回
* 先不加后台，这里先硬编码。
* 结构扁平化，虽然MongoDB等nosql数据库有更好的方式，比如直接存json，但是扁平化得数据结构，支持面更广。
* */

export default [
    {
        key: '10001',
        parentKey: undefined,
        icon: 'fa-arrow-right',
        text: '顶级菜单1',
        path: '/shop/Dashboard',// 如果顶级菜单作为头部导航，这个path是点击之后的跳转。
        order: 1,
    },
    {
        key: '10002',
        parentKey: undefined,
        icon: 'fa-arrow-right',
        text: '顶级菜单2',
        path: '/service/MyForm',
        order: 1,
    },
    {
        key: '10003',
        parentKey: undefined,
        icon: 'fa-arrow-right',
        text: '顶级菜单3',
        path: '/expressage/MyTime',
        order: 1,
    },
];