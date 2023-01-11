<template>
    <div>
        <teleport to="body">
            <!-- 蒙版 -->
            <transition name="fade">
                <div
                    v-if="isVisible"
                    @click="close"
                    class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0 overflow-hidden"
                ></div>
            </transition>
            <!-- 内容区 -->
            <transition name="up">
                <div
                    v-if="isVisible"
                    class="max-w-[80%] max-h-[80%] overflow-auto fixed top-[10%] left-0 right-0 mx-auto z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:min-w-[35%]"
                >
                    <!-- 标题 -->
                    <div
                        v-if="title"
                        class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2"
                    >
                        {{ title }}
                    </div>
                    <!-- 内容 -->
                    <div
                        class="text-base text-zinc-900 dark:text-zinc-200 mb-2"
                    >
                        <slot></slot>
                    </div>
                    <div
                        v-if="cancelHandler || confirmHandler"
                        class="flex justify-end"
                    >
                        <HButton
                            type="info"
                            class="mr-2"
                            @click="onCancelClick"
                            >{{ cancelText }}</HButton
                        >
                        <HButton type="primary" @click="onConfirmClick">{{
                            confirmText
                        }}</HButton>
                    </div>
                </div>
            </transition>
        </teleport>
    </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core';
const props = defineProps({
    // 控制开关
    modelValue: {
        type: Boolean,
        required: true,
    },
    // 标题
    title: {
        type: String,
    },
    // 取消按钮文本
    cancelText: {
        type: String,
        default: '取消',
    },
    // 确定按钮文本
    confirmText: {
        type: String,
        default: '确认',
    },
    // 取消按钮点击事件
    cancelHandler: {
        type: Function,
    },
    // 确定按钮点击事件
    confirmHandler: {
        type: Function,
    },
    // 关闭回调
    close: {
        type: Function,
    },
});

defineEmits(['update:modelValue']);

const isVisible = useVModel(props);

const close = () => {
    isVisible.value = false;
    props.close && props.close();
};

const onCancelClick = () => {
    props.cancelHandler && props.cancelHandler();
    close();
};
const onConfirmClick = () => {
    props.confirmHandler && props.confirmHandler();
    close();
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.up-enter-active,
.up-leave-active {
    transition: all 0.3s;
}

.up-enter-from,
.up-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>
