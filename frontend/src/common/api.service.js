import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import API_URL from "@/common/config";
// import JwtService from "@/common/jwt.service";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  // setHeader() {
  //   Vue.axios.defaults.headers.common[
  //     "Authorization"
  //   ] = `Token ${JwtService.getToken()}`;
  // },

  query(resource, params) {
    return Vue.axios.get(resource, params).catch((error) => {
      throw new Error(`ApiService ${error}`);
    });
  },

  get(resource, slug) {
    return Vue.axios.get(`${resource}/${slug}`).catch((error) => {
      throw new Error(`ApiService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch((error) => {
      throw new Error(`ApiService ${error}`);
    });
  },
};

export default ApiService;

export const PetitionsService = {
  query(params) {
    return ApiService.query("petitions", params);
  },
  get(slug) {
    return ApiService.get("petitions", slug);
  },
  create(params) {
    return ApiService.post("petitions", { petition: params });
  },
  update(slug, params) {
    return ApiService.update("petitions", slug, { petition: params });
  },
  destroy(slug) {
    return ApiService.delete(`petitions/${slug}`);
  },
  getCategories() {
    return ApiService.get("petitions", "categories");
  },
};

export const UserService = {
  register(params) {
    return ApiService.post("users/register", params);
  },
  login(params) {
    return ApiService.post("users/login", params);
  },
  get(slug) {
    return ApiService.get("users/" + slug);
  },
  update(slug, params) {
    return ApiService.put("users/", slug, params);
  },
};
