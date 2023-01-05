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
];
