<template>
    <div>
        <!-- 内容 -->
        <slot></slot>
        <div ref="loadingTarget" class="h-6 py-4">
            <SvgIcon
                v-show="loading"
                class="w-3 h-3 m-auto animate-spin"
                name="infinite-load"
            />
            <p
                v-if="isFinished"
                class="text-center text-base to-zinc-400 dark:text-zinc-300"
            >
                - 没有更多数据 -
            </p>
        </div>
    </div>
</template>

<script setup>
import { useVModel, useIntersectionObserver } from '@vueuse/core';
import { ref, watch } from 'vue';
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
    // 数据是否全部加载完成
    isFinished: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(['onload', 'update:modelValue']);

const loading = useVModel(props, 'modelValue');

const loadingTarget = ref(null);
const isIntersect = ref(false);
const emitLoad = () => {
    // 触发 load，延迟处理，等待 渲染和 useIntersectionObserver 的再次触发
    let timeout = setTimeout(() => {
        // 加载更多的视图可见时  不是加载中 还没加载完  处理加载跟多逻辑
        if (isIntersect.value && !loading.value && !props.isFinished) {
            loading.value = true;
            emits('onload');
        }
        clearTimeout(timeout);
    }, 100);
};
useIntersectionObserver(loadingTarget, ([{ isIntersecting }]) => {
    isIntersect.value = isIntersecting;
    emitLoad();
});

/**
 * 监听 loading 的变化，解决数据加载完成后，首屏未铺满的问题
 */
watch(loading, emitLoad);
</script>

<style lang="scss" scoped></style>
