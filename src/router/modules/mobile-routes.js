export default [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/main/index.vue'),
    },
    {
        path: '/pins/:id',
        name: 'pins',
        component: () => import('@/views/pins/index.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/loginRegister/index.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/loginRegister/register'),
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        // 标记当前的页面只有用户登录的时候才接入
        meta: {
            user: true,
        },
    },
    {
        path: '/member',
        name: 'member',
        component: () => import('@/views/member'),
        meta: {
            user: true,
        },
    },
    {
        path: '/pay/result',
        name: 'payResult',
        component: () => import('@/views/pay'),
    },
];
