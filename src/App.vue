<script setup>
  import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>

  /* Latin-ext */
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7SUc.woff2) format('woff2');
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }

  /* Latin */
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  .nav-link {
    text-align: center;
    padding: 0.8rem 0.4rem;
    font-size: 1.1rem;

  }

  .nav-link:hover {
    color: var(--active-color);
  }
</style>