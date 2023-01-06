export default {
    install(app) {
        const directives = import.meta.globEager('@/directives/modules/*.js');
        for (const [key, value] of Object.entries(directives)) {
            // 拼接组件注册的 name
            const splitArr = key.split('/');
            const directiveName = splitArr[splitArr.length - 1].replace(
                '.js',
                ''
            );
            app.directive(directiveName, value.default);
        }
    },
};
