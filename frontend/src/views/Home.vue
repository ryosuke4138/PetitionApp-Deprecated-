<template>
  <div class="home-page">
    <h1>List of Petitions</h1>
    <p v-for="petition in petitions" :name="petition" :key="petition.title">
      {{ petition.title }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import RwvTag from "@/components/VTag";
import { FETCH_PETITIONS } from "@/store/actions.type";

export default {
  name: "home",
  // components: {
  //   RwvTag
  // },
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
