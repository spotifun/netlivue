<template>
  <h1>{{ msg }}</h1>
  <button class="p-2 bg-blue-700 text-white font-bold rounded" @click="count++">
    count is: {{ count }}
  </button>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: { type: String, default: 'hello' },
  },
  data() {
    return {
      count: 0,
    };
  },
};
</script>
