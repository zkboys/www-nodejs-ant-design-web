import MyForm from './myform/MyForm'
import Dashboard from './dashboard/Dashboard'
import MyTime from './mytime/MyTime'
import ValidationDemo from './validation-demo/ValidationDemo'
import UnReadMail from './mail/UnReadMail'
import ReadMail from './mail/ReadMail'
import Remind from './remind/Remind'
import ProfileMessage from './profile/ProfileMessage'
import ProfilePassWord from './profile/ProfilePassWord'
export default[
    {path: '/system/mail/unread', component: UnReadMail},
    {path: '/system/mail/read', component: ReadMail},
    {path: '/system/remind', component: Remind},
    {path: '/system/profile/message', component: ProfileMessage},
    {path: '/system/profile/password', component: ProfilePassWord},

    {path: '/shop/MyForm', component: MyForm},
    {path: '/shop/Dashboard', component: Dashboard},
    {path: '/shop/MyTime', component: MyTime},
    {path: '/shop/ValidationDemo', component: ValidationDemo},

    {path: '/service/MyForm', component: MyForm},
    {path: '/service/Dashboard', component: Dashboard},
    {path: '/service/MyTime', component: MyTime},
    {path: '/service/ValidationDemo', component: ValidationDemo},

    {path: '/expressage/MyForm', component: MyForm},
    {path: '/expressage/Dashboard', component: Dashboard},
    {path: '/expressage/MyTime', component: MyTime},
    {path: '/expressage/ValidationDemo', component: ValidationDemo}
]