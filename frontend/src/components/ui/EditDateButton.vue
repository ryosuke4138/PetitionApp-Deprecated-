<template>
  <div class="dateButton">
    <v-btn v-if="!isOpenDatePicker" @click="openDatePicker"
      >Add Closing Date</v-btn
    >
    <div v-if="isOpenDatePicker">
      <v-container>
        <v-col cols="12" lg="6">
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateFormatted"
                label="Closing Date"
                hint="MM/DD/YYYY format"
                persistent-hint
                prepend-icon="mdi-calendar"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu1 = false"
              :allowed-dates="allowedDates"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-container>
      <v-btn @click="cancelDatePicker" v-if="!defaultDate"
        >Cancel Input Date</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    date: null,
    isOpenDatePicker: false,
    tommorow: null,
    dateFormatted: null,
    menu1: false,
    currentDate: new Date().toISOString().substr(0, 10),
  }),
  props: {
    defaultDate: {
      type: String,
      defalt: null,
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  created: function() {
    const tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1);
    this.tommorow = this.parseDateMMDDYYYY(
      tommorow.toLocaleString().substr(0, 10)
    );
    this.date = this.defaultDate || this.tommorow;
    if (this.defaultDate) this.isOpenDatePicker = true;
    this.dateFormatted = this.formatDate(this.date);
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
      if (this.isOpenDatePicker)
        this.$emit("set", this.parseDate(this.dateFormatted) + " 00:00:00.000");
    },
  },
  methods: {
    allowedDates: (val) => {
      const date1 = new Date();
      const date2 = new Date(val);
      let year1 = date1.getFullYear();
      let month1 = date1.getMonth() + 1;
      let day1 = date1.getDate();

      let year2 = date2.getFullYear();
      let month2 = date2.getMonth() + 1;
      let day2 = date2.getDate();

      if (year1 == year2) {
        if (month1 == month2) {
          return day1 < day2;
        } else {
          return month1 < month2;
        }
      } else {
        return year1 < year2;
      }
    },
    openDatePicker() {
      this.isOpenDatePicker = true;
      this.$emit("set", this.parseDate(this.dateFormatted) + " 00:00:00.000");
    },
    cancelDatePicker() {
      this.isOpenDatePicker = false;
      this.date = this.tommorow;
      this.$emit("set", null);
    },
    setDate(date) {
      this.date = date;
      this.isOpenDatePicker = true;
      this.$emit("set", date + " 00:00:00.000");
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    parseDateMMDDYYYY(date) {
      if (!date) return null;
      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>
