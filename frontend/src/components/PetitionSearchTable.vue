<template>
  <div>
    <PetitionSearchCard />
    <v-row align="center">
      <PetitionCard
        v-for="(petition, i) in slicedPetition"
        :key="i"
        :petition="petition"
        :show-petition-details-dialog.sync="showPetitionDetailsDialog"
        :target-petition-id.sync="targetPetitionId"
      />
      <PaginationButton />
      <PetitionDetailsDialog
        :petition-id.sync="targetPetitionId"
        :show-petition-details-dialog.sync="showPetitionDetailsDialog"
      />
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_PETITIONS } from "@/store/actions.type";
import PetitionDetailsDialog from "@/components/dialog/PetitionDetailsDialog";
import PetitionCard from "@/components/card/PetitionCard.vue";
import PetitionSearchCard from "@/components/card/PetitionSearchCard.vue";
import PaginationButton from "@/components/ui/PaginationButton.vue";

export default {
  components: {
    PetitionCard,
    PetitionSearchCard,
    PetitionDetailsDialog,
    PaginationButton
  },
  data: () => ({
    showPetitionDetailsDialog: false,
    targetPetitionId: null
  }),
  mounted() {
    this.$store.dispatch(FETCH_PETITIONS);
  },
  computed: {
    ...mapGetters(["petitions", "page", "petitionCount"]),
    // only 10 petitions should be appeared in the page
    slicedPetition() {
      const startIndex = (this.page - 1) * 10;
      return this.petitions.slice(startIndex, startIndex + 10);
    }
  }
};
</script>
