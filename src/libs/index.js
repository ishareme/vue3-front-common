import { defineAsyncComponent } from 'vue';

export { Confirm } from '@/libs/Confirm/index.js';
export { Message } from '@/libs/Message/index.js';

export default {
    install(app) {
        // 获取当前路径任意文件夹下的 组件
        // glob 是异步的
        const components = import.meta.glob('@/components/*/index.vue');
        const libs = import.meta.glob('@/libs/*/index.vue');
        for (const [key, value] of [
            ...Object.entries(components),
            ...Object.entries(libs),
        ]) {
            // 拼接组件注册的 name
            const splitArr = key.split('/');
            let componentName = splitArr[splitArr.length - 2];
            // 通过 defineAsyncComponent 异步导入指定路径下的组件
            if (componentName === 'Button' || componentName === 'Input') {
                componentName = `H${componentName}`;
            }
            app.component(componentName, defineAsyncComponent(value));
        }
    },
};
