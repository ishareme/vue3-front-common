<template>
    <div class="w-full">
        <Search v-model="inputValue" @search="onSearchHandle">
            <template #dropdown>
                <div>
                    <Hint
                        v-show="inputValue"
                        :search-text="inputValue"
                        @on-item-click="onSearchHandle"
                    />
                    <History
                        v-show="!inputValue"
                        @on-item-click="onSearchHandle"
                    />
                    <!-- 主题推荐 -->
                    <Theme v-show="!inputValue" />
                </div>
            </template>
        </Search>
    </div>
</template>

<script setup>
import Hint from './hint.vue';
import History from './history.vue';
import Theme from './theme.vue';
import { watch } from 'vue';

import { ref } from 'vue';
import { useStore } from 'vuex';
const inputValue = ref('');

const store = useStore();
const onSearchHandle = (value) => {
    inputValue.value = value;
    if (value) {
        store.commit('search/addHistory', value);
        // 触发 searchText 的值变化
        store.commit('app/changeSearchText', value);
    }
};

watch(inputValue, (value) => {
    console.log('[ inputValue ]', value);
});
</script>

<style lang="scss" scoped></style>
