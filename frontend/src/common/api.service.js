import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import API_URL from "@/common/config";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  setHeader(token) {
    Vue.axios.defaults.headers.common["X-Authorization"] = token;
  },

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

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  putPhoto(resource, params, imageType) {
    const headers = { "content-type": imageType };
    return Vue.axios.put(`${resource}`, params, { headers });
  },

  getPhoto(resource) {
    return Vue.axios.get(resource);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch((error) => {
      throw new Error(`ApiService ${error}`);
    });
  },

  getSignatures(slug) {
    return Vue.axios.get(`petitions/${slug}/signatures`).catch((error) => {
      throw new Error(`ApiService ${error}`);
    });
  },
};

export default ApiService;

export const PetitionsService = {
  query(q) {
    if (q) {
      return ApiService.query("petitions", { params: q });
    } else {
      return ApiService.query("petitions", null);
    }
  },
  get(slug) {
    return ApiService.get("petitions", slug);
  },
  create(params) {
    return ApiService.post("petitions", params);
  },
  update(slug, params) {
    return ApiService.update("petitions", slug, params);
  },
  destroy(slug) {
    return ApiService.delete(`petitions/${slug}`);
  },
  getCategories() {
    return ApiService.get("petitions", "categories");
  },
  updatePhoto(slug, params, imageType) {
    return ApiService.putPhoto(`petitions/${slug}/photo`, params, imageType);
  },
};

export const SignaturesService = {
  get(slug) {
    return ApiService.getSignatures(slug);
  },
  sign(slug) {
    return ApiService.post(`petitions/${slug}/signatures`, null);
  },
  unsign(slug) {
    return ApiService.delete(`petitions/${slug}/signatures`);
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
    return ApiService.get("users", slug);
  },
  update(slug, params) {
    return ApiService.put("users", slug, params);
  },
  getPhoto(slug) {
    return ApiService.getPhoto(`users/${slug}/photo`);
  },
  updatePhoto(slug, params, imageType) {
    return ApiService.putPhoto(`users/${slug}/photo`, params, imageType);
  },
};
