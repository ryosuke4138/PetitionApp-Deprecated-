<template>
  <v-dialog v-model="showPetitionDetailsDialog" persistent v-if="isEditMode">
    <v-card color="grey lighten-4" text>
      <v-card-text>
        <v-container fluid>
          <v-form ref="form">
            <v-layout row wrap>
              <v-flex md12>
                <InputImage :isCreate="isCreate" :petitionId="petitionId" />
              </v-flex>
              <v-flex md4>
                <v-text-field
                  name="Title"
                  type="text"
                  label="Title"
                  v-model="petition.title"
                  required
                />
              </v-flex>
              <v-flex xs3>
                <v-select
                  label="Select"
                  :items="petitionCategory"
                  v-model="petition.category"
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
                  v-model="petition.description"
                  multi-line
                  required
                />
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
        <v-btn color="green darken-1" text @click.native="remove">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FETCH_PETITION,
  DELETE_PETITION,
  FETCH_PETITION_CATEGORY
} from "@/store/actions.type";
import InputImage from "@/components/ui/InputImage.vue";
import API_URL from "@/common/config";

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
    API_URL: API_URL
  }),
  computed: {
    ...mapGetters(["petition", "petitionCategory"])
  },
  mounted() {
    this.$store.dispatch(FETCH_PETITION_CATEGORY);
  },
  watch: {
    petitionId: function(newPetitionId) {
      this.$store.dispatch(FETCH_PETITION, newPetitionId);
    }
  },
  methods: {
    //呪文編集・追加ダイアログ上で呪文を保存する。
    save() {
      this.$emit("update:isEditMode", false);
      // this.$emit("save", this.spell);
      // this.spell = this.defaultData();
    },
    //呪文編集・追加ダイアログ上で操作をキャンセルする。
    cancel() {
      this.$emit("update:isEditMode", false);
      // this.$emit("cancel", this.spell);
      // this.spell = this.defaultData();
    },
    //呪文編集・追加ダイアログ上で呪文を削除する。
    remove() {
      this.$store.dispatch(DELETE_PETITION, this.petitionId);
      this.$emit("closeDialog");
      this.$emit("update:isEditMode", false);
    }
  }
};
</script>
