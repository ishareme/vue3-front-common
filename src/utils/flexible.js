import { PC_DEVICE_WIDTH } from '@/constants';
import { computed } from 'vue';
import { useWindowSize } from '@vueuse/core';

const { width } = useWindowSize();

/**
 * 判断当前设备是否为移动设备，判断一句屏幕高度是否小于一个值
 */
export const isMobileTerminal = computed(() => {
    return width.value < PC_DEVICE_WIDTH;
});

/**
 * 动态指定rem基准值   最大不能超过40px
 * 根据用户的屏幕宽度  进行一些计算 把计算的值赋值给 html 根标签
 */

export const useRem = () => {
    //定义最大的fontSize = 40
    const MAX_FONT_SIZE = 40;
    document.addEventListener('DOMContentLoaded', () => {
        // 拿到html标签
        const html = document.querySelector('html');
        // 计算 fontsize  根据屏幕宽度 / 10
        const w =
            document.documentElement.clientWidth || document.body.clientWidth;
        let fontSize = w / 10;
        fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize;
        html.style.fontSize = fontSize + 'px';
    });
};
