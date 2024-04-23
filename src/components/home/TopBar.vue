<script setup>
    import NavHeader from './NavHeader.vue';
    import NavigationBar from './NavigationBar.vue';
</script>

<template>
    <div role="banner">
        <div class="page-inner" id="bar-inner">
            <NavHeader></NavHeader>
            <NavigationBar></NavigationBar>
        </div>
    </div>
</template>

<style scoped>
    [role="banner"] {
        width: 100%;
        display: flex;
        justify-content: center;
        box-shadow: 0px 2px 5px rgba(40, 40, 40, 0.2);
        background: var(--color-background);
        z-index: 100;
        padding: 8px 0;
        margin-bottom: 40px;
    }

    #bar-inner {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    @media screen and (max-width: 1200px) {
        #bar-inner {
            flex-direction: column;
        }
    }
</style>