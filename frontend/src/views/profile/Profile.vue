<template>
  <v-app>
    <NavBar />
    <ProfileCard />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "@/components/NavBar";
import ProfileCard from "@/components/card/ProfileCard";

export default {
  components: {
    NavBar,
    ProfileCard,
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
