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
    {path: '/system/mail/unread', component: './mail/UnReadMail'},
    {path: '/system/mail/read', component: './mail/ReadMail'},
    {path: '/system/remind', component: './remind/Remind'},
    {path: '/system/profile/message', component: './profile/ProfileMessage'},
    {path: '/system/profile/password', component: './profile/ProfilePassWord'},

    {path: '/shop/MyForm', component: './myform/MyForm'},
    {path: '/shop/Dashboard', component: './dashboard/Dashboard'},
    {path: '/shop/MyTime', component: './mytime/MyTime'},
    {path: '/shop/ValidationDemo', component: './validation-demo/ValidationDemo'},

    {path: '/service/MyForm', component: './myform/MyForm'},
    {path: '/service/Dashboard', component: './dashboard/Dashboard'},
    {path: '/service/MyTime', component: './mytime/MyTime'},
    {path: '/service/ValidationDemo', component: './validation-demo/ValidationDemo'},

    {path: '/expressage/MyForm', component: './myform/MyForm'},
    {path: '/expressage/Dashboard', component: './dashboard/Dashboard'},
    {path: '/expressage/MyTime', component: './mytime/MyTime'},
    {path: '/expressage/ValidationDemo', component: './validation-demo/ValidationDemo'}
]