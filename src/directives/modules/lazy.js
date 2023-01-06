/**
 * 图片懒加载
 */
import { useIntersectionObserver } from '@vueuse/core';

const handleLazy = (el) => {
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
};
export default {
    mounted(el) {
        handleLazy(el);
    },
    updated(el, binding, vnode, prevVnode) {
        if (!(vnode.props.src || vnode.props['data-src'])) return;
        const newSrc = vnode.props['data-src'] || vnode.props.src;
        const preSrc = prevVnode.props['data-src'] || prevVnode.props.src;
        if (newSrc === preSrc) return;
        handleLazy(el);
    },
};
