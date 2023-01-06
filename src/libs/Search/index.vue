<template>
    <div
        ref="containerTarget"
        class="relative p-0.5 rounded-xl duration-500 border-white dark:border-zinc-200 hover:bg-red-200/40 group"
    >
        <SvgIcon
            class="w-1.5 h-1.5 pcenterY left-2"
            color="#707070"
            name="search"
        />
        <input
            v-model="inputValue"
            type="text"
            class="block w-full h-[44px] text-sm pl-4 outline-none bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 text-zinc-900 dark:text-zinc-200 tracking-wide font-semibold border rounded-xl border-zinc-100 dark:border-zinc-700 duration-500 focus:border-red-300 group-hover:bg-white dark:group-hover:bg-zinc-900 dark:group-hover:border-zinc-700"
            placeholder="搜索"
            @keyup="onSearch"
            @focus="onFocus"
            @blur="onBlur"
        />
        <!-- 删除 -->
        <SvgIcon
            v-show="inputValue"
            name="input-delete"
            class="h-1.5 w-1.5 pcenterY right-9 duration-500 cursor-pointer"
            @click="onClear"
        />
        <!-- 分割线 -->
        <div
            class="opacity-0 duration-500 h-1.5 w-[1px] pcenterY right-[62px] bg-zinc-200 group-hover:opacity-100"
        ></div>
        <!-- 搜索按钮 -->
        <HButton
            class="opacity-0 absolute translate-y-[-50%] top-[50%] right-1 rounded-full duration-500 group-hover:opacity-100"
            icon="search"
            iconColor="#fff"
            @click="onSearch"
        />

        <!-- 下拉区 -->
        <transition name="slide">
            <div
                v-if="$slots.dropdown"
                v-show="isFocus"
                class="max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-800 absolute top-[60px] left-0 z-20 p-2 rounded border border-b-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-2xl"
            >
                <slot name="dropdown"></slot>
            </div>
        </transition>
    </div>
</template>

<script>
const EMIT_UPDATE_MODELVALUE = 'update:modelValue';
const EMIT_SEARCH = 'search';
const EMIT_CLEAR = 'clear';
const EMIT_INPUT = 'input';
const EMIT_FOCUS = 'focus';
const EMIT_BLUR = 'blur';
</script>

<script setup>
import { useVModel, onClickOutside } from '@vueuse/core';
import { ref, watch } from 'vue';
const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
});
const emits = defineEmits([
    EMIT_UPDATE_MODELVALUE,
    EMIT_SEARCH,
    EMIT_CLEAR,
    EMIT_INPUT,
    EMIT_FOCUS,
    EMIT_BLUR,
]);

const inputValue = useVModel(props);
// input 焦点
const isFocus = ref(false);
const onFocus = () => {
    isFocus.value = true;
    emits(EMIT_FOCUS);
};
const onBlur = () => {
    emits(EMIT_BLUR);
};
/**
 * 点击区域外隐藏 dropdown
 */
const containerTarget = ref(null);
onClickOutside(containerTarget, () => {
    isFocus.value = false;
});
const onClear = () => {
    inputValue.value = '';
    emits(EMIT_CLEAR, '');
};
const onSearch = () => {
    emits(EMIT_SEARCH, inputValue.value);
};

watch(inputValue, () => {
    emits(EMIT_INPUT);
});
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(40px);
}
</style>
