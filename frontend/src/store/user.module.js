import { UserService } from "@/common/api.service";
import ApiService from "@/common/api.service";
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  FETCH_USER,
  UPDATE_USER,
  FETCH_USER_PHOTO,
  RESET_ERROR,
  PUT_USER_PHOTO,
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
      commit(SET_AUTH, data.token);
      ApiService.setHeader(data.token);
      const result = await UserService.get(data.userId);
      let userObj = result.data;
      userObj.userId = data.userId;
      commit(SET_USER, userObj);
      return userObj;
    } catch {
      commit(SET_ERROR, "Wrong Credentials. Please Try Again.");
    }
  },
  [LOGOUT]({ commit }) {
    commit(PURGE_AUTH);
  },
  async [REGISTER]({ commit }, credentials) {
    try {
      const { data } = await UserService.register(credentials);
      commit(SET_AUTH);
      return data.userId;
    } catch {
      commit(SET_ERROR, "Failed to register");
      return null;
    }
  },
  async [FETCH_USER]({ commit }, userId) {
    try {
      const { data } = await UserService.get(userId);
      //const token = data.token;
      commit(SET_USER, data);
      return data;
    } catch (response) {
      return response;
    }
  },
  async [UPDATE_USER](context, userId, userDetails) {
    await UserService.update(userId, userDetails);
  },
  async [FETCH_USER_PHOTO](context, userId) {
    return await UserService.getPhoto(userId);
  },
  [RESET_ERROR]({ commit }) {
    commit(SET_ERROR, null);
  },
  async [PUT_USER_PHOTO](context, data) {
    await UserService.updatePhoto(data.userId, data.image, data.imageType);
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
    state.errors = null;
    state.token = token;
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = null;
    state.token = "";
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
