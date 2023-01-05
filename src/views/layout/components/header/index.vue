<template>
    <div
        class="w-full bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700 border-solid px-2 py-1 duration-500"
    >
        <div class="flex items-center">
            <img
                class="h-4 cursor-pointer mr-2"
                src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
                @click="onToHome"
            />
            <HeaderSearch class="mr-1" />
            <HeaderTheme class="mr-1" />
            <HeaderProfile />
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
