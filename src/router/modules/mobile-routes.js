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
];
