<template>
  <BaseContainer>
    <BaseCard class="text-center">
      <h1 class="text-6xl sm:text-8xl font-bold p-4">spotifun</h1>
      <h2 class="text-xl sm:text-2xl mt-4">
        <strong>A music recommendation app</strong>
        for pairs of music connoisseurs.
      </h2>
      <AuthButton class="mt-8 mb-4" />
    </BaseCard>
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthButton from '../components/AuthButton.vue';

export default defineComponent({
  name: 'Home',
  components: {
    AuthButton,
  },
});
</script>
