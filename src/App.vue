<template>
  <div
    id="app"
    class="flex flex-col items-center font-sans antialiased"
    :class="{ dark }"
  >
    <TheNavbar
      :is-dark="dark"
      :nav-links="navLinks"
      @dark="dark = !dark"
    />
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

<script>
import { ref, watch } from 'vue';
import TheNavbar from './components/TheNavbar.vue';
import router from './router';

function useDark() {
  const dark = ref(false);

  if (localStorage.dark) {
    dark.value = localStorage.dark === 'true';
  } else {
    dark.value =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  watch(dark, (val) => (localStorage.dark = val));
  return dark;
}

export default {
  name: 'App',
  components: {
    TheNavbar,
  },
  setup() {
    const dark = useDark();
    const navLinks = router
      .getRoutes()
      .filter((route) => route.meta.showOnNavbar !== false);

    return {
      dark,
      navLinks,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
