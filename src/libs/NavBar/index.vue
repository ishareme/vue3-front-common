<template>
    <div
        :class="[sticky ? ' sticky top-0 left-0' : 'relative']"
        class="w-full h-5 border-b flex items-center z-10 bg-white dark:bg-zinc-800 border-b-zinc-200 dark:border-b-zinc-700"
    >
        <div
            class="w-5 h-full absolute left-0 top-0 flex items-center justify-center cursor-pointer"
            @click="onLeftClick"
        >
            <slot name="left">
                <SvgIcon
                    name="back"
                    class="w-2 h-2"
                    fillClass="fill-zinc-900 dark:fill-zinc-200"
                />
            </slot>
        </div>
        <div
            class="h-full flex items-center justify-center m-auto font-bold text-base text-zinc-900 dark:text-zinc-200"
        >
            <slot></slot>
        </div>
        <div
            class="w-5 h-full absolute right-0 flex items-center justify-center"
            @click="onRightClick"
        >
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
    sticky: {
        type: Boolean,
        default: true,
    },
    onLeftClick: {
        type: Function,
    },
    onRightClick: {
        type: Function,
    },
});

const router = useRouter();
const onLeftClick = () => {
    if (props.onLeftClick) {
        props.onLeftClick();
        return;
    } else {
        router.back();
    }
};
const onRightClick = () => {
    props.onRightClick && props.onRightClick();
};
</script>

<style lang="scss" scoped></style>
