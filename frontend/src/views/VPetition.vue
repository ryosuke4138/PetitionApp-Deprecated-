<template>
  <v-app>
    <NavBar />
    <v-img
      :key="index"
      class="white--text align-end"
      max-height="400px"
      :src="API_URL + 'petitions/' + petition.petitionId + '/photo'"
    ></v-img>
    <v-row>
      {{ petition.title }}
      <v-subheader class="pa-2" tile outlined>
        {{ petition.displayDate }}
      </v-subheader>
      <v-spacer />
      <div>
        <v-spacer></v-spacer>
        <SignButton
          v-if="isAuthenticated && !isAuthor"
          :petitionId="petition.petitionId"
          :userId="user.userId"
          :closingDate="petition.closingDate"
        />
        <v-btn v-if="isAuthor" color="green darken-1" text @click.native="edit"
          >Edit</v-btn
        >
        <v-btn
          v-if="isAuthor"
          color="green darken-1"
          text
          @click.native="remove"
          >Delete</v-btn
        >
        <v-btn color="green darken-1" text @click.native="close">Close</v-btn>
      </div>
    </v-row>
    <!-- <SocialSharingButton /> -->
    <v-divider />
    <v-subheader class="pa-2" tile outlined
      >Category: {{ petition.category }}</v-subheader
    >
    <v-subheader class="pa-2" tile outlined
      >Signature Count: {{ petition.signatureCount }}</v-subheader
    >
    <v-row no-gutters>
      <v-subheader class="pa-2" tile outlined>
        Author:
        <v-avatar size="36">
          <UserImage :userId="petition.authorId" />
        </v-avatar>
        <!-- TODO: FIX for the case that city and/or country is null -->
        {{ petition.authorName }} ({{ petition.authorCity }},
        {{ petition.authorCountry }})
      </v-subheader>
    </v-row>
    <v-row no-gutters>
      <v-subheader class="pa-2" tile outlined
        >Description: {{ petition.description }}</v-subheader
      >
    </v-row>
    <v-divider />
    <v-subheader class="pa-2" tile outlined>List of Signatories</v-subheader>
    <v-row
      v-for="(signatory, i) in signatories"
      :key="'VPetitionVRow' + i"
      no-gutters
    >
      <v-col>
        <v-subheader class="pa-2">
          <v-avatar size="36">
            <UserImage :userId="signatory.signatoryId" />
          </v-avatar>
          {{ signatory.name }} {{ signatory.display }}
        </v-subheader>
      </v-col>
    </v-row>
    <PetitionEditDialog
      :dialog.sync="showEditDialog"
      :defaultPetition="petition"
    />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import { mapGetters } from "vuex";
import { FETCH_PETITIONS, DELETE_PETITION } from "@/store/actions.type";
import UserImage from "@/components/ui/UserImage";
import SignButton from "@/components/ui/SignButton";
import PetitionEditDialog from "@/components/dialog/PetitionEditDialog.vue";
// import SocialSharingButton from "@/components/ui/SocialSharingButton";
import API_URL from "@/common/config";
import { RESET_PETITION } from "../store/mutations.type";

export default {
  components: {
    NavBar,
    UserImage,
    SignButton,
    PetitionEditDialog,
    // SocialSharingButton,
  },
  data: () => ({
    API_URL: API_URL,
    showEditDialog: false,
    index: 0,
  }),
  computed: {
    ...mapGetters([
      "petition",
      "isAuthenticated",
      "user",
      "signatories",
      "params",
      "isProfile",
      "isPetitionLoading",
    ]),
    isAuthor: function() {
      return (
        this.isAuthenticated && this.user.userId === this.petition.authorId
      );
    },
  },
  watch: {
    isPetitionLoading: function() {
      // this.index++;
    },
  },
  methods: {
    edit() {
      this.showEditDialog = true;
    },
    close() {
      if (this.isProfile) {
        this.$router.push(
          { name: "profile", params: { username: this.user.name } },
          () => {}
        );
      } else {
        this.$router.push({ name: "home" }, () => {});
      }
    },
    remove() {
      this.$store
        .dispatch(DELETE_PETITION, this.petition.petitionId)
        .then(() => {
          if (this.isProfile) {
            this.$store
              .dispatch(FETCH_PETITIONS, {
                authorId: this.user.userId,
              })
              .then(() => {
                this.$router.push(
                  { name: "profile", params: this.user.name },
                  () => {}
                );
                this.$store.commit(RESET_PETITION);
              });
          } else {
            this.$store.dispatch(FETCH_PETITIONS, this.params).then(() => {
              this.$router.push({ name: "home" }, () => {});
            });
          }
        });
    },
  },
};
</script>
