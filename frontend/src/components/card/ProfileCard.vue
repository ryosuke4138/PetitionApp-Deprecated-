<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{ user.name }}</v-list-item-title>
        <v-list-item-subtitle>Email: {{ user.email }}</v-list-item-subtitle>
        <v-list-item-subtitle>City: {{ user.city }}</v-list-item-subtitle>
        <v-list-item-subtitle>Country: {{ user.country }}</v-list-item-subtitle>
      </v-list-item-content>

      <UserImage :key="index" class="avatar" :userId="user.userId" />
    </v-list-item>

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
.mx-auto {
  box-shadow: none;
}

.avatar {
  max-width: 150px;
  max-height: 150px;
  border-width: 4%;
  border-style: solid;
  border-color: white;
}
</style>
