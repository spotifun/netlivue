<template>
  <header
    class="sm:flex sm:justify-between sm:items-center
    navbar z-10 fixed w-full py-3
    bg-white dark:bg-gray-800 dark:text-blue-200 shadow-md
    transition-all duration-300 ease-out"
    :class="{ 'navbar-hidden': !showNavbar }"
  >
    <div class="mx-4 flex items-center justify-between flex-grow">
      <router-link
        to="/"
        tabindex="-1"
        class="focus:outline-none"
      >
      </router-link>
      <div
        class="flex items-center justify-between
        text-blue-700 dark:text-blue-200"
      >
        <button
          type="button"
          class="focus:outline-none
          focus:text-blue-600 hover:text-blue-600
          dark:focus:text-blue-100 dark:hover:text-blue-100"
          @click="$emit('dark')"
        >
          <icon-base class="fill-current w-6 h-6">
            <icon-moon v-if="isDark" />
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
        dark:focus:bg-blue-900 dark:hover:bg-blue-900"
      >
        {{ link.name }}
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts">
export default {
  name: 'TheNavbar',
  props: {
    navLinks: {
      type: Array,
      default: () => [{ name: 'Home', path: '/' }],
    },
    isDark: Boolean,
  },
  emits: ['dark'],
  data() {
    return {
      showNavbar: true,
      lastScrollPosition: 0,
      isOpen: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
    toggleNavbar() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.$nextTick(() => {
          document.addEventListener('click', this.closeNavbar);
        });
      }
    },
    closeNavbar() {
      this.isOpen = false;
      document.removeEventListener('click', this.closeNavbar);
    },
  },
};
</script>

<style scoped>
.navbar {
  transform: translate3d(0, 0, 0);
}

.navbar.navbar-hidden {
  @apply shadow-none;
  transform: translate3d(0, -100%, 0);
}

.navbar a {
  @apply font-bold text-blue-900 dark:text-blue-200;
}

.navbar a.router-link-exact-active {
  @apply text-blue-600 dark:text-blue-100;
}
</style>
