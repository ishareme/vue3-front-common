<template>
    <div>
        <PcPayment v-if="!isMobileTerminal" :payData="payData" />
        <MobilePayment v-else :payData="payData" />
    </div>
</template>

<script setup>
import PcPayment from './PcPayment';
import MobilePayment from './MobilePayment';

import { isMobileTerminal } from '@/utils/flexible';

defineProps({
    payData: {
        required: true,
        type: Object,
    },
});
</script>

<style lang="scss" scoped></style>
