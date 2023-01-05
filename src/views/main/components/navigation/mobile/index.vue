<template>
    <div class="bg-white sticky top-0 left-0 z-10">
        <ul
            ref="ulTarget"
            class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-y-hidden"
        >
            <!-- 汉堡按钮 -->
            <li
                class="fixed right-[-1px] top-0 z-20 h-4 px-1 flex items-center bg-white shadow-l-white"
            >
                <SvgIcon class="w-1.5 h-1.5" name="hamburger" />
            </li>

            <!-- 滑块 -->
            <li
                ref="sliderTarget"
                :style="sliderStyle"
                class="absolute h-[22px] bg-zinc-900 rounded-lg transition-all duration-200"
            ></li>

            <!-- items -->
            <li
                class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
                :class="{
                    'text-zinc-100': currentCateIndex === index,
                }"
                v-for="(item, index) in data"
                :key="item.id"
                :ref="setItemRef"
                @click="onItemClick(index)"
            >
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onBeforeUpdate, watch } from 'vue';
import { useScroll } from '@vueuse/core';

defineProps({
    data: {
        type: Array,
        required: true,
    },
});

// 处理滑块
const sliderStyle = ref({
    transform: 'translateX(0)',
    width: '60px',
});
// 选中下标
const currentCateIndex = ref(0);
let itemRefs = [];
// 循环的需要用函数接收
const setItemRef = (el) => {
    el && itemRefs.push(el);
};
// 获取滚动容器
const ulTarget = ref(null);
// 通过 vueuse -> useScroll 获取响应式的 scroll 数据
const { x: ulScrollLeft } = useScroll(ulTarget);

const onItemClick = (index) => {
    currentCateIndex.value = index;
};

watch(currentCateIndex, (index) => {
    const itemRef = itemRefs[index];
    const { left, width } = itemRef.getBoundingClientRect();
    sliderStyle.value = {
        // 滑块的位置 = ul 横向滚动的位置 + 当前元素的left - ul的padding
        transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
        width: width + 'px',
    };
    console.log('[ sliderStyle.value ]', sliderStyle.value);
});

//数据改变后  dom变化之前触发
onBeforeUpdate(() => {
    // 因为每次数据改变 都会触发setItemRef方法
    itemRefs = [];
});
</script>

<style lang="scss" scoped></style>
