<template>
  <div>
    <v-toolbar max-height="64px">
      <TitleButton />
      <v-spacer></v-spacer>
      <v-btn v-if="!isAuthenticated" @click="showLoginDialog = true"
        >Login</v-btn
      >
      <v-btn v-if="!isAuthenticated" @click="showRegisterDialog = true"
        >Register</v-btn
      >
      <v-btn v-if="isAuthenticated">
        <router-link :to="{ name: 'profile', params: { username: user.name } }"
          >Profile</router-link
        >
      </v-btn>
      <LogoutButton v-if="isAuthenticated" />
    </v-toolbar>
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
  },
};
</script>
