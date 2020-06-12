<template>
  <v-dialog v-model="showPasswordDialog" persistent>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Change Password</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-alert v-if="errors" outlined type="warning" prominent border="left">{{ errors }}</v-alert>
                <v-text-field
                  v-model="oldPassword"
                  label="Old Password"
                  required
                  :error-messages="oldPasswordErrors"
                  @input="$v.oldPassword.$touch()"
                  @blur="$v.oldPassword.$touch()"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  counter
                ></v-text-field>
                <v-text-field
                  v-model="newPassword"
                  label="New Password"
                  required
                  :error-messages="newPasswordErrors"
                  @input="$v.newPassword.$touch()"
                  @blur="$v.newPassword.$touch()"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                  counter
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="mr-4" @click="submit">Login</v-btn>
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
import { UPDATE_USER } from "@/store/actions.type";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { RESET_ERROR } from "../../store/actions.type";

export default {
  mixins: [validationMixin],

  validations: {
    oldPassword: { required },
    newPassword: { required }
  },

  props: {
    showPasswordDialog: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    oldPassword: "",
    newPassword: "",
    error: "",
    show1: false,
    show2: false,
    rules: {
      required: value => !!value || "Required."
    }
  }),

  computed: {
    ...mapGetters(["user", "errors"]),
    oldPasswordErrors() {
      const errors = [];
      if (!this.$v.newPassword.$dirty) return errors;
      !this.$v.oldPassword.required && errors.push("Old password is required");
      return errors;
    },
    newPasswordErrors() {
      const errors = [];
      if (!this.$v.newPassword.$dirty) return errors;
      !this.$v.newPassword.required && errors.push("New password is required");
      return errors;
    }
  },

  methods: {
    submit() {
      this.$store
        .dispatch(UPDATE_USER, {
          userId: this.user.userId,
          val: {
            password: this.newPassword,
            currentPassword: this.oldPassword
          }
        })
        .then(() => {
          this.clear();
          this.$emit("closeDialog");
        })
        .catch(() => {
          this.clear();
        });
    },
    clear() {
      this.$v.$reset();
      this.oldPassword = "";
      this.newPassword = "";
      this.$store.dispatch(RESET_ERROR);
      this.show1 = false;
      this.show2 = false;
    },
    cancel() {
      this.clear();
      this.$emit("closeDialog");
    }
  }
};
</script>

<style>
.v-dialog {
  box-shadow: none;
}
</style>
