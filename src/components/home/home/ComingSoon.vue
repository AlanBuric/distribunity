<script setup>
    import HomeItem from './HomeItem.vue';
    import PanelButton from '@/components/home/PanelButton.vue';
</script>

<template>
    <HomeItem id="coming-soon">
        <img src="@/assets/phone-example.png">
        <div>
            <h2>Coming soon to your Desktop and Mobile platforms!</h2>
            <p>We're planning to port Supplend as a standalone installed app for your devices.</p>
            <PanelButton>Notify me when it happens</PanelButton>
        </div>
    </HomeItem>
</template>

<style scoped>
    #coming-soon {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        align-items: center;
        padding: 20px;
    }

    @media (max-width: 992px) {
        #coming-soon {
            flex-direction: column-reverse;
        }
    }
</style>