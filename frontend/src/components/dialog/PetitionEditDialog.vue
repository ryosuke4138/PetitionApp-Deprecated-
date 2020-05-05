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
                  :isCreate="isCreate"
                  @uploadImage="(file) => this.imageFile = file"
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
              <!-- <v-flex md12>
                <DatetimePicker :isCreate="isCreate" :petitionId="petitionId" />
              </v-flex>-->
            </v-layout>
          </v-form>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click.native="save">Save</v-btn>
        <v-btn color="green darken-1" text @click.native="cancel">Cancel</v-btn>
        <v-btn v-if="!isCreate" color="green darken-1" text @click.native="remove">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FETCH_PETITION,
  FETCH_PETITIONS,
  DELETE_PETITION,
  FETCH_PETITION_CATEGORY
} from "@/store/actions.type";
import InputImage from "@/components/ui/InputImage.vue";
import API_URL from "@/common/config";
import {
  DO_RESET_PETITION,
  PUBLISH_PETITION,
  PUT_PETITION_PHOTO
} from "../../store/actions.type";

export default {
  components: {
    InputImage
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
    }
  },
  data: () => ({
    API_URL: API_URL,
    petitionCategoryName: [],
    imageFile: null,
    title: "",
    description: "",
    category: null,
    newPetition: {}
  }),
  computed: {
    ...mapGetters(["petition", "petitionCategory"])
  },
  mounted() {
    this.$store.dispatch(DO_RESET_PETITION);
    this.$store.dispatch(FETCH_PETITION_CATEGORY);
  },
  watch: {
    petitionId: function(val) {
      if (val) {
        this.$store.dispatch(FETCH_PETITION, val);
      }
    },
    petitionCategory: function(val) {
      this.petitionCategoryName = val.map(c => c.name);
    },
    category: function(val) {
      if (!val && !this.isCreate) {
        console.log("val is null");
        this.category = this.petition.category;
      }
    }
  },
  methods: {
    save() {
      this.newPetition.title = this.title;
      this.newPetition.description = this.description;
      this.newPetition.categoryId = this.petitionCategory.find(
        c => c.name == this.category
      ).categoryId;
      this.$store
        .dispatch(PUBLISH_PETITION, this.newPetition)
        .then(({ data }) => {
          this.putPhoto(data.petitionId);
          this.$emit("closeDialog");
          this.$emit("update:isEditMode", false);
          this.$store.dispatch(FETCH_PETITIONS);
          this.init();
        })
        .catch(() => {
          console.log("error");
        });
    },
    cancel() {
      this.$emit("update:isEditMode", false);
      if (this.isCreate) {
        this.$emit("closeDialog");
      }
      // this.$emit("cancel", this.spell);
      // this.spell = this.defaultData();
    },
    remove() {
      this.$store.dispatch(DELETE_PETITION, this.petitionId);
      this.$emit("closeDialog");
      this.$emit("update:isEditMode", false);
    },
    putPhoto(petitionId) {
      this.$store.dispatch(PUT_PETITION_PHOTO, {
        petitionId: petitionId,
        image: this.imageFile,
        imageType: this.imageFile.type
      });
    },
    init() {
      this.imageFile = null;
      this.title = "";
      this.description = "";
      this.category = null;
      this.newPetition = {};
    }
  }
};
</script>
