<script>
    export default {
        methods: {
            nextInput(event) {
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
    <div id="login">
        <form>
            <h2>Welcome back!</h2>

            <label for="f-name">First name:</label>
            <input @keydown="nextInput" type="text" id="f-name" name="f-name" placeholder="e.g. Amelia" required autocapitalize>

            <label for="l-name">Last name:</label>
            <input @keydown="nextInput" type="text" id="l-name" name="l-name" placeholder="e.g. Wilson" required autocapitalize>

            <label for="email">Email:</label>
            <input @keydown="nextInput" type="email" id="email" name="email" placeholder="e.g. amelia.wilson@gmail.com"
                required>

            <label for="pwd">Password:</label>
            <input @keydown="nextInput" type="new-password" id="pwd" name="pwd" placeholder="New password" required>

            <label for="pwd-rep">Confirm password:</label>
            <input @keydown="nextInput" type="new-password" id="pwd-rep" name="pwd-rep" placeholder="Repeat password"
                required>

            <span id="pwd-strength">Password strength: Good</span>

            <input type="submit" value="Log in">
        </form>
    </div>
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