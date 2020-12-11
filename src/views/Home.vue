<template>
  <BaseContainer>
    <BaseCard class="text-center">
      <h1 class="text-8xl font-bold p-4">spotifun</h1>
      <LoginButton class="mt-8 mb-4" />
    </BaseCard>
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginButton from '../components/LoginButton.vue';

export default defineComponent({
  name: 'Home',
  components: {
    LoginButton,
  },
});
</script>
