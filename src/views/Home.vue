<template>
  <BaseContainer>
    <img class="mx-auto" alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
  </BaseContainer>
</template>

<script>
import BaseContainer from '../components/base/BaseContainer.vue';
import HelloWorld from '../components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    BaseContainer,
    HelloWorld,
  },
};
</script>
