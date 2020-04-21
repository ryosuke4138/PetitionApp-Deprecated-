import { PetitionsService } from "@/common/api.service";
import { FETCH_PETITIONS } from "@/store/actions.type";
import { SET_PETITION } from "@/store/mutations.type";

const initialState = {
  petition: {
    petitionId: "",
    title: "",
    description: "",
    authorId: "",
    categoryId: "",
    createdDate: "",
    closingDate: "",
    photoFilename: "",
  },
};

export const state = { ...initialState };

export const actions = {
  async [FETCH_PETITIONS](context, petitionSlug, prevPetition) {
    // avoid extronuous network call if petition exists
    if (prevPetition !== undefined) {
      return context.commit(SET_PETITION, prevPetition);
    }
    const { data } = await PetitionsService.get(petitionSlug);
    context.commit(SET_PETITION, data);
    return data;
  },
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_PETITION](state, petition) {
    state.petition = petition;
  },
};

const getters = {
  petitions(state) {
    return state.petition;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
