export default {
    'shop': [
        {text: 'TODO', icon: 'fa-arrow-right', path: '/shop/todo'},
        {text: 'Reddit API', icon: 'fa-arrow-right', path: '/shop/reddit'},
        {text: '表单校验11111', icon: 'fa-arrow-right', path: '/shop/MyForm'},
        {
            text: '店铺管理', icon: 'fa-th-list',
            children: [
                {text: '仪表盘1111', icon: 'fa-arrow-right', path: '/shop/Dashboard'},
                {text: '我的时间111', icon: 'fa-arrow-right', path: '/shop/MyTime'},
                {text: '校验demo111', icon: 'fa-arrow-right', path: '/shop/ValidationDemo'}
            ]
        }
    ],
    'service': [
        {text: '表单校验11111', icon: 'fa-arrow-right', path: '/service/MyForm'},
        {text: '仪表盘1111', icon: 'fa-arrow-right', path: '/service/Dashboard'},
        {text: '我的时间111', icon: 'fa-arrow-right', path: '/service/MyTime'},
        {text: '校验demo111', icon: 'fa-arrow-right', path: '/service/ValidationDemo'}
    ],
    'expressage': [
        {text: '表单校验11111', icon: 'fa-arrow-right', path: '/expressage/MyForm'},
        {text: '仪表盘1111', icon: 'fa-arrow-right', path: '/expressage/Dashboard'},
        {text: '我的时间111', icon: 'fa-arrow-right', path: '/expressage/MyTime'},
        {text: '校验demo111', icon: 'fa-arrow-right', path: '/expressage/ValidationDemo'}
    ],
    'system': [
        {text: '系统设置', icon: 'fa-cogs', path: '/system/settings'},
        {
            text: '我的邮件', icon: 'fa-envelope-o',
            children: [
                {text: '未读邮件', icon: 'fa-arrow-right', path: '/system/mail/unread'},
                {text: '已读邮件', icon: 'fa-arrow-right', path: '/system/mail/read'}
            ]
        },
        {text: '我的提醒', icon: 'fa-bell-o', path: '/system/remind'},
        {
            text: '个人设置', icon: 'fa-envelope-o',
            children: [
                {text: '修改个人信息', icon: 'fa-arrow-right', path: '/system/profile/message'},
                {text: '修改密码', icon: 'fa-arrow-right', path: '/system/profile/password'}
            ]
        }
    ]
}