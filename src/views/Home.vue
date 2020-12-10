<template>
  <BaseContainer>
    <img
      class="mx-auto"
      alt="Vue logo"
      src="../assets/logo.png"
    />
    <LoginButton />
  </BaseContainer>
</template>

<script lang="ts">
import BaseContainer from '../components/base/BaseContainer.vue';
import LoginButton from '../components/LoginButton.vue';

export default {
  name: 'Home',
  components: {
    BaseContainer,
    LoginButton,
  },
};
</script>
