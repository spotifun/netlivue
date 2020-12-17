<template>
  <div>
    <a
      v-if="!loggedIn"
      :href="authURI"
    >
      <BaseButton>
        Login
      </BaseButton>
    </a>
    <BaseButton
      v-else
      @click="logout()"
    >
      Logout
    </BaseButton>
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
