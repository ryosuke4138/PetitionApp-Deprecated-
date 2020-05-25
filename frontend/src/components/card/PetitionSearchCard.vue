<template>
  <v-row :class="{ top: true }" justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <v-card-title>Search, Filter, and Sort Petitions</v-card-title>
        <v-card-text>
          <v-text-field label="Name" ref="name" v-model="q"></v-text-field>
          <v-autocomplete
            ref="category"
            v-model="category"
            :items="categories"
            label="Category"
            placeholder="Select.."
          ></v-autocomplete>
          <v-autocomplete
            ref="sort"
            v-model="sort"
            :items="sorts"
            label="Sort"
            placeholder="Select.."
          ></v-autocomplete>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text @click="cancelFilter">Cancel Filter</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="submit">Filter</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FETCH_PETITIONS,
  FETCH_PETITION_CATEGORY,
  SET_PAGE,
  SET_PARAMS,
} from "../../store/actions.type";
export default {
  props: {
    defaultParams: {
      type: Object,
      required: true,
    },
  },
  data: (vm) => ({
    q: vm.defaultParams.q,
    category: null,
    categories: [],
    sort: null,
    sorts: [
      "Alphabetically by title, A-Z",
      "Alphabetically by title, Z-A",
      "Number of signatures, least to most",
      "Number of signatures, most to least",
    ],
    sortsQuery: [
      "ALPHABETICAL_ASC",
      "ALPHABETICAL_DESC",
      "SIGNATURES_ASC",
      "SIGNATURES_DESC",
    ],
    formHasErrors: false,
  }),
  computed: {
    ...mapGetters(["petitionCategory", "petitionCount"]),
  },
  watch: {
    name() {
      this.errorMessages = "";
    },
  },
  mounted() {
    this.$store.dispatch(FETCH_PETITION_CATEGORY).then(() => {
      this.categories = this.petitionCategory.map((c) => c.name);
      if (this.defaultParams.categoryId) {
        this.category = this.petitionCategory.find(
          (c) => c.categoryId == this.defaultParams.categoryId
        );
      }
    });
    this.sort = this.sorts[this.sortsQuery.indexOf(this.defaultParams.sortBy)];
  },
  methods: {
    cancelFilter() {
      this.q = null;
      this.category = null;
      this.sort = "Number of signatures, most to least";
      this.submit();
    },
    submit() {
      let newParams = {};
      if (this.q) newParams.q = this.q;
      if (this.category) {
        newParams.categoryId = this.petitionCategory.find(
          (c) => c.name == this.category
        ).categoryId;
      }
      newParams.sortBy = this.sortsQuery[this.sorts.indexOf(this.sort)];
      this.$store.dispatch(FETCH_PETITIONS, newParams);
      this.$store.dispatch(SET_PARAMS, newParams);
      this.$store.dispatch(SET_PAGE, 1);
    },
  },
};
</script>

<style scoped>
.top {
  margin-top: 72px;
}
</style>
