<template>
  <div>
    <v-btn v-if="!isOpenDatePicker" @click="openDatePicker">Add Closing Date</v-btn>
    <div v-if="isOpenDatePicker">
      <DatePicker @set="setDate" />
      <v-btn @click="cancelDatePicker">Cancel Input Date</v-btn>
    </div>
  </div>
</template>

<script>
import DatePicker from "@/components/ui/DatePicker";
export default {
  components: {
    DatePicker
  },
  data: () => ({
    isOpenDatePicker: false
  }),
  methods: {
    openDatePicker() {
      this.isOpenDatePicker = true;
    },
    cancelDatePicker() {
      this.isOpenDatePicker = false;
      this.$emit("set", null);
    },
    setDate(date) {
      this.$emit("set", date);
    }
  }
};
</script>
