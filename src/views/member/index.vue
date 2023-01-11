<template>
    <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 xl:pt-1">
        <div
            class="max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4"
        >
            <!-- 移动端 navbar 处理 -->
            <NavBar
                v-if="isMobileTerminal"
                sticky
                :onLeftClick="onNavbarLeftClick"
            >
                精选会员
            </NavBar>

            <div class="py-2 px-1">
                <h2
                    class="text-center text-[34px] font-bold tracking-widest text-yellow-600"
                >
                    精选VIP
                </h2>
                <p class="text-center text-lg text-yellow-500">
                    升级精选VIP，畅想所有内容
                </p>
                <div
                    class="flex justify-between mt-5 overflow-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
                >
                    <PayMenuItem
                        v-for="item in vipPayListData"
                        :key="item.id"
                        :hot="item.isHot"
                        :select="item.id === currentPayData.id"
                        :data="item"
                        @click="onChangeCurrentPay"
                    />
                </div>
                <p class="mt-1 text-sm text-zinc-500">
                    {{ currentPayData.desc }}
                </p>
                <!-- 支付 -->
                <Payment class="mt-4" :payData="currentPayData" />
                <!-- <payment-vue class="mt-4" :payData="currentPayData" /> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { getVipPayList } from '@/api/pay.js';
import { ref } from 'vue';
import { isMobileTerminal } from '@/utils/flexible';
import PayMenuItem from './components/PayMenuItem';
import Payment from './components/Payment';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const vipPayListData = ref([]);
const currentPayData = ref({});
const getVipPayListData = async () => {
    try {
        const res = await getVipPayList();
        if (Array.isArray(res)) {
            vipPayListData.value = res;
            currentPayData.value = res[0];
        } else {
            throw new Error('');
        }
    } catch (error) {
        const res = [
            {
                id: 0,
                title: '连续包月',
                desc: '次月 ¥19 续费,可随时取消',
                oldPrice: '29',
                price: '9',
                isHot: true,
            },
            {
                id: 1,
                title: '连续包年',
                desc: '次月 ¥198 续费,可随时取消',
                oldPrice: '258',
                price: '198',
                isHot: false,
            },
            {
                id: 2,
                title: '连续包季',
                desc: '次月 ¥53 续费,可随时取消',
                oldPrice: '68',
                price: '53',
                isHot: false,
            },
            {
                id: 3,
                title: '月卡',
                desc: '',
                oldPrice: '39',
                price: '29',
                isHot: false,
            },
            {
                id: 4,
                title: '季卡',
                desc: '',
                oldPrice: '79',
                price: '68',
                isHot: false,
            },
            {
                id: 5,
                title: '年卡',
                desc: '',
                oldPrice: '298',
                price: '258',
                isHot: false,
            },
        ];
        vipPayListData.value = res;
        currentPayData.value = res[0];
    }
};
getVipPayListData();

const store = useStore();
const router = useRouter();
const onNavbarLeftClick = () => {
    store.commit('app/changeRouterType', 'back');
    router.back();
};

const onChangeCurrentPay = (item) => {
    currentPayData.value = item;
};
</script>

<style lang="scss" scoped></style>
