<template>
    <div
        class="fixed left-0 bottom-0 w-screen text-center bg-white dark:bg-zinc-800 xl:hidden"
    >
        <!-- 特惠提示 -->
        <Discounts />
        <!-- 支付 -->
        <div class="flex justify-between text-xs px-1 py-0.5">
            <div class="text-left text-zinc-900 dark:text-zinc-200">
                <p class="">
                    券后合计：<span
                        class="text-red-600 text-[16px] font-sans font-medium"
                        >￥</span
                    ><span
                        class="text-red-600 text-[22px] font-sans font-medium"
                        >9</span
                    >
                </p>
                <p class="text-red-600">优惠券：限时立减 ￥10</p>
            </div>
            <HButton
                class="w-[120px]"
                :isActiveAnim="false"
                @click="onConfirmClick"
            >
                立即开通
            </HButton>
        </div>
        <!-- TODO: popup -->
        <Popup v-model="isOpenPopup" class="rounded-tl rounded-tr">
            <!-- <mobile-pay-select-vue :payData="payData" /> -->
            <MobilePaymentSelect />
        </Popup>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Discounts from '../discounts.vue';
import MobilePaymentSelect from './MobilePaymentSelect';

const isOpenPopup = ref(false);
const onConfirmClick = () => {
    isOpenPopup.value = true;
};
</script>

<style lang="scss" scoped></style>
