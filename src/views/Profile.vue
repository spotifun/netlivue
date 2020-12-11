<template>
  <BaseContainer>
    <ProfileInfo />
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProfileInfo from '../components/ProfileInfo.vue';

export default defineComponent({
  name: 'Profile',
  components: {
    ProfileInfo,
  },
});
</script>
