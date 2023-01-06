<template>
    <Popover placement="bottom-left">
        <template #reference>
            <SvgIcon
                :name="svgIconName"
                class="w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
                fillClass="fill-zinc-900 dark:fill-zinc-300"
            />
        </template>

        <div class="w-[140px] overflow-hidden">
            <div
                v-for="item in themeData"
                :key="item.id"
                class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
                @click="onItemClick(item)"
            >
                <SvgIcon
                    :name="item.icon"
                    class="w-1.5 h-1.5 mr-1"
                    fillClass="fill-zinc-900 dark:fill-zinc-300"
                />
                <span class="text-zinc-800 text-sm dark:text-zinc-300">{{
                    item.name
                }}</span>
            </div>
        </div>
    </Popover>
</template>

<script setup>
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants';
import { computed } from 'vue';
import { useStore } from 'vuex';
const themeData = [
    {
        id: 0,
        type: THEME_LIGHT,
        icon: 'theme-light',
        name: '极简白',
    },
    {
        id: 1,
        type: THEME_DARK,
        icon: 'theme-dark',
        name: '极夜黑',
    },
    {
        id: 2,
        type: THEME_SYSTEM,
        icon: 'theme-system',
        name: '跟随系统',
    },
];

const store = useStore();
const onItemClick = (item) => {
    store.commit('theme/changeThemeType', item.type);
};
// 展示图标
const svgIconName = computed(() => {
    const findTheme = themeData.find(
        (item) => item.type === store.getters.theme
    );
    return findTheme?.icon || THEME_LIGHT;
});
</script>

<style lang="scss" scoped></style>
