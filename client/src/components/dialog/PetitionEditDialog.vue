<template>
  <v-dialog v-model="dialog" persistent>
    <v-card color="grey lighten-4" text>
      <v-card-title>Edit Petition</v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-form ref="form">
            <v-layout row wrap>
              <v-flex md12>
                <InputImage
                  :petitionId="petition.petitionId"
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
                <EditDateButton
                  :defaultDate="petition.closingDate"
                  @set="setDate"
                  ref="dateButton"
                />
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click.native="edit">Save</v-btn>
        <v-btn color="green darken-1" text @click.native="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_PETITIONS, FETCH_PETITION_CATEGORY } from "@/store/actions.type";
import InputImage from "@/components/ui/InputImage.vue";
import EditDateButton from "@/components/ui/EditDateButton";
import { PUT_PETITION_PHOTO, UPDATE_PETITION } from "../../store/actions.type";
import API_URL from "@/common/config";

export default {
  components: {
    InputImage,
    EditDateButton
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    defaultPetition: {
      type: Object,
      defalt: null
    }
  },
  data: vm => ({
    API_URL: API_URL,
    petitionCategoryName: [],
    imageFile: null,
    title: vm.defaultPetition.title,
    description: vm.defaultPetition.description,
    category: vm.defaultPetition.category,
    date: vm.defaultPetition.closingDate,
    newPetition: {}
  }),
  computed: {
    ...mapGetters([
      "petition",
      "petitionCategory",
      "params",
      "user",
      "isProfile"
    ])
  },
  mounted() {
    this.$store.dispatch(FETCH_PETITION_CATEGORY).then(() => {
      this.petitionCategoryName = this.petitionCategory.map(c => c.name);
    });
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
    edit() {
      this.updateNewPetition();
      const id = this.petition.petitionId;
      this.$store
        .dispatch(UPDATE_PETITION, {
          petitionId: id,
          newPetition: this.newPetition
        })
        .then(() => {
          if (this.imageFile) {
            this.putPhoto(id).then(() => {
              this.reset();
            });
          } else this.reset();
        })
        .catch(err => {
          console.log(err);
        });
    },
    reset() {
      if (this.isProfile) {
        this.$store.dispatch(FETCH_PETITIONS, { authorId: this.user.userId });
      } else {
        this.$store.dispatch(FETCH_PETITIONS, this.params);
      }
      this.$refs.image.resetUploadedImage();
      this.newPetition = {};
      this.$emit("update:dialog", false);
    },
    cancel() {
      this.imageFile = null;
      this.title = this.petition.title;
      this.description = this.petition.title;
      this.category = this.petition.category;
      this.newPetition = {};
      this.$emit("update:dialog", false);
      if (this.petition.closingDate) {
        this.$refs.dateButton.setDate(this.petition.closingDate);
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
    }
  }
};
</script>
