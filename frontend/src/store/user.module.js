import { UserService } from "@/common/api.service";
// import JwtService from "@/common/jwt.service";
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  FETCH_USER,
  UPDATE_USER,
  // CHECK_AUTH,
  // UPDATE_USER,
} from "./actions.type";
import { SET_AUTH, PURGE_AUTH, SET_ERROR, SET_USER } from "./mutations.type";

export const state = {
  errors: null,
  user: {},
  isAuthenticated: false,
  // isAuthenticated: !!JwtService.getToken(),
};

const getters = {
  user(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
};

const actions = {
  async [LOGIN]({ commit }, credentials) {
    try {
      const { data } = await UserService.login(credentials);
      const result = await UserService.get(data.userId);
      //const token = data.token;
      commit(SET_AUTH);
      commit(SET_USER, result.data);
      return result.data;
    } catch (response) {
      commit(SET_ERROR, response.data.errors);
      return response;
    }
  },
  [LOGOUT]({ commit }) {
    commit(PURGE_AUTH);
  },
  async [REGISTER]({ commit }, credentials) {
    try {
      const { data } = await UserService.register(credentials);
      const result = await UserService.get(data.userId);
      //const token = data.token;
      commit(SET_AUTH);
      commit(SET_USER, result.data);
      return result.data;
    } catch (response) {
      commit(SET_ERROR, response.data.errors);
      return response;
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
  // [CHECK_AUTH](context) {
  //   if (JwtService.getToken()) {
  //     ApiService.setHeader();
  //     ApiService.get("user")
  //       .then(({ data }) => {
  //         context.commit(SET_AUTH, data.user);
  //       })
  //       .catch(({ response }) => {
  //         context.commit(SET_ERROR, response.data.errors);
  //       });
  //   } else {
  //     context.commit(PURGE_AUTH);
  //   }
  // },
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
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state) {
    state.isAuthenticated = true;
    state.errors = {};
    // JwtService.saveToken(state.user.token);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    // JwtService.destroyToken();
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
