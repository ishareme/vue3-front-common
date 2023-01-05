<template>
    <div class="h-screen">
        <LayoutHeader class="h-header" />
        <LayoutMain class="h-main" />
        <LayoutFloating />
    </div>
</template>

<script setup>
import LayoutHeader from './components/header';
import LayoutMain from './components/main';
import LayoutFloating from './components/floating';
</script>

<style lang="scss" scoped></style>
