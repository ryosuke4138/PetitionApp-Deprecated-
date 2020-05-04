import { PetitionsService } from "@/common/api.service";
import {
  FETCH_PETITION,
  DELETE_PETITION,
  UPDATE_PETITION,
  PUBLISH_PETITION,
} from "@/store/actions.type";
import { SET_PETITION } from "@/store/mutations.type";

const initialState = {
  petition: {
    petitionId: null,
    title: "",
    category: "",
    authorName: "",
    signatureCount: null,
    description: "",
    authorCity: "",
    authorCountry: "",
    createdDate: "",
    closingDate: "",
  },
};

export const state = { ...initialState };

export const actions = {
  async [FETCH_PETITION](context, slug, prevPetition) {
    // avoid extronuous network call if petition exists
    if (prevPetition !== undefined) {
      return context.commit(SET_PETITION, prevPetition);
    }
    const { data } = await PetitionsService.get(slug);
    context.commit(SET_PETITION, data);
    return data;
  },
  async [DELETE_PETITION](context, slug) {
    const { data } = await PetitionsService.destroy(slug);
    context.commit(SET_PETITION, initialState.petition);
    return data;
  },
  async [UPDATE_PETITION](context, slug, params) {
    const { data } = await PetitionsService.update(slug, params);
    context.commit(SET_PETITION, data);
    return data;
  },
  async [PUBLISH_PETITION](context, params) {
    const { data } = await PetitionsService.create(params);
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
  petition(state) {
    return state.petition;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
