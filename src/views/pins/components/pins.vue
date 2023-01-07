<template>
    <div
        class="fixed top-0 left-0 w-screen h-screen text-xl z-20 backdrop-blur-4xl bg-transparent pb-2 overflow-y-auto xl:p-2 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
    >
        <NavBar v-if="isMobileTerminal">
            {{ photo.alt }}

            <template #right>
                <SvgIcon
                    name="share"
                    class="w-3 h-3"
                    fillClass="fill-zinc-900 dark:fill-zinc-200"
                />
            </template>
        </NavBar>
        <!-- pc端 -->
        <div
            v-else
            class="w-3.5 h-3.5 cursor-pointer duration-300 flex justify-center items-center bg-white hover:bg-main/70 absolute right-2 top-2 rounded-full shadow-sm group"
        >
            <SvgIcon
                name="close"
                class="w-1.5 h-1.5"
                fillClass="fill-zinc-400 group-hover:fill-zinc-100 dark:fill-zinc-200"
                @click="onClose"
            />
        </div>

        <!-- 内容 -->
        <div
            v-if="photo.alt"
            class="xl:w-[80%] xl:h-full xl:m-auto xl:rounded-lg xl:flex xl:justify-center xl:items-center"
        >
            <img
                v-lazy
                :data-src="
                    isMobileTerminal ? photo.src?.large : photo.src?.large2
                "
                class="w-screen mb-2 xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg xl:mb-0 xl:object-cover"
            />
            <div
                class="xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-br-lg xl:p-3"
            >
                <!-- pc下分享 收藏 -->
                <div v-if="!isMobileTerminal" class="flex justify-between mb-2">
                    <SvgIcon
                        name="share"
                        class="w-4 h-4 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-300 rounded"
                    />
                    <HButton
                        type="info"
                        icon="heart"
                        iconClass="fill-zinc-900 dark:fill-zinc-200"
                    />
                </div>
                <!-- 标题 -->
                <p
                    class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl:text-xl xl:mb-5"
                >
                    {{ photo.alt }}
                </p>
                <!-- 作者 -->
                <div class="flex items-center mt-1 px-1">
                    <img
                        v-lazy
                        :data-src="
                            isMobileTerminal
                                ? photo.src?.medium
                                : photo.src?.large
                        "
                        class="h-3 w-3 rounded-full"
                    />
                    <span
                        class="text-base text-zinc-900 dark:text-zinc-200 ml-1"
                        >{{ photo.photographer }}</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible.js';
import { ref } from 'vue';
import { getPhotoById } from '@/api/pexel.js';
import { useRouter } from 'vue-router';
const props = defineProps({
    currentPin: {
        type: Object,
        required: true,
    },
});

const photo = ref(props.currentPin);
const getPhotoData = async () => {
    try {
        const res = await getPhotoById(photo.value.id);
        photo.value = res;
    } catch (error) {
        console.log('[ error ]', error);
    }
};
getPhotoData();

const router = useRouter();
const onClose = () => {
    photo.value = {};
    router.back();
};
</script>

<style lang="scss" scoped></style>
