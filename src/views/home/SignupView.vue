<script>
    /**
     * const input = document.querySelector("input");
    const log = document.getElementById("values");
    
    input.addEventListener("input", updateValue);
    
    function updateValue(e) {
      log.textContent = e.target.value;
    }
     */
    // const lowercaseRegEx = /[a-z]/;
    // const uppercaseRegEx = /[A-Z]/;
    // const numberRegEx = /[0-9]/;
    // const symbolRegEx = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
    // const minPasswordLength = 8;
    // // TODO: see input tag pattern attribute
    // function getStrength(password = "") {
    //     if (password.length < minPasswordLength) {
    //         return 0;
    //     }

    //     return lowercaseRegEx.test(password)
    //         + uppercaseRegEx.test(password)
    //         + numberRegEx.test(password)
    //         + symbolRegEx.test(password);
    // }

    // function updateStrength(password = "", matching = true) {
    //     // Uses getStrength as evaluation metric
    // }

    // function updatePasswordsState() {
    //     // Calls updateStrength

    // }

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
            <h2>Create an account</h2>

            <label for="f-name">First name:</label>
            <input class="custom-input" @keydown="nextInput" type="text" id="f-name" name="f-name" placeholder="e.g. Amelia"
                autocomplete="given-name" required>

            <label for="l-name">Last name:</label>
            <input class="custom-input" @keydown="nextInput" type="text" id="l-name" name="l-name" placeholder="e.g. Wilson"
                autocomplete="family-name">

            <label for="email">Email:</label>
            <input class="custom-input" @keydown="nextInput" type="email" id="email" name="email" placeholder="e.g. amelia.wilson@gmail.com"
                autocomplete="email" required>

            <label for="pwd">Password:</label>
            <input class="custom-input" @keydown="nextInput" type="password" id="pwd" name="pwd" placeholder="New password"
                autocomplete="new-password" required>

            <label for="pwd">Confirm password:</label>
            <input class="custom-input" @keydown="nextInput" type="password" id="pwd-rep" name="pwd-rep" placeholder="Repeat password"
                autocomplete="off" required>

            <span id="pwd-strength">Password strength: Good</span>

            <input type="submit" value="Sign up" class="primary-btn">
        </form>
    </main>
</template>

<style scoped>
    form {
        padding: 30px;
        background: #FDFDFD;
        box-shadow: 0px 2px 4px rgba(10, 10, 10, 0.3);
        border-radius: 15px;
        display: flex;
        flex-direction: column;
    }

    h2 {
        text-align: center;
    }

    label {
        font-size: larger;
    }

    input:not([type=submit]) {
        min-width: 400px;
        border-style: solid;
        border-radius: 5px;
        background: #FAFAFA;
        padding: 7px;
        margin: 10px 0px 10px 0px;
    }

    input:not([type=submit]):hover,
    input:not([type=submit]):focus {
        background: #EDEDED;
        border-style: solid;
        transition: 0.1s;
    }

    .primary-btn {
        font-size: normal;
    }
</style>