import { h, render } from 'vue';
import confirmComponent from './index.vue';

/**
 * 展示confirm
 * @param {*} title 标题
 * @param {*} content 内容
 * @param {*} cancelText 取消按钮文本
 * @param {*} confirmText 确定按钮文本
 */
export const Confirm = (title, content, cancleText, confirmText) => {
    return new Promise((resolve, reject) => {
        if (title && !content) {
            content = title;
            title = '';
        }

        const cancleHandle = () => {
            reject(new Error('取消按钮点击'));
        };
        const confirmHandle = () => {
            resolve();
        };
        // 3. 取消渲染
        const close = () => {
            // 把渲染的vnode去掉
            render(null, document.body);
        };

        // 1.生成vnode
        const vnode = h(confirmComponent, {
            title,
            content,
            cancleText,
            confirmText,
            cancleHandle,
            confirmHandle,
            close,
        });
        // 2.渲染
        render(vnode, document.body);
    });
};
