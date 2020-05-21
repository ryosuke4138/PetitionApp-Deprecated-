<template>
  <v-card class="mx-auto" max-width="400">
    <UserImage :key="index" class="avatar" :userId="user.userId" />
    <v-card-title class="cardTitle">{{ user.name }}</v-card-title>
    <v-card-text class="text--primary">
      <div>Email: {{ user.email }}</div>
      <div>City: {{ user.city }}</div>
      <div>Country: {{ user.country }}</div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="openProfileDialog" text>Edit</v-btn>
      <v-btn @click="openPasswordDialog" text>Change Password</v-btn>
    </v-card-actions>
    <EditProfileDialog
      :showProfileDialog.sync="isOpenProfileDialog"
      @closeDialog="isOpenProfileDialog = false"
    />
    <ChangePasswordDialog
      :showPasswordDialog.sync="isOpenPasswordDialog"
      @closeDialog="isOpenPasswordDialog = false"
    />
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import UserImage from "@/components/ui/UserImage";
import EditProfileDialog from "@/components/dialog/EditProfileDialog";
import ChangePasswordDialog from "@/components/dialog/ChangePasswordDialog";

export default {
  components: {
    UserImage,
    EditProfileDialog,
    ChangePasswordDialog
  },
  data: () => ({
    isOpenProfileDialog: false,
    isOpenPasswordDialog: false,
    index: 0
  }),
  computed: {
    ...mapGetters(["user", "isUserLoading"])
  },
  methods: {
    openProfileDialog() {
      this.isOpenProfileDialog = true;
    },
    openPasswordDialog() {
      this.isOpenPasswordDialog = true;
    }
  },
  watch: {
    isUserLoading: function(val) {
      if (val) this.index++;
    }
  }
};
</script>

<style scoped>
</style>
