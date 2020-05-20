<template>
  <v-app>
    <NavBar />
    <v-row align="center">
      <ProfileCard />
      <PetitionCard
        v-for="(petition, i) in petitions"
        :key="i"
        :petition="petition"
        :show-petition-details-dialog.sync="showPetitionDetailsDialog"
        :target-petition-id.sync="targetPetitionId"
      />
      <PetitionDetailsDialog
        :petition-id.sync="targetPetitionId"
        :show-petition-details-dialog.sync="showPetitionDetailsDialog"
        :isProfile="true"
      />
    </v-row>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "@/components/NavBar";
import ProfileCard from "@/components/card/ProfileCard";
import { FETCH_PETITIONS } from "@/store/actions.type";
import PetitionDetailsDialog from "@/components/dialog/PetitionDetailsDialog";
import PetitionCard from "@/components/card/PetitionCard.vue";

export default {
  components: {
    NavBar,
    ProfileCard,
    PetitionCard,
    PetitionDetailsDialog
  },
  data: () => ({
    showPetitionDetailsDialog: false,
    targetPetitionId: null
  }),
  mounted() {
    this.$store.dispatch(FETCH_PETITIONS, { authorId: this.user.userId });
  },
  computed: {
    ...mapGetters(["user", "petitions"])
  }
};
</script>
