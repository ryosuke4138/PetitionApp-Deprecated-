<template>
  <v-dialog v-model="showPetitionDetailsDialog" persistent v-if="isEditMode === false">
    <v-card color="grey lighten-4" text class="hidden-sm-and-down">
      <v-img
        class="white--text align-end"
        max-height="400px"
        :src="API_URL+'petitions/'+petitionId+'/photo'"
      >
        <v-card-title>{{petition.title}}</v-card-title>
      </v-img>
      <v-divider></v-divider>
      <v-layout row wrap>
        <v-flex xs3>
          <v-subheader class="body-2">Category</v-subheader>
        </v-flex>
        <v-flex xs3>
          <v-subheader class="body-2">Author Name</v-subheader>
        </v-flex>
        <v-flex xs3>
          <v-subheader class="body-2">Author City</v-subheader>
        </v-flex>
        <v-flex xs3>
          <v-subheader class="body-2">Author Country</v-subheader>
        </v-flex>
        <v-flex xs3>
          <v-card-text class="body-2">{{ petition.category}}</v-card-text>
        </v-flex>
        <v-flex xs3>
          <v-card-text class="body-2">{{ petition.authorName }}</v-card-text>
        </v-flex>
        <v-flex xs3>
          <v-card-text class="body-2">{{ petition.authorCity}}</v-card-text>
        </v-flex>
        <v-flex xs3>
          <v-card-text class="body-2">{{petition.authorCountry}}</v-card-text>
        </v-flex>
        <v-flex xs12>
          <v-divider />
          <v-card-text class="body-2">
            <span style="white-space: pre-wrap;">{{petition.description}}</span>
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click.native="close">Close</v-btn>
        <v-btn v-if="showEditButton" color="green darken-1" text @click.native="edit">Edit</v-btn>
        <v-btn v-if="showEditButton" color="green darken-1" text @click.native="editTag">Edit Tag</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_PETITION } from "@/store/actions.type";
import API_URL from "@/common/config";

export default {
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
    ...mapGetters(["petition", "isAuthenticated", "user"]),
    showEditButton: function() {
      return (
        !this.isCreate &&
        this.isAuthenticated &&
        this.user.usreId == this.petitionId
      );
    }
  },
  watch: {
    petitionId: function(newPetitionId) {
      this.$store.dispatch(FETCH_PETITION, newPetitionId);
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
    }
  }
};
</script>
