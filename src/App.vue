<template>
    <div class="h-screen w-screen fixed top-0 left-0">
        <!-- <router-view /> -->
        <TransitionRouterView
            mainComponentName="home"
            :routerType="$store.getters.routerType"
        />
    </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
