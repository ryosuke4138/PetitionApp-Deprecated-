<template>
  <div>
    <h1>Sign up</h1>
    <p class="text-xs-center">
      <router-link :to="{ name: 'home' }">Go back to home</router-link>
    </p>
    <p>
      <router-link :to="{ name: 'login' }">Have an account?</router-link>
    </p>
    <p v-if="triedSubmit">{{errors}}</p>
    <form @submit.prevent="onSubmit">
      <fieldset class="form-group">
        <input
          class="form-control form-control-lg"
          type="text"
          v-model="name"
          placeholder="Username"
        />
      </fieldset>
      <fieldset class="form-group">
        <input class="form-control form-control-lg" type="text" v-model="email" placeholder="Email" />
      </fieldset>
      <fieldset class="form-group">
        <input
          class="form-control form-control-lg"
          type="password"
          v-model="password"
          placeholder="Password"
        />
      </fieldset>
      <p>{{ errors }}</p>
      <button class="btn btn-lg btn-primary pull-xs-right">Sign up</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { REGISTER, LOGIN } from "@/store/actions.type";

export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      city: "",
      country: "",
      profilePicture: "",
      triedSubmit: false
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "errors"])
  },
  methods: {
    // submit button calls register, and also login to get auth token
    onSubmit() {
      this.triedSubmit = true;
      this.$store
        .dispatch(REGISTER, {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$store.dispatch(LOGIN, {
            email: this.email,
            password: this.password
          });
          if (this.isAuthenticated) {
            this.$router.push({ name: "home" });
          }
        });
    }
  }
};
</script>
