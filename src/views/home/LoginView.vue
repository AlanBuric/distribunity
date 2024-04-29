<script>
    export default {
        methods: {
            nextInput(event) {
                if (event.key !== "Enter" && event.key !== "ArrowRight") {
                    return;
                }

                let el = event.target.nextSibling;

                while (el && el.nodeName !== "INPUT") {
                    el = el.nextSibling;
                }

                if (el?.nodeName === "INPUT") {
                    el.focus();
                    event.preventDefault();
                }
            }
        }
    }
</script>

<template>
    <main class="home-style">
        <form>
            <h2>Welcome back!</h2>

            <label for="email">Email:</label>
            <input class="custom-input" @keydown="nextInput" type="email" id="email" name="email"
                placeholder="e.g. amelia.wilson@gmail.com" autocomplete="email" required>

            <label for="pwd">Password:</label>
            <input class="custom-input" @keydown="nextInput" type="password" id="pwd" name="pwd"
                placeholder="New password" autocomplete="current-password" required>

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
        border-radius: 5px;
    }

    .primary-btn {
        font-size: normal;
    }
</style>