<template>
    <MobileNavigation v-if="isMobileTerminal" />
    <PcNavigation v-else />
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible.js';
import MobileNavigation from './mobile';
import PcNavigation from './pc';

import { useStore } from 'vuex';

const store = useStore();
store.dispatch('category/getCategoryData');
</script>

<style lang="scss" scoped></style>
