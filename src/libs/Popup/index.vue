<template>
    <div>
        <teleport to="body">
            <transition name="fade" mode="">
                <div
                    v-show="isVisable"
                    class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
                    @click="onMaskClick"
                >
                    蒙版
                </div>
            </transition>

            <transition name="popup-down-up">
                <div
                    v-show="isVisable"
                    v-bind="$attrs"
                    class="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0 left-0"
                >
                    <slot></slot>
                </div>
            </transition>
        </teleport>
    </div>
</template>

<script setup>
import { watch } from 'vue';
import { useScrollLock, useVModel } from '@vueuse/core';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
        default: false,
    },
});
defineEmits(['update:modelValue']);

// 通过 useVModel 获取到响应式数据 isVisable，当 isVisable 改变时，会自动触发 update:modelValue
const isVisable = useVModel(props);

const onMaskClick = () => {
    isVisable.value = false;
};
//滚动锁定
const isLocked = useScrollLock(document.body);
watch(
    isVisable,
    (value) => {
        isLocked.value = value;
    },
    {
        immediate: true,
    }
);
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

.popup-down-up-enter-active,
.popup-down-up-leave-active {
    transition: all 0.3s;
}
.popup-down-up-enter-from,
.popup-down-up-leave-to {
    transform: translateY(100%);
}
</style>
