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
        redirect: '/workspace/ask',
        children: [
            {
                path: 'ask',
                name: 'ask',
                meta: {
                    title: '故障问答'
                },
                redirect: '/workspace/ask/answerlist',
                component: () => import('@/views/workspace/ask/index'),
                children: [
                    {
                        path: 'answerlist',
                        name: 'answerlist',
                        meta: {
                            title: '问题描述'
                        },
                        component: () => import('@/views/workspace/ask/troubleAsk/list')
                    },
                    {
                        path: 'answercontent',
                        name: 'answercontent',
                        meta: {
                            title: '方案详情'
                        },
                        component: () => import('@/views/workspace/ask/troubleAsk/content')
                    }
                ]
            },
            {
                path:'recommend',
                name:'recommend',
                meta: {
                    title: '相关推荐'
                },
                component: () => import('@/views/workspace/recommend/index'),
                redirect: '/workspace/recommend/recommendlist',
                children: [
                    {
                        path: 'historyask',
                        name: 'historyask',
                        meta: {
                            title: '历史记录查询'
                        },
                        component: () => import('@/views/workspace/recommend/historyask/index')
                    },
                    {
                        path: 'recommendlist',
                        name: 'recommendlist',
                        meta: {
                            title: '历史记录推荐'
                        },
                        component: () => import('@/views/workspace/recommend/homepage/list')
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