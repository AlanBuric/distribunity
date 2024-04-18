<template>
    <div id="footer-wrapper">
        <hr>
        <footer class="page-inner">
            <div>
                <h4>Legal</h4>
                <ul>
                    <li><a href="">Terms of Service</a></li>
                    <li><a href="">Privacy Policy</a></li>
                    <li><a href="">Cookie Policy</a></li>
                    <li><a href="">Impressum</a></li>
                </ul>
            </div>
        </footer>
    </div>
</template>

<style scoped>
    #footer-wrapper {
        background: #1F1F1F;
        min-height: 200px;
        width: 100%;
        display: flex;
        flex-direction: column;
        place-items: center;
    }

    footer {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding: 10px;
    }

    ul {
        list-style-type: "– ";
        list-style-position: inside;
        padding: 0;
    }

    h4,
    li {
        color: #a0a0a0;
    }

    hr {
        border: 2px solid #888;
    }
</style>