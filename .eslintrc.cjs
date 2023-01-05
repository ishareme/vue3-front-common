module.exports = {
    // 表示当前目录即为根目录，ESLint 规则将被限制到该目录下
    root: true,
    env: {
        // 在 node 环境下启动 ESLint 检测
        node: true,
        browser: true,
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-essential'],
    overrides: [],
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false, // <== ADD THIS
        ecmaVersion: 6,
        sourceType: 'module',
    },
    plugins: ['vue'],
    // 需要修改的启用规则及其各自的错误级别
    /**
     * 错误级别分为三种：
     * "off" 或 0 - 关闭规则
     * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
     * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
     */
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            },
        ],
        'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
        'space-before-function-paren': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/valid-v-slot': [
            'off',
            {
                allowModifiers: false,
            },
        ],
        'comma-dangle': 'off',
        semi: ['error', 'always'],
        indent: ['error', 4],
        quotes: 'off',
    },
};
