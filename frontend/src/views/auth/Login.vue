<template>
  <div>
    <h1>Sign in</h1>
    <p class="text-xs-center">
      <router-link :to="{ name: 'home' }">Go back to home</router-link>
    </p>
    <p>
      <router-link :to="{ name: 'register' }">Need an account?</router-link>
    </p>
    <form @submit.prevent="onSubmit(email, password)">
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
      <button>Sign in</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGIN } from "@/store/actions.type";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "errors"])
  },
  methods: {
    onSubmit(email, password) {
      this.$store.dispatch(LOGIN, { email, password }).then(() => {
        if (this.isAuthenticated) {
          this.$router.push({ name: "home" });
        }
      });
    }
  }
};
</script>
