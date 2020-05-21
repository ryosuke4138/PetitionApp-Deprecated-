<template>
  <v-dialog v-model="showPetitionDetailsDialog" persistent v-if="isEditMode">
    <v-card color="grey lighten-4" text>
      <v-card-text>
        <v-container fluid>
          <v-form ref="form">
            <v-layout row wrap>
              <v-flex md12>
                <InputImage
                  :petitionId="petitionId"
                  :is-create="isCreate"
                  @uploadImage="(file) => (this.imageFile = file)"
                  ref="image"
                />
              </v-flex>
              <v-flex md4>
                <v-text-field name="Title" type="text" label="Title" v-model="title" required />
              </v-flex>
              <v-flex xs3>
                <v-select
                  label="Select"
                  :items="petitionCategoryName"
                  v-model="category"
                  max-height="400"
                  hint="category"
                  persistent-hint
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  class="nowrap"
                  name="Description"
                  label="Description"
                  v-model="description"
                  multi-line
                  required
                />
              </v-flex>
              <v-flex md4>
                <AddDateButton @set="setDate" ref="dateButton" />
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="isCreate" color="green darken-1" text @click.native="save">Save</v-btn>
        <v-btn v-if="!isCreate" color="green darken-1" text @click.native="edit">Save</v-btn>
        <v-btn color="green darken-1" text @click.native="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FETCH_PETITIONS,
  FETCH_PETITION,
  FETCH_PETITION_CATEGORY,
  SIGN_PETITION
} from "@/store/actions.type";
import InputImage from "@/components/ui/InputImage.vue";
import AddDateButton from "@/components/ui/AddDateButton";
import API_URL from "@/common/config";
import {
  DO_RESET_PETITION,
  PUBLISH_PETITION,
  PUT_PETITION_PHOTO,
  UPDATE_PETITION
} from "../../store/actions.type";

export default {
  components: {
    InputImage,
    AddDateButton
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
    },
    isCreate: {
      type: Boolean,
      default: false
    },
    isProfile: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    API_URL: API_URL,
    petitionCategoryName: [],
    imageFile: null,
    title: "",
    description: "",
    category: null,
    date: null,
    newPetition: {}
  }),
  computed: {
    ...mapGetters(["petition", "petitionCategory", "params", "user"])
  },
  mounted() {
    this.$store.dispatch(DO_RESET_PETITION);
    this.$store.dispatch(FETCH_PETITION_CATEGORY).then(() => {
      this.petitionCategoryName = this.petitionCategory.map(c => c.name);
    });
  },
  watch: {
    category: function(val) {
      if (!val && !this.isCreate) {
        this.category = this.petition.category;
      }
    },
    isEditMode: function() {
      if (!this.isCreate) {
        this.$store.dispatch(FETCH_PETITION, this.petitionId).then(() => {
          this.title = this.petition.title;
          this.category = this.petition.category;
          this.description = this.petition.description;
          if (this.$refs.dateButton) {
            this.$refs.dateButton.setDate(this.petition.closingDate);
          }
        });
      }
    }
  },
  methods: {
    updateNewPetition() {
      this.newPetition.title = this.title;
      this.newPetition.description = this.description;
      this.newPetition.categoryId = this.petitionCategory.find(
        c => c.name == this.category
      ).categoryId;
      if (this.date) this.newPetition.closingDate = this.date;
    },
    save() {
      this.updateNewPetition();
      this.$store
        .dispatch(PUBLISH_PETITION, this.newPetition)
        .then(({ data }) => {
          this.$store.dispatch(SIGN_PETITION, data.petitionId).then(() => {
            this.putPhoto(data.petitionId).then(() => {
              this.reset();
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    edit() {
      this.updateNewPetition();
      this.$store
        .dispatch(UPDATE_PETITION, {
          petitionId: this.petition.petitionId,
          newPetition: this.newPetition
        })
        .then(() => {
          if (this.imageFile) {
            this.putPhoto(this.petitionId).then(() => {
              this.reset();
            });
          } else this.reset();
        })
        .catch(err => {
          console.log(err);
        });
    },
    reset() {
      this.$emit("closeDialog");
      this.$emit("update:isEditMode", false);
      if (this.isProfile) {
        this.$store.dispatch(FETCH_PETITIONS, { authorId: this.user.userId });
      } else {
        this.$store.dispatch(FETCH_PETITIONS, this.params);
      }
      this.init();
    },
    cancel() {
      this.$emit("update:isEditMode", false);
      if (this.isCreate) {
        this.$emit("closeDialog");
      }
    },
    async putPhoto(petitionId) {
      this.$store.dispatch(PUT_PETITION_PHOTO, {
        petitionId: petitionId,
        image: this.imageFile,
        imageType: this.imageFile.type
      });
    },
    setDate(date) {
      this.date = date;
    },
    init() {
      this.imageFile = null;
      this.title = "";
      this.description = "";
      this.category = null;
      this.newPetition = {};
      this.$refs.dateButton.cancelDatePicker();
      this.$refs.image.resetUploadedImage();
    }
  }
};
</script>
