<template>
  <home-layout>
    <PetitionCreateDialog />
    <PetitionSearchTable />
  </home-layout>
</template>

<script>
import HomeLayout from "@/layouts/Home";
import PetitionSearchTable from "@/components/PetitionSearchTable";
import PetitionCreateDialog from "@/components/dialog/PetitionCreateDialog";

export default {
  name: "home",
  components: {
    HomeLayout,
    PetitionSearchTable,
    PetitionCreateDialog
  }
};
</script>
