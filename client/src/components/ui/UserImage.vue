<template>
  <div>
    <v-img class="profileImage" v-if="image" :src="image" />
    <v-icon v-else large>mdi-account-circle</v-icon>
  </div>
</template>

<script>
import { FETCH_USER_PHOTO } from "../../store/actions.type";
import API_URL from "@/common/config";

export default {
  props: {
    userId: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    API_URL: API_URL,
    image: null,
  }),
  created: function() {
    this.getImage(this.userId);
  },
  watch: {
    userId: function(val) {
      this.getImage(val);
    },
  },
  methods: {
    getImage(userId) {
      if (!userId) return;
      this.$store
        .dispatch(FETCH_USER_PHOTO, userId)
        .then(() => {
          this.image = this.API_URL + "users/" + userId + "/photo";
        })
        .catch(() => {
          this.image = null;
        });
    },
  },
};
</script>

<style scoped>
.profileImage {
  border-width: 4%;
  border-style: solid;
  border-color: rgba(42, 42, 255, 0.534);
}
</style>
