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
    <main>
        <form>
            <h2>Welcome back!</h2>

            <label for="email">Email:</label>
            <input @keydown="nextInput" type="email" id="email" name="email" placeholder="e.g. amelia.wilson@gmail.com"
                autocomplete="email" required>

            <label for="pwd">Password:</label>
            <input @keydown="nextInput" type="password" id="pwd" name="pwd" placeholder="New password"
                autocomplete="current-password" required>

            <input type="submit" value="Log in">
        </form>
    </main>
</template>

<style scoped>
    form {
        width: 500px;
        padding: 30px;
        background: #FDFDFD;
        box-shadow: 0px 2px 4px rgba(10, 10, 10, 0.3);
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        margin: 30px;
    }

    #login {
        display: flex;
        place-content: center;
        place-items: center;
        flex: 1;
    }

    h2 {
        text-align: center;
        margin-bottom: 15px;
        font-weight: bold;
    }

    label {
        font-size: larger;
    }

    input {
        border-style: solid;
        border-radius: 5px;
        background: #FAFAFA;
        font-size: large;
        padding: 7px;
        margin: 10px 0px 10px 0px;
    }

    input:hover,
    input:focus {
        background: #EDEDED;
        border-style: solid;
        transition: 0.15s;
    }
</style>