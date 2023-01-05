<template>
    <button
        class="text-sm text-center rounded duration-150 flex items-center justify-center"
        :class="[
            typeEnum[type],
            sizeEnum[sizeKey].button,
            {
                'active:scale-105': isActiveAnim,
            },
        ]"
        @click.stop="onClick"
    >
        <!-- loading -->
        <SvgIcon
            v-if="loading"
            name="loading"
            class="w-2 h-2 animate-spin mr-1"
        />
        <!-- icon 按钮 -->
        <SvgIcon
            v-if="icon"
            :name="icon"
            class="m-auto"
            :class="[sizeEnum[sizeKey].icon]"
            :color="iconColor"
            :fillClass="iconClass"
        />
        <!-- 文字按钮 -->
        <slot v-else></slot>
    </button>
</template>

<script>
// type 风格

import { computed } from 'vue';

// size 大小 区分文字按钮和icon按钮
const typeEnum = {
    primary: 'text-white bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800',
    main: 'text-white bg-main hover:bg-hover-main active:bg-hover-main',
    info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200',
};
const sizeEnum = {
    // 文字按钮
    default: {
        button: 'w-8 h-4 text-base',
        icon: '',
    },
    'icon-default': {
        button: 'w-4 h-4',
        icon: 'w-1.5 h-1.5',
    },
    small: {
        button: 'w-7 h-3 text-base',
        icon: '',
    },
    'icon-small': {
        button: 'w-7 h-3 ',
        icon: 'w-1.5 h-1.5',
    },
};
</script>

<script setup>
/**
 * 1. 构建type 风格  和 size 大小可选项
 * 2. 通过props 控制按钮
 * 3. 区分 icon button 和 text button
 * 4. 根据数据 展示视图
 * 5. 点击事件
 */
const props = defineProps({
    // icon 图标
    icon: {
        type: String,
    },
    // icon 颜色
    iconColor: {
        type: String,
    },
    // icon 图标类名 tailwind
    iconClass: {
        type: String,
    },
    // 按钮风格
    type: {
        type: String,
        default: 'main',
        validator(val) {
            console.log('[ val ]', val);
            const keys = Object.keys(typeEnum);
            const result = keys.includes(val);
            if (!result) {
                throw new Error(`type 必须是 ${keys.join(',')} 中一个`);
            }
            return result;
        },
    },
    // 大小风格
    size: {
        type: String,
        default: 'default',
        validator(val) {
            const keys = Object.keys(sizeEnum).filter(
                (key) => !key.includes('icon')
            );
            const result = keys.includes(val);
            if (!result) {
                throw new Error(`size 必须是 ${keys.join(',')} 中一个`);
            }
            return result;
        },
    },
    // 按钮点击时候是否需要动画
    isActiveAnim: {
        type: Boolean,
        default: true,
    },
    // 加载状态
    loading: {
        type: Boolean,
        default: false,
    },
});
const emits = defineEmits(['click']);
// size 处理
const sizeKey = computed(() => {
    return props.icon ? 'icon-' + props.size : props.size;
});
// 事件处理
const onClick = () => {
    if (props.loading) return;
    emits('click');
};
</script>

<style lang="scss" scoped></style>
