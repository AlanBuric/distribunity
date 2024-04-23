<script setup>
    import NewsletterButton from './NewsletterButton.vue';
    // See: addEventListener(..., {once: true})
</script>

<template>
    <section>
        <img src="@/assets/phone-example.png">
        <div>
            <h2>Coming soon to your Desktop and Mobile platforms!</h2>
            <p>We're planning to port Distribunity as a standalone installed app for your devices.</p>
            <NewsletterButton>Notify me when it happens</NewsletterButton>
        </div>
    </section>
</template>

<style scoped>
    section {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        align-items: center;
        padding: 20px;
    }

    div {
        font-size: 1.1em;
    }

    img {
        width: 25%;
        max-width: 300px;
    }

    @media screen and (max-width: 992px) {
        section {
            flex-direction: column-reverse;
        }
    }
</style>