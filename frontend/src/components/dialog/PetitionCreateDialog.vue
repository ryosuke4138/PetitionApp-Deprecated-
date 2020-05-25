<template>
  <div>
    <CreateButton
      class="button"
      v-if="isAuthenticated"
      @click="dialog = true"
      :disabled="dialog"
    />
    <v-dialog v-model="dialog" persistent>
      <v-card color="grey lighten-4" text>
        <v-card-title>Create Petition</v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-form ref="form">
              <v-layout row wrap>
                <v-flex md12>
                  <InputImage
                    :petitionId="petition.petitionId"
                    :is-create="true"
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
          <v-btn color="green darken-1" text @click.native="cancel"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FETCH_PETITIONS,
  FETCH_PETITION_CATEGORY,
  SIGN_PETITION,
} from "@/store/actions.type";
import CreateButton from "@/components/ui/CreateButton";
import InputImage from "@/components/ui/InputImage.vue";
import AddDateButton from "@/components/ui/AddDateButton";
import API_URL from "@/common/config";
import { PUBLISH_PETITION, PUT_PETITION_PHOTO } from "../../store/actions.type";

export default {
  components: {
    CreateButton,
    InputImage,
    AddDateButton,
  },
  props: {
    isProfile: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    API_URL: API_URL,
    dialog: false,
    disabledButton: false,
    petitionCategoryName: [],
    imageFile: null,
    title: "",
    description: "",
    category: null,
    date: null,
    newPetition: {},
  }),
  computed: {
    ...mapGetters([
      "petition",
      "petitionCategory",
      "params",
      "user",
      "isAuthenticated",
    ]),
  },
  mounted() {
    this.$store.dispatch(FETCH_PETITION_CATEGORY).then(() => {
      this.petitionCategoryName = this.petitionCategory.map((c) => c.name);
    });
  },
  methods: {
    updateNewPetition() {
      this.newPetition.title = this.title;
      this.newPetition.description = this.description;
      this.newPetition.categoryId = this.petitionCategory.find(
        (c) => c.name == this.category
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
        .catch((err) => {
          console.log(err);
        });
    },
    reset() {
      if (this.isProfile) {
        this.$store.dispatch(FETCH_PETITIONS, { authorId: this.user.userId });
      } else {
        this.$store.dispatch(FETCH_PETITIONS, this.params);
      }
      this.init();
      this.dialog = false;
    },
    cancel() {
      this.dialog = false;
    },
    async putPhoto(petitionId) {
      this.$store.dispatch(PUT_PETITION_PHOTO, {
        petitionId: petitionId,
        image: this.imageFile,
        imageType: this.imageFile.type,
      });
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
    setDate(date) {
      this.date = date;
    },
  },
};
</script>

<style scoped>
.button {
  margin-left: 15px;
  margin-right: 0px;
  margin-top: 15px;
}
</style>
