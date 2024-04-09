<script setup>
    import PanelButton from '../PanelButton.vue';
    import { navigate } from '@/shared';
</script>

<template>
    <div>
        <h2>Looking for something else?</h2>
        <PanelButton @click="navigate('/resources')">
            Visit FAQ ➝
        </PanelButton>
    </div>
</template>

<style scoped>
    div {
        padding: 20px;
        display: flex;
        flex-direction: column;
        place-items: center;
    }
</style>