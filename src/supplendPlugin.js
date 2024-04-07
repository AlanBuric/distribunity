import router from '@/router/index';

export function navigate(route) {
    router.push(route);
}

export default {
    install: (app, translations, router) => {
      app.config.globalProperties.$translate = (key) => key.split('.').reduce((o, i) => o??[i], translations);
      app.config.globalProperties.$navigate = (route) => router.push(route);
      // TODO: theme
    }
  }

// <!-- <script setup>
//   function getLanguage() {
//     let result = new Set(navigator.languages)
//       .union(new Set(navigator ? [navigator.language, navigator.browserLanguage,
//       navigator.userLanguage, navigator.systemLanguage] : []));

//     result.delete(undefined);

//     if (result.size == 0) {
//       result.add("en");
//     }

//     return result;
//   }

//   const availableLocales = {
//     "en": "English",
//     "hr": "Hrvatski"
//   };
// </script> -->