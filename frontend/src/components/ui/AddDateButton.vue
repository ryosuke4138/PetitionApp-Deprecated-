<template>
  <div>
    <v-btn v-if="!isOpenDatePicker" @click="openDatePicker">Add Closing Date</v-btn>
    <div v-if="isOpenDatePicker">
      <DatePicker @date="setDate" />
      <v-btn @click="closeDatePicker">Cancel Input Date</v-btn>
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
    closeDatePicker() {
      this.isOpenDatePicker = false;
      this.$emit("date", null);
    },
    setDate(date) {
      this.$emit("date", date);
    }
  }
};
</script>
