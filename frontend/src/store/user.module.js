import { UserService } from "@/common/api.service";
import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";
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
import {
  SET_AUTH,
  PURGE_AUTH,
  SET_ERROR,
  SET_USER,
  SET_IS_USER_LOADING,
} from "./mutations.type";

export const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken(),
  isUserLoading: false,
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
  isUserLoading(state) {
    return state.isUserLoading;
  },
};

const actions = {
  async [LOGIN]({ commit }, credentials) {
    try {
      const { data } = await UserService.login(credentials);
      commit(SET_AUTH, data.token);
      ApiService.setHeader(JwtService.getToken());
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
      ApiService.setHeader(JwtService.getToken());
      const { data } = await UserService.get(userId);
      data.userId = userId;
      commit(SET_USER, data);
      return data;
    } catch (response) {
      return response;
    }
  },
  async [UPDATE_USER]({ commit }, d) {
    ApiService.setHeader(JwtService.getToken());
    await UserService.update(d.userId, d.val);
    const { data } = await UserService.get(d.userId);
    data.userId = d.userId;
    commit(SET_USER, data);
  },
  async [FETCH_USER_PHOTO](context, userId) {
    ApiService.setHeader(JwtService.getToken());
    return await UserService.getPhoto(userId);
  },
  [RESET_ERROR]({ commit }) {
    commit(SET_ERROR, null);
  },
  async [PUT_USER_PHOTO]({ commit }, data) {
    ApiService.setHeader(JwtService.getToken());
    commit(SET_IS_USER_LOADING, true);
    await UserService.updatePhoto(data.userId, data.image, data.imageType);
    commit(SET_IS_USER_LOADING, false);
  },
};

const mutations = {
  [SET_IS_USER_LOADING](state, val) {
    state.isUserLoading = val;
  },
  [SET_USER](state, user) {
    state.user = user;
  },
  [SET_ERROR](state, errors) {
    state.errors = errors;
  },
  [SET_AUTH](state, token) {
    state.isAuthenticated = true;
    state.errors = null;
    JwtService.saveToken(token);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = null;
    JwtService.destroyToken();
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
