<template>
  <button class="px-6 py-3 bg-green-600 text-white font-bold rounded-full">
    <a :href="authURI">Click here to login</a>
  </button>
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
