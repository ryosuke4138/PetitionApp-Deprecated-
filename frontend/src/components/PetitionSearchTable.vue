<template>
  <v-row align="center">
    <PetitionCard
      v-for="(petition, i) in petitions"
      :key="i"
      :petition="petition"
      :showPetitionDetailsDialog.sync="showPetitionDetailsDialog"
      :targetPetitionId.sync="targetPetitionId"
    />
    <PetitionDetailsDialog
      :petitionId="targetPetitionId"
      :showPetitionDetailsDialog.sync="showPetitionDetailsDialog"
    />
  </v-row>
  <!-- <v-container fluid grid-list-md>
    <h1>Petition List</h1>
    <v-text-field
      row-height="12"
      label="Input"
      single-line
      v-model="keyword"
      hint="Petition Title"
      persistent-hint
    ></v-text-field>
    <v-data-table item-key="name" no-data-text="No petitions are found">
      <template slot="items" slot-scope="props">
        <tr>
          <td class="text-xs-left">{{ props }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-container>-->
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_PETITIONS } from "@/store/actions.type";
import PetitionDetailsDialog from "@/components/PetitionDetailsDialog";
import PetitionCard from "@/components/card/PetitionCard.vue";

export default {
  components: {
    PetitionCard,
    PetitionDetailsDialog
  },
  data: () => ({
    showPetitionDetailsDialog: false,
    targetPetitionId: null
  }),
  mounted() {
    this.$store.dispatch(FETCH_PETITIONS);
  },
  computed: {
    ...mapGetters(["petitions"])
  }
};
</script>