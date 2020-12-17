<template>
  <div>
    <a
      v-if="!loggedIn"
      :href="authURI"
    >
      <button class="px-6 py-3 bg-green-600 text-white font-bold rounded-full">
        Click here to login
      </button>
    </a>
    <button
      v-else
      class="px-6 py-3 bg-green-600 text-white font-bold rounded-full"
      @click="logout()"
    >
      Click here to logout
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { genAuthURI, logout } from '../services/spotify/accounts';
import { loggedIn } from '../store/auth';

export default defineComponent(function AuthButton() {
  const authURI = ref('');

  genAuthURI().then((uriValue) => (authURI.value = uriValue));

  return {
    authURI,
    loggedIn,
    logout,
  };
});
</script>
