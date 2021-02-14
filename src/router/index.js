import Vue from 'vue';
import VueRouter from 'vue-router';
// import { component } from 'vue/types/umd';

Vue.use(VueRouter);

const routers = [
    {
        path: '/home',
        component: () => import('@/views/home/index')
    },
    {
        path:'/workspace',
        component: () => import('@/views/workspace/index'),
        redirect: '/workspace/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                meta: {
                    title: '监控信息'
                },
                redirect: '/workspace/dashboard/systemlist',
                component: () => import('@/views/workspace/dashboard/index'),
                children: [
                    {
                        path: 'systemlist',
                        name: 'systemlist',
                        meta: {
                            title: '系统基础信息'
                        },
                        component: () => import('@/views/workspace/dashboard/systemList/list')
                    },
                    {
                        path: 'indicatorinfo',
                        name: 'indicatorinfo',
                        meta: {
                            title: '异常信息统计'
                        },
                        component: () => import('@/views/workspace/dashboard/indicatorInfo/list')
                    }
                ]
            },
            {
                path:'abnormal',
                name:'abnormal',
                meta: {
                    title: '异常信息'
                },
                component: () => import('@/views/workspace/abnormal/index'),
                redirect: '/workspace/abnormal/chart',
                children: [
                    {
                        path: 'history',
                        name: 'history',
                        meta: {
                            title: '已处理异常'
                        },
                        component: () => import('@/views/workspace/abnormal/history/index')
                    },
                    {
                        path: 'chart',
                        name: 'chart',
                        meta: {
                            title: '异常监控'
                        },
                        component: () => import('@/views/workspace/abnormal/chart/list')
                    }
                ]
            },
            {
                path: 'person',
                name: 'person',
                meta: {
                    title: '个人管理'
                },
                redirect: '/workspace/person/historylist',
                component: () => import('@/views/workspace/person/index'),
                children: [
                    {
                        path: 'historylist',
                        name: 'historylist',
                        meta: {
                            title: '我的提问'
                        },
                        component: () => import('@/views/workspace/person/historyList/list')
                    },
                    {
                        path: 'collectionlist',
                        name: 'collectionlist',
                        meta: {
                            title: '我的收藏'
                        },
                        component: () => import('@/views/workspace/person/myCollection/list')
                    },
                    {
                        path: 'personal',
                        name: 'personal',
                        meta: {
                            title: '个人设置'
                        },
                        component: () => import('@/views/workspace/person/personal/index')
                    }
                ]
            },
        ]
    }
];

const router = new VueRouter({
    linkActiveClass: 'active',
    scrollBehavior: () => ({
        y: 0
    }),
    routes: routers
})

router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {
        //如果未匹配到路由
        next({
            path: '/home',
        }); //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
        next(); //如果匹配到正确跳转
        // console.log(111);
        return;
    } else {
        next(); //如果匹配到正确跳转
    }
});

export default router;