<template>
  <div>
    <v-btn v-if="!isSigned && !isExpired" @click="sign">Sign</v-btn>
    <v-btn v-if="isSigned && !isExpired" @click="unsign">Unsign</v-btn>
    <v-subheader v-if="isExpired">Expired</v-subheader>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  SIGN_PETITION,
  UNSIGN_PETITION,
  FETCH_SIGNATURES,
} from "../../store/actions.type";
import { SET_IS_SIGNED } from "../../store/mutations.type";
export default {
  props: {
    petitionId: {
      type: Number,
      default: null,
    },
    userId: {
      type: Number,
      default: null,
    },
    isExpired: {
      type: Boolean,
      default: false,
    },
  },
  created: function() {
    this.$store
      .dispatch(FETCH_SIGNATURES, this.petitionId)
      .then((signatures) => {
        const signed = signatures.some(
          (signature) => signature.signatoryId == this.userId
        );
        this.$store.commit(SET_IS_SIGNED, signed);
      });
  },
  watch: {
    petitionId: function(newPetitionId) {
      this.$store
        .dispatch(FETCH_SIGNATURES, newPetitionId)
        .then((signatures) => {
          const signed = signatures.some(
            (signature) => signature.signatoryId == this.userId
          );
          this.$store.commit(SET_IS_SIGNED, signed);
        });
    },
  },
  computed: {
    ...mapGetters(["isSigned"]),
  },
  methods: {
    sign() {
      this.$store.dispatch(SIGN_PETITION, this.petitionId).then(() => {
        this.$store.dispatch(FETCH_SIGNATURES, this.petitionId);
      });
    },
    unsign() {
      this.$store.dispatch(UNSIGN_PETITION, this.petitionId).then(() => {
        this.$store.dispatch(FETCH_SIGNATURES, this.petitionId);
      });
    },
  },
};
</script>
