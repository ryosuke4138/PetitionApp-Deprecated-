<template>
  <v-dialog v-model="show" persistent>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Register form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-alert
                  v-if="errors"
                  outlined
                  type="warning"
                  prominent
                  border="left"
                >
                  {{ errors }}
                </v-alert>
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
                <v-text-field
                  v-model="password"
                  :error-messages="passwordErrors"
                  label="Password*"
                  required
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  counter
                ></v-text-field>
                <v-text-field v-model="city" label="City"></v-text-field>
                <v-text-field v-model="country" label="Country"></v-text-field>
                <InputUserImage
                  :isCreate="true"
                  @uploadImage="(file) => (this.imageFile = file)"
                  ref="image"
                />
                <small>*indicates required field</small>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="mr-4" @click="submit">Register</v-btn>
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
import { LOGIN } from "@/store/actions.type";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import {
  RESET_ERROR,
  REGISTER,
  PUT_USER_PHOTO,
} from "../../store/actions.type";
import InputUserImage from "@/components/ui/InputUserImage";

export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    email: { required, email },
    password: { required },
  },
  components: {
    InputUserImage,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    name: "",
    email: "",
    password: "",
    city: "",
    country: "",
    imageFile: "",
    error: "",
    show1: false,
    rules: {
      required: (value) => !!value || "Required.",
      emailMatch: () => "The email and password you entered don't match",
    },
  }),
  computed: {
    ...mapGetters(["isAuthenticated", "errors"]),
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
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
  },
  methods: {
    submit() {
      let newUser = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      if (this.city) newUser.city = this.city;
      if (this.country) newUser.country = this.country;
      this.$store.dispatch(REGISTER, newUser).then((userId) => {
        if (!userId) return;
        this.$store
          .dispatch(LOGIN, {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            if (this.imageFile) this.putPhoto(userId);
            if (this.isAuthenticated) {
              this.$emit("update:show", false);
              this.clear();
            }
          });
      });
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.password = "";
      this.city = "";
      this.country = "";
      this.$store.dispatch(RESET_ERROR);
      this.show1 = false;
      this.imageFile = null;
      this.$refs.image.resetUploadedImage();
    },
    cancel() {
      this.$store.dispatch(RESET_ERROR);
      this.$emit("update:show", false);
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
