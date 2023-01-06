<template>
    <div>
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
    </div>
</template>

<script setup>
import Item from './item';
import { getListData } from '@/api/pexel.js';
import { ref } from 'vue';
import { isMobileTerminal } from '@/utils/flexible.js';

const query = {
    query: 'random',
    per_page: 20,
    page: 1,
};

const list = ref([]);
const getList = async () => {
    try {
        const res = await getListData(query);
        list.value = res.photos;
    } catch (error) {
        console.log('[ error ]', error);
    }
};

getList();
</script>

<style lang="scss" scoped></style>
