<template>
  <header class="sm:flex sm:justify-between sm:items-center
    navbar z-10 fixed w-full py-3
    bg-white dark:bg-gray-800 dark:text-blue-200 shadow-md
    transition-all duration-300 ease-out">
    <div class="mx-4 flex items-center justify-between flex-grow">
      <router-link
        to="/"
        tabindex="-1"
        class="focus:outline-none"
      >
      </router-link>
      <div class="flex items-center justify-between
        text-blue-700 dark:text-blue-200">
        <button
          type="button"
          class="focus:outline-none
          focus:text-blue-600 hover:text-blue-600
          dark:focus:text-blue-100 dark:hover:text-blue-100"
          @click="setDark(!dark)"
        >
          <icon-base class="fill-current w-6 h-6">
            <icon-moon v-if="dark" />
            <icon-sun v-else />
          </icon-base>
        </button>
        <button
          type="button"
          class="sm:hidden ml-4 focus:outline-none
          focus:text-blue-600 hover:text-blue-600
          dark:focus:text-blue-100 dark:hover:text-blue-100"
          @click.stop="toggleNavbar"
        >
          <icon-base class="fill-current w-7 h-7">
            <icon-close v-if="isOpen" />
            <icon-menu v-else />
          </icon-base>
        </button>
      </div>
    </div>
    <nav
      role="navigation"
      class="px-2 pt-2 sm:p-0 xs:mx-0 sm:mr-4 sm:flex sm:items-center"
      :class="{'hidden': !isOpen}"
      @click.stop
    >
      <router-link
        v-for="(link, idx) in navLinks"
        :key="idx"
        :to="link.path"
        :class="{'router-link-exact-active': $route.name === link.name}"
        class="p-2 xs:mt-2 xs:first:mt-1 sm:ml-4 sm:first:ml-0 block rounded
        focus:outline-none focus:bg-gray-200 hover:bg-gray-200
        dark:focus:bg-gray-700 dark:hover:bg-gray-700"
      >
        {{ link.name }}
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { dark, setDark } from '../store/app';

export default defineComponent({
  name: 'TheNavbar',
  props: {
    navLinks: {
      type: Array as PropType<RouteRecordRaw[]>,
      default: () => [{ name: 'Home', path: '/' }],
    },
  },
  setup() {
    const isOpen = ref(false);
    const toggleNavbar = () => (isOpen.value = !isOpen.value);

    return {
      dark,
      setDark,
      isOpen,
      toggleNavbar,
    };
  },
});
</script>

<style scoped>
.navbar a {
  @apply font-bold text-blue-900 dark:text-blue-200;
}

.navbar a.router-link-exact-active {
  @apply text-blue-600 dark:text-blue-100;
}
</style>
