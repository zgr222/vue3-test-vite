<template>
  <h1>Home Page</h1>
</template>

<script>
import { inject } from "vue";
export default {
  setup() {
    const foo = inject("foo");
    console.log("home", foo);
  },
};
</script>
