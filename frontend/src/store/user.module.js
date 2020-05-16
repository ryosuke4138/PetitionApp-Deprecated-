import { UserService } from "@/common/api.service";
import ApiService from "@/common/api.service";
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  FETCH_USER,
  UPDATE_USER,
} from "./actions.type";
import { SET_AUTH, PURGE_AUTH, SET_ERROR, SET_USER } from "./mutations.type";

export const state = {
  errors: null,
  user: {},
  isAuthenticated: false,
  token: "",
};

const getters = {
  user(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  errors(state) {
    return state.errors;
  },
};

const actions = {
  async [LOGIN]({ commit }, credentials) {
    try {
      const { data } = await UserService.login(credentials);
      const result = await UserService.get(data.userId);
      commit(SET_AUTH, data.token);
      ApiService.setHeader(data.token);
      let userObj = result.data;
      userObj.userId = data.userId;
      commit(SET_USER, userObj);
      return userObj;
    } catch {
      commit(SET_ERROR, "Could not login");
    }
  },
  [LOGOUT]({ commit }) {
    commit(PURGE_AUTH);
  },
  async [REGISTER]({ commit }, credentials) {
    try {
      const { data } = await UserService.register(credentials);
      const result = await UserService.get(data.userId);
      commit(SET_AUTH);
      return result.data;
    } catch {
      commit(SET_ERROR, "Could not register");
    }
  },
  async [FETCH_USER]({ commit }, userId) {
    try {
      const { data } = await UserService.get(userId);
      //const token = data.token;
      commit(SET_USER, data);
      return data;
    } catch (response) {
      commit(SET_ERROR, response.data.errors);
      return response;
    }
  },
  async [UPDATE_USER](context, userId, userDetails) {
    await UserService.update(userId, userDetails);
    console.log("user updated");
  },
  // [UPDATE_USER](context, payload) {
  //   const { email, username, password, image, bio } = payload;
  //   const user = {
  //     email,
  //     username,
  //     bio,
  //     image,
  //   };
  //   if (password) {
  //     user.password = password;
  //   }

  //   return ApiService.put("user", user).then(({ data }) => {
  //     context.commit(SET_AUTH, data.user);
  //     return data;
  //   });
  // },
};

const mutations = {
  [SET_USER](state, user) {
    state.user = user;
  },
  [SET_ERROR](state, errors) {
    state.errors = errors;
  },
  [SET_AUTH](state, token) {
    state.isAuthenticated = true;
    state.errors = {};
    state.token = token;
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    state.token = "";
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
