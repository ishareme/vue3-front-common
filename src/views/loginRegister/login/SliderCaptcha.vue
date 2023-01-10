<template>
    <div
        class="fixed top-[20%] left-[50%] translate-x-[-50%] w-[340px] h-[270px] text-sm bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-900 shadow-2xl"
    >
        <div class="flex items-center h-5 text-left px-1 mb-1">
            <span class="flex-grow dark:text-zinc-200">请完成安全验证</span>
            <SvgIcon
                name="refresh"
                fillClass="fill-zinc-900 dark:fill-zinc-200"
                class="w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
                @click="onReset"
            />
            <SvgIcon
                name="close"
                fillClass="fill-zinc-900 dark:fill-zinc-200"
                class="ml-2 w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
                @click="onClose"
            />
        </div>
        <div id="captcha"></div>
    </div>
</template>

<script>
const EMIT_CLOSE = 'close';
const EMIT_SUCCESS = 'success';
</script>

<script setup>
import '@/vendor/SliderCaptcha/longbow.slidercaptcha.min.js';
import '@/vendor/SliderCaptcha/slidercaptcha.min.css';
import { onMounted } from 'vue';
import { getCaptcha } from '@/api/sys.js';

const emits = defineEmits([EMIT_CLOSE, EMIT_SUCCESS]);

// 使用人类行为验证
let captcha = null;

onMounted(() => {
    /* eslint-disable */
    captcha = sliderCaptcha({
        // 渲染位置
        id: 'captcha',
        // 成功回调
        async onSuccess(arr) {
            try {
                const res = await getCaptcha({
                    behavior: arr,
                });
                if (res) {
                    emits(EMIT_SUCCESS);
                }
            } catch (error) {
                const res = true;
                if (res) {
                    emits(EMIT_SUCCESS);
                }
            }
        },
        // 失败回调
        onFail() {
            console.log('[ onFail ]');
        },
        // 默认验证方法
        verify() {
            console.log('[ verify ]');
            return true;
        },
    });
    /* eslint-disable */
});
const onReset = () => {
    captcha.reset();
};
const onClose = () => {
    emits(EMIT_CLOSE);
};
</script>

<style lang="scss" scoped></style>
