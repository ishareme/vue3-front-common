<template>
    <div
        class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
        ref="containerTarget"
    >
        <Navigation />
        <div class="max-w-xl mx-auto relative m-1 xl:mt-4">
            <List />
        </div>

        <!-- 移动端下 tabbar -->
        <TriggerMenu
            v-if="isMobileTerminal"
            class="fixed bottom-6 left-0 right-0 mx-auto w-[220px]"
        >
            <TriggerMenuItem
                icon="home"
                iconClass="fill-zinc-900 dark:fill-zinc-200"
                >首页</TriggerMenuItem
            >
            <TriggerMenuItem
                v-if="$store.getters.token"
                icon="vip"
                iconClass="fill-zinc-400 dark:fill-zinc-500"
                textClass="text-zinc-400 dark:text-zinc-500"
                @click="onVipClick"
                >VIP</TriggerMenuItem
            >
            <TriggerMenuItem
                icon="profile"
                iconClass="fill-zinc-400 dark:fill-zinc-500"
                textClass="text-zinc-400 dark:text-zinc-500"
                @click="onMyClick"
                >{{ $store.getters.token ? '我的' : '去登录' }}</TriggerMenuItem
            >
        </TriggerMenu>
    </div>
</template>

<script>
// 组件名字 组件缓存
export default {
    name: 'home',
};
</script>
<script setup>
import Navigation from './components/navigation';
import List from './components/list';
import { isMobileTerminal } from '@/utils/flexible.js';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useScroll } from '@vueuse/core';
import { ref, onActivated } from 'vue';

const store = useStore();
const router = useRouter();
const onVipClick = () => {
    store.commit('app/changeRouterType', 'push');
};
const onMyClick = () => {
    store.commit('app/changeRouterType', 'push');
    if (store.getters.token) {
        router.push('/profile');
    } else {
        router.push('/login');
    }
};

// 记录滚动
const containerTarget = ref(null);
const { y: containerTargetY } = useScroll(containerTarget);

// 被缓存的组件 再次回调
onActivated(() => {
    if (!containerTarget.value) return;
    containerTarget.value.scrollTop = containerTargetY.value;
});
</script>

<style lang="scss" scoped></style>
