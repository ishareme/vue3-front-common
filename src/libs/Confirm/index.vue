<template>
    <div>
        <transition name="fade">
            <div
                v-if="isVisible"
                class="w-screen h-screen bg-zinc-900/80 z-40 fixed left-0 top-0"
                @click="close"
            ></div>
        </transition>
        <transition name="up" mode="">
            <div
                v-if="isVisible"
                class="w-[80%] fixed left-0 right-0 m-auto top-1/3 z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:w-[35%]"
            >
                <div
                    class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2"
                >
                    {{ title }}
                </div>
                <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
                    {{ content }}
                </div>
                <div class="flex justify-end">
                    <HButton type="info" class="mr-2" @click="onCancelClick">
                        {{ cancleText }}
                    </HButton>
                    <HButton type="primary" @click="onConfirmClick">
                        {{ confirmText }}
                    </HButton>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
// 在方法调用的组件中，需要主动导入组件
import { ref, onMounted } from 'vue';
import HButton from '../button/index.vue';

const props = defineProps({
    // 标题
    title: {
        type: String,
    },
    // 描述
    content: {
        type: String,
        required: true,
    },
    // 取消按钮的文本
    cancleText: {
        type: String,
        default: '取消',
    },
    // 确定按钮的文本
    confirmText: {
        type: String,
        default: '确定',
    },
    // 取消按钮的事件
    cancleHandle: {
        type: Function,
    },
    // 确定按钮的事件
    confirmHandle: {
        type: Function,
    },
    // 关闭的回调
    close: {
        type: Function,
    },
});

const isVisible = ref(false);
// 状态驱动样式
const duration = '0.5s';
const show = () => {
    isVisible.value = true;
};
/**
 * confirm 关闭，保留动画执行时长
 */
const close = () => {
    isVisible.value = false;
    setTimeout(() => {
        props.close && props.close();
    }, parseInt(duration.replace('0.', '').replace('s', '')) * 100);
};
const onCancelClick = () => {
    props.cancleHandle && props.cancleHandle();
    close();
};
const onConfirmClick = () => {
    props.confirmHandle && props.confirmHandle();
    close();
};

/**
 * 页面构建完成之后，执行。保留动画
 */
onMounted(() => {
    show();
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all v-bind(duration);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.up-enter-active,
.up-leave-active {
    transition: all v-bind(duration);
}

.up-enter-from,
.up-leave-to {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
}
</style>
