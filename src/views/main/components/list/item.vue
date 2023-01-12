<template>
    <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
        <div
            class="relative w-full rounded overflow-hidden cursor-zoom-in group"
            :style="{
                backgroundColor: randomRGB(),
            }"
            @click="onPinClick"
        >
            <img
                ref="imgTarget"
                v-lazy
                :data-src="
                    isMobileTerminal ? data?.src?.large : data?.src?.large2x
                "
                class="w-full bg-transparent"
                :style="{
                    height: `${(width / data.width) * data.height}px`,
                }"
            />
            <div
                class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute left-0 top-0 duration-300 group-hover:opacity-100 xl:block"
            >
                <!-- 分享 -->
                <HButton class="absolute top-1.5 left-1.5" @click="onShare"
                    >分享</HButton
                >
                <!-- 点赞 -->
                <HButton
                    class="absolute top-1.5 right-1.5"
                    type="info"
                    icon="heart"
                    iconClass="fill-zinc-900 dark:fill-zinc-200"
                />
                <!-- 下载 -->
                <HButton
                    class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
                    type="info"
                    icon="download"
                    size="small"
                    iconClass="fill-zinc-900 dark:fill-zinc-200"
                    @click="onDownload"
                />
                <!-- 全屏 -->
                <HButton
                    class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
                    type="info"
                    icon="full"
                    size="small"
                    iconClass="fill-zinc-900 dark:fill-zinc-200"
                    @click="onImgFullscreen"
                />
            </div>
        </div>
        <p class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 px-1">
            {{ data.alt }}
        </p>
        <div class="flex items-center mt-1 px-1">
            <img
                v-lazy
                data-src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202104%2F22%2F20210422220415_2e4bd.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1675515403&t=3e7768a1fd37e2a38d6343bb5ee73cb9"
                class="h-2 w-2 rounded-full"
            />
            <span class="text-sm text-zinc-500 ml-1">{{
                data.photographer
            }}</span>
        </div>
    </div>
</template>

<script setup>
import { randomRGB } from '@/utils/color';
import { isMobileTerminal } from '@/utils/flexible.js';
import { saveAs } from 'file-saver';
import { Message } from '@/libs';
import { useElementBounding, useFullscreen } from '@vueuse/core';
import { ref, computed } from 'vue';
import { weiboShare } from '@/utils/share.js';

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
    width: {
        type: Number,
    },
});
const emits = defineEmits(['click']);

const onDownload = () => {
    /**
     * 下载的图片链接
     */
    Message('success', '图片开始下载');
    saveAs(props.data?.src?.original);
};

const onShare = () => {
    weiboShare(
        props.data?.src?.original,
        `${location.host}/pins/${props.data?.id}`
    );
    console.log('[ loascdad ]');
};

const imgTarget = ref(null);
const { enter: onImgFullscreen } = useFullscreen(imgTarget);
useFullscreen();

// 跳转记录
// 图片中心点位置
// useElementBounding 获取到响应式的数据
const {
    x: imgContainerX,
    y: imgContainerY,
    width: imgContainerW,
    height: imgContainerH,
} = useElementBounding(imgTarget);
const imgContainerCenter = computed(() => {
    return {
        translateX: parseInt(imgContainerX.value + imgContainerW.value / 2),
        translateY: parseInt(imgContainerY.value + imgContainerH.value / 2),
    };
});
// 进入详情
const onPinClick = () => {
    emits('click', {
        data: props.data,
        location: imgContainerCenter.value,
    });
};
</script>

<style lang="scss" scoped></style>
