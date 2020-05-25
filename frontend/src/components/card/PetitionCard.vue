<template>
  <v-card class="mx-auto" max-width="400">
    <v-img
      class="white--text align-end"
      height="200px"
      :src="API_URL + 'petitions/' + petition.petitionId + '/photo'"
      :key="'PetitionCard' + index"
    ></v-img>
    <v-card-title class="cardTitle">{{ petition.title }}</v-card-title>
    <v-card-subtitle class="pb-0"
      >Signature Count: {{ petition.signatureCount }}</v-card-subtitle
    >
    <v-card-text class="text--primary">
      <div>{{ petition.category }}</div>
      <div>Created by {{ petition.authorName }}</div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="explore" text>Explore</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import API_URL from "@/common/config";
import { FETCH_SIGNATURES, FETCH_PETITION } from "@/store/actions.type";
import { mapGetters } from "vuex";
import { SET_IS_PROFILE } from "../../store/mutations.type";

export default {
  props: {
    petition: {
      type: Object,
      default: null,
    },
    isProfile: {
      type: Boolean,
      default: false,
    },
  },
  data: (vm) => ({
    API_URL: API_URL,
    index: vm.petitionId * 10 ** 8,
  }),
  computed: {
    ...mapGetters(["isLoading"]),
  },
  watch: {
    isLoading: function(val) {
      if (val) this.index++;
    },
  },
  methods: {
    explore() {
      Promise.all([
        this.$store.dispatch(FETCH_SIGNATURES, this.petition.petitionId),
        this.$store.dispatch(FETCH_PETITION, this.petition.petitionId),
      ]).then(() => {
        this.$store.commit(SET_IS_PROFILE, this.isProfile);
        this.$router.push(
          { name: "petition", params: { slug: this.petition.petitionId } },
          () => {}
        );
      });
    },
  },
};
</script>

<style scoped></style>
