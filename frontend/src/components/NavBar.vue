<template>
  <div>
    <v-app-bar :fixed="true" max-height="64px">
      <TitleButton />
      <v-spacer></v-spacer>
      <v-btn v-if="!isAuthenticated" @click="showLoginDialog = true"
        >Login</v-btn
      >
      <v-btn v-if="!isAuthenticated" @click="showRegisterDialog = true"
        >Register</v-btn
      >
      <router-link
        :class="button"
        :to="{ name: 'profile', params: { username: user.name } }"
      >
        <v-btn v-if="isAuthenticated"> Profile</v-btn>
      </router-link>

      <LogoutButton v-if="isAuthenticated" />
    </v-app-bar>
    <LoginDialog :show.sync="showLoginDialog" />
    <RegisterDialog :show.sync="showRegisterDialog" />
  </div>
</template>

<script>
import LogoutButton from "@/components/ui/LogoutButton";
import LoginDialog from "@/components/dialog/LoginDialog";
import RegisterDialog from "@/components/dialog/RegisterDialog";
import TitleButton from "@/components/ui/TitleButton";
import { mapGetters } from "vuex";

export default {
  components: {
    LogoutButton,
    TitleButton,
    LoginDialog,
    RegisterDialog,
  },
  data: () => ({
    showLoginDialog: false,
    showRegisterDialog: false,
  }),
  computed: {
    ...mapGetters(["isAuthenticated", "user"]),
    button() {
      return { "no-under-line": true };
    },
  },
};
</script>

<style scoped>
.no-under-line {
  text-decoration: none;
}
</style>
