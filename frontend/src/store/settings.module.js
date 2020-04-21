import { PetitionsService } from "@/common/api.service";
import { FETCH_PETITIONS } from "@/store/actions.type";
import { SET_PETITION } from "@/store/mutations.type";

export const state = {
  petition: {},
};

export const actions = {
  [FETCH_PETITIONS](context, petitionSlug) {
    return PetitionsService.get(petitionSlug)
      .then(({ data }) => {
        context.commit(SET_PETITION, data.petition);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_PETITION](state, petition) {
    state.petittion = petition;
  },
};

export default {
  state,
  actions,
  mutations,
};
