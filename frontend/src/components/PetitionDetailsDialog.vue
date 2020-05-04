<template>
  <div>
    <PetitionEditDialog
      :showPetitionDetailsDialog.sync="showPetitionDetailsDialog"
      :petition-id="petitionId"
      :is-edit-mode.sync="isEditMode"
      :is-create="isCreate"
      @closeDialog="closeDialog"
    />

    <PetitionViewDialog
      :showPetitionDetailsDialog.sync="showPetitionDetailsDialog"
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

export default {
  components: {
    PetitionEditDialog,
    PetitionViewDialog
  },
  props: {
    //ダイアログ表示フラグ。
    showPetitionDetailsDialog: {
      type: Boolean,
      default: false
    },
    //編集対象の呪文データ。新規作成の場合はnullを指定。
    petitionId: {
      type: Number,
      default: null
    },
    //呪文を新規作成する場合のフラグ。
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
    },
    //v-bindしている新規作成フラグが変更されたら、編集モードを変更する。
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