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
import TheNavbar from './components/TheNavbar.vue';
import router from './router';

export default {
  name: 'App',
  components: {
    TheNavbar,
  },
  data() {
    return {
      dark: false,
      navLinks: router.getRoutes(),
    };
  },
  watch: {
    dark(value) {
      localStorage.dark = value;
    },
  },
  created() {
    if (localStorage.dark) {
      this.dark = localStorage.dark === 'true';
    } else {
      this.dark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
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
