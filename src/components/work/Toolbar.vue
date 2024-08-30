<template>
    <nav>
        <button class="link-like" @click="$emit('newItem')">
            New
        </button>
        <form>
            <input placeholder="Item name..." />
        </form>
    </nav>
</template>

<style scoped>
    nav {
        display: flex;
        flex-direction: row;
        padding: 10px;
        gap: 10px;
        align-items: center;
    }
</style>