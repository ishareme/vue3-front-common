<template>
    <div>
        <Infinite
            v-model="infiniteLoading"
            :isFinished="infiniteFinished"
            @onload="getList"
        >
            <Waterfall
                class="px-1 w-full"
                :data="list"
                nodeKey="url"
                :column="isMobileTerminal ? 2 : 5"
                :preloading="false"
            >
                <template v-slot="{ item, width }">
                    <Item :data="item" :width="width" @click="onPinClick" />
                </template>
            </Waterfall>
        </Infinite>

        <!-- 详情 -->
        <transition
            :css="false"
            @before-enter="onBeforeEnd"
            @enter="onEnter"
            @leave="onLeave"
        >
            <Pins v-if="isPinVisible" :currentPin="currentPin" />
        </transition>
    </div>
</template>

<script setup>
import { getListData } from '@/api/pexel.js';
import { ref, watch } from 'vue';
import { isMobileTerminal } from '@/utils/flexible.js';
import { useStore } from 'vuex';
import Pins from '../../../pins/components/pins.vue';
import Item from './item';

import gsap from 'gsap';
import { useEventListener } from '@vueuse/core';

let query = {
    query: 'art',
    per_page: 20,
    page: 1,
};

const list = ref([]);
const infiniteLoading = ref(false);
const infiniteFinished = ref(false);
let tryCount = 0;
const getList = async () => {
    try {
        if (infiniteFinished.value) return;
        if (list.value.length) {
            query.page += 1;
        }
        const res = await getListData(query);
        tryCount = 0;
        if (query.page === 1) {
            list.value = res.photos;
        } else {
            list.value.push(...res.photos);
        }
        // 数据是否全部加载完成
        if (list.value.length === res.total_results) {
            infiniteFinished.value = true;
        }
        infiniteLoading.value = false;
    } catch (error) {
        if (tryCount < 3) {
            getList();
            tryCount += 1;
        }
        console.log('[ error ]', error);
    }
};

// 监听 currentIndex
const store = useStore();
const restQuery = (newQuery) => {
    query = {
        ...query,
        ...newQuery,
    };
    // 重置状态
    infiniteFinished.value = false;
    tryCount = 0;
    list.value = [];
};
watch(
    () => store.getters.currentCategory,
    (currentCategory) => {
        restQuery({
            page: 1,
            query: currentCategory.urlname,
        });
    }
);
watch(
    () => store.getters.searchText,
    (value) => {
        restQuery({
            page: 1,
            query: value,
        });
    }
);

const isPinVisible = ref(false);
const currentPin = ref({});
const currentLocation = ref({});
const onPinClick = ({ data, location }) => {
    if (!data.id) return;
    // 修改地址 不会刷新
    history.pushState(null, null, `/pins/${data.id}`);
    currentPin.value = data;
    currentLocation.value = location;
    isPinVisible.value = true;
};
// 监听浏览器回退按钮事件
useEventListener(window, 'popstate', () => {
    isPinVisible.value = false;
});

const onBeforeEnd = (el) => {
    gsap.set(el, {
        scaleX: 0,
        scaleY: 0,
        transformOrigin: '0 0',
        translateX: currentLocation.value?.translateX,
        translateY: currentLocation.value?.translateY,
        opacity: 0,
    });
};
const onEnter = (el, done) => {
    gsap.to(el, {
        duration: 0.3,
        scaleX: 1,
        scaleY: 1,
        translateX: 0,
        translateY: 0,
        opacity: 1,
        onComplete: done,
    });
};
const onLeave = (el, done) => {
    gsap.to(el, {
        duration: 0.3,
        scaleX: 0,
        scaleY: 0,
        translateX: currentLocation.value?.translateX,
        translateY: currentLocation.value?.translateY,
        opacity: 1,
        onComplete: done,
    });
};
</script>

<style lang="scss" scoped></style>
