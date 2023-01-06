<template>
    <div
        class="bg-white sticky top-0 left-0 z-10 dark:bg-zinc-900 duration-500"
    >
        <ul
            ref="ulTarget"
            class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-y-hidden"
        >
            <!-- 汉堡按钮 -->
            <li
                class="fixed right-[-1px] top-0 z-20 h-4 px-1 flex items-center bg-white dark:bg-zinc-900 shadow-l-white dark:shadow-l-zinc"
                @click="onShowPopup"
            >
                <SvgIcon class="w-1.5 h-1.5" name="hamburger" />
            </li>

            <!-- 滑块 -->
            <li
                ref="sliderTarget"
                :style="sliderStyle"
                class="absolute h-[22px] bg-zinc-900 dark:bg-zinc-800 rounded-lg transition-all duration-200"
            ></li>

            <!-- items -->
            <li
                v-for="(item, index) in $store.getters.categorys"
                class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
                :class="{
                    'text-zinc-100':
                        $store.getters.currentCategoryIndex === index,
                }"
                :key="`mi-${item.id}`"
                :ref="setItemRef"
                @click="onItemClick(item)"
            >
                {{ item.name }}
            </li>
        </ul>

        <Popup v-model="isPopupVisible">
            <HMenu @onItemClick="onItemClick" />
        </Popup>
    </div>
</template>

<script setup>
import { ref, onBeforeUpdate, watch } from 'vue';
import { useScroll } from '@vueuse/core';
import HMenu from '../../menu';
import { useStore } from 'vuex';

// 处理滑块
const sliderStyle = ref({
    transform: 'translateX(0)',
    width: '52px',
});
// 选中下标
const store = useStore();
let itemRefs = [];
// 循环的需要用函数接收
const setItemRef = (el) => {
    el && itemRefs.push(el);
};
// 获取滚动容器
const ulTarget = ref(null);
// 通过 vueuse -> useScroll 获取响应式的 scroll 数据
const scrollData = useScroll(ulTarget);
const { x: ulScrollLeft } = scrollData;

// watch 监听 gettes 要传函数
watch(
    () => store.getters.currentCategoryIndex,
    (index) => {
        const itemRef = itemRefs[index];
        const { left, width } = itemRef.getBoundingClientRect();
        sliderStyle.value = {
            // 滑块的位置 = ul 横向滚动的位置 + 当前元素的left - ul的padding
            transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
            width: width + 'px',
        };
    }
);

//数据改变后  dom变化之前触发
onBeforeUpdate(() => {
    // 因为每次数据改变 都会触发setItemRef方法
    itemRefs = [];
});

// 控制popup
const isPopupVisible = ref(false);
const onShowPopup = () => {
    isPopupVisible.value = true;
};

const onItemClick = (item) => {
    store.commit('app/changeCurrentCategory', item);
    isPopupVisible.value = false;
};
</script>

<style lang="scss" scoped></style>
