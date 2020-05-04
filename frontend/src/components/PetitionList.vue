<template>
  <div>
    <div v-if="isLoading">Loading petitions...</div>
    <div v-else>
      <div v-if="petitions.length === 0">No petitions are found.</div>
      <PeitionPreview
        v-for="(petition, index) in petitions"
        :petition="petition"
        :key="petition.title + index"
      />
      <!-- <VPagination :pages="pages" :currentPage.sync="currentPage" /> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PeitionPreview from "./PetitionPreview";
// import VPagination from "./VPagination";
import { FETCH_PETITIONS } from "../store/actions.type";

export default {
  components: {
    PetitionPreview
    // VPagination
  },
  // props: {
  //   type: {
  //     type: String,
  //     required: false,
  //     default: "all"
  //   },
  //   author: {
  //     type: String,
  //     required: false
  //   },
  //   tag: {
  //     type: String,
  //     required: false
  //   },
  //   favorited: {
  //     type: String,
  //     required: false
  //   },
  //   itemsPerPage: {
  //     type: Number,
  //     required: false,
  //     default: 10
  //   }
  // },
  // data() {
  //   return {
  //     currentPage: 1
  //   };
  // },
  computed: {
    //   listConfig() {
    //     const { type } = this;
    //     const filters = {
    //       offset: (this.currentPage - 1) * this.itemsPerPage,
    //       limit: this.itemsPerPage
    //     };
    //     if (this.author) {
    //       filters.author = this.author;
    //     }
    //     if (this.tag) {
    //       filters.tag = this.tag;
    //     }
    //     if (this.favorited) {
    //       filters.favorited = this.favorited;
    //     }
    //     return {
    //       type,
    //       filters
    //     };
    //   },
    //   pages() {
    //     if (this.isLoading || this.articlesCount <= this.itemsPerPage) {
    //       return [];
    //     }
    //     return [
    //       ...Array(Math.ceil(this.articlesCount / this.itemsPerPage)).keys()
    //     ].map(e => e + 1);
    //   },
    // ...mapGetters(["articlesCount", "isLoading", "petitions"])
    ...mapGetters(["isLoading", "petitions"])
    // },
    // watch: {
    //   currentPage(newValue) {
    //     this.listConfig.filters.offset = (newValue - 1) * this.itemsPerPage;
    //     this.fetchPetitions();
    //   },
    //   type() {
    //     this.resetPagination();
    //     this.fetchPetitions();
    //   },
    //   author() {
    //     this.resetPagination();
    //     this.fetchPetitions();
    //   },
    //   tag() {
    //     this.resetPagination();
    //     this.fetchPetitions();
    //   },
    //   favorited() {
    //     this.resetPagination();
    //     this.fetchPetitions();
    //   }
  },
  mounted() {
    this.fetchPetitions();
  },
  methods: {
    fetchPetitions() {
      this.$store.dispatch(FETCH_PETITIONS);
    }
    // resetPagination() {
    //   this.listConfig.offset = 0;
    //   this.currentPage = 1;
    // }
  }
};
</script>
