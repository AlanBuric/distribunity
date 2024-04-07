<template>
    <div id="login">
        <div id="panel">
            <h2>Welcome back! Log in.</h2>
            <label for="f-name">First name:</label>
            <input type="text" id="f-name" name="f-name" placeholder="e.g. Amelia" />
            <label for="l-name">Last name:</label>
            <input type="text" id="l-name" name="l-name" placeholder="e.g. Wilson" />
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="e.g. amelia.wilson@gmail.com" />
            <label for="pwd">Password:</label>
            <input type="password" id="pwd" name="pwd" placeholder="Alphanumeric, case-sensitive, symbols" />
            <label for="pwd">Password repeat:</label>
            <input type="password" id="pwd-rep" name="pwd-rep" placeholder="For security, repeat the previous." />
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
