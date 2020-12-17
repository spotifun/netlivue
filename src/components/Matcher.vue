<template>
  <BaseCard>
    <div class="text-center">
      <h2 class="text-3xl heading">
        You haven't entered a matching room.
      </h2>
      <BaseButton class="mt-2 mb-6 text-xl">Generate a new matching room
      </BaseButton>
      <h2 class="text-2xl heading">...or enter your friend's room ID:</h2>
      <input
        class="rounded-full p-4 text-center font-bold text-3xl bg-gray-300 dark:bg-gray-700"
        type="number"
        min="100000"
        max="999999"
        name="matchingID"
      >
    </div>
  </BaseCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent(function Matcher() {
  return {};
});
</script>

<style scoped>
.heading {
  @apply font-bold p-2 m-2;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
