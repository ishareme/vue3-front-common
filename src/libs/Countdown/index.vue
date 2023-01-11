<template>
    <div>
        <slot>
            <p class="text-sm">
                {{ showTime }}
            </p>
        </slot>
    </div>
</template>

<script>
// 倒计时结束
const EMIT_FINISH = 'finish';
// 倒计时改变
const EMIT_CHANGE = 'change';

const INTERVAL_COUNT = 1000;
</script>
<script setup>
import { ref, watch, computed, onUnmounted } from 'vue';
import dayjs from './utils';

const props = defineProps({
    // 毫秒 时间戳
    time: {
        type: Number,
        required: true,
    },
    // 遵循dayjs 标准
    format: {
        type: String,
        default: 'HH:mm:ss',
    },
});

const emits = defineEmits([EMIT_FINISH, EMIT_CHANGE]);

// 倒计时时长
const duration = ref(0);

// 开始倒计时
let iterval = null;
const start = () => {
    // 开始前结束下
    close();
    iterval = setInterval(() => {
        durationFn();
    }, INTERVAL_COUNT);
};

// 倒计时执行
const durationFn = () => {
    duration.value -= INTERVAL_COUNT;
    emits(EMIT_CHANGE, duration);
    // 结束
    if (duration.value <= 0) {
        duration.value = 0;
        emits(EMIT_FINISH);
        close();
    }
};

// 倒计时结束
const close = () => {
    iterval && clearInterval(iterval);
};

// 显示时间
const showTime = computed(() => {
    return dayjs.duration(duration.value).format(props.format);
});

// 开始
watch(
    () => props.time,
    (val) => {
        duration.value = val;
        start();
    },
    { immediate: true }
);

// 组件销毁时候清理倒计时
onUnmounted(() => {
    close();
});
</script>

<style lang="scss" scoped></style>
