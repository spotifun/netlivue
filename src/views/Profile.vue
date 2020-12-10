<template>
  <BaseContainer>
    <ProfileInfo />
  </BaseContainer>
</template>

<script lang="ts">
import BaseContainer from '../components/base/BaseContainer.vue';
import ProfileInfo from '../components/ProfileInfo.vue';

export default {
  name: 'Profile',
  components: {
    BaseContainer,
    ProfileInfo,
  },
};
</script>
