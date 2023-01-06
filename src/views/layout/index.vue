<template>
    <div class="h-screen">
        <LayoutHeader class="h-header" />
        <div class="h-main">
            <LayoutMain />
        </div>
        <LayoutFloating />
    </div>
</template>

<script setup>
import LayoutHeader from './components/header';
import LayoutMain from './components/main';
import LayoutFloating from './components/floating';
</script>

<style lang="scss" scoped></style>
