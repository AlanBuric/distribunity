<script setup>
    import NavHeader from './NavHeader.vue';
    import NavigationBar from './NavigationBar.vue';
</script>

<template>
    <div role="banner">
        <NavHeader></NavHeader>
        <NavigationBar></NavigationBar>
    </div>
</template>

<style scoped>
    [role="banner"] {
        width: 100%;
        display: flex;
        justify-content: space-between;
        box-shadow: 0px 2px 5px rgba(40, 40, 40, 0.2);
        background: var(--color-background);
        z-index: 100;
        padding: 8px 10px;
        margin-bottom: 40px;
        flex-wrap: wrap;
    }

    #bar-inner {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }

    @media screen and (max-width: 1200px) {
        #bar-inner {
            flex-direction: column;
        }
    }
</style>