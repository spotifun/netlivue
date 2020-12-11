<template>
  <BaseContainer>
    <icon-spinner class="animate-spin w-24 h-24 block mx-auto"></icon-spinner>
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { Router, useRouter } from 'vue-router';

import { authenticate, getParams } from '../services/spotify/accounts';

function useSuccess(router: Router) {
  const success = ref<boolean>();
  watch(success, (val) => {
    const next = { name: (val && 'Profile') || 'Home' };
    router.replace(next);
  });
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
