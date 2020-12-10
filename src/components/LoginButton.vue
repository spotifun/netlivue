<template>
  <a
    class="p-2 bg-green-700 text-white font-bold rounded"
    :href="authURI"
  >
    Click here to login
  </a>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { genAuthURI } from '../services/spotify/accounts';

export default defineComponent(function LoginButton() {
  const authURI = ref('');

  genAuthURI().then((uriValue) => (authURI.value = uriValue));

  return {
    authURI,
  };
});
</script>
