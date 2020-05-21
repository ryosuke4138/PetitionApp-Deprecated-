<template>
  <div>
    <CreateButton v-if="isAuthenticated" @click="openDialog" :disabled="disabledButton" />
    <PetitionEditDialog
      :show-petition-details-dialog.sync="showPetitionCreateDialog"
      :is-edit-mode="true"
      :is-create="true"
      :isProfile="isProfile"
      @closeDialog="closeDialog"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CreateButton from "@/components/ui/CreateButton";
import PetitionEditDialog from "@/components/dialog/PetitionEditDialog";

export default {
  components: {
    CreateButton,
    PetitionEditDialog
  },
  data: () => ({
    showPetitionCreateDialog: false,
    disabledButton: false
  }),
  props: {
    isProfile: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(["petition", "isAuthenticated"])
  },
  methods: {
    openDialog() {
      this.showPetitionCreateDialog = true;
      this.disabledButton = true;
    },
    closeDialog() {
      this.showPetitionCreateDialog = false;
      this.disabledButton = false;
    }
  }
};
</script>