import DashRoute from '@ac/Dashboard/route'
import UserRoute from '@ac/Users/route'
import MyDrive from '@ac/MyDrive/route'
let Routes = []

Routes.push(DashRoute)
Routes = Routes.concat(UserRoute)
Routes = Routes.concat(MyDrive)

export default [
    {
        path: '/',
        component: {
            render (c) {
                return c('router-view')
            }
        },
        redirect: { name: 'dashboard' },
        children: Routes

    }
]
