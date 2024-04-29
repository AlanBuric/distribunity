<script setup>
    import { RouterView } from 'vue-router'
    import { useFirestore } from 'vuefire'
    import { useCurrentUser } from 'vuefire'

    const user = useCurrentUser();
    const db = useFirestore();
    /*
     * <RouterView v-if="user">
    </RouterView>
     */
</script>

<template>
    <RouterView>
    </RouterView>
</template>

<style></style>