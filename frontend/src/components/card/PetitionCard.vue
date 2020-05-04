<template>
  <v-card @click="() => targetPetitionId = petition.petitionId" class="mx-auto" max-width="400">
    <v-img
      class="white--text align-end"
      height="200px"
      :src="API_URL+'petitions/'+petition.petitionId+'/photo'"
    >
      <v-card-title>{{petition.title}}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0">Signature Count: {{ petition.signatureCount }}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{ petition.category }}</div>
      <div>Created by {{ petition.authorName }}</div>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="openModal" text>Explore</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import API_URL from "@/common/config";

export default {
  props: {
    petition: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    API_URL: API_URL,
    isLoading: true
  }),
  methods: {
    openModal() {
      this.$emit("update:targetPetitionId", this.petition.petitionId);
      this.$emit("update:showPetitionDetailsDialog", true);
    }
  }
};
</script>