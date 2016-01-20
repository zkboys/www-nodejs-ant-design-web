import MyForm from '../page/myform/MyForm'
import Dashboard from '../page/dashboard/Dashboard'
import MyTime from '../page/mytime/MyTime'
import ValidationDemo from '../page/validation-demo/ValidationDemo'
export default[
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