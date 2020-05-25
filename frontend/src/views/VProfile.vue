<template>
  <v-app>
    <NavBar />
    <PetitionCreateDialog :isProfile="true" />
    <h1 class="title">Profile</h1>
    <v-row class="profile" align="center">
      <ProfileCard />
    </v-row>
    <h1 class="mypetition">My Petitions</h1>
    <h3 v-if="!petitions.length" class="alert">No Petitions Registered..</h3>
    <v-row align="center">
      <PetitionCard
        v-for="(petition, i) in petitions"
        :key="'VProfile' + i"
        :petition="petition"
        :is-profile="true"
        :show-petition-details-dialog.sync="showPetitionDetailsDialog"
        :target-petition-id.sync="targetPetitionId"
      />
    </v-row>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "@/components/NavBar";
import ProfileCard from "@/components/card/ProfileCard";
import { FETCH_PETITIONS } from "@/store/actions.type";
import PetitionCard from "@/components/card/PetitionCard.vue";
import PetitionCreateDialog from "@/components/dialog/PetitionCreateDialog";

export default {
  components: {
    NavBar,
    ProfileCard,
    PetitionCard,
    PetitionCreateDialog,
  },
  data: () => ({
    showPetitionDetailsDialog: false,
    targetPetitionId: null,
  }),
  mounted() {
    this.$store.dispatch(FETCH_PETITIONS, { authorId: this.user.userId });
  },
  computed: {
    ...mapGetters(["user", "petitions"]),
  },
};
</script>

<style scoped>
.title {
  font-weight: normal;
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}
.mypetition {
  font-weight: normal;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
  font-size: 20px;
}
.alert {
  font-weight: normal;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
  font-size: 14px;
}
</style>
