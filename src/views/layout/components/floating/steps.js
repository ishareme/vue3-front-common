export default [
    {
        // 在哪个元素高亮
        element: '.guide-home',
        // 配置对象
        popover: {
            title: 'logo',
            description: '点击返回首页',
        },
    },
    {
        element: '.guide-search',
        popover: {
            title: '搜索',
            description: '搜索您期望的图片',
        },
    },
    {
        element: '.guide-theme',
        popover: {
            title: '风格',
            description: '选择一个您喜欢的风格',
            // 弹出的位置
            position: 'left',
        },
    },
    {
        element: '.guide-profile',
        popover: {
            title: '账户',
            description: '这里标记了您的账户信息',
            position: 'left',
        },
    },
    {
        element: '.guide-start',
        popover: {
            title: '引导',
            description: '这里可再次查看引导信息',
            position: 'left',
        },
    },
    {
        element: '.guide-blog',
        popover: {
            title: '博客',
            description: '这个我的个人博客，欢迎光临',
            position: 'left',
        },
    },
];
