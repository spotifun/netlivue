<template>
  <h1>{{ msg }}</h1>
  <p>{{ success ? 'Welcome' : 'Error' }}</p>
  <p v-if="code">{{ code }}</p>
  <div v-if="user">
    <p>Name: {{ user.display_name }}</p>
    <p>Country: {{ user.country }}</p>
    <p>URI: {{ user.uri }}</p>
  </div>
</template>

<script lang="ts">
import { authenticate, getParams } from '../api/spotify/accounts';
import { getUserInfo } from '../api/spotify/api';
import { PrivateUser } from '../models/spotify/api';

export default {
  name: 'Profile',
  props: {
    msg: { type: String, default: 'hello' },
  },
  data() {
    return {
      success: null,
      code: '',
      user: null as PrivateUser,
    };
  },
  watch: {
    success(val) {
      if (!val) {
        return;
      }
      getUserInfo().then((user) => {
        this.user = user;
      });
    },
  },
  created() {
    authenticate(getParams(new URL(window.location.href))).then(
      (success) => (this.success = success),
    );
  },
};
</script>
