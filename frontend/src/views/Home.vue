<template>
  <home-layout>
    <PetitionSearchTable />
  </home-layout>
</template>

<script>
import HomeLayout from "@/layouts/Home";
import PetitionSearchTable from "@/components/PetitionSearchTable";

export default {
  name: "home",
  components: {
    HomeLayout,
    PetitionSearchTable
  }
  // mounted() {
  //   this.$store.dispatch(FETCH_TAGS);
  // },
};
</script>
