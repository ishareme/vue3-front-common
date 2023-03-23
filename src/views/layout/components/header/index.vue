<template>
    <div
        class="w-full bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700 border-solid px-2 py-1 duration-500"
    >
        <div class="flex items-center">
            <img
                v-lazy
                class="guide-home h-4 cursor-pointer mr-2"
                src="http://div.junzher.net/img/logo.5446419a.png"
                @click="onToHome"
            />
            <HeaderSearch class="guide-search mr-1" />
            <HeaderTheme class="guide-theme mr-1" />
            <HeaderProfile class="guide-profile" />
        </div>
    </div>
</template>

<script setup>
import HeaderSearch from './search';
import HeaderTheme from './theme';
import HeaderProfile from './profile';
import { useRouter } from 'vue-router';

const router = useRouter();
const onToHome = () => {
    router.push('/');
};
</script>

<style lang="scss" scoped></style>
