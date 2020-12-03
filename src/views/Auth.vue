<template>
  <BaseContainer>
    <Profile />
  </BaseContainer>
</template>

<script>
import BaseContainer from '../components/base/BaseContainer.vue';
import Profile from '../components/Profile.vue';

export default {
  name: 'Home',
  components: {
    BaseContainer,
    Profile,
  },
};
</script>
