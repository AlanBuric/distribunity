<script>
    /**
     * const input = document.querySelector("input");
    const log = document.getElementById("values");
    
    input.addEventListener("input", updateValue);
    
    function updateValue(e) {
      log.textContent = e.target.value;
    }
     */
    const lowercaseRegEx = /[a-z]/;
    const uppercaseRegEx = /[A-Z]/;
    const numberRegEx = /[0-9]/;
    const symbolRegEx = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
    const minPasswordLength = 8;

    function getStrength(password = "") {
        if (password.length < minPasswordLength) {
            return 0;
        }

        return lowercaseRegEx.test(password)
            + uppercaseRegEx.test(password)
            + numberRegEx.test(password)
            + symbolRegEx.test(password);
    }

    function updateStrength(password = "", matching = true) {
        // Uses getStrength as evaluation metric
    }

    function updatePasswordsState() {
        // Calls updateStrength

    }
</script>

<template>
    <div id="signup">
        <div id="panel">
            <h2>Create an account</h2>
            <label for="f-name">First name:</label>
            <input type="text" id="f-name" name="f-name" placeholder="e.g. Amelia" />
            <label for="l-name">Last name:</label>
            <input type="text" id="l-name" name="l-name" placeholder="e.g. Wilson" />
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="e.g. amelia.wilson@gmail.com" />
            <label for="pwd">Password:</label>
            <input type="password" id="pwd" name="pwd" placeholder="Alphanumeric, case-sensitive, symbols" />
            <label for="pwd">Password repeat:</label>
            <input type="password" id="pwd-rep" name="pwd-rep" />
            <div id="pwd-strength">
                <p>Password strength: Good</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #panel {
        width: 500px;
        padding: 30px;
        background: #FDFDFD;
        box-shadow: 0px 2px 4px rgba(10, 10, 10, 0.3);
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        margin: 30px;
    }

    #signup {
        display: flex;
        place-content: center;
        place-items: center;
        flex: 1
    }

    h2 {
        text-align: center;
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
        transition: 0.1s;
    }
</style>