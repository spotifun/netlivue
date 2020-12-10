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
import { defineComponent } from 'vue';
import BaseContainer from '../components/base/BaseContainer.vue';
import LoginButton from '../components/LoginButton.vue';

export default defineComponent({
  name: 'Home',
  components: {
    BaseContainer,
    LoginButton,
  },
});
</script>
