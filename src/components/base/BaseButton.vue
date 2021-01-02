<template>
  <button
    class="px-6 py-3 focus:bg-green-500 hover:bg-green-500 bg-green-600 text-white font-bold rounded-full shadow-md"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent(function BaseButton() {
  return {};
});
</script>
