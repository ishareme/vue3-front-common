<template>
    <div class="relative" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
        <div ref="referenceTarget">
            <!-- 具名插槽  触发弹层视图 -->
            <slot name="reference"></slot>
        </div>

        <!-- 气泡展示 -->
        <transition name="slide">
            <div
                ref="contentTarget"
                v-show="isVisible"
                class="absolute p-1 z-20 bg-white border rounded-md"
                :style="contentStyle"
            >
                <!-- 匿名插槽 弹出层视图中展示的内容-->
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
// 延迟关闭时间 onmouseleave
const MOUSELEAVE_DELAY_TIME = 100;
// 左上
const TOP_LEFT = 'top-left';
// 右上
const TOP_RIGHT = 'top-right';
// 左下
const BOTTOM_LEFT = 'bottom-left';
// 右下
const BOTTOM_RIGHT = 'bottom-right';
const placementEnum = [TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT];
</script>

<script setup>
import { ref, watch, nextTick } from 'vue';

// 控制位置
const props = defineProps({
    placement: {
        type: String,
        default: BOTTOM_LEFT,
        validator(value) {
            const result = placementEnum.includes(value);
            if (!result) {
                throw Error(
                    `placement 必须是 ${placementEnum.join(',')} 中的值`
                );
            }
            return result;
        },
    },
});

const isVisible = ref(false);
let timeout = null;
const onMouseEnter = () => {
    isVisible.value = true;
    timeout && clearTimeout(timeout);
};
const onMouseLeave = () => {
    timeout = setTimeout(() => {
        isVisible.value = false;
        timeout = null;
    }, MOUSELEAVE_DELAY_TIME);
};

// 计算元素尺寸
const referenceTarget = ref(null);
const contentTarget = ref(null);
// 获取尺寸
const getElementSize = (target) => {
    if (!target) return {};
    return {
        width: target.offsetWidth,
        height: target.offsetHeight,
    };
};
const contentStyle = ref({
    top: 0,
    left: 0,
});

watch(isVisible, (val) => {
    if (!val) return;
    // vue 数据改变只有要等待一段时间 dom 会变化等待元素渲染

    nextTick(() => {
        const content = getElementSize(contentTarget.value);
        const reference = getElementSize(referenceTarget.value);
        switch (props.placement) {
        case TOP_LEFT:
            contentStyle.value = {
                top: 0,
                left: `-${content.width}px`,
            };
            break;
        case TOP_RIGHT:
            contentStyle.value = {
                top: 0,
                left: `${reference.width}px`,
            };
            break;
        case BOTTOM_LEFT:
            contentStyle.value = {
                top: `${reference.height}px`,
                left: `-${content.width}px`,
            };
            break;
        case BOTTOM_RIGHT:
            contentStyle.value = {
                top: `${reference.height}px`,
                left: `${reference.width}px`,
            };
            break;
        default:
            contentStyle.value = {
                top: 0,
                left: `-${content.width}px`,
            };
            return;
        }
    });
});
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>
