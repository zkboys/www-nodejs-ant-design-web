/*
* 由于次文件不在webpack watch 范围之内，
* 开启watch或者dev-server模式时，改动此文件，
* 需要手动执行 npm run generate-routes 命令来生成路由。
* 这种写法不具有灵活性，只适合简单的路由配置。
* */
exports.simpleRoutes = {
    '/shop/test/require': './testrequire/TestRequire.jsx',
    '/system/mail/unread': './mail/UnReadMail',
    '/system/mail/read': './mail/ReadMail',
    '/system/remind': './remind/Remind',
    '/system/profile/message': './profile/ProfileMessage',
    '/system/profile/password': './profile/ProfilePassWord',
    '/shop/MyForm': './myform/MyForm',
    '/shop/Dashboard': './dashboard/Dashboard',
    '/shop/MyTime': './mytime/MyTime',
    '/shop/ValidationDemo': './validation-demo/ValidationDemo',
    '/service/MyForm': './myform/MyForm',
    '/service/Dashboard': './dashboard/Dashboard',
    '/service/MyTime': './mytime/MyTime',
    '/service/ValidationDemo': './validation-demo/ValidationDemo',
    '/expressage/MyForm': './myform/MyForm',
    '/expressage/Dashboard': './dashboard/Dashboard',
    '/expressage/MyTime': './mytime/MyTime',
    '/expressage/ValidationDemo': './validation-demo/ValidationDemo'
};