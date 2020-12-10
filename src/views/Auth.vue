<template>
  <BaseContainer>
    <p>Please wait while we're authenticating...</p>
    <p v-if="success !== null">{{ success ? 'Success!' : 'Failed.' }}</p>
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { Router, useRouter } from 'vue-router';

import BaseContainer from '../components/base/BaseContainer.vue';

import { authenticate, getParams } from '../services/spotify/accounts';

function useSuccess(router: Router) {
  const success = ref<boolean>(null);
  watch(success, (val) => val && router.push({ name: 'Profile' }));
  return success;
}

export default defineComponent({
  name: 'Auth',
  components: {
    BaseContainer,
  },
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
