import { createRouter, createWebHashHistory } from "vue-router";
import { h, resolveComponent } from 'vue'
import DashRoute from '@/Components/Dashboard/route';
import UserRoute from '@/Components/Users/route';
import MyDrive from '@/Components/MyDrive/route';
// import TranslationRoute from '@ac/Translation/route';
let Routes = [];

Routes.push(DashRoute);
Routes = Routes.concat(UserRoute);
console.log(Routes)
Routes = Routes.concat(MyDrive);
// Routes = Routes.concat(TranslationRoute);

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: {
                render () {
                    return h(resolveComponent('router-view'));
                }
            },
            redirect: { name: 'dashboard' },
            children: Routes
        }
    ],
  })
  