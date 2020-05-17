import { PetitionsService, SignaturesService } from "@/common/api.service";
import {
  DO_RESET_PETITION,
  FETCH_PETITION,
  DELETE_PETITION,
  UPDATE_PETITION,
  PUBLISH_PETITION,
  PUT_PETITION_PHOTO,
  FETCH_SIGNATURES,
  SIGN_PETITION,
  UNSIGN_PETITION,
} from "@/store/actions.type";
import {
  SET_PETITION,
  RESET_PETITION,
  SET_SIGNATORIES,
} from "@/store/mutations.type";

const initialState = {
  petition: {
    petitionId: null,
    title: null,
    category: null,
    authorId: null,
    authorName: null,
    signatureCount: null,
    description: null,
    authorCity: null,
    authorCountry: null,
    createdDate: null,
    closingDate: null,
  },
  signatories: [],
};

export const state = { ...initialState };

export const actions = {
  async [FETCH_PETITION](context, slug) {
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
  async [FETCH_SIGNATURES](context, slug) {
    const { data } = await SignaturesService.get(slug);
    context.commit(SET_SIGNATORIES, data);
    return data;
  },
  async [SIGN_PETITION](context, slug) {
    await SignaturesService.sign(slug);
  },
  async [UNSIGN_PETITION](context, slug) {
    await SignaturesService.unsign(slug);
  },
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_PETITION](state, petition) {
    state.petition = petition;
  },
  [SET_SIGNATORIES](state, signatories) {
    state.signatories = signatories;
  },
  [RESET_PETITION](state) {
    state.petition = initialState.petition;
  },
};

function formatDate(date) {
  if (!date) return "(not set yet)";
  const [year, month, day] = date.substr(0, 10).split("-");
  return `${month}/${day}/${year}`;
}

const getters = {
  petition(state) {
    state.petition.displayDate =
      formatDate(state.petition.createdDate) +
      " - " +
      formatDate(state.petition.closingDate);
    return state.petition;
  },
  signatories(state) {
    state.signatories = state.signatories.map((signatory) => {
      if (signatory.city && signatory.country) {
        signatory.display = signatory.city + ", " + signatory.country;
      } else {
        signatory.display = signatory.city + signatory.country;
      }
      signatory.display = signatory.display
        ? "(" + signatory.display + ")"
        : "";
      return signatory;
    });
    return state.signatories;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
