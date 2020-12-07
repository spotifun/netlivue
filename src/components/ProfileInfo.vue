<template>
  <div v-if="user">
    <p>Name: {{ user.display_name }}</p>
    <p>Country: {{ user.country }}</p>
    <p>URI: {{ user.uri }}</p>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { getUserInfo } from '../services/spotify/api';
import { PrivateUser } from '../models/spotify/api';

export default {
  name: 'ProfileInfo',
  setup() {
    const user = ref<PrivateUser>(null);

    getUserInfo().then((userValue) => (user.value = userValue));

    return {
      user,
    };
  },
};
</script>
