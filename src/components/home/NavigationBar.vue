<template>
  <nav>
    <RouterLink class="nav-link" to="/" exact>Home</RouterLink>
    <RouterLink class="nav-link" :to="{ name: 'news', query: { page: 1 } }">News</RouterLink>
    <RouterLink class="nav-link" to="/resources">Resources</RouterLink>
    <RouterLink class="nav-link" to="/login">Log in</RouterLink>
    <RouterLink class="nav-link" to="/signup">Sign up</RouterLink>
    <div class="vr"></div>
    <form>
      <input placeholder="Search..." type="text">
    </form>
  </nav>
</template>

<style scoped>
  nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: fit-content;
  }

  nav > * {
    margin: 4px;
  }

  form {
    margin-left: 8px;
  }

  .vr {
    height: 50%;
    border-left: 1px solid #888;
  }

  input {
    padding: 7px 4px;
    border: 1px solid #AAA;
    font-size: 1em;
    width: 100%;
  }

  input:hover {
    outline: 1px solid #6b6b6b;
  }

  input:focus {
    outline: 1px solid #1a1a1a;
  }

  .nav-link {
    text-align: center;
    padding: 0.8em 0.4em;
    font-size: 1.1em;
    border-radius: 20px;
  }

  .nav-link:hover {
    background-color: rgba(71, 226, 213, 0.5);
    color: var(--color-text);
    /* border-bottom: 4px solid #47e2d5; */
  }

  @media screen and (max-width: 1200px) {
    #bar-inner {
      flex-direction: column;
    }
  }

  /* nav > *:not(:first-child) {
    padding-left: 1em;
  } */

  /* 
  .nav-link {
    border: none;
    font-size: 1.2em;
    padding: 0.7em 1vw;
    background: #0091bd;
    background: linear-gradient(0deg, #0091bd 0%, #00b7bd 100%);
    color: #FBFBFB;
    text-align: center;
    text-decoration: none;
  }

  .nav-link:focus {
    outline: 2px solid #0040bd;
  }

  @media (hover: hover) {
    .nav-link:hover {
      background: #0091bd;
      color: #f9fdff;
    }
  }

  .router-link-exact-active {
    background: #017bac;
    background: #0091bd;
    background: linear-gradient(0deg, #0040bd 0%, #0091bd 100%);
    color: #fdfeff;
  } */
</style>