<template>
  <div>
    <v-btn v-if="!isSigned && !isExpired" @click="sign">Sign</v-btn>
    <v-btn v-if="isSigned && !isExpired" @click="unsign">Unsign</v-btn>
    <v-subheader v-if="isExpired">Expired</v-subheader>
  </div>
</template>

<script>
import {
  SIGN_PETITION,
  UNSIGN_PETITION,
  FETCH_SIGNATURES
} from "../../store/actions.type";
export default {
  data: () => ({
    isSigned: true
  }),
  props: {
    petitionId: {
      type: Number,
      default: null
    },
    userId: {
      type: Number,
      default: null
    },
    closingDate: {
      default: null
    }
  },
  created: function() {
    this.$store.dispatch(FETCH_SIGNATURES, this.petitionId).then(signatures => {
      this.isSigned = signatures.some(
        signature => signature.signatoryId == this.userId
      );
    });
  },
  watch: {
    petitionId: function(newPetitionId) {
      this.$store.dispatch(FETCH_SIGNATURES, newPetitionId).then(signatures => {
        this.isSigned = signatures.some(
          signature => signature.signatoryId == this.userId
        );
      });
    }
  },
  computed: {
    isExpired: function() {
      return this.closingDate && new Date(this.closingDate) <= new Date();
    }
  },
  methods: {
    sign() {
      this.$store.dispatch(SIGN_PETITION, this.petitionId).then(() => {
        this.$store.dispatch(FETCH_SIGNATURES, this.petitionId);
        this.isSigned = true;
      });
    },
    unsign() {
      this.$store.dispatch(UNSIGN_PETITION, this.petitionId).then(() => {
        this.$store.dispatch(FETCH_SIGNATURES, this.petitionId);
        this.isSigned = false;
      });
    }
  }
};
</script>
