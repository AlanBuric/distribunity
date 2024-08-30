<script setup>
    import { auth } from '@/firebase/init';
    import router from '@/router';
    import { signInWithEmailAndPassword } from 'firebase/auth';
    import { ref } from 'vue';

    const email = ref('');
    const password = ref('');

    function handleSubmit() {
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then(() => {
                router.push("/work");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });
    }
</script>

<template>
    <main class="home-style">
        <form @submit.prevent="handleSubmit">
            <h2>Welcome back!</h2>

            <label for="email">Email:</label>
            <input class="custom-input" type="email" name="email" v-model="email"
                placeholder="e.g. amelia.wilson@gmail.com" autocomplete="email" required>

            <label for="pwd">Password:</label>
            <input class="custom-input" type="password" name="pwd" v-model="password" placeholder="New password"
                autocomplete="current-password" required>

            <input type="submit" value="Log in" class="primary-btn">
        </form>
    </main>
</template>

<style scoped>
    form {
        box-sizing: content-box;
        max-width: 500px;
        width: 100%;
        padding: 30px;
        background: #FDFDFD;
        box-shadow: 0px 2px 4px rgba(10, 10, 10, 0.3);
        border-radius: 15px;
        display: flex;
        flex-direction: column;
    }

    h2 {
        text-align: center;
        margin-bottom: 15px;
        font-weight: bold;
    }

    label {
        font-size: larger;
    }

    .custom-input {
        box-sizing: content-box;
        min-width: 400px;
    }

    .primary-btn {
        font-size: normal;
    }
</style>