<template>
    <div class="w-full">
        <Search v-model="inputValue">
            <template #dropdown>
                <div>11111111</div>
            </template>
        </Search>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const inputValue = ref('');
</script>

<style lang="scss" scoped></style>
