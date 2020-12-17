<template>
  <button class="px-6 py-3 bg-green-600 text-white font-bold rounded-full">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent(function BaseButton() {
  return {};
});
</script>
