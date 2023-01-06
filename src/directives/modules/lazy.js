/**
 * 图片懒加载
 */
import { useIntersectionObserver } from '@vueuse/core';
export default {
    mounted(el) {
        const imgSrc = el.dataset.src ? el.dataset.src : el.src;
        if (el.src) {
            el.src = '';
        }
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
            if (isIntersecting) {
                el.src = imgSrc;
                // 停止监听
                stop();
            }
        });
    },
};
