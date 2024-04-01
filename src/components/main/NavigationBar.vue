<script setup>
  // function getLanguage() {
  //   let result = new Set(navigator?.languages)
  //               .union(new Set(navigator ? [navigator.language, navigator.browserLanguage, 
  //               navigator.userLanguage, navigator.systemLanguage] : []));

  //   result.delete(undefined);

  //   if (result.size == 0) {
  //     result.add("en");
  //   }

  //   return result;
  // }

  const availableLocales = {
    "en": "English",
    "hr": "Hrvatski"
  };

</script>

<template>
  <nav>
    <button @click="$router.push('/')">Home</button>
    <button @click="$router.push('/news')">News</button>
    <button @click="$router.push('/support')">Support</button>
    <!-- <input id="search-bar" type="text" placeholder="Search.."> -->
    <button @click="$router.push('/login')">Log in</button>
    <button @click="$router.push('/signup')">Sign up for free</button>
    <select @v-model="locale" name="locale" id="locale-sel">
      <option value={{locale}}>{{ localeDisplay }}</option>
      <option value="hr">Hrvatski (HR)</option>
    </select>
    <button id="btn-theme">Theme</button>
  </nav>
</template>

<style scoped>
  nav > * {
    height: 100%;
    border: none;
    border-bottom: 5px solid rgb(133, 236, 250);
    font-size: 1.2em;
    padding: 10px;
  }

  button:hover {
    background-color: #20a7dd;
    color: #f9fdff;
  }
</style>