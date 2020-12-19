<template>
  <BaseContainer class="my-32">
    <Matcher />
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Matcher from '../components/Matcher.vue';

export default defineComponent({
  name: 'Match',
  components: {
    Matcher,
  },
});
</script>
