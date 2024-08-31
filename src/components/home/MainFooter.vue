<script lang="ts" setup>
  import Logo from '../icons/BrandLogo.vue'
</script>
<template>
  <div id="footer-wrapper">
    <hr>
    <footer class="page-inner">
      <div id="footer-links">
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
          <p>
            Site issues? <br>E-mail the developer:
            <a href="mailto:aburic1@unipu.hr">aburic1@unipu.hr</a>
          </p>
        </section>
      </div>
      <section id="footer-end">
        <Logo />
        <p>Copyright Distribunity 2024.</p>
      </section>
    </footer>
  </div>
</template>

<style scoped>
  #footer-wrapper {
    background: #1f1f1f;
    width: 100%;
    display: flex;
    flex-direction: column;
    place-items: center;
    color: #dfdfdf;
    flex: 1;
  }

  footer {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px 10px;
  }

  #footer-links {
    display: flex;
    justify-content: space-evenly;
    gap: 2vw;
  }

  #footer-end {
    display: flex;
    flex-direction: column;
    place-items: center;
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
