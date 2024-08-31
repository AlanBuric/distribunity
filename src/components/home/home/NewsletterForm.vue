<script lang="ts" setup>
  import { database } from '@/firebase/init'
  import { doc, setDoc } from 'firebase/firestore'
  import { ref } from 'vue'

  const submitted = ref(false)
  const email = ref('')

  function signupForNewsLetter() {
    setDoc(doc(database, 'email-subscriptions', email.value), {})
      .then((value) => console.log('Success!', value))
      .catch((error) => console.error(error))
    submitted.value = true
  }
</script>

<template>
  <section>
    <h2 v-if="submitted">
      Thank you for subscribing to our newsletter!
    </h2>
    <template v-else>
      <div style="text-align: center">
        <h2>Sign up for our newsletter</h2>
        <p>Subscribe to our journey on becoming a favored choice for businesses.</p>
      </div>
      <form @submit.prevent="signupForNewsLetter">
        <input
v-model.lazy="email" class="custom-input" name="email" autocomplete="email" placeholder="Your e-mail"
          required>
        <button type="submit" class="primary-btn">
          Subscribe
        </button>
        <input type="checkbox" name="agreement" required>
        <label for="agreement">
          I allow Distribunity to save my e-mail for sending me promotions and educational content,
          and have the right to cancel my subscription any time.
        </label>
      </form>
    </template>
  </section>
</template>

<style scoped>
  section {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  form {
    width: fit-content;
  }

  label[for='agreement'] {
    display: inline-block;
    max-width: 800px;
  }
</style>
