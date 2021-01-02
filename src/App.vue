<template>
  <div
    id="app"
    class="flex flex-col items-center font-sans antialiased"
    :class="{ dark }"
  >
    <TheNavbar :nav-links="navLinks" />
    <div
      id="content"
      class="flex w-full min-h-screen items-center
      text-gray-700 dark:text-gray-300
      transition-all duration-300 ease-out
      bg-gray-100 dark:bg-gray-900"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { dark } from './store/app';
import TheNavbar from './components/TheNavbar.vue';
import router from './router';

const useNavLinks = () => {
  return computed(() =>
    router
      .getRoutes()
      .filter((route) =>
        route.meta.showOnNavbar ? route.meta.showOnNavbar() : true,
      ),
  );
};

export default defineComponent({
  name: 'App',
  components: {
    TheNavbar,
  },
  setup() {
    const navLinks = useNavLinks();
    return {
      dark,
      navLinks,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
