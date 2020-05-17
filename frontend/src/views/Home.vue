<template>
  <v-app>
    <NavBar />
    <PetitionCreateDialog />
    <PetitionSearchTable />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import PetitionSearchTable from "@/components/PetitionSearchTable";
import PetitionCreateDialog from "@/components/dialog/PetitionCreateDialog";

export default {
  name: "home",
  components: {
    NavBar,
    PetitionSearchTable,
    PetitionCreateDialog
  }
};
</script>
