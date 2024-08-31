<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { getPasswordStrength } from '@/scripts/signup'
  import { createUserWithEmailAndPassword } from 'firebase/auth'
  import { auth, database } from '@/firebase/init'
  import { setDoc, doc } from 'firebase/firestore'
  import router from '@/router'

  const PASSWORDS_MATCH = {
    message: 'Passwords match.',
    className: 'passwords-match'
  }

  const PASSWORDS_DONT_MATCH = {
    message: "Confirmation password doesn't match the password.",
    className: 'invalid-input'
  }

  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const passwordStrength = ref({ title: 'Weak' })
  const passwordsMatch = ref(null)

  watch(password, (newPassword) => {
    passwordStrength.value = getPasswordStrength(newPassword ?? '')
  })

  watch([password, confirmPassword], ([newPassword, newConfirmPassword]) => {
    passwordsMatch.value = newPassword != newConfirmPassword ? PASSWORDS_DONT_MATCH : PASSWORDS_MATCH
  })

  function getFormValidityFeedback() {
    const issues = []

    if (passwordStrength.value.strength == 2) {
      issues.push(
        'Your password is too weak. Use lowercase and uppercase letters, numbers and symbols'
      )
    }

    if (password.value.length < 6) {
      issues.push('Your password is too short, it needs to be at least 6 characters long')
    }

    if (confirmPassword.value != password.value) {
      issues.push("Your passwords don't match")
    }

    return issues
  }

  const formIssues = ref([])

  function handleSubmit() {
    formIssues.value = getFormValidityFeedback()

    if (formIssues.value.length == 0) {
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          formIssues.value = ['Firebase Auth user creation succeeded.']

          setDoc(doc(database, 'users', userCredential.user.uid), {
            firstName: firstName.value,
            lastName: lastName.value,
            joined: Date.now()
          })
            .then(() => {
              formIssues.value = ['User fully created.']
              router.push('/work')
            })
            .catch(() => {
              formIssues.value = [
                'Sorry, but we failed to create your user profile in our database. Please contact us for support.'
              ]
            })
        })
        .catch((error) => {
          formIssues.value = [error.code, error.message]
        })
    }
  }
</script>

<template>
  <main class="home-style">
    <form @submit.prevent="handleSubmit">
      <h2>Create an account</h2>

      <label for="firstName">First name:</label>
      <input
        v-model="firstName" class="custom-input" type="text" name="firstName" placeholder="e.g. Amelia"
        autocomplete="given-name" required
      >

      <label for="lastName">Last name:</label>
      <input
        v-model="lastName" class="custom-input" type="text" name="lastName" placeholder="e.g. Wilson"
        autocomplete="family-name"
      >

      <label for="email">Email:</label>
      <input
        v-model="email" class="custom-input" type="email" name="email" placeholder="e.g. amelia.wilson@gmail.com"
        autocomplete="email" required
      >

      <label for="password">Password:</label>
      <input
        v-model="password" class="custom-input" type="password" name="password" placeholder="New password"
        autocomplete="new-password" required
      >

      <p id="password-strength">
        Password strength: {{ passwordStrength.title }}
      </p>

      <label for="password-confirm">Confirm password:</label>
      <input
        id="password-confirm" v-model="confirmPassword" class="custom-input" type="password"
        name="password-confirm" placeholder="Confirm password" autocomplete="off" required
      >
      <p v-if="passwordsMatch" :class="[passwordsMatch.className]">
        {{ passwordsMatch.message }}
      </p>

      <input type="submit" value="Sign up" class="primary-btn">
      <ul v-if="formIssues.length > 0" class="invalid-input">
        <li v-for="(issue, index) in formIssues" :key="index">
          {{ issue }}
        </li>
      </ul>
    </form>
  </main>
</template>

<style scoped>
  form {
    padding: 30px;
    background: #fdfdfd;
    box-shadow: 0px 2px 4px rgba(10, 10, 10, 0.3);
    border-radius: 15px;
  }

  form > * {
    display: block;
  }

  h2 {
    text-align: center;
  }

  label {
    font-size: larger;
  }

  .custom-input {
    box-sizing: content-box;
    min-width: 400px;
  }

  .primary-btn {
    font-size: normal;
  }

  .passwords-match {
    color: rgb(20, 170, 6);
  }

  .invalid-input {
    color: red;
  }

  input:disabled {
    background-color: rgba(150, 150, 150, 0.5);
    pointer-events: none;
  }
</style>
