<template>
  <div class="container mx-auto px-4">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent(function BaseContainer() {});
</script>

<style scoped>
@media screen and (max-height: 480px) {
  .container {
    @apply mt-16;
  }
}
</style>
