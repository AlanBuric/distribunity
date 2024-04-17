<script setup>
    import Logo from '@/components/icons/Logo.vue';
    import { navigate } from '@/shared';
</script>

<template>
    <nav>
        <a>Accessibility</a>
        <a href="/resources">Help</a>
        <button id="profile-btn" @click="navigate('/settings')">
            <Logo width="100px" />
            <span style="margin: 5px; font-size: 0.8rem; text-align: center; display: block;">Name Surname</span>
        </button>
    </nav>
</template>

<style scoped>
    #profile-btn {
        max-width: 120px;
        max-height: 90px;
        display: flex;
    }

    nav {
        background: #111;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 20px;
    }
</style>