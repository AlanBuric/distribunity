<template>
    <div id="footer-wrapper">
        <hr>
        <footer class="page-inner">
            <section>
                <h3>Legal</h3>
                <!---TODO: :link, :visited, :any-link-->
                <ul>
                    <li><a href="">Terms of Service</a></li>
                    <li><a href="">Privacy Policy</a></li>
                    <li><a href="">Cookie Policy</a></li>
                    <li><a href="">Impressum</a></li>
                </ul>
            </section>
            <section>
                <h3>External websites</h3>
                <ul>
                    <li><a href="https://github.com/AlanBuric/distribunity">GitHub</a></li>
                </ul>
            </section>
            <section>
                <h3>Contacts</h3>
                <p>E-mail the developer: <a href="mailto:aburic1@unipu.hr">aburic1@unipu.hr</a></p>
            </section>
        </footer>
    </div>
</template>

<style scoped>
    #footer-wrapper {
        background: #1F1F1F;
        width: 100%;
        display: flex;
        flex-direction: column;
        place-items: center;
        color: #dfdfdf;
        flex: 1;
        margin-top: 40px;
    }

    footer {
        display: flex;
        justify-content: space-evenly;
        padding: 30px 10px 100px 10px;
        gap: 2vw;
    }

    ul {
        list-style-type: none;
        list-style-position: inside;
        padding-left: 0;
    }

    li:not(:first-child) {
        margin-top: 4px;
    }

    section * {
        color: inherit;
    }

    a:hover {
        color: #aae7ff;
        background-color: rgba(94, 174, 250, 0.5);
        text-underline-offset: 3px;
    }

    hr {
        border: 2px solid #4b4c5a;
    }
</style>