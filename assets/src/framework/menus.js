/*
 * 系统菜单
 * 登陆的时候，根据用户，权限，获取到菜单，存到localStorage中，然后再跳转，这个文件从localStorage中获取，并返回
 * 先不加后台，这里先硬编码。
 * 结构扁平化，虽然MongoDB等nosql数据库有更好的方式，比如直接存json，但是扁平化得数据结构，支持面更广。
 * parentKey为空即为顶级菜单
 * */

export default [
    {
        key: 'system',
        parentKey: undefined,
        order: 1,
        icon: 'fa-th-list',
        text: '系统',
        path: undefined,
    },
    {
        key: 'shop',//跟url有关
        parentKey: undefined,
        order: 1,
        icon: 'fa-th-list',
        text: '顶级菜单1',
        path: undefined,// 如果顶级菜单作为头部导航，这个path是点击之后的跳转。默认获取第一个带有path的子节点，如果获取不到，path='/'
    },
    {
        key: 'service',
        parentKey: undefined,
        order: 1,
        icon: 'fa-th-list',
        text: '顶级菜单2',
        path: undefined,
    },
    {
        key: 'expressage',
        parentKey: undefined,
        order: 1,
        icon: 'fa-th-list',
        text: '顶级菜单3',
        path: undefined,
    },

    {
        key: 'system-001',
        parentKey: 'system',
        order: 1,
        icon: 'fa-arrow-right',
        text: '我的邮件',
    },
    {
        key: 'system-001001',
        parentKey: 'system-001',
        order: 1,
        icon: 'fa-arrow-right',
        text: '未读邮件',
        path: '/system/mail/unread',
    },
    {
        key: 'system-001002',
        parentKey: 'system-001',
        order: 1,
        icon: 'fa-arrow-right',
        text: '已读邮件',
        path: '/system/mail/read',
    },

    {
        key: 'system-002',
        parentKey: 'system',
        order: 1,
        icon: 'fa-arrow-right',
        text: '系统设置',
        path: '/system/settings',
    },
    {
        key: 'system-003',
        parentKey: 'system',
        order: 1,
        icon: 'fa-arrow-right',
        text: '系统提醒',
        path: '/system/remind',
    },
    {
        key: 'system-004',
        parentKey: 'system',
        order: 1,
        icon: 'fa-arrow-right',
        text: '个人设置',
    },
    {
        key: 'system-004001',
        parentKey: 'system-004',
        order: 1,
        icon: 'fa-arrow-right',
        text: '修改个人信息',
        path: '/system/profile/message',
    },
    {
        key: 'system-004002',
        parentKey: 'system-004',
        order: 1,
        icon: 'fa-arrow-right',
        text: '修改密码',
        path: '/system/profile/password',
    },

    {
        key: 'shop-001',
        parentKey: 'shop',
        order: 1,
        icon: 'fa-arrow-right',
        text: '列表页封装',
        path: '/shop/list-page-new',
    },
    {
        key: 'shop-002',
        parentKey: 'shop',
        order: 1,
        text: '查询条件封装',
        icon: 'fa-arrow-right',
        path: '/shop/query-terms'
    },
    {
        key: 'shop-003',
        parentKey: 'shop',
        order: 1,
        text: '分页信息封装',
        icon: 'fa-arrow-right',
        path: '/shop/pagination'
    },
    {
        key: 'shop-004',
        parentKey: 'shop',
        order: 1,
        text: 'TODO',
        icon: 'fa-arrow-right',
        path: '/shop/todo'
    },
    {
        key: 'shop-005',
        parentKey: 'shop',
        order: 1,
        text: 'Reddit API',
        icon: 'fa-arrow-right',
        path: '/shop/reddit'
    },
    {
        key: 'shop-006',
        parentKey: 'shop',
        order: 1,
        text: '表单校验11111',
        icon: 'fa-arrow-right',
        path: '/shop/MyForm'
    },
    {
        key: 'shop-007',
        parentKey: 'shop',
        order: 1,
        text: '店铺管理',
        icon: 'fa-th-list',
        path: undefined,
    },
    {
        key: 'shop-007001',
        parentKey: 'shop-007',
        order: 1,
        text: '仪表盘1111',
        icon: 'fa-arrow-right',
        path: '/shop/Dashboard'
    },
    {
        key: 'shop-007002',
        parentKey: 'shop-007',
        order: 1,
        text: '我的时间111',
        icon: 'fa-arrow-right',
        path: '/shop/MyTime'
    },
    {
        key: 'shop-007003',
        parentKey: 'shop-007',
        order: 1,
        text: '校验demo111',
        icon: 'fa-arrow-right',
        path: '/shop/ValidationDemo'
    },
    {
        key: 'shop-007003001',
        parentKey: 'shop-007003',
        order: 1,
        text: '校验demo222',
        icon: 'fa-arrow-right',
        path: '/shop/ValidationDemo123'
    }
];