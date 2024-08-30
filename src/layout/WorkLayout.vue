<script setup>
    import { RouterView } from 'vue-router'
    import { useCurrentUser } from 'vuefire'

    const user = useCurrentUser();
</script>

<template>
    <div class="layout">
        <RouterView v-if="user">
        </RouterView>
    </div>
</template>

<style scoped>
    .layout {
        flex-direction: row;
    }
</style>