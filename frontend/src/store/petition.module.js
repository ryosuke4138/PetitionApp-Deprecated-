import { PetitionsService, SignaturesService } from "@/common/api.service";
import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";
import {
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
  SET_IS_SIGNED,
  SET_IS_PETITION_LOADING,
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
  isSigned: false,
};

export const state = { ...initialState };

export const actions = {
  async [FETCH_PETITION](context, slug) {
    ApiService.setHeader(JwtService.getToken());
    const { data } = await PetitionsService.get(slug);
    data.createdDate = formatDate(data.createdDate);
    data.closingDate = formatDate(data.closingDate);
    data.displayDate = formatDisplayDate(data.createdDate, data.closingDate);
    context.commit(SET_PETITION, data);
    return data;
  },
  async [DELETE_PETITION](context, slug) {
    ApiService.setHeader(JwtService.getToken());
    const { data } = await PetitionsService.destroy(slug);
    return data;
  },
  async [UPDATE_PETITION](context, d) {
    ApiService.setHeader(JwtService.getToken());
    await PetitionsService.update(d.petitionId, d.newPetition);
    const { data } = await PetitionsService.get(d.petitionId);
    data.createdDate = formatDate(data.createdDate);
    data.closingDate = formatDate(data.closingDate);
    data.displayDate = formatDisplayDate(data.createdDate, data.closingDate);
    context.commit(SET_PETITION, data);
  },
  async [PUBLISH_PETITION](context, params) {
    ApiService.setHeader(JwtService.getToken());
    return await PetitionsService.create(params);
  },
  async [PUT_PETITION_PHOTO](context, data) {
    ApiService.setHeader(JwtService.getToken());
    context.commit(SET_IS_PETITION_LOADING, true);
    await PetitionsService.updatePhoto(
      data.petitionId,
      data.image,
      data.imageType
    );
    context.commit(SET_IS_PETITION_LOADING, false);
  },
  async [FETCH_SIGNATURES](context, slug) {
    ApiService.setHeader(JwtService.getToken());
    const { data } = await SignaturesService.get(slug);
    context.commit(SET_SIGNATORIES, data);
    return data;
  },
  async [SIGN_PETITION](context, slug) {
    ApiService.setHeader(JwtService.getToken());
    await SignaturesService.sign(slug);
    context.commit(SET_IS_SIGNED, true);
  },
  async [UNSIGN_PETITION](context, slug) {
    ApiService.setHeader(JwtService.getToken());
    await SignaturesService.unsign(slug);
    context.commit(SET_IS_SIGNED, false);
  },
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_IS_PETITION_LOADING](state, bool) {
    state.isPetitionLoading = bool;
  },
  [SET_PETITION](state, petition) {
    state.petition = petition;
  },
  [SET_SIGNATORIES](state, signatories) {
    state.signatories = signatories;
  },
  [RESET_PETITION](state) {
    state.petition = initialState.petition;
  },
  [SET_IS_SIGNED](state, bool) {
    state.isSigned = bool;
  },
};

function slashToHyphen(date) {
  const [day, month, year] = date.substr(0, 10).split("/");
  return `${year}-${month}-${day}`;
}

function formatDate(date) {
  if (!date) return null;
  return slashToHyphen(new Date(date).toLocaleString());
}

function formatDisplayDate(createdDate, closingDate) {
  if (closingDate) {
    return createdDate + " - " + closingDate;
  } else {
    return createdDate + " - (not set yet)";
  }
}

const getters = {
  petition(state) {
    return state.petition;
  },
  isSigned(state) {
    return state.isSigned;
  },
  isPetitionLoading(state) {
    return state.isPetitionLoading;
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
