<script setup>
    import { ref } from 'vue'

    const posts = ref([
        { id: 1, date: new Date(2024, 3, 7, 12, 0), title: 'Welcome to Supplend!' },
        { id: 2, date: new Date(2024, 3, 14, 14, 23), title: 'Supplend planned as a Mobile and Desktop application' }
    ]);
</script>

<template>
    <div id="news">
        <h3>You've arrived at the beginning of history!</h3>
        <div id="page-controls">
            <button>Previous</button>
            <button>Back to top</button>
            <button>Next</button>
        </div>
    </div>
</template>

<style>
    #news {
        display: flex;
        flex-direction: column;
        place-items: center;
        margin: 20px 0px 20px 0px;
    }

    #page-controls {
        display: flex;
        margin: 20px;
        gap: 10px;
    }

    #page-controls button {
        border: 1px solid #03afbe;
        color: #FCFCFC;
        border-radius: 25px;
        font-weight: bold;
        background: #09d8c7;
        font-size: 1em;
        padding: 10px 15px;
    }

    @media (hover: hover) {
        button:hover {
            background-color: #0ae4d2;
            box-shadow: 0px 0px 4px 1px rgba(10, 10, 10, 0.2);
            transition: 0.2s;
        }
    }
</style>