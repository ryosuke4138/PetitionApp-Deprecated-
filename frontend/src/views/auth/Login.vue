<template>
  <div>
    <h1>Sign in</h1>
    <router-link :to="{ name: 'register' }">
      Need an account?
    </router-link>
    <!-- <ul v-if="errors" class="error-messages">
      <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
    </ul> -->
    <form @submit.prevent="onSubmit(email, password)">
      <fieldset class="form-group">
        <input
          class="form-control form-control-lg"
          type="text"
          v-model="email"
          placeholder="Email"
        />
      </fieldset>
      <fieldset class="form-group">
        <input
          class="form-control form-control-lg"
          type="password"
          v-model="password"
          placeholder="Password"
        />
      </fieldset>
      <button>
        Sign in
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { LOGIN } from "@/store/actions.type";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    onSubmit(email, password) {
      this.$store
        .dispatch(LOGIN, { email, password })
        .then(() => this.$router.push({ name: "home" }));
    },
  },
  computed: {
    ...mapState({
      errors: (state) => state.user.errors,
    }),
  },
};
</script>
