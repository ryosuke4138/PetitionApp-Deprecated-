<template>
  <v-card class="mx-auto" max-width="400">
    <UserAvatar :userId="user.userId" />
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
import UserAvatar from "@/components/ui/UserAvatar";

export default {
  components: {
    UserAvatar,
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style scoped></style>
