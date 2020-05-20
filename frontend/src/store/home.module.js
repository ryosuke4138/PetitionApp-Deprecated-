import {
  FETCH_PETITIONS,
  FETCH_PETITION_CATEGORY,
  SET_PAGE,
} from "./actions.type";
import { PetitionsService } from "@/common/api.service";
import {
  FETCH_START,
  FETCH_PETITIONS_END,
  FETCH_CATEGORY_END,
  UPDATE_PETITION_IN_LIST,
  UPDATE_PAGE_NUMBER,
} from "./mutations.type";

// the petitions should have those value
// {
//   "petitionId": 1,
//   "title": "Increase the education budget",
//   "category": "Animals",
//   "authorName": "Adam Anderson",
//   "signatureCount": 42
// }
const state = {
  petitions: [],
  isLoading: true,
  petitionCount: 0,
  page: 1,
  petitionCategory: [],
};

const getters = {
  petitions(state) {
    return state.petitions;
  },
  isLoading(state) {
    return state.isLoading;
  },
  petitionCount(state) {
    return state.petitionCount;
  },
  petitionCategory(state) {
    return state.petitionCategory;
  },
  page(state) {
    return state.page;
  },
};

const actions = {
  [FETCH_PETITIONS]({ commit }, params) {
    commit(FETCH_START);
    return PetitionsService.query(params)
      .then(({ data }) => {
        commit(FETCH_PETITIONS_END, data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
  [FETCH_PETITION_CATEGORY]({ commit }) {
    commit(FETCH_START);
    return PetitionsService.getCategories()
      .then(({ data }) => {
        commit(FETCH_CATEGORY_END, data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
  [SET_PAGE]({ commit }, val) {
    commit(UPDATE_PAGE_NUMBER, val);
  },
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_PETITIONS_END](state, petitions) {
    state.petitions = petitions;
    state.petitionCount = petitions.length;
    state.isLoading = false;
  },
  [FETCH_CATEGORY_END](state, category) {
    state.petitionCategory = category;
    state.isLoading = false;
  },
  [UPDATE_PETITION_IN_LIST](state, data) {
    state.petitions = state.petitions.map((petition) => {
      if (petition.slug !== data.slug) {
        return petition;
      }
      // We could just return data, but it seems dangerous to
      // mix the results of different api calls, so we
      // protect ourselves by copying the information.
      // article.favorited = data.favorited;
      // article.favoritesCount = data.favoritesCount;
      return petition;
    });
  },
  [UPDATE_PAGE_NUMBER](state, val) {
    state.page = val;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
