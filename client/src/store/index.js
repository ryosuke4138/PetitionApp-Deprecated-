import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import home from "./home.module";
import petition from "./petition.module";
import user from "./user.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    petition,
    user,
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })],
});
