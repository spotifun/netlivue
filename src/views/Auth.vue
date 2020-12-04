<template>
  <BaseContainer>
    <p>Please wait while we're authenticating...</p>
    <p v-if="success !== null">{{ success ? 'Success!' : 'Failed.' }}</p>
  </BaseContainer>
</template>

<script>
import BaseContainer from '../components/base/BaseContainer.vue';

import { authenticate, getParams } from '../services/spotify/accounts';

export default {
  name: 'Auth',
  components: {
    BaseContainer,
  },
  data() {
    return {
      success: null,
    };
  },
  watch: {
    success(val) {
      if (!val) {
        return;
      }
      this.$router.push({ name: 'Profile' });
    },
  },
  created() {
    authenticate(getParams(new URL(window.location.href))).then(
      (success) => (this.success = success),
    );
  },
};
</script>
