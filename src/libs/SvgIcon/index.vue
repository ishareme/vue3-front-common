<template>
    <svg aria-hidden="true">
        <use :xlink:href="symbolID" :class="fillClass" :fill="color" />
    </svg>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    // 显示的svg
    name: {
        type: String,
        required: true,
    },
    // svg图标的颜色
    color: {
        type: String,
    },
    // tailwind 指定的svg 颜色的类名
    fillClass: {
        type: String,
    },
});

// 真实显示的 svg图标
const symbolID = computed(() => `#icon-${props.name}`);
</script>

<style lang="scss" scoped></style>
