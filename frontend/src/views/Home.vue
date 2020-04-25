<template>
  <home-layout>
    <h1>List of Petitions</h1>
    <p v-for="petition in petitions" :name="petition" :key="petition.title">
      {{ petition.title }}
    </p>
  </home-layout>
</template>

<script>
import { mapGetters } from "vuex";
import HomeLayout from "@/layouts/Home";
import { FETCH_PETITIONS } from "@/store/actions.type";

export default {
  name: "home",
  components: {
    HomeLayout,
  },
  // mounted() {
  //   this.$store.dispatch(FETCH_TAGS);
  // },
  mounted() {
    this.$store.dispatch(FETCH_PETITIONS);
  },
  computed: {
    ...mapGetters(["petitions"]),
    // tag() {
    //   return this.$route.params.tag;
    // }
  },
};
</script>
