<script setup>
    import NavigationBar from './NavigationBar.vue'
    import TopHeader from './TopHeader.vue'
</script>

<template>
    <div id="top-bar">
        <TopHeader />
        <!-- <hr> -->
        <NavigationBar />
    </div>
</template>

<style scoped>
    #top-bar {
        grid-area: topbar;
        /* display: flex;
        flex-direction: column;
        place-items: center; */
        width: 100%;
        display: flex;
        flex-direction: column;
        place-items: center;
    }

    /* hr {
        width: 50%;
        margin-bottom: 10px;
    } */
</style>