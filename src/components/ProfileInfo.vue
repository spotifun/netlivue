<template>
  <div v-if="user">
    <p>Name: {{ user.display_name }}</p>
    <p>Country: {{ user.country }}</p>
    <p>URI: {{ user.uri }}</p>
  </div>
</template>

<script lang="ts">
import { getUserInfo } from '../api/spotify/api';
import { PrivateUser } from '../models/spotify/api';

export default {
  name: 'ProfileInfo',
  data() {
    return {
      user: null as PrivateUser,
    };
  },
  created() {
    getUserInfo().then((user) => {
      this.user = user;
    });
  },
};
</script>
