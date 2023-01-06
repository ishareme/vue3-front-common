<template>
    <div>
        <div class="text-xs mb-1 text-zinc-400">热门精选</div>
        <div class="flex h-[140px] w-full" v-if="themeData.list.length">
            <div
                class="relative rounded w-[260px] cursor-pointer mr-1.5"
                :style="{
                    backgroundColor: randomRGB(),
                }"
            >
                <img
                    v-lazy
                    class="w-full h-full object-cover rounded"
                    :data-src="themeData.big.photo"
                />
                <p
                    class="absolute bottom-0 left-0 w-full h-[45%] flex items-center backdrop-blur rounded px-1 text-white text-xs duration-300 hover:backdrop-blur-0"
                >
                    # {{ themeData.big.title }}
                </p>
            </div>
            <div class="flex flex-wrap justify-between max-w-[830px]">
                <div
                    v-for="item in themeData.list"
                    :key="item.id"
                    class="h-[45%] w-[260px] text-white text-sm relative ml-1.5 mb-1.5 rounded overflow-hidden"
                >
                    <img
                        v-lazy
                        class="w-full h-full object-cover rounded"
                        :data-src="item.photo"
                    />
                    <p
                        class="backdrop-blur absolute top-0 bottom-0 rounded w-full h-full flex items-center px-1 cursor-pointer duration-300 hover:backdrop-blur-0"
                    >
                        # {{ item.title }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getThemes } from '@/api/pexel.js';
import { ref } from 'vue';
import { THEME_NOMAR_DATA } from '@/constants';
import { randomRGB } from '@/utils/color.js';

const themeData = ref({
    big: {},
    list: [],
});
const getThemeData = async () => {
    try {
        const { themes } = await getThemes();
        themeData.value = {
            big: themes.length > 1 ? themes[0] : THEME_NOMAR_DATA[0],
            list:
                themes.length > 1 ? themes.slice(1) : THEME_NOMAR_DATA.slice(1),
        };
    } catch (error) {
        themeData.value = {
            big: THEME_NOMAR_DATA[0],
            list: THEME_NOMAR_DATA.slice(1),
        };
    }
};
getThemeData();
</script>

<style lang="scss" scoped></style>
