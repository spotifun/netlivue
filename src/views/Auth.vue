<template>
  <BaseContainer>
    <p>Please wait while we're authenticating...</p>
    <p v-if="success !== null">{{ success ? 'Success!' : 'Failed.' }}</p>
  </BaseContainer>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import BaseContainer from '../components/base/BaseContainer.vue';

import { authenticate, getParams } from '../services/spotify/accounts';

export default {
  name: 'Auth',
  components: {
    BaseContainer,
  },
  setup() {
    const router = useRouter();
    const { success } = useSuccess(router);

    authenticate(getParams(new URL(window.location.href))).then(
      (successValue) => (success.value = successValue),
    );

    return {
      success,
    };
  },
};

function useSuccess(router) {
  const success = ref(null);
  watch(success, (val) => {
    if (!val) {
      return;
    }
    router.push({ name: 'Profile' });
  });

  return {
    success,
  };
}
</script>
