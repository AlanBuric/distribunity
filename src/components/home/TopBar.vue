<script setup>
    import Logo from '../icons/Logo.vue';
    import NavigationBar from './NavigationBar.vue';
</script>

<template>
    <div id="top-bar">
        <div id="first-line" class="page-inner">
            <header>
                <Logo width="100px" />
                <div id="title-block">
                    <h1 id="title">Distribunity</h1>
                    <p id="title-quote">Inventory management done right.</p>
                </div>
            </header>
        </div>
        <NavigationBar class="page-inner" />
    </div>
</template>

<style scoped>
    #first-line {
        display: flex;
        place-items: center;
        place-content: center;
    }

    #top-bar {
        width: 100%;
        display: flex;
        flex-direction: column;
        place-items: center;
        flex-wrap: wrap;
        box-shadow: 0px 2px 5px rgba(40, 40, 40, 0.2);
        background: var(--color-background-soft);
        z-index: 100;
    }

    header,
    #title-block {
        display: flex;
        place-content: center;
        padding: 1em;
    }

    header {
        flex-wrap: wrap;
        flex-grow: 1;
    }

    #title-block {
        flex-direction: column;
    }

    #title {
        font-weight: bold;
        font-size: 3em;
        font-family: Pattaya, sans-serif;
    }

    #title-block > * {
        user-select: none;
        margin: 0;
    }
</style>