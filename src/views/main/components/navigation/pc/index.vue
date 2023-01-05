<template>
    <div class="bg-white sticky top-0 left-0 w-full z-10">
        <ul
            class="w-[75%] relative flex flex-wrap justify-center overflow-x-auto overflow-y-hidden px-[10px] py-1 text-xs text-zinc-600 duration-300 mx-auto"
            :class="[isOpenCategory ? 'h-[206px]' : 'h-[56px]']"
        >
            <!-- 箭头 -->
            <li
                class="block absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200"
                @click="onToggleOpen"
            >
                <SvgIcon
                    :name="isOpenCategory ? 'fold' : 'unfold'"
                    class="w-1 h-1"
                    fillClass="fill-zinc-900"
                />
            </li>
            <li
                v-for="(item, index) in $store.getters.categorys"
                :key="item.id"
                @click="onItemClick(index)"
                class="shrink-0 px-1.5 py-0 z-10 duration-200 text-zinc-700 text-base font-bold h-4 leading-4 cursor-pointer rounded mr-1 mb-1 hover:bg-zinc-200"
                :class="{
                    'text-zinc-900 bg-zinc-200': currentCategoryIndex === index,
                }"
            >
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isOpenCategory = ref(false);
const onToggleOpen = () => {
    isOpenCategory.value = !isOpenCategory.value;
};

const currentCategoryIndex = ref(0);
const onItemClick = (index) => {
    currentCategoryIndex.value = index;
};
</script>

<style lang="scss" scoped></style>
