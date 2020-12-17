<template>
  <div>
    <a :href="authURI">
      <button class="px-6 py-3 bg-green-600 text-white font-bold rounded-full">
        Click here to login
      </button>
    </a>
  </div>
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
