<template>
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
        <v-date-picker v-model="date" no-title @input="menu1 = false" :allowed-dates="allowedDates"></v-date-picker>
      </v-menu>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    date: null,
    dateFormatted: null,
    menu1: false,
    currentDate: new Date().toISOString().substr(0, 10)
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },
  created: function() {
    const tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1);
    this.date = tommorow.toISOString().substr(0, 10);
    this.dateFormatted = this.formatDate(tommorow.toISOString().substr(0, 10));
    this.$emit("set", this.parseDate(this.dateFormatted) + " 00:00:00.000");
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
      this.$emit("set", this.parseDate(this.dateFormatted) + " 00:00:00.000");
    }
  },
  methods: {
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
    allowedDates: val => {
      // const date = ;
      // date.setDate(date.getDate() + 1);
      return new Date() < new Date(val);
    }
  }
};
</script>

