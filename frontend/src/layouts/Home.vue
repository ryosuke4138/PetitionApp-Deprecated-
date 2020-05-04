<template>
  <v-app>
    <NavBar />
    <slot />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>
