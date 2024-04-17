<script setup>
    // TODO: turn into a SocialMediaButton.vue
    import GithubIcon from '../icons/GithubIcon.vue';
</script>

<template>
    <button onclick="window.open('https://github.com/AlanBuric/distribunity', '_blank').focus()">
        <GithubIcon />
    </button>
</template>

<style scoped>
    button {
        border: none;
        background: none;
        cursor: pointer;
    }

    button > svg {
        fill: #666;
    }

    @media (hover: hover) {
        button:hover > svg {
            fill: #444;
        }
    }
</style>