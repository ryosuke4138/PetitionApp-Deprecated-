<template>
  <v-card class="mx-auto" max-width="400">
    <UserImage class="avatar" :userId="user.userId" />
    <v-card-title class="cardTitle">{{ user.name }}</v-card-title>
    <v-card-text class="text--primary">
      <div>Email: {{ user.email }}</div>
      <div>City: {{ user.city }}</div>
      <div>Country: {{ user.country }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import UserImage from "@/components/ui/UserImage";

export default {
  components: {
    UserImage
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style scoped>
</style>
