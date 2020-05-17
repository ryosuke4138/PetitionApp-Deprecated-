<template>
  <v-app>
    <h1>Profile</h1>
    <p>
      {{ user.name }}
    </p>
    <p>
      {{ user.city }}
    </p>
    <p>
      {{ user }}
    </p>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["user"]),
    // tag() {
    //   return this.$route.params.tag;
    // }
  },
};
</script>
