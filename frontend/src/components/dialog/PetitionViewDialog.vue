<template>
  <v-dialog v-model="showPetitionDetailsDialog" persistent v-if="isEditMode === false">
    <v-card color="grey lighten-4" text class="hidden-sm-and-down">
      <v-img
        class="white--text align-end"
        max-height="400px"
        :src="API_URL+'petitions/'+petitionId+'/photo'"
      ></v-img>
      <v-card-title>
        {{petition.title}}
        <v-subheader class="pa-2" tile outlined>{{ petition.displayDate }}</v-subheader>
        <v-spacer />
        <v-subheader class="pa-2" tile outlined>{{ petition.category}}</v-subheader>
        <v-subheader class="pa-2" tile outlined>Signature Count {{ petition.signatureCount}}</v-subheader>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="isAuthor" color="green darken-1" text @click.native="edit">Edit</v-btn>
          <v-btn v-if="isAuthor" color="green darken-1" text @click.native="editTag">Edit Tag</v-btn>
          <v-btn v-if="isAuthor" color="green darken-1" text @click.native="remove">Delete</v-btn>
          <v-btn color="green darken-1" text @click.native="close">Close</v-btn>
        </v-card-actions>
      </v-card-title>
      <v-divider />

      <v-row class="mb-6" no-gutters>
        <v-subheader class="pa-2" tile outlined>
          <UserAvatar :userId="petition.authorId" />
          {{ petition.authorName }} {{ petition.authorCity }} {{ petition.authorCountry }}
        </v-subheader>
      </v-row>
      <v-row class="mb-12" no-gutters>
        <v-subheader class="pa-2" tile outlined>{{ petition.description }}</v-subheader>
      </v-row>
      <v-divider />
      <v-subheader class="pa-2" tile outlined>List of Signatories</v-subheader>
      <v-row v-for="(signatory, i) in signatories" :key="i" no-gutters>
        <v-col>
          <v-subheader class="pa-2">
            <UserAvatar :userId="signatory.signatoryId" />
            {{ signatory.name }} {{ signatory.display }}
          </v-subheader>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { DELETE_PETITION, FETCH_PETITIONS } from "@/store/actions.type";
import UserAvatar from "@/components/ui/UserAvatar";
import API_URL from "@/common/config";

export default {
  components: {
    UserAvatar
  },
  props: {
    showPetitionDetailsDialog: {
      type: Boolean,
      default: false
    },
    petitionId: {
      type: Number,
      default: null
    },
    isEditMode: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    API_URL: API_URL
  }),
  computed: {
    ...mapGetters(["petition", "isAuthenticated", "user", "signatories"]),
    isAuthor: function() {
      return (
        !this.isEditMode &&
        this.isAuthenticated &&
        this.user.userId == this.petition.authorId
      );
    }
  },
  methods: {
    edit() {
      this.$emit("update:isEditMode", true);
    },
    close() {
      this.$emit("update:isEditMode", false);
      this.$emit("closeDialog");
      // this.$emit("close", this.spell);
      // this.spell = this.defaultData();
    },
    remove() {
      this.$store.dispatch(DELETE_PETITION, this.petitionId).then(() => {
        this.$store.dispatch(FETCH_PETITIONS);
        this.$emit("closeDialog");
        this.$emit("update:isEditMode", false);
      });
    }
  }
};
</script>
