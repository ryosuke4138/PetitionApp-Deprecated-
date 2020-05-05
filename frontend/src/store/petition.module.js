import { PetitionsService } from "@/common/api.service";
import {
  DO_RESET_PETITION,
  FETCH_PETITION,
  DELETE_PETITION,
  UPDATE_PETITION,
  PUBLISH_PETITION,
  PUT_PETITION_PHOTO,
} from "@/store/actions.type";
import { SET_PETITION, RESET_PETITION } from "@/store/mutations.type";

const initialState = {
  petition: {
    petitionId: null,
    title: null,
    category: null,
    authorName: null,
    signatureCount: null,
    description: null,
    authorCity: null,
    authorCountry: null,
    createdDate: null,
    closingDate: null,
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
    context.commit(RESET_PETITION);
    return data;
  },
  async [UPDATE_PETITION](context, slug, params) {
    const { data } = await PetitionsService.update(slug, params);
    context.commit(SET_PETITION, data);
    return data;
  },
  async [PUBLISH_PETITION](context, params) {
    return await PetitionsService.create(params);
  },
  [DO_RESET_PETITION](context) {
    context.commit(RESET_PETITION);
  },
  async [PUT_PETITION_PHOTO](context, data) {
    await PetitionsService.updatePhoto(
      data.petitionId,
      data.image,
      data.imageType
    );
  },
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_PETITION](state, petition) {
    state.petition = petition;
  },
  [RESET_PETITION](state) {
    state.petition = initialState.petition;
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
