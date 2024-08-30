<script setup>
    import Logo from '@/components/icons/Logo.vue';
</script>

<template>
    <nav>
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/resources" class="nav-link">Help</RouterLink>
        <a href="" class="nav-link">Accessibility</a>
        <RouterLink id="profile-btn" to="/work/settings">
            <Logo width="2.5rem"></Logo>
        </RouterLink>
    </nav>
</template>

<style scoped>
    #profile-btn {
        max-width: 100px;
        max-height: 70px;
        display: flex;
        margin: 4px;
    }

    #profile-btn > svg {
        border-radius: 100%;
        box-shadow: -2px 2px 4px rgba(10, 10, 10, 0.5);
        transition: box-shadow 0.1s, outline 0.1s;
    }

    #profile-btn > svg:hover {
        outline: 1px solid gray;
    }

    nav {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
    }

    .nav-link {
        color: rgb(167, 167, 167);
        font-size: normal;
    }
</style>