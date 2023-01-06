<template>
    <div>
        <div
            v-for="(item, index) in hintData"
            :key="`hint${index}`"
            class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            @click="onItemClick(item)"
            v-html="highlightText(item)"
        ></div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getHint } from '@/api/pexel.js';
import { watchDebounced } from '@vueuse/shared';

const props = defineProps({
    searchText: {
        type: String,
        required: true,
    },
});

const hintData = ref([]);
const getHintData = async () => {
    if (!props.searchText) return;
    try {
        const res = await getHint(props.searchText);
        hintData.value = res.result;
    } catch (error) {
        const res = {
            total: 4,
            result: ['12306', '123', '1234', '12345'],
        };
        hintData.value = res.result;
    }
};

// 防抖 隔一个时间再处理
watchDebounced(() => props.searchText, getHintData, {
    immediate: true,
    debounce: 500,
});

const emits = defineEmits(['onItemClick']);
// 点击
const onItemClick = (item) => {
    emits('onItemClick', item);
};
// 处理关键字高亮
const highlightText = (text) => {
    // 生成高亮标签
    const highlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`;
    // 构建正则表达式，从《显示文本中》找出与《用户输入文本相同的内容》，使用《高亮标签》进行替换
    const reg = new RegExp(props.searchText, 'gi');
    // 替换
    return text.replace(reg, highlightStr);
};
</script>

<style lang="scss" scoped></style>
