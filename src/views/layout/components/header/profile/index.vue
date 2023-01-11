<template>
    <Popover placement="bottom-left" class="flex items-center">
        <template #reference>
            <div
                v-if="$store.getters.token"
                class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
                <img
                    v-lazy
                    :src="$store.getters.userInfo.avatar"
                    class="w-3 h-3 rounded-sm"
                />
                <SvgIcon
                    class="h-1.5 w-1.5 ml-0.5"
                    name="down-arrow"
                    fillClass="fill-zinc-900 dark:fill-zinc-300"
                />
                <SvgIcon
                    class="h-1.5 w-1.5 absolute right-[16px] bottom-0"
                    name="vip"
                    v-if="$store.getters.userInfo.vipLevel"
                />
            </div>
            <div v-else>
                <HButton icon="profile" iconColor="#fff" @click="onLogin" />
            </div>
        </template>

        <div v-if="$store.getters.token" class="w-[140px] overflow-hidden">
            <div
                v-for="item in profileMenu"
                :key="item.id"
                class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
                @click="onPopoverClick(item)"
            >
                <SvgIcon
                    :name="item.icon"
                    class="w-1.5 h-1.5 mr-1"
                    fillClass="fill-zinc-900 dark:fill-zinc-300"
                />
                <span class="text-zinc-800 text-sm dark:text-zinc-300">{{
                    item.title
                }}</span>
            </div>
        </div>
    </Popover>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { Confirm } from '@/libs';
import { useStore } from 'vuex';

const profileMenu = [
    {
        id: 0,
        icon: 'profile',
        title: '个人资料',
        path: '/profile',
    },
    {
        id: 1,
        icon: 'vip-profile',
        title: '升级VIP',
        path: '/member',
    },
    {
        id: 2,
        icon: 'logout',
        title: '退出登录',
    },
];

const router = useRouter();
const onLogin = () => {
    router.push('/login');
};

const store = useStore();
const onPopoverClick = (item) => {
    if (item.id === 2) {
        Confirm('你确定要退出登录吗？').then(() => {
            store.dispatch('user/logout');
        });
        return;
    } else {
        router.push(item.path);
    }
};
</script>

<style lang="scss" scoped></style>
