<script setup>
    import NewsletterButton from './NewsletterButton.vue';
</script>

<template>
    <div id="coming-soon">
        <img src="@/assets/phone-example.png">
        <div>
            <h2>Coming soon to your Desktop and Mobile platforms!</h2>
            <p>We're planning to port Distribunity as a standalone installed app for your devices.</p>
            <NewsletterButton>Notify me when it happens</NewsletterButton>
        </div>
    </div>
</template>

<style scoped>
    #coming-soon {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        align-items: center;
        padding: 20px;
    }

    div {
        font-size: 1.1em;
    }

    @media (max-width: 992px) {
        #coming-soon {
            flex-direction: column-reverse;
        }
    }
</style>