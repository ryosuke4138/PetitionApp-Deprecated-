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
                <v-text-field
                  name="Title"
                  type="text"
                  label="Title"
                  v-model="title"
                  required
                />
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
        <v-btn color="green darken-1" text @click.native="save">Save</v-btn>
        <v-btn color="green darken-1" text @click.native="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FETCH_PETITIONS,
  FETCH_PETITION_CATEGORY,
  SIGN_PETITION,
} from "@/store/actions.type";
import InputImage from "@/components/ui/InputImage.vue";
import AddDateButton from "@/components/ui/AddDateButton";
import API_URL from "@/common/config";
import {
  DO_RESET_PETITION,
  PUBLISH_PETITION,
  PUT_PETITION_PHOTO,
} from "../../store/actions.type";

export default {
  components: {
    InputImage,
    AddDateButton,
  },
  props: {
    showPetitionDetailsDialog: {
      type: Boolean,
      default: false,
    },
    petitionId: {
      type: Number,
      default: null,
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
    isCreate: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    API_URL: API_URL,
    petitionCategoryName: [],
    imageFile: null,
    title: "",
    description: "",
    category: null,
    date: null,
    newPetition: {},
  }),
  computed: {
    ...mapGetters(["petition", "petitionCategory"]),
  },
  mounted() {
    this.$store.dispatch(DO_RESET_PETITION);
    this.$store.dispatch(FETCH_PETITION_CATEGORY).then(() => {
      this.petitionCategoryName = this.petitionCategory.map((c) => c.name);
    });
  },
  watch: {
    // petitionCategory: function(val) {
    //   this.petitionCategoryName = val.map(c => c.name);
    // },
    category: function(val) {
      if (!val && !this.isCreate) {
        this.category = this.petition.category;
      }
    },
  },
  methods: {
    save() {
      this.newPetition.title = this.title;
      this.newPetition.description = this.description;
      this.newPetition.categoryId = this.petitionCategory.find(
        (c) => c.name == this.category
      ).categoryId;
      if (this.date) this.newPetition.closingDate = this.date;
      this.$store
        .dispatch(PUBLISH_PETITION, this.newPetition)
        .then(({ data }) => {
          this.$store.dispatch(SIGN_PETITION, data.petitionId).then(() => {
            this.putPhoto(data.petitionId).then(() => {
              this.$emit("closeDialog");
              this.$emit("update:isEditMode", false);
              this.$store.dispatch(FETCH_PETITIONS);
              this.init();
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
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
        imageType: this.imageFile.type,
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
    },
  },
};
</script>
