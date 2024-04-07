<script setup>
    import { navigate } from '@/shared';
    import HomeItem from '../HomeItem.vue';
    import PanelButton from '@/components/main/PanelButton.vue';
</script>

<template>
    <HomeItem id="intro">
        <div id="intro-overtext">
            <h2 style="font-size: 2.2rem">It's time do ditch the spreadsheets and physical paper.</h2>
            <p style="font-size: 1.3rem; margin: 30px 0px;"><b>Supplend</b> takes care of all the inventory changes,
                details and item
                tracking.</p>
            <PanelButton @click="navigate('/signup')" style="font-size: 1.5rem; margin: 30px 0px;">Sign up for free
            </PanelButton>
        </div>
        <small><a href="https://www.pexels.com/photo/warehouse-with-concrete-floors-4483610/" target="_blank">Photo by
                Tiger Lily from Pexels</a></small>
        <hr>
    </HomeItem>
</template>

<style scoped>
    #intro {
        background-image: url('@/assets/inventory-background.jpg');
        background-position: center;
        flex-direction: column;
        display: flex;
        width: 100%;
        gap: 50px;
    }

    #intro-overtext {
        background: linear-gradient(135deg, white 40%, transparent);
        height: 100%;
        padding: 20px 40px 40px 20px;
        max-width: 500px;
        border-radius: 0 0 50% 0%;
        backdrop-filter: blur(5px);
        box-shadow: 0px 0px 20px 2px rgba(255, 255, 255, 0.5);
    }
</style>