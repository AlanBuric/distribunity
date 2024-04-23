<script setup>
    import TuningIcon from '../icons/TuningIcon.vue';
    // import { ref } from 'vue'

    // const theme = ref("light");

    // function isThemeDark() {
    //     return theme.value === "dark";
    // }

    // e.g. :checked="isThemeDark">

    // function isBig() {
    //     return getComputedStyle(document.body).getPropertyValue('--width-breakpoint') > 992;
    // }

</script>

<template>
    <button id="lang-btn">EN</button>
    <label role="switch" class="switch">
        <input type="checkbox" checked>
        <span class="slider round"></span>
    </label>
    <button>
        <TuningIcon height="32px" width="32px" />
    </button>
</template>

<style scoped>
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
        flex: none;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: #2196F3;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    .slider.round:before {
        border-radius: 50%;
    }

    button:nth-of-type(2) {
        display: none;
    }

    @media (max-width: var(--width-breakpoint)) {
        div {
            display: none;
        }

        button:nth-child(1) {
            display: inline-block;
        }
    }
</style>