<template>
    <button>
        <slot></slot>
    </button>
</template>

<style scoped>
    button {
        border: 1px solid #03afbe;
        color: #FCFCFC;
        font-size: 1.5em;
        font-weight: bold;
        border-radius: 25px;
        background: #09d8c7;
        padding: 15px 20px 15px 20px;
        margin: 20px;
    }

    @media (hover: hover) {
        button:hover {
            background-color: #0ae4d2;
            box-shadow: 0px 0px 4px 1px rgba(10,10,10, 0.2);
            transition: 0.2s;
        }
    }
</style>