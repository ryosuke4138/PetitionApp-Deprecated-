<template>
  <div>
    <PetitionEditDialog
      :show-petition-details-dialog.sync="showPetitionDetailsDialog"
      :petition-id="petitionId"
      :is-edit-mode.sync="isEditMode"
      :is-create="false"
      @closeDialog="closeDialog"
    />

    <PetitionViewDialog
      :show-petition-details-dialog.sync="showPetitionDetailsDialog"
      :petition-id="petitionId"
      :is-edit-mode.sync="isEditMode"
      @closeDialog="closeDialog"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_PETITION } from "@/store/actions.type";
import API_URL from "@/common/config";
import PetitionEditDialog from "@/components/dialog/PetitionEditDialog.vue";
import PetitionViewDialog from "@/components/dialog/PetitionViewDialog.vue";
import { FETCH_SIGNATURES } from "../../store/actions.type";

export default {
  components: {
    PetitionEditDialog,
    PetitionViewDialog
  },
  props: {
    showPetitionDetailsDialog: {
      type: Boolean,
      default: false
    },
    petitionId: {
      type: Number,
      default: null
    },
    isCreate: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    API_URL: API_URL,
    isEditMode: false
  }),
  computed: {
    ...mapGetters(["petition"])
  },
  watch: {
    petitionId: function(newPetitionId) {
      this.$store.dispatch(FETCH_PETITION, newPetitionId);
      this.$store.dispatch(FETCH_SIGNATURES, newPetitionId);
    },
    isCreate: function(newIsCreate) {
      this.isEditMode = newIsCreate;
    }
  },
  methods: {
    closeDialog() {
      this.$emit("update:showPetitionDetailsDialog", false);
    }
  }
};
</script>