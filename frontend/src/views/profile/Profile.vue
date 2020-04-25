<template>
  <home-layout>
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
  </home-layout>
</template>

<script>
import { mapGetters } from "vuex";
import HomeLayout from "@/layouts/Home";

export default {
  name: "home",
  components: {
    HomeLayout,
  },
  computed: {
    ...mapGetters(["user"]),
    // tag() {
    //   return this.$route.params.tag;
    // }
  },
};
</script>
