<template>
  <v-btn @click="logout">
    Logout
  </v-btn>
</template>

<script>
import { LOGOUT } from "@/store/actions.type";
export default {
  methods: {
    logout() {
      this.$store
        .dispatch(LOGOUT)
        .then(() => this.$router.push({ name: "home" }, () => {}));
    },
  },
};
</script>
