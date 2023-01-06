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
                    <Item :data="item" :width="width" />
                </template>
            </Waterfall>
        </Infinite>
    </div>
</template>

<script setup>
import Item from './item';
import { getListData } from '@/api/pexel.js';
import { ref, watch } from 'vue';
import { isMobileTerminal } from '@/utils/flexible.js';
import { useStore } from 'vuex';

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
</script>

<style lang="scss" scoped></style>
