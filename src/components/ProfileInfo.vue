<template>
  <BaseCard>
    <div
      v-if="!user"
      class="p-4"
    >
      <icon-spinner class="animate-spin w-24 h-24 block mx-auto"></icon-spinner>
    </div>
    <div
      v-else
      class="text-center"
    >
      <div class="mx-auto w-48">
        <img
          v-if="user.images && user.images[0].url"
          class="rounded-full"
          :src="user.images[0].url"
          :alt="user.display_name"
        >
        <icon-profile v-else></icon-profile>
      </div>
      <h2 class="text-5xl font-bold p-2 m-2">
        <a :href="user.external_urls.spotify">{{ user.display_name }}</a>
      </h2>
      <table class="text-center mx-auto">
        <thead>
          <tr>
            <th>Country</th>
            <th>URI</th>
            <th>Followers</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ user.country }}</td>
            <td>{{ user.uri }}</td>
            <td>{{ user.followers.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseCard>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getUserInfo } from '../services/spotify/api';
import { PrivateUser } from '../models/spotify/api';

export default defineComponent(function ProfileInfo() {
  const user = ref<PrivateUser>();

  getUserInfo().then((userValue) => (user.value = userValue));

  return {
    user,
  };
});
</script>

<style scoped>
td,
th {
  @apply p-1;
}
</style>
