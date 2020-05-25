<template>
  <v-app>
    <NavBar />
    <PetitionCreateDialog />
    <PetitionSearchCard :default-params="params" />
    <v-row align="center">
      <PetitionCard
        v-for="(petition, i) in slicedPetition"
        :key="'VHome' + i"
        :petition="petition"
        :target-petition-id.sync="targetPetitionId"
      />
    </v-row>
    <v-row class="pagination">
      <PaginationButton />
    </v-row>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import PetitionCreateDialog from "@/components/dialog/PetitionCreateDialog";
import { mapGetters } from "vuex";
import { FETCH_PETITIONS } from "@/store/actions.type";
import PetitionCard from "@/components/card/PetitionCard.vue";
import PetitionSearchCard from "@/components/card/PetitionSearchCard.vue";
import PaginationButton from "@/components/ui/PaginationButton.vue";

export default {
  name: "home",
  components: {
    NavBar,
    PetitionCreateDialog,
    PetitionCard,
    PetitionSearchCard,
    PaginationButton,
  },
  data: () => ({
    targetPetitionId: null,
  }),
  mounted() {
    this.$store.dispatch(FETCH_PETITIONS, this.params);
  },
  computed: {
    ...mapGetters(["petitions", "page", "petitionCount", "params"]),
    // only 10 petitions should be appeared in the page
    slicedPetition() {
      const startIndex = (this.page - 1) * 10;
      return this.petitions.slice(startIndex, startIndex + 10);
    },
  },
};
</script>

<style scoped>
v-row {
  margin-left: 5px;
  margin-left: 5px;
}
.pagination {
  margin-left: auto;
  margin-right: auto;
}
</style>
