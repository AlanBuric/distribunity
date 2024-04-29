<script setup>
    import Logo from '@/components/icons/Logo.vue';
</script>

<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/resources">Help</RouterLink>
        <a href="">Accessibility</a>
        <RouterLink id="profile-btn" to="/work/settings">
            <Logo width="3.5rem"></Logo>
        </RouterLink>
    </nav>
</template>

<style scoped>
    #profile-btn {
        max-width: 120px;
        max-height: 90px;
        display: flex;
        margin: 10px;
    }

    #profile-btn > svg {
        border-radius: 100%;
        box-shadow: -2px 2px 4px rgba(10, 10, 10, 0.5);
        margin: 5px;
        transition: box-shadow 0.1s, outline 0.1s;
    }

    #profile-btn > svg:hover {
        outline: 1px solid gray;
    }

    nav {
        background: #111;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 20px;
    }
</style>