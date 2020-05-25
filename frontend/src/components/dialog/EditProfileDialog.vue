<template>
  <v-dialog v-model="showProfileDialog" persistent>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Edit Profile</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-alert
                  v-if="errors"
                  outlined
                  type="warning"
                  prominent
                  border="left"
                  >{{ errors }}</v-alert
                >
                <v-text-field
                  v-model="name"
                  :error-messages="nameErrors"
                  label="Name*"
                  required
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  :error-messages="emailErrors"
                  label="E-mail*"
                  required
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                ></v-text-field>
                <v-text-field v-model="city" label="City"></v-text-field>
                <v-text-field v-model="country" label="Country"></v-text-field>
                <InputUserImage
                  :isCreate.sync="isCreate"
                  @uploadImage="(file) => (this.imageFile = file)"
                  ref="image"
                />
                <small>*indicates required field</small>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="mr-4" @click="submit">Edit</v-btn>
              <v-btn class="mr-4" @click="clear">Clear</v-btn>
              <v-btn class="mr-4" @click="cancel">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import {
  RESET_ERROR,
  PUT_USER_PHOTO,
  UPDATE_USER,
} from "../../store/actions.type";
import InputUserImage from "@/components/ui/InputUserImage";

export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    email: { required, email },
  },
  components: {
    InputUserImage,
  },
  props: {
    showProfileDialog: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    name: "",
    email: "",
    city: "",
    country: "",
    imageFile: "",
    error: "",
    showProfileDialog1: false,
    isCreate: false,
    rules: {
      required: (value) => !!value || "Required.",
      emailMatch: () => "The email and password you entered don't match",
    },
  }),
  computed: {
    ...mapGetters(["errors", "user"]),
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Name is required");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },
  watch: {
    showProfileDialog: function(val) {
      if (val) {
        this.name = this.user.name;
        this.email = this.user.email;
        this.city = this.user.city;
        this.country = this.user.country;
        this.isCreate = true;
      }
    },
  },
  methods: {
    submit() {
      let newUser = {
        name: this.name,
        email: this.email,
      };
      if (this.city) newUser.city = this.city;
      if (this.country) newUser.country = this.country;
      this.$store.dispatch(UPDATE_USER, {
        userId: this.user.userId,
        val: newUser,
      });
      if (this.imageFile) this.putPhoto(this.user.userId);
      this.clear();
    },
    clear() {
      this.$v.$reset();
      this.name = this.user.name;
      this.email = this.user.email;
      this.city = this.user.city;
      this.country = this.user.country;
      this.$store.dispatch(RESET_ERROR);
      this.show1 = false;
      this.imageFile = null;
      this.$refs.image.resetUploadedImage();
      this.$emit("closeDialog");
    },
    cancel() {
      this.$store.dispatch(RESET_ERROR);
      this.isCreate = false;
      this.$emit("closeDialog");
    },
    async putPhoto(userId) {
      this.$store.dispatch(PUT_USER_PHOTO, {
        userId: userId,
        image: this.imageFile,
        imageType: this.imageFile.type,
      });
    },
  },
};
</script>

<style>
.v-dialog {
  box-shadow: none;
}
</style>
