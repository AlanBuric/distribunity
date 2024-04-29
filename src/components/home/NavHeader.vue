<script setup>
    import Logo from '../icons/Logo.vue';
</script>

<template>
    <RouterLink to="/" style="width: fit-content">
        <header title="Take me back home">
            <Logo width="5em" />
            <div>
                <h1>Distribunity</h1>
                <p id="title-quote">Inventory management done right.</p>
            </div>
        </header>
    </RouterLink>
</template>

<style scoped>
    header {
        display: flex;
        padding-left: 5px;
        border-radius: 5px;
    }

    div {
        display: flex;
        place-content: center;
        flex-direction: column;
        padding: 0.6em 1em;
    }

    h1 {
        font: bold 3em 'Garamond', serif;
    }

    * {
        text-decoration: none;
        margin: 0;
    }
    
    header:hover {
        background-color: #DDD;
    }
</style>