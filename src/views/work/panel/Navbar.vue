<script setup>
    import SupplendLogo from '@/components/icons/SupplendLogo.vue';
    import { navigate } from '@/shared';
</script>

<template>
    <nav>
        <a>Accessibility settings</a>
        <a href="/resources">Help</a>
        <button id="profile-btn" @click="navigate('/work/settings')">
            <div>
                <SupplendLogo width="100%" />
                <h4 style="margin: 5px">Name Surname</h4>
            </div>
        </button>
    </nav>
</template>

<style scoped>
    #profile-btn {
        max-width: 100px;
        max-height: 150px;
    }
</style>