<template>
    <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500">
        <Navigation />
        <div class="max-w-xl mx-auto relative m-1 xl:mt-4">
            <List />
        </div>
    </div>
</template>

<script setup>
import Navigation from './components/navigation';
import List from './components/list';
</script>

<style lang="scss" scoped></style>
