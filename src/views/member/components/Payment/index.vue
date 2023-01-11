<template>
    <div>
        <PcPayment v-if="!isMobileTerminal" />
        <MobilePayment v-else />
    </div>
</template>

<script setup>
import PcPayment from './PcPayment';
import MobilePayment from './MobilePayment';

import { isMobileTerminal } from '@/utils/flexible';
</script>

<style lang="scss" scoped></style>
