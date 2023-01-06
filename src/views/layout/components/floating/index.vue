<template>
    <div class="fixed bottom-10 right-2">
        <div
            class="guide-start w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 hover:shadow-lg group"
            @click="onGuideClick"
        >
            <SvgIcon
                name="guide"
                class="w-2 h-2"
                fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
            />
        </div>

        <Popover class="flex items-center" placement="top-left">
            <template #reference>
                <div
                    class="guide-blog w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 hover:shadow-lg group"
                >
                    <SvgIcon
                        name="feedback"
                        class="w-2 h-2"
                        fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
                    />
                </div>
            </template>
            <div
                class="flex items-center py-1 px-1.5 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
            >
                <SvgIcon
                    name="feedback"
                    class="w-1.5 h-1.5 mr-1"
                    fillClass="fill-zinc-900 dark:fill-zinc-300"
                />
                <span class="text-zinc-800 dark:text-zinc-300 text-sm"
                    >前往博客</span
                >
            </div>
        </Popover>
    </div>
</template>

<script setup>
// 引导处理
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import { onMounted } from 'vue';
import steps from './steps';
let driver = null;
onMounted(() => {
    driver = new Driver({
        allowClose: false,
        closeBtnText: '关闭',
        nextBtnText: '下一步',
        prevBtnText: '上一步',
    });
});

const onGuideClick = () => {
    // 指定步骤
    driver.defineSteps(steps);
    // 开始
    driver.start();
};
</script>

<style lang="scss" scoped></style>
