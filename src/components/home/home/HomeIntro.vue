<script setup>
    import { navigate } from '@/shared';
    import HomeItem from './HomeItem.vue';
    import PanelButton from '@/components/home/PanelButton.vue';
</script>

<template>
    <HomeItem id="intro">
        <div id="intro-overtext">
            <h2 style="font-size: 2.2rem">It's time do ditch the spreadsheets and pen & paper.</h2>
            <p style="font-size: 1.3rem;"><b>Supplend</b> takes care of all the inventory changes,
                details and item tracking in one place.</p>
            <PanelButton @click="navigate('/signup')" style="font-size: 1.5rem;">Sign up for free
            </PanelButton>
        </div>
    </HomeItem>
</template>

<style scoped>
    #intro {
        background-image: url('@/assets/inventory-background.jpg');
        background-position: center;
    }

    #intro-overtext {
        background: linear-gradient(110deg, white 30%, rgba(255, 255, 255, 0.5) 80%, transparent);
        height: 100%;
        padding: 20px;
        max-width: 500px;
        backdrop-filter: blur(5px);
        box-shadow: 0px 0px 20px 2px rgba(255, 255, 255, 0.5);
    }
</style>