import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
    // 创建并暴露一个路由器
export default new VueRouter({
    routes: [
        // 一级路由
        {
           path: '/',
            redirect: 'login'
        },
        {
            path: '/login',
            name: 'Login',
            component: () =>
                import ("../pages/Login.vue")
        },
        {
            path: '/manage',
            name: 'Manage',
            redirect: 'manage/home',
            component: () =>
                import ("../pages/Manage.vue"),
            children: [
                {
                    path:'home',
                    name:'Home',
                    component: ()=> import("../pages/Home"),
                },
                {
                    path:'Lend',
                    name:'Lend',
                    component: ()=> import("../pages/Lend"),
                },

                {
                    path:'Shop',
                    name:'Shop',
                    component: ()=> import("../pages/Shop"),
                },
                {
                    path:'Fix',
                    name:'Fix',
                    component: ()=> import("../pages/Fix"),
                },
                {
                    path:'Storage',
                    name:'Storage',
                    component: ()=> import("../pages/Storage"),
                },
                {
                    path:'Obsolete',
                    name:'Obsolete',
                    component: ()=> import("../pages/Obsolete"),
                },
                {
                    path:'ShopContent',
                    name:'ShopContent',
                    component: ()=> import("../pages/ShopContent"),
                },
                {
                    path:'LendContent',
                    name:'LendContent',
                    component: ()=> import("../pages/LendContent"),
                },
                {
                    path:'FixContent',
                    name:'FixContent',
                    component: ()=> import("../pages/FixContent"),
                },
            ]
        }

    ]
})