<script setup>
    import NavHeader from './NavHeader.vue';
    import NavigationBar from './NavigationBar.vue';
</script>

<template>
    <div role="banner">
        <div class="page-inner">
            <NavHeader></NavHeader>
            <NavigationBar></NavigationBar>
        </div>
    </div>
</template>

<style scoped>
    [role="banner"] {
        position: fixed;
        width: 100%;
        display: flex;
        justify-content: center;
        box-shadow: 0px 2px 5px rgba(40, 40, 40, 0.2);
        background: var(--color-background);
        z-index: 100;
        padding: 8px 10px;
        font-size: 0.9rem;
    }

    .page-inner {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }
</style>