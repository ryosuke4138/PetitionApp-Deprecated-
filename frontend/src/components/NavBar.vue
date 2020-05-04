<template>
  <v-toolbar max-height="64px">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>Petittion App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="!isAuthenticated">
      <router-link :to="{ name: 'login' }">Login</router-link>
    </v-btn>
    <v-btn v-if="!isAuthenticated">
      <router-link :to="{ name: 'register' }">Register</router-link>
    </v-btn>
    <v-btn v-if="isAuthenticated">
      <router-link :to="{ name: 'profile', params: { username: user.name } }">Profile</router-link>
    </v-btn>
    <LogoutButton v-if="isAuthenticated" />
    <!-- <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>-->
  </v-toolbar>
</template>

<script>
import LogoutButton from "@/components/ui/LogoutButton";
import { mapGetters } from "vuex";

export default {
  components: {
    LogoutButton
  },
  computed: {
    ...mapGetters(["isAuthenticated", "user"])
  }
};
</script>
