<template>
  <div class="text-center">
    <v-pagination
      v-model="pageNumber"
      :length="Math.ceil(petitionCount/numPerPage)"
      :total-visible="7"
    ></v-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_PAGE } from "@/store/actions.type";
const NUM_PER_PAGE = 10;
export default {
  data: () => ({
    pageNumber: 1,
    numPerPage: NUM_PER_PAGE
  }),
  computed: {
    ...mapGetters(["petitionCount", "page"])
  },
  watch: {
    pageNumber: function(val) {
      this.$store.dispatch(SET_PAGE, val);
    },
    page: function(val) {
      this.pageNumber = val;
    }
  }
};
</script>
