<template>
  <BaseContainer>
    <ProfileInfo />
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseContainer from '../components/base/BaseContainer.vue';
import ProfileInfo from '../components/ProfileInfo.vue';

export default defineComponent({
  name: 'Profile',
  components: {
    BaseContainer,
    ProfileInfo,
  },
});
</script>
