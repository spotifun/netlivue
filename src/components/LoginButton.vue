<template>
  <a
    class="p-2 bg-green-700 text-white font-bold rounded"
    :href="authURI"
  >
    Click here to login
  </a>
</template>

<script lang="ts">
import { genAuthURI } from '../api/spotify/accounts';

export default {
  name: 'LoginButton',
  data() {
    return {
      authURI: '',
    };
  },
  created() {
    genAuthURI().then((uri) => (this.authURI = uri));
  },
};
</script>
