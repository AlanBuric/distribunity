<script setup>
    import Logo from '@/components/icons/Logo.vue';
</script>

<template>
    <nav>
        <a>Accessibility</a>
        <RouterLink href="/resources">Help</RouterLink>
        <RouterLink id="profile-btn" to="/settings">
            <Logo width="100px" />
            <span style="margin: 5px; font-size: 0.8rem; text-align: center; display: block;">Name Surname</span>
        </RouterLink>
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