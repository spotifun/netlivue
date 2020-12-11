<template>
  <BaseContainer>
    <p>Please wait while we're authenticating...</p>
    <p v-if="success !== null">{{ success ? 'Success!' : 'Failed.' }}</p>
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { Router, useRouter } from 'vue-router';

import { authenticate, getParams } from '../services/spotify/accounts';

function useSuccess(router: Router) {
  const success = ref<boolean>();
  watch(success, (val) => val && router.push({ name: 'Profile' }));
  return success;
}

export default defineComponent({
  name: 'Auth',
  setup() {
    const router = useRouter();
    const success = useSuccess(router);

    authenticate(getParams(new URL(window.location.href))).then(
      (successValue) => (success.value = successValue),
    );

    return {
      success,
    };
  },
});
</script>
