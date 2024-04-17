<script setup>
    import ItemEditor from '@/components/work/ItemEditor.vue';
    import ItemList from '@/components/work/ItemList.vue';
    import Navbar from './panel/Navbar.vue';
</script>

<template>
    <Navbar id="navbar"></Navbar>
    <aside id="other">
        <h2>Inventories</h2>
    </aside>
    <ItemList id="inventory">

    </ItemList>
    <ItemEditor id="editor"></ItemEditor>
</template>

<style>

    /*
    * Issue: DOM divs should be flattened somehow to have more control over the parent divs (#app).
    */
    #app {
        display: grid;
        grid-template-columns: 0.5fr 1.5fr 0.7fr 1.3fr;
        grid-template-rows: 0.3fr 1.5fr 1fr 1fr;
        gap: 10px 10px;
        grid-template-areas:
            "navbar navbar navbar navbar"
            "other inventory inventory editor"
            "other inventory inventory editor"
            "other inventory inventory editor";
        align-items: stretch;
        justify-items: stretch;
    }

    #app > * {
        padding: 10px;
        border: 1px solid #dadada;
        background: #fdfdfd;
    }

    #other {
        grid-area: other;
        border-radius: 12px 12px 0px 0px;
    }

    #navbar {
        grid-area: navbar;
        border-radius: 0px 0px 12px 12px;
    }

    #editor {
        grid-area: editor;
        border-radius: 12px 12px 0px 0px;
    }

    #inventory {
        grid-area: inventory;
        border-radius: 12px 12px 0px 0px;
    }
</style>