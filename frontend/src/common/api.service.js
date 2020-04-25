import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
// import JwtService from "@/common/jwt.service";

// const API_URL = "http://csse-s365.canterbury.ac.nz:4001/api/v1/";
const API_URL = "http://localhost:4941/api/v1/";

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
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource) {
    // return Vue.axios.get(`${resource}/${slug}`).catch((error) => {
    return Vue.axios.get(resource).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
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
    return ApiService.put("users", slug, params);
  },
};

// export const TagsService = {
//   get() {
//     return ApiService.get("tags");
//   },
// };

// export const ArticlesService = {
//   query(type, params) {
//     return ApiService.query("articles" + (type === "feed" ? "/feed" : ""), {
//       params: params,
//     });
//   },
//   get(slug) {
//     return ApiService.get("articles", slug);
//   },
//   create(params) {
//     return ApiService.post("articles", { article: params });
//   },
//   update(slug, params) {
//     return ApiService.update("articles", slug, { article: params });
//   },
//   destroy(slug) {
//     return ApiService.delete(`articles/${slug}`);
//   },
// };

// export const CommentsService = {
//   get(slug) {
//     if (typeof slug !== "string") {
//       throw new Error(
//         "[RWV] CommentsService.get() article slug required to fetch comments"
//       );
//     }
//     return ApiService.get("articles", `${slug}/comments`);
//   },

//   post(slug, payload) {
//     return ApiService.post(`articles/${slug}/comments`, {
//       comment: { body: payload },
//     });
//   },

//   destroy(slug, commentId) {
//     return ApiService.delete(`articles/${slug}/comments/${commentId}`);
//   },
// };

// export const FavoriteService = {
//   add(slug) {
//     return ApiService.post(`articles/${slug}/favorite`);
//   },
//   remove(slug) {
//     return ApiService.delete(`articles/${slug}/favorite`);
//   },
// };
