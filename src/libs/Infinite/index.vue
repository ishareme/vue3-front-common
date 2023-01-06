<template>
    <div></div>
</template>

<script setup>
defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
    // 数据是否全部加载完成
    isFinished: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['onload', 'update:modelValue']);
</script>

<style lang="scss" scoped></style>
