export default [
    {
        path: '/',
        name: 'pcHome',
        component: () => import('@/views/layout/index.vue'),
        children: [
            {
                path: '',
                name: 'pcMain',
                component: () => import('@/views/main/index.vue'),
            },
        ],
    },
    {
        path: '/pins/:id',
        name: 'pins',
        component: () => import('@/views/pins/index.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/loginRegister/login'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/loginRegister/register'),
    },
];
