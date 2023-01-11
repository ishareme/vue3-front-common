<template>
    <div
        class="flex justify-center items-center py-0.5 bg-orange-100 border-orange-300 border-t xl:border xl:rounded-sm"
        v-if="!isCountDownFinish"
    >
        <SvgIcon
            name="countdown"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-red-600"
        />
        <p class="text-xs text-red-600 font-bold">
            限时特惠 | 距离优惠结束仅剩
            <Countdown
                :time="52 * 60 * 1000"
                class="inline-block"
                @finish="isCountDownFinish = true"
            />
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
// 倒计时是否结束
const isCountDownFinish = ref(false);
</script>
